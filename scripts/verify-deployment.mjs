/**
 * Automated Production Deployment Health Checker
 * Verifies that the deployed GitHub Pages site is live, HTML is valid,
 * and 100% of core and lazy-loaded asset chunks return HTTP 200 OK.
 */

import fs from 'node:fs';

const BASE_URL = (process.env.DEPLOYMENT_URL || process.argv[2] || 'https://amahdy59.github.io/Hajarafaapp/').replace(/\/$/, '') + '/';
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 8000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function logSummary(markdown) {
  if (process.env.GITHUB_STEP_SUMMARY) {
    try {
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown + '\n');
    } catch (e) {
      console.warn('Could not write to GITHUB_STEP_SUMMARY:', e.message);
    }
  }
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  const defaultHeaders = {
    'User-Agent': 'HajArafa-Deployment-Checker/1.0 (Automated CI/CD)',
    ...(options.headers || {}),
  };
  for (let i = 1; i <= retries; i++) {
    try {
      const res = await fetch(url, { ...options, headers: defaultHeaders });
      return res;
    } catch (err) {
      if (i === retries) throw err;
      await sleep(1000);
    }
  }
}

async function verifyDeployment() {
  console.log(`\n🌿 Starting Live Deployment Health Check for: ${BASE_URL}`);
  
  let htmlText = '';
  let mainRes = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[Attempt ${attempt}/${MAX_RETRIES}] Probing ${BASE_URL}...`);
      const res = await fetchWithRetry(`${BASE_URL}?cache_bust=${Date.now()}`);
      if (res.ok) {
        mainRes = res;
        htmlText = await res.text();
        console.log(`  ✓ Main page is live (HTTP ${res.status}, ${htmlText.length} bytes)`);
        break;
      } else {
        console.warn(`  ⚠️ Live site returned HTTP ${res.status}. Waiting ${RETRY_DELAY_MS / 1000}s for CDN propagation...`);
      }
    } catch (err) {
      console.warn(`  ⚠️ Network probe error: ${err.message}. Waiting ${RETRY_DELAY_MS / 1000}s...`);
    }

    if (attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY_MS);
    }
  }

  if (!mainRes || !htmlText) {
    console.error(`\n❌ Deployment check failed: ${BASE_URL} could not be reached after ${MAX_RETRIES} attempts.`);
    logSummary(`### ❌ Live Deployment Health Check Failed\nCould not reach ${BASE_URL} after ${MAX_RETRIES} attempts.`);
    process.exit(1);
  }

  // 1. Critical DOM & Meta Validations
  const checks = {
    hasHtml: htmlText.includes('<html'),
    hasViewport: htmlText.includes('viewport-fit=cover') || htmlText.includes('name="viewport"'),
    hasModuleScript: htmlText.includes('type="module"'),
    hasAppRoot: htmlText.includes('id="root"'),
  };

  const failedChecks = Object.entries(checks).filter(([, passed]) => !passed);
  if (failedChecks.length > 0) {
    console.error('❌ Critical HTML tags missing:', failedChecks.map(([k]) => k).join(', '));
    process.exit(1);
  }
  console.log('  ✓ Core HTML shell and viewport meta verified.');

  // 2. Extract and verify directly referenced assets
  const assetRegex = /(?:src|href)="(\/Hajarafaapp\/assets\/[^"\s]+)"/g;
  const directAssets = new Set();
  let match;
  while ((match = assetRegex.exec(htmlText)) !== null) {
    directAssets.add(match[1]);
  }

  console.log(`\n🔍 Verifying ${directAssets.size} direct bundle assets...`);
  let assetFailures = 0;
  const verifiedAssets = [];

  for (const assetPath of directAssets) {
    const assetUrl = 'https://amahdy59.github.io' + assetPath;
    try {
      const res = await fetchWithRetry(assetUrl, { method: 'GET' });
      if (res && res.ok) {
        console.log(`  ✓ [HTTP ${res.status}] ${assetPath.split('/').pop()}`);
        verifiedAssets.push({ path: assetPath, status: res.status });
      } else {
        console.error(`  ❌ [HTTP ${res ? res.status : 'Unknown'}] ${assetUrl}`);
        assetFailures++;
      }
    } catch (e) {
      console.error(`  ❌ [ERROR] ${assetUrl}: ${e.message}`);
      assetFailures++;
    }
  }

  // 3. Inspect main JS bundle for code-split dynamic chunks
  const mainScriptMatch = htmlText.match(/\/Hajarafaapp\/(assets\/index-[a-zA-Z0-9_-]+\.js)/);
  const lazyChunks = new Set();
  if (mainScriptMatch && mainScriptMatch[1]) {
    const mainScriptUrl = 'https://amahdy59.github.io/Hajarafaapp/' + mainScriptMatch[1];
    try {
      const scriptText = await (await fetchWithRetry(mainScriptUrl)).text();
      const chunkRegex = /"assets\/([a-zA-Z0-9_-]+\.js)"/g;
      let chunkMatch;
      while ((chunkMatch = chunkRegex.exec(scriptText)) !== null) {
        lazyChunks.add(chunkMatch[1]);
      }
      console.log(`\n📦 Discovered ${lazyChunks.size} code-split lazy chunks in main bundle.`);
    } catch (e) {
      console.warn(`  ⚠️ Could not inspect chunks in main bundle: ${e.message}`);
    }
  }

  // 4. Verify all code-split lazy chunks
  for (const chunk of lazyChunks) {
    const chunkUrl = 'https://amahdy59.github.io/Hajarafaapp/assets/' + chunk;
    try {
      const res = await fetchWithRetry(chunkUrl, { method: 'GET' });
      if (res && res.ok) {
        console.log(`  ✓ [HTTP ${res.status} Chunk] ${chunk}`);
        verifiedAssets.push({ path: chunk, status: res.status });
      } else {
        console.error(`  ❌ [HTTP ${res ? res.status : 'Unknown'} Chunk] ${chunkUrl}`);
        assetFailures++;
      }
    } catch (e) {
      console.error(`  ❌ [Chunk Error] ${chunkUrl}: ${e.message}`);
      assetFailures++;
    }
  }

  // 5. Verify SPA 404 Fallback
  const fallbackUrl = BASE_URL + '404.html';
  let spaFallbackOk = false;
  try {
    const spaRes = await fetchWithRetry(fallbackUrl);
    spaFallbackOk = spaRes && spaRes.ok;
    console.log(`\n📄 SPA Routing Fallback (404.html): HTTP ${spaRes ? spaRes.status : 'Failed'} (${spaFallbackOk ? 'PASSED' : 'FAILED'})`);
  } catch (e) {
    console.warn(`  ⚠️ SPA Fallback check error: ${e.message}`);
  }

  // Summary output
  console.log('\n========================================');
  if (assetFailures === 0 && spaFallbackOk) {
    console.log(`🎉 DEPLOYMENT VERIFIED HEALTHY (100% of ${verifiedAssets.length} assets OK)`);
    console.log('========================================\n');

    logSummary(`
### 🌐 Live Deployment Health Check (PASSED)

- **Target URL**: [${BASE_URL}](${BASE_URL})
- **Status**: Live & Serving HTTP 200
- **Total Assets Verified**: ${verifiedAssets.length} (Core bundles & code-split chunks)
- **SPA Fallback (404.html)**: Ready
- **Verification Timestamp**: ${new Date().toISOString()}
`);
    process.exit(0);
  } else {
    console.error(`❌ DEPLOYMENT ISSUES DETECTED: ${assetFailures} assets failed to load.`);
    console.log('========================================\n');

    logSummary(`
### ❌ Live Deployment Health Check (FAILED)

- **Target URL**: [${BASE_URL}](${BASE_URL})
- **Asset Failures**: ${assetFailures}
- **SPA Fallback**: ${spaFallbackOk ? 'OK' : 'Failed'}
`);
    process.exit(1);
  }
}

verifyDeployment().catch((err) => {
  console.error('Fatal deployment checker error:', err);
  process.exit(1);
});
