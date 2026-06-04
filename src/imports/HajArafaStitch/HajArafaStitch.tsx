import svgPaths from "./svg-ivrvq55til";
import imgHajArafaLogo from "./5b7d9453acaf1ae96dbc086d12dc3c8d879f9fa0.png";
import imgHeroSection from "./1b88d03939e2495a28853bdc2da7fa673f67f24a.png";
import imgHerbalProduct1 from "./86ff44c5bd879fb6e4c6b05f8738a9723f88d3a0.png";
import imgHerbalProduct2 from "./237aaccc0d82ad64a1a5d6d75338d24bff9f68b5.png";
import imgHerbalProduct3 from "./e8b94b958c04dbe1628a058e2e6e5066b5b5ba4a.png";
import imgHerbalProduct4 from "./baa3ae2823f94ef6eff4ea214cef9435f251d5fb.png";
import imgProductImage from "./e63bdca5e57ee4116e8ea3e28c35f26fe354791c.png";
import imgPremiumRawAlmonds from "./b4aa8945abbaf80d83f638b93f4b1fe84af39cb8.png";
import imgAlmondsArrangedOrganically from "./55e91cbe63ea522050bd0ca3e5d61669a22b5c6f.png";
import imgImage from "./db1f2c9dde56d865653a36c5d591bc45f60f3b6b.png";
import imgImage1 from "./0d8b9e66f36e323c3abd3cbd46261a8f4d0e15b2.png";

function Container() {
  return (
    <div className="h-[12px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
        <g id="Container">
          <path d={svgPaths.p2bce57c0} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[12px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[8px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function HajArafaLogo() {
  return (
    <div className="h-[32px] relative shrink-0 w-[52.59px]" data-name="Haj Arafa Logo">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[99.99%] left-0 max-w-none top-0 w-full" src={imgHajArafaLogo} />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[12px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[8px] relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="bg-[#fbf9f6] h-[64px] relative shrink-0 w-full" data-name="Header - TopAppBar">
      <div aria-hidden className="absolute border-[#c3c8c1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Button />
          <HajArafaLogo />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[48px] text-white tracking-[-1.2px] whitespace-nowrap">
        <p className="leading-[56px] mb-0">Natural</p>
        <p className="leading-[56px]">Wellness</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-90 pb-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
        <p className="leading-[28px] mb-0">Ancient Egyptian herbal wisdom for</p>
        <p className="leading-[28px]">your daily life.</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#8da392] content-stretch flex items-center justify-center px-[24px] py-[10px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">Explore Collection</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start max-w-[448px] relative shrink-0" data-name="Container">
      <Heading />
      <Container3 />
      <Button2 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-gradient-to-r content-stretch flex from-[rgba(27,28,26,0.6)] inset-0 items-center p-[24px] to-[rgba(27,28,26,0)]" data-name="Background">
      <Container2 />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[201.38px] overflow-clip relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[358px]" data-name="Hero Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-5.82%] max-w-none top-0 w-[111.63%]" src={imgHeroSection} />
      </div>
      <Background />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334537] text-[28px] w-full">
        <p className="leading-[36px]">Shop by Concern</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[25px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 25">
        <g id="Container">
          <path d={svgPaths.p2091e100} fill="var(--fill-0, #A65432)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#efeeeb] content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[80px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container6 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[92px] items-start pb-[12px] relative shrink-0 w-[80px]" data-name="Margin">
      <BackgroundBorder />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Immunity</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col items-center left-[16px] top-0" data-name="Container">
      <Margin />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[25px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 25">
        <g id="Container">
          <path d={svgPaths.p17359280} fill="var(--fill-0, #A65432)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#efeeeb] content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[80px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container9 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col h-[92px] items-start pb-[12px] relative shrink-0 w-[80px]" data-name="Margin">
      <BackgroundBorder1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Energy</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col items-center left-[120px] top-0" data-name="Container">
      <Margin1 />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Container">
          <path d={svgPaths.p13d22900} fill="var(--fill-0, #A65432)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#efeeeb] content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[80px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container12 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col h-[92px] items-start pb-[12px] relative shrink-0 w-[80px]" data-name="Margin">
      <BackgroundBorder2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Skin Care</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col items-center left-[224px] top-0" data-name="Container">
      <Margin2 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[22.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 20">
        <g id="Container">
          <path d={svgPaths.p3ebd4600} fill="var(--fill-0, #A65432)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#efeeeb] content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[80px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container15 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col h-[92px] items-start pb-[12px] relative shrink-0 w-[80px]" data-name="Margin">
      <BackgroundBorder3 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Relaxation</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col items-center left-[328px] top-0" data-name="Container">
      <Margin3 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[25px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 25">
        <g id="Container">
          <path d={svgPaths.p17c33a80} fill="var(--fill-0, #A65432)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-[#efeeeb] content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[80px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container18 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col h-[92px] items-start pb-[12px] relative shrink-0 w-[80px]" data-name="Margin">
      <BackgroundBorder4 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Digestion</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col items-center left-[432px] top-0" data-name="Container">
      <Margin4 />
      <Container19 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[124px] overflow-auto relative shrink-0 w-[390px]" data-name="Container">
      <Container5 />
      <Container8 />
      <Container11 />
      <Container14 />
      <Container17 />
    </div>
  );
}

function SectionShopByConcern() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section - Shop by Concern">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center px-[16px] relative size-full">
          <Heading1 />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334537] text-[28px] whitespace-nowrap">
        <p className="leading-[36px]">Herbal Essentials</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65432] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">View All</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Link />
    </div>
  );
}

function HerbalProduct() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px mix-blend-multiply relative" data-name="Herbal Product 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[66.6%] left-0 max-w-none top-[16.7%] w-full" src={imgHerbalProduct1} />
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="absolute bg-[#f4f1ea] content-stretch flex flex-col items-start left-[8px] px-[9px] py-[3px] rounded-[2px] top-[8px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#8da392] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8da392] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Organic</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f4f1ea] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <HerbalProduct />
          </div>
          <BackgroundBorder5 />
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1b1c1a] text-[20px] text-ellipsis tracking-[1px] w-full">
        <p className="leading-[28px]">Premium Anise</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] w-full">
        <p className="leading-[24px]">50g</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">£8.50</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p20803d40} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#8da392] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[32px]" data-name="Button">
      <Container26 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Button3 />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <Heading3 />
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function ProductCard() {
  return (
    <div className="bg-[#fbf9f6] col-1 justify-self-stretch relative rounded-[4px] row-1 self-start shrink-0" data-name="Product Card 1">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background1 />
        <Container22 />
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function HerbalProduct1() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px mix-blend-multiply relative" data-name="Herbal Product 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[66.6%] left-0 max-w-none top-[16.7%] w-full" src={imgHerbalProduct2} />
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="absolute bg-[#f4f1ea] content-stretch flex flex-col items-start left-[8px] px-[9px] py-[3px] rounded-[2px] top-[8px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#8da392] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8da392] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Best Seller</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f4f1ea] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <HerbalProduct1 />
          </div>
          <BackgroundBorder6 />
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1b1c1a] text-[20px] text-ellipsis tracking-[1px] w-full">
        <p className="leading-[28px]">Chamomile Flowers</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] w-full">
        <p className="leading-[24px]">100g</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">£12.00</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p20803d40} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#8da392] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[32px]" data-name="Button">
      <Container31 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Button4 />
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <Heading4 />
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function ProductCard1() {
  return (
    <div className="bg-[#fbf9f6] col-2 justify-self-stretch relative rounded-[4px] row-1 self-start shrink-0" data-name="Product Card 2">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background2 />
        <Container27 />
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function HerbalProduct2() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px mix-blend-multiply relative" data-name="Herbal Product 3">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgHerbalProduct3} />
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="aspect-square bg-[#f4f1ea] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <HerbalProduct2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1b1c1a] text-[20px] text-ellipsis tracking-[1px] w-full">
        <p className="leading-[28px]">Hibiscus Petals</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] w-full">
        <p className="leading-[24px]">75g</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">£9.50</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p20803d40} fill="var(--fill-0, #A65432)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#a65432] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container36 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Button5 />
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <Heading5 />
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function ProductCard2() {
  return (
    <div className="bg-[#fbf9f6] col-1 justify-self-stretch relative rounded-[4px] row-2 self-start shrink-0" data-name="Product Card 3">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background3 />
        <Container32 />
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function HerbalProduct3() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px mix-blend-multiply relative" data-name="Herbal Product 4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgHerbalProduct4} />
      </div>
    </div>
  );
}

function BackgroundBorder7() {
  return (
    <div className="absolute bg-[#f4f1ea] content-stretch flex flex-col items-start left-[8px] px-[9px] py-[3px] rounded-[2px] top-[8px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#8da392] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8da392] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">New</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f4f1ea] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <HerbalProduct3 />
          </div>
          <BackgroundBorder7 />
        </div>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1b1c1a] text-[20px] text-ellipsis tracking-[1px] w-full">
        <p className="leading-[28px]">Spicy Vegetarian Mix</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] w-full">
        <p className="leading-[24px]">150g</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">£14.25</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p20803d40} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#8da392] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[32px]" data-name="Button">
      <Container41 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Button6 />
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <Heading6 />
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function ProductCard3() {
  return (
    <div className="bg-[#fbf9f6] col-2 justify-self-stretch relative rounded-[4px] row-2 self-start shrink-0" data-name="Product Card 4">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background4 />
        <Container37 />
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__303px_303px] relative shrink-0 w-full" data-name="Container">
      <ProductCard />
      <ProductCard1 />
      <ProductCard2 />
      <ProductCard3 />
    </div>
  );
}

function SectionHerbalEssentials() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section - Herbal Essentials">
      <div className="content-stretch flex flex-col gap-[24px] items-start px-[16px] relative size-full">
        <Container20 />
        <Container21 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[24px] relative shrink-0 w-[33px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 24">
        <g id="Container">
          <path d={svgPaths.p3a77680} fill="var(--fill-0, #A65432)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin5() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] relative size-full">
        <Container42 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[20px] text-center tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">Free Delivery</p>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="relative shrink-0" data-name="Heading 3:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative size-full">
        <Heading7 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[24px]">On all orders over £50</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder8() {
  return (
    <div className="bg-[#ffdbce] col-1 justify-self-stretch relative rounded-[8px] row-2 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[33px] relative size-full">
          <Margin5 />
          <Heading3Margin />
          <Container43 />
        </div>
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#c0d5c2] text-[28px] w-full">
        <p className="leading-[36px]">Our Heritage</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c0d5c2] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Rooted in centuries of Egyptian herbal</p>
        <p className="leading-[24px] mb-0">traditions, bringing you the purest</p>
        <p className="leading-[24px]">elements of nature.</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading8 />
        <Container45 />
      </div>
    </div>
  );
}

function BackgroundBorder9() {
  return (
    <div className="bg-[#efeeeb] col-1 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Background+Border">
      <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end p-[33px] relative size-full">
          <div className="absolute bg-gradient-to-t from-[rgba(74,93,78,0.8)] inset-px to-[rgba(74,93,78,0)]" data-name="Gradient" />
          <Container44 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function SectionBentoGridFeature() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[__182px_182px] relative shrink-0 w-[358px]" data-name="Section - Bento Grid Feature">
      <BackgroundBorder8 />
      <BackgroundBorder9 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Main Content">
      <HeroSection />
      <SectionShopByConcern />
      <SectionHerbalEssentials />
      <SectionBentoGridFeature />
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p1820480} fill="var(--fill-0, #C0D5C2)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#4a5d4e] content-stretch flex flex-col items-center justify-center px-[16px] py-[4px] relative rounded-[12px]" data-name="Background">
      <Container46 />
    </div>
  );
}

function BackgroundCssTransform() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[1.4px] pr-[1.41px] relative shrink-0 w-[56.02px]" data-name="Background:css-transform">
      <div className="flex h-[24.7px] items-center justify-center relative shrink-0 w-[45.6px]">
        <div className="flex-none scale-x-95 scale-y-95">
          <Background5 />
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Home</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container47 />
    </div>
  );
}

function Button7() {
  return (
    <div className="opacity-80 relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[0.8px] items-center justify-center pb-[8px] pt-[8.8px] px-[8px] relative size-full">
        <BackgroundCssTransform />
        <Margin6 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <g id="Container">
          <path d={svgPaths.p23f03200} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Shop</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container49 />
    </div>
  );
}

function Button8() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container48 />
        <Margin7 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Search</p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container51 />
    </div>
  );
}

function Button9() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container50 />
        <Margin8 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.982px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9815 20">
        <g id="Container">
          <path d={svgPaths.pb5c2400} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Cart</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container53 />
    </div>
  );
}

function Background6() {
  return (
    <div className="absolute bg-[#a65432] content-stretch flex items-center justify-center right-[4px] rounded-[12px] size-[16px] top-[4px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">2</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container52 />
        <Margin9 />
        <Background6 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Profile</p>
      </div>
    </div>
  );
}

function Margin10() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container55 />
    </div>
  );
}

function Button11() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container54 />
        <Margin10 />
      </div>
    </div>
  );
}

function BottomNavBar() {
  return (
    <div className="absolute bg-[#fbf9f6] bottom-[891.38px] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[14.7px] items-center left-0 pb-[8px] pl-[23.33px] pr-[23.32px] pt-[9px] rounded-tl-[12px] rounded-tr-[12px] w-[390px]" data-name="BottomNavBar">
      <div aria-hidden className="absolute border-[#c3c8c1] border-solid border-t inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]" />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
    </div>
  );
}

function HajArafaHome() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[153px] pb-[96px] top-[329px] w-[390px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(251, 249, 246) 0%, rgb(251, 249, 246) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Haj Arafa Home">
      <HeaderTopAppBar />
      <MainContent />
      <BottomNavBar />
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334537] text-[28px] text-center whitespace-nowrap">
        <p className="leading-[36px]">{`Spices & Herbs`}</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Discover pure, natural herbs and aromatic spices.</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading9 />
      <Container57 />
    </div>
  );
}

function Container58() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#737872] text-[16px] w-full">
          <p className="leading-[normal]">Search for product or health benefit...</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f5f3f1] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[49px] pr-[17px] py-[17px] relative size-full">
          <Container58 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute bottom-[26%] content-stretch flex flex-col items-start left-[16px] top-[26%]" data-name="Container">
      <div className="relative shrink-0 size-[18px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #737872)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-name="Search Bar">
      <Input />
      <Container59 />
    </div>
  );
}

function Button12() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#334537] content-stretch flex flex-col items-center justify-center left-0 px-[17px] py-[9px] rounded-[12px] top-1/2" data-name="Button">
      <div aria-hidden className="absolute border border-[#334537] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">All</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f4f1ea] content-stretch flex flex-col items-center justify-center left-[62.47px] px-[17px] py-[9px] rounded-[12px] top-1/2" data-name="Button">
      <div aria-hidden className="absolute border border-[#8da392] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Immunity</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f4f1ea] content-stretch flex flex-col items-center justify-center left-[167.67px] px-[17px] py-[9px] rounded-[12px] top-1/2" data-name="Button">
      <div aria-hidden className="absolute border border-[#8da392] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Inflammation</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f4f1ea] content-stretch flex flex-col items-center justify-center left-[298.91px] px-[17px] py-[9px] rounded-[12px] top-1/2" data-name="Button">
      <div aria-hidden className="absolute border border-[#8da392] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Pure Herbs</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f4f1ea] content-stretch flex flex-col items-center justify-center left-[416.58px] px-[17px] py-[9px] rounded-[12px] top-1/2" data-name="Button">
      <div aria-hidden className="absolute border border-[#8da392] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[12px] text-center tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Mixes</p>
      </div>
    </div>
  );
}

function FilterChips() {
  return (
    <div className="h-[50px] max-w-[768px] overflow-auto relative shrink-0 w-full" data-name="Filter Chips">
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
    </div>
  );
}

function SectionPageHeaderSearch() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - Page Header & Search">
      <Container56 />
      <SearchBar />
      <FilterChips />
    </div>
  );
}

function ProductImage() {
  return (
    <div className="h-[137px] mix-blend-multiply relative shrink-0 w-full" data-name="Product Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgProductImage} />
      </div>
    </div>
  );
}

function BackgroundBorder10() {
  return (
    <div className="absolute h-[21.328px] left-[8px] top-[8px] w-[21.33px]" data-name="Background+Border">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3303 21.3282">
        <g id="Background+Border">
          <rect fill="var(--fill-0, #EFEEEB)" height="20.3282" rx="10.1641" width="20.3303" x="0.5" y="0.5" />
          <rect height="20.3282" rx="10.1641" stroke="var(--stroke-0, #8DA392)" width="20.3303" x="0.5" y="0.5" />
          <path d={svgPaths.p2c5aa980} fill="var(--fill-0, #334537)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f5f3f1] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <ProductImage />
          <BackgroundBorder10 />
        </div>
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[20px] tracking-[1px] w-full">
        <p className="leading-[28px] mb-0">Premium</p>
        <p className="leading-[28px]">Cinnamon</p>
      </div>
    </div>
  );
}

function Heading3Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading10 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[14px] w-full">
        <p className="leading-[20px]">100g</p>
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container61 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65432] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">145 LE</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonQuickAdd() {
  return (
    <div className="bg-[#334537] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[40px]" data-name="Button - Quick Add">
      <Container64 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container63 />
      <ButtonQuickAdd />
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
        <Heading3Margin1 />
        <Margin11 />
        <Container62 />
      </div>
    </div>
  );
}

function ArticleProductCard() {
  return (
    <div className="bg-[#fbf9f6] col-1 justify-self-stretch relative rounded-[4px] row-1 self-start shrink-0" data-name="Article - Product Card 1">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background7 />
        <Container60 />
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function ProductImage1() {
  return (
    <div className="h-[137px] mix-blend-multiply relative shrink-0 w-full" data-name="Product Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[66.6%] left-0 max-w-none top-[16.7%] w-full" src={imgHerbalProduct2} />
      </div>
    </div>
  );
}

function BackgroundBorder11() {
  return (
    <div className="absolute h-[23.333px] left-[8px] top-[8px] w-[20.667px]" data-name="Background+Border">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6667 23.3333">
        <g id="Background+Border">
          <rect fill="var(--fill-0, #EFEEEB)" height="22.3333" rx="9.83333" width="19.6667" x="0.5" y="0.5" />
          <rect height="22.3333" rx="9.83333" stroke="var(--stroke-0, #8DA392)" width="19.6667" x="0.5" y="0.5" />
          <path d={svgPaths.p32deac80} fill="var(--fill-0, #984623)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f5f3f1] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <ProductImage1 />
          <BackgroundBorder11 />
        </div>
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[20px] tracking-[1px] w-full">
        <p className="leading-[28px] mb-0">Organic</p>
        <p className="leading-[28px]">Turmeric</p>
      </div>
    </div>
  );
}

function Heading3Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading11 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[14px] w-full">
        <p className="leading-[20px]">100g</p>
      </div>
    </div>
  );
}

function Margin12() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container66 />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65432] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">95 LE</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonQuickAdd1() {
  return (
    <div className="bg-[#334537] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[40px]" data-name="Button - Quick Add">
      <Container69 />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <ButtonQuickAdd1 />
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
        <Heading3Margin2 />
        <Margin12 />
        <Container67 />
      </div>
    </div>
  );
}

function ArticleProductCard1() {
  return (
    <div className="bg-[#fbf9f6] col-2 justify-self-stretch relative rounded-[4px] row-1 self-start shrink-0" data-name="Article - Product Card 2">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background8 />
        <Container65 />
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function ProductImage2() {
  return (
    <div className="h-[137px] mix-blend-multiply relative shrink-0 w-full" data-name="Product Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgHerbalProduct3} />
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f5f3f1] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <ProductImage2 />
        </div>
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[20px] tracking-[1px] w-full">
        <p className="leading-[28px] mb-0">Dried Ginger</p>
        <p className="leading-[28px]">Root</p>
      </div>
    </div>
  );
}

function Heading3Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading12 />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[14px] w-full">
        <p className="leading-[20px]">100g</p>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container71 />
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65432] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">120 LE</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonQuickAdd2() {
  return (
    <div className="bg-[#334537] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[40px]" data-name="Button - Quick Add">
      <Container74 />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container73 />
      <ButtonQuickAdd2 />
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
        <Heading3Margin3 />
        <Margin13 />
        <Container72 />
      </div>
    </div>
  );
}

function ArticleProductCard2() {
  return (
    <div className="bg-[#fbf9f6] col-1 justify-self-stretch relative rounded-[4px] row-2 self-start shrink-0" data-name="Article - Product Card 3">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background9 />
        <Container70 />
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function ProductImage3() {
  return (
    <div className="h-[137px] mix-blend-multiply relative shrink-0 w-full" data-name="Product Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgHerbalProduct4} />
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f5f3f1] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <ProductImage3 />
        </div>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[20px] tracking-[1px] w-full">
        <p className="leading-[28px] mb-0">Mixed Spices</p>
        <p className="leading-[28px]">Blend</p>
      </div>
    </div>
  );
}

function Heading3Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading13 />
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[14px] w-full">
        <p className="leading-[20px]">100g</p>
      </div>
    </div>
  );
}

function Margin14() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container76 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65432] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">85 LE</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonQuickAdd3() {
  return (
    <div className="bg-[#334537] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[40px]" data-name="Button - Quick Add">
      <Container79 />
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container78 />
      <ButtonQuickAdd3 />
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
        <Heading3Margin4 />
        <Margin14 />
        <Container77 />
      </div>
    </div>
  );
}

function ArticleProductCard3() {
  return (
    <div className="bg-[#fbf9f6] col-2 justify-self-stretch relative rounded-[4px] row-2 self-start shrink-0" data-name="Article - Product Card 4">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background10 />
        <Container75 />
      </div>
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function SectionProductGrid() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__339px_339px] pb-[32px] relative shrink-0 w-full" data-name="Section - Product Grid">
      <ArticleProductCard />
      <ArticleProductCard1 />
      <ArticleProductCard2 />
      <ArticleProductCard3 />
    </div>
  );
}

function MainContentCanvas() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Main Content Canvas">
      <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] pt-[96px] px-[16px] relative size-full">
        <SectionPageHeaderSearch />
        <SectionProductGrid />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[12px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
        <g id="Container">
          <path d={svgPaths.p2bce57c0} fill="var(--fill-0, #334537)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative rounded-[12px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[8px] relative size-full">
        <Container80 />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="relative shrink-0" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334537] text-[28px] tracking-[-0.7px] whitespace-nowrap">
          <p className="leading-[36px]">Haj Arafa</p>
        </div>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #334537)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative rounded-[12px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[8px] relative size-full">
        <Container81 />
      </div>
    </div>
  );
}

function HeaderTopAppBar1() {
  return (
    <div className="absolute bg-[#fbf9f6] content-stretch flex h-[64px] items-center justify-between left-0 pb-px px-[16px] top-0 w-[390px]" data-name="Header - TopAppBar">
      <div aria-hidden className="absolute border-[#c3c8c1] border-b border-solid inset-0 pointer-events-none" />
      <Button17 />
      <Heading14 />
      <Button18 />
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p1820480} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin15() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Home</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container82 />
        <Margin15 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[20px] mb-[-0.211px] relative shrink-0 w-[19px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <g id="Container">
          <path d={svgPaths.p2aabef00} fill="var(--fill-0, #C0D5C2)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin16() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c0d5c2] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Shop</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[#4a5d4e] content-stretch flex flex-col items-center justify-center opacity-80 px-[16px] py-[4px] relative rounded-[12px]" data-name="Link">
      <Container83 />
      <Margin16 />
    </div>
  );
}

function LinkCssTransform() {
  return (
    <div className="h-[61px] relative shrink-0" data-name="Link:css-transform">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center pb-[5.3px] pl-[1.66px] pr-[1.67px] pt-[6.3px] relative size-full">
        <div className="flex h-[45.4px] items-center justify-center relative shrink-0 w-[61.65px]">
          <div className="flex-none scale-x-95 scale-y-95">
            <Link2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin17() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Search</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container84 />
        <Margin17 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.982px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9815 20">
        <g id="Container">
          <path d={svgPaths.p3f423340} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin18() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Cart</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container85 />
        <Margin18 />
        <div className="absolute bg-[#a65432] right-[4px] rounded-[12px] size-[8px] top-[4px]" data-name="Background" />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p301d5280} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin19() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Profile</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container86 />
        <Margin19 />
      </div>
    </div>
  );
}

function BottomNavBar1() {
  return (
    <div className="absolute bg-[#fbf9f6] bottom-0 content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[15.2px] items-center left-0 pl-[23.63px] pr-[23.62px] py-[8px] rounded-tl-[12px] rounded-tr-[12px] w-[390px]" data-name="BottomNavBar">
      <div aria-hidden className="absolute border-[#c3c8c1] border-solid border-t inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]" />
      <Link1 />
      <LinkCssTransform />
      <Link3 />
      <Link4 />
      <Link5 />
    </div>
  );
}

function ShopSpicesHerbs() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[575px] pb-[96px] top-[329px] w-[390px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 241, 234) 0%, rgb(244, 241, 234) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Shop Spices & Herbs">
      <MainContentCanvas />
      <HeaderTopAppBar1 />
      <BottomNavBar1 />
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65432] text-[20px] tracking-[1px] w-full">
        <p className="leading-[25px] mb-0">EGP</p>
        <p className="leading-[25px]">450.00</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] w-full">
        <p className="leading-[16px]">500g</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container88 />
        <Container89 />
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[1.5px] relative shrink-0 w-[10.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 1.5">
        <g id="Container">
          <path d="M0 1.5V0H10.5V1.5H0V1.5" fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonDecreaseQuantity() {
  return (
    <div className="relative shrink-0" data-name="Button - Decrease quantity">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container90 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="min-w-[17.600000381469727px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center min-w-[inherit] px-[8px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[24px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Container">
          <path d={svgPaths.p38ac19c0} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIncreaseQuantity() {
  return (
    <div className="relative shrink-0" data-name="Button - Increase quantity">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container92 />
      </div>
    </div>
  );
}

function BackgroundBorder12() {
  return (
    <div className="bg-[#fbf9f6] content-stretch flex items-center p-px relative rounded-[2px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <ButtonDecreaseQuantity />
      <Container91 />
      <ButtonIncreaseQuantity />
    </div>
  );
}

function Margin20() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[8px] relative size-full">
        <BackgroundBorder12 />
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-[#8da392] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[1.2px] whitespace-nowrap">
          <p className="leading-[16px]">ADD TO CART</p>
        </div>
      </div>
    </div>
  );
}

function MobileStickyAddToCartBar() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch drop-shadow-[0px_-4px_5px_rgba(0,0,0,0.05)] flex gap-[16px] items-center left-0 pb-[16px] pt-[17px] px-[16px] w-[390px] z-[3]" data-name="Mobile Sticky Add to Cart Bar">
      <div aria-hidden className="absolute border-[#c3c8c1] border-solid border-t inset-0 pointer-events-none" />
      <Container87 />
      <Margin20 />
      <Button19 />
    </div>
  );
}

function Container93() {
  return (
    <div className="h-[12px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
        <g id="Container">
          <path d={svgPaths.p2bce57c0} fill="var(--fill-0, #334537)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonMenu() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[-8px] p-[8px] rounded-[12px] top-0" data-name="Button - Menu">
      <Container93 />
    </div>
  );
}

function ButtonMenuMargin() {
  return (
    <div className="h-[40px] relative shrink-0 w-[32.02px]" data-name="Button - Menu:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ButtonMenu />
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334537] text-[28px] tracking-[-0.7px] whitespace-nowrap">
          <p className="leading-[36px]">Haj Arafa</p>
        </div>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #334537)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonNotifications() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[12px] shrink-0" data-name="Button - Notifications">
      <Container95 />
    </div>
  );
}

function ButtonNotificationsMargin() {
  return (
    <div className="relative shrink-0 w-[32.02px]" data-name="Button - Notifications:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ButtonNotifications />
      </div>
    </div>
  );
}

function HeaderTopAppBar2() {
  return (
    <div className="bg-[#fbf9f6] h-[64px] relative shrink-0 w-full z-[2]" data-name="Header - TopAppBar">
      <div aria-hidden className="absolute border-[#c3c8c1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <ButtonMenuMargin />
          <Container94 />
          <ButtonNotificationsMargin />
        </div>
      </div>
    </div>
  );
}

function PremiumRawAlmonds() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Premium Raw Almonds">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-27%] max-w-none top-0 w-[154%]" src={imgPremiumRawAlmonds} />
      </div>
    </div>
  );
}

function OverlayBorderShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(244,241,234,0.9)] relative rounded-[2px] self-stretch shrink-0" data-name="Overlay+Border+Shadow+OverlayBlur">
      <div aria-hidden className="absolute border border-[rgba(141,163,146,0.3)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start px-[13px] py-[5px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8da392] text-[12px] tracking-[1.2px] whitespace-nowrap">
          <p className="leading-[16px]">100% ORGANIC</p>
        </div>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex h-[26px] items-start left-[16px]" data-name="Container">
      <OverlayBorderShadowOverlayBlur />
    </div>
  );
}

function MobileMainImageDesktopHandledInGallerySectionBelow() {
  return (
    <div className="bg-[#efeeeb] content-stretch flex flex-col h-[400px] items-start justify-center relative shrink-0 w-full z-[2]" data-name="Mobile Main Image (Desktop handled in gallery section below)">
      <PremiumRawAlmonds />
      <Container97 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334537] text-[48px] tracking-[-0.96px] w-full">
        <p className="leading-[56px] mb-0">Premium Raw</p>
        <p className="leading-[56px]">Almonds</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65432] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">EGP 450.00</p>
      </div>
    </div>
  );
}

function Margin21() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">/ 500g</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Container">
      <Container100 />
      <Margin21 />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[572.0009765625px] pt-[8px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Harvested from ancient groves, these raw,</p>
        <p className="leading-[24px] mb-0">unpasteurized almonds offer unparalleled purity.</p>
        <p className="leading-[24px] mb-0">Rich in natural oils, they provide a satisfying</p>
        <p className="leading-[24px] mb-0">crunch and a subtly sweet, earthy flavor profile</p>
        <p className="leading-[24px]">indicative of their meticulous cultivation.</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading15 />
      <Container99 />
      <Container101 />
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137 21">
        <g id="Container">
          <path d={svgPaths.p13774060} fill="var(--fill-0, #8DA392)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <Container102 />
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] w-full">
          <p className="leading-[16px]">CERTIFICATION</p>
        </div>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[16px] w-full">
          <p className="leading-[24px] mb-0">Pharmacopeia</p>
          <p className="leading-[24px]">Grade Purity</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder13() {
  return (
    <div className="bg-[#f5f3f1] col-1 justify-self-stretch relative rounded-[4px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(195,200,193,0.5)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative size-full">
        <Margin22 />
        <Container103 />
        <Container104 />
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137 20">
        <g id="Container">
          <path d={svgPaths.p1869180} fill="var(--fill-0, #A65432)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <Container105 />
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] w-full">
          <p className="leading-[16px]">ORIGIN</p>
        </div>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[16px] w-full">
          <p className="leading-[24px] mb-0">Upper Egypt</p>
          <p className="leading-[24px]">Cultivation</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder14() {
  return (
    <div className="bg-[#f5f3f1] col-2 justify-self-stretch relative rounded-[4px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(195,200,193,0.5)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative size-full">
        <Margin23 />
        <Container106 />
        <Container107 />
      </div>
    </div>
  );
}

function Margin24() {
  return (
    <div className="h-[22.35px] relative shrink-0 w-[20px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22.35">
        <g id="Margin">
          <path d={svgPaths.p9680bd7} fill="var(--fill-0, #8DA392)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">THERAPEUTIC BENEFITS</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#334537] text-[16px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">Cardiovascular Support • High Vitamin</p>
        <p className="leading-[24px]">E Content • Antioxidant Rich</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="relative shrink-0 w-[272.42px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container109 />
        <Container110 />
      </div>
    </div>
  );
}

function BackgroundBorder15() {
  return (
    <div className="bg-[#f5f3f1] col-[1/span_2] h-[102px] justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(195,200,193,0.5)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex gap-[16px] items-start p-[17px] relative size-full">
        <Margin24 />
        <Container108 />
      </div>
    </div>
  );
}

function PharmacopeiaStyleDetailsBentoGridApproach() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__142px_102px] relative shrink-0 w-full" data-name="Pharmacopeia-style Details (Bento Grid approach)">
      <BackgroundBorder13 />
      <BackgroundBorder14 />
      <BackgroundBorder15 />
    </div>
  );
}

function ProductInfoColumn() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Product Info Column">
      <div className="content-stretch flex flex-col gap-[32px] items-start pb-[56px] pt-[24px] px-[16px] relative size-full">
        <Container98 />
        <PharmacopeiaStyleDetailsBentoGridApproach />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Container">
      <MobileMainImageDesktopHandledInGallerySectionBelow />
      <ProductInfoColumn />
    </div>
  );
}

function Heading16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334537] text-[28px] w-full">
        <p className="leading-[36px]">Botanical Study</p>
      </div>
    </div>
  );
}

function DetailedViewOfAlmondSurface() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Detailed view of almond surface">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-25.07%] max-w-none top-0 w-[150.15%]" src={imgHerbalProduct2} />
      </div>
    </div>
  );
}

function BackgroundBorder16() {
  return (
    <div className="absolute bg-[#efeeeb] left-0 rounded-[4px] size-[280px] top-0" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <DetailedViewOfAlmondSurface />
      </div>
      <div aria-hidden className="absolute border border-[rgba(195,200,193,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function AlmondsArrangedOrganically() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Almonds arranged organically">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-25.07%] max-w-none top-0 w-[150.15%]" src={imgAlmondsArrangedOrganically} />
      </div>
    </div>
  );
}

function BackgroundBorder17() {
  return (
    <div className="absolute bg-[#efeeeb] left-[296px] rounded-[4px] size-[280px] top-0" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <AlmondsArrangedOrganically />
      </div>
      <div aria-hidden className="absolute border border-[rgba(195,200,193,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[304px] overflow-auto relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder16 />
      <BackgroundBorder17 />
    </div>
  );
}

function MobileGalleryScroll() {
  return (
    <div className="relative shrink-0 w-full" data-name="Mobile Gallery Scroll">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[32px] pl-[16px] relative size-full">
        <Heading16 />
        <Container111 />
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="h-[21px] relative shrink-0 w-[50px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 21">
        <g id="Background">
          <rect fill="#FBF9F6" height="21" width="50" />
          <path d={svgPaths.p30edd680} fill="var(--fill-0, #C3C8C1)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Divider() {
  return (
    <div className="bg-[rgba(195,200,193,0.4)] content-stretch flex h-px items-center justify-center relative shrink-0 w-full" data-name="Divider">
      <Background11 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334537] text-[28px] w-full">
        <p className="leading-[36px] mb-0">Complementary</p>
        <p className="leading-[36px]">Remedies</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Patrons focused on immunity and holistic health</p>
        <p className="leading-[24px]">also selected these botanical companions.</p>
      </div>
    </div>
  );
}

function RawWalnutsProduct() {
  return (
    <div className="h-[145px] mix-blend-multiply opacity-80 relative shrink-0 w-full" data-name="Raw Walnuts product">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-25.07%] max-w-none top-0 w-[150.15%]" src={imgPremiumRawAlmonds} />
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#efeeeb] relative rounded-[2px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <RawWalnutsProduct />
      </div>
    </div>
  );
}

function Heading18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[8px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#334537] text-[20px] text-ellipsis tracking-[1px] w-full">
          <p className="leading-[28px]">Raw English Walnuts</p>
        </div>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65432] text-[16px] w-full">
          <p className="leading-[24px]">EGP 520.00</p>
        </div>
      </div>
    </div>
  );
}

function LinkRelatedItem() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[4px] row-1 self-start shrink-0" data-name="Link - Related Item 1">
      <div aria-hidden className="absolute border border-[rgba(195,200,193,0.4)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[13px] relative size-full">
        <Background12 />
        <Heading18 />
        <Container114 />
      </div>
    </div>
  );
}

function PumpkinSeedsProduct() {
  return (
    <div className="h-[145px] mix-blend-multiply opacity-80 relative shrink-0 w-full" data-name="Pumpkin Seeds product">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-25.07%] max-w-none top-0 w-[150.15%]" src={imgHerbalProduct2} />
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#efeeeb] relative rounded-[2px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <PumpkinSeedsProduct />
      </div>
    </div>
  );
}

function Heading19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[8px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#334537] text-[20px] text-ellipsis tracking-[1px] w-full">
          <p className="leading-[28px]">Heirloom Pumpkin Seeds</p>
        </div>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65432] text-[16px] w-full">
          <p className="leading-[24px]">EGP 280.00</p>
        </div>
      </div>
    </div>
  );
}

function LinkRelatedItem1() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[4px] row-1 self-start shrink-0" data-name="Link - Related Item 2">
      <div aria-hidden className="absolute border border-[rgba(195,200,193,0.4)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[13px] relative size-full">
        <Background13 />
        <Heading19 />
        <Container115 />
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_239px] pt-[8px] relative shrink-0 w-full" data-name="Container">
      <LinkRelatedItem />
      <LinkRelatedItem1 />
    </div>
  );
}

function SectionRelatedProductsGlassmorphismInspiredSimpleCards() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section - Related Products (Glassmorphism inspired simple cards)">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[32px] px-[16px] relative size-full">
        <Heading17 />
        <Container112 />
        <Container113 />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[1280px] relative shrink-0 w-full z-[1]" data-name="Main">
      <Container96 />
      <MobileGalleryScroll />
      <Divider />
      <SectionRelatedProductsGlassmorphismInspiredSimpleCards />
    </div>
  );
}

function PremiumAlmondsDetails() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col isolate items-start left-[997px] pb-[132px] top-[329px] w-[390px]" data-name="Premium Almonds Details">
      <MobileStickyAddToCartBar />
      <HeaderTopAppBar2 />
      <Main />
    </div>
  );
}

function Heading20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1b1c1a] text-[28px] w-full">
        <p className="leading-[36px]">Delivery Options</p>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="image">
          <path d={svgPaths.p3b2c3a40} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#334537] relative rounded-[20px] shrink-0 size-[22px]" data-name="Input">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Image />
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center left-[-1px] top-0" data-name="Container">
      <Input1 />
    </div>
  );
}

function Margin25() {
  return (
    <div className="h-[24px] relative shrink-0 w-[36px]" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container116 />
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[18px] w-full">
        <p className="leading-[28px]">Standard Shipping</p>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="h-[10.667px] relative shrink-0 w-[14.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 10.6667">
        <g id="Container">
          <path d={svgPaths.p3e6ef100} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container121 />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">5-7 business days</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col gap-[3.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container119 />
      <Container120 />
    </div>
  );
}

function Container122() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[20px] tracking-[1px] w-full">
        <p className="leading-[28px]">Free</p>
      </div>
    </div>
  );
}

function Margin26() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container122 />
    </div>
  );
}

function Container117() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container118 />
        <Margin26 />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="bg-[#fbf9f6] relative rounded-[2px] shrink-0 w-full" data-name="Label">
      <div aria-hidden className="absolute border border-[#334537] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="content-stretch flex items-start p-[17px] relative size-full">
        <Margin25 />
        <Container117 />
      </div>
    </div>
  );
}

function SectionDeliveryOptions() {
  return (
    <div className="bg-[#fbf9f6] relative shrink-0 w-full" data-name="Section - Delivery Options">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[16px] relative size-full">
        <Heading20 />
        <Label />
      </div>
    </div>
  );
}

function Heading21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1b1c1a] text-[28px] whitespace-nowrap">
        <p className="leading-[36px]">Payment</p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
          <path d={svgPaths.p2bdb86e0} fill="var(--fill-0, #506354)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
          <path d={svgPaths.p6f38c00} fill="var(--fill-0, #506354)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex gap-[7.99px] h-[20px] items-start opacity-50 relative shrink-0" data-name="Container">
      <Container125 />
      <Container126 />
    </div>
  );
}

function Container123() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading21 />
      <Container124 />
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#fbf9f6] relative rounded-[20px] shrink-0 size-[20px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
    </div>
  );
}

function Margin27() {
  return (
    <div className="h-[24px] relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[16px] relative size-full">
        <Container128 />
      </div>
    </div>
  );
}

function Margin28() {
  return (
    <div className="h-[16px] relative shrink-0 w-[32px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 16">
        <g id="Margin">
          <path d={svgPaths.p25774b00} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container129() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[18px] whitespace-nowrap">
          <p className="leading-[28px]">Debit / Credit Card</p>
        </div>
      </div>
    </div>
  );
}

function LabelCreditDebitCardInactive() {
  return (
    <div className="relative rounded-[2px] shrink-0 w-full" data-name="Label - Credit/Debit Card (Inactive)">
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[17px] relative size-full">
          <Margin27 />
          <Margin28 />
          <Container129 />
        </div>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#fbf9f6] relative rounded-[20px] shrink-0 size-[20px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
    </div>
  );
}

function Margin29() {
  return (
    <div className="h-[24px] relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[16px] relative size-full">
        <Container130 />
      </div>
    </div>
  );
}

function Margin30() {
  return (
    <div className="h-[16px] relative shrink-0 w-[34px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 16">
        <g id="Margin">
          <path d={svgPaths.p26835240} fill="var(--fill-0, #434843)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container131() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[18px] whitespace-nowrap">
          <p className="leading-[28px]">Cash on Delivery</p>
        </div>
      </div>
    </div>
  );
}

function LabelCashOnDeliveryInactive() {
  return (
    <div className="relative rounded-[2px] shrink-0 w-full" data-name="Label - Cash on Delivery (Inactive)">
      <div aria-hidden className="absolute border border-[#c3c8c1] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[17px] relative size-full">
          <Margin29 />
          <Margin30 />
          <Container131 />
        </div>
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="image">
          <path d={svgPaths.p3b2c3a40} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#334537] relative rounded-[20px] shrink-0 size-[22px]" data-name="Input">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Image1 />
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Container132() {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center left-[-1px] top-0" data-name="Container">
      <Input2 />
    </div>
  );
}

function Margin31() {
  return (
    <div className="h-[24px] relative shrink-0 w-[36px]" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container132 />
      </div>
    </div>
  );
}

function Margin32() {
  return (
    <div className="h-[22px] relative shrink-0 w-[27px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 22">
        <g id="Margin">
          <path d={svgPaths.p27edfd60} fill="var(--fill-0, #334537)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container133() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[18px] whitespace-nowrap">
          <p className="leading-[28px]">Vodafone Cash</p>
        </div>
      </div>
    </div>
  );
}

function LabelHeader() {
  return (
    <div className="bg-[#f5f3f1] relative shrink-0 w-full" data-name="Label - Header">
      <div aria-hidden className="absolute border-[rgba(51,69,55,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[17px] pt-[16px] px-[16px] relative size-full">
          <Margin31 />
          <Margin32 />
          <Container133 />
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] w-full">
        <p className="leading-[16px]">Registered Mobile Number</p>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[18px] w-full">
          <p className="leading-[28px]">01012345678</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start justify-center overflow-clip pb-[13px] pt-[12px] relative rounded-[inherit] size-full">
        <Container135 />
      </div>
      <div aria-hidden className="absolute border-[#c3c8c1] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container134() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Input3 />
    </div>
  );
}

function Margin33() {
  return (
    <div className="h-[22px] relative shrink-0 w-[20px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
        <g id="Margin">
          <path d={svgPaths.p24277c00} fill="var(--fill-0, #A65432)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container136() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[10.37px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[14px] whitespace-nowrap">
          <p className="leading-[20px] mb-0">{`Upon clicking "Pay", you will receive a`}</p>
          <p className="leading-[20px] mb-0">USSD prompt on your phone to enter</p>
          <p>
            <span className="leading-[20px]">{`your PIN. `}</span>
            <span className="[word-break:break-word] font-['Questrial:Regular',sans-serif] leading-[20px] not-italic text-[#1b1c1a]">Please do not close this page.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder18() {
  return (
    <div className="bg-[#f4f1ea] relative rounded-[2px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#dbdad7] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="content-stretch flex gap-[12px] items-start p-[17px] relative size-full">
        <Margin33 />
        <Container136 />
      </div>
    </div>
  );
}

function ExpandedContentInputArea() {
  return (
    <div className="relative shrink-0 w-[324px]" data-name="Expanded Content → Input Area">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container134 />
        <BackgroundBorder18 />
      </div>
    </div>
  );
}

function VodafoneCashActiveState() {
  return (
    <div className="bg-[#fbf9f6] relative rounded-[2px] shrink-0 w-full" data-name="Vodafone Cash (Active State)">
      <div className="content-stretch flex flex-col gap-[16px] items-center overflow-clip pb-[17px] pt-px px-px relative rounded-[inherit] size-full">
        <LabelHeader />
        <ExpandedContentInputArea />
      </div>
      <div aria-hidden className="absolute border border-[#334537] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container127() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <LabelCreditDebitCardInactive />
      <LabelCashOnDeliveryInactive />
      <VodafoneCashActiveState />
    </div>
  );
}

function SectionPaymentMethods() {
  return (
    <div className="bg-[#fbf9f6] relative shrink-0 w-full" data-name="Section - Payment Methods">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[16px] relative size-full">
        <Container123 />
        <Container127 />
      </div>
    </div>
  );
}

function LeftColumnDeliveryPayment() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Left Column: Delivery & Payment">
      <SectionDeliveryOptions />
      <SectionPaymentMethods />
    </div>
  );
}

function Heading22() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] relative shrink-0 w-full" data-name="Heading 2">
      <div aria-hidden className="absolute border-[#dbdad7] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[20px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">Order Summary</p>
      </div>
    </div>
  );
}

function BackgroundBorder19() {
  return (
    <div className="bg-[#efeeeb] relative rounded-[2px] shrink-0 size-[80px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Image">
          <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#dbdad7] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function Heading23() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[16px] w-full">
        <p className="leading-[24px]">Organic Chamomile Flowers</p>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] w-full">
        <p className="leading-[16px]">100g Jar</p>
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading23 />
      <Container139 />
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Qty: 1</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">EGP 240.00</p>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container141 />
      <Container142 />
    </div>
  );
}

function Margin34() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container140 />
    </div>
  );
}

function Container137() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-w-px relative self-stretch" data-name="Container">
      <Container138 />
      <Margin34 />
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Item 1">
      <BackgroundBorder19 />
      <Container137 />
    </div>
  );
}

function BackgroundBorder20() {
  return (
    <div className="bg-[#efeeeb] relative rounded-[2px] shrink-0 size-[80px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Image">
          <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage1} />
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#dbdad7] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function Heading24() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[16px] w-full">
        <p className="leading-[24px]">Ceremonial Grade Matcha</p>
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] w-full">
        <p className="leading-[16px]">50g Tin</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading24 />
      <Container145 />
    </div>
  );
}

function Container147() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[16px]">Qty: 1</p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">EGP 450.00</p>
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container147 />
      <Container148 />
    </div>
  );
}

function Margin35() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container146 />
    </div>
  );
}

function Container143() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-w-px relative self-stretch" data-name="Container">
      <Container144 />
      <Margin35 />
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Item 2">
      <BackgroundBorder20 />
      <Container143 />
    </div>
  );
}

function Items() {
  return (
    <div className="max-h-[353px] relative shrink-0 w-full" data-name="Items">
      <div className="max-h-[inherit] overflow-auto rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start max-h-[inherit] pr-[8px] relative size-full">
          <Item />
          <Item1 />
        </div>
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Subtotal</p>
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">EGP 690.00</p>
      </div>
    </div>
  );
}

function Container149() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container150 />
        <Container151 />
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Standard Shipping</p>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434843] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Free</p>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container153 />
        <Container154 />
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1c1a] text-[20px] tracking-[1px] whitespace-nowrap">
          <p className="leading-[28px]">Total</p>
        </div>
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Libre_Caslon_Text:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1b1c1a] text-[28px] whitespace-nowrap">
          <p className="leading-[36px]">EGP 690.00</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#c3c8c1] border-dashed border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[17px] relative size-full">
        <Container155 />
        <Container156 />
      </div>
    </div>
  );
}

function Totals() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pt-[17px] relative shrink-0 w-full" data-name="Totals">
      <div aria-hidden className="absolute border-[#dbdad7] border-solid border-t inset-0 pointer-events-none" />
      <Container149 />
      <Container152 />
      <HorizontalBorder />
    </div>
  );
}

function RightColumnOrderSummaryStickyOnDesktop() {
  return (
    <div className="bg-[#fbf9f6] relative shrink-0 w-full" data-name="Right Column: Order Summary (Sticky on Desktop)">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[16px] relative size-full">
        <Heading22 />
        <Items />
        <Totals />
      </div>
    </div>
  );
}

function Main1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-0 max-w-[1280px] right-0 top-[57px]" data-name="Main">
      <LeftColumnDeliveryPayment />
      <RightColumnOrderSummaryStickyOnDesktop />
    </div>
  );
}

function Container157() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 17.5">
        <g id="Container">
          <path d={svgPaths.p2eed4060} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="bg-[#334537] relative rounded-[2px] shrink-0 w-full" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center py-[12px] relative size-full">
        <Container157 />
        <div className="[word-break:break-word] flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
          <p className="leading-[28px]">Pay EGP 690.00</p>
        </div>
      </div>
    </div>
  );
}

function MobileStickyCallToAction() {
  return (
    <div className="absolute bg-[#fbf9f6] bottom-0 content-stretch drop-shadow-[0px_-4px_10px_rgba(0,0,0,0.05)] flex flex-col items-start left-0 pb-[16px] pt-[17px] px-[16px] w-[390px]" data-name="Mobile Sticky Call to Action">
      <div aria-hidden className="absolute border-[#dbdad7] border-solid border-t inset-0 pointer-events-none" />
      <Button20 />
    </div>
  );
}

function Container158() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p300a1100} fill="var(--fill-0, #1B1C1A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonGoBack() {
  return (
    <div className="relative shrink-0" data-name="Button - Go back">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container158 />
      </div>
    </div>
  );
}

function SecureConnection() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16px]" data-name="Secure Connection">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 21">
        <g id="Secure Connection">
          <path d={svgPaths.p7a6eda0} fill="var(--fill-0, #334537)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function HeaderNavigationSuppressed() {
  return (
    <div className="absolute bg-[#fbf9f6] content-stretch flex items-center justify-between left-0 pb-[17px] pt-[16px] px-[16px] right-0 top-0" data-name="Header - NAVIGATION SUPPRESSED">
      <div aria-hidden className="absolute border-[#dbdad7] border-b border-solid inset-0 pointer-events-none" />
      <ButtonGoBack />
      <SecureConnection />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Questrial:Regular',sans-serif] justify-center leading-[0] left-[110.76px] not-italic text-[#1b1c1a] text-[20px] top-[28px] tracking-[1px] whitespace-nowrap">
        <p className="leading-[28px]">Secure Checkout</p>
      </div>
    </div>
  );
}

function CheckoutPayment() {
  return (
    <div className="absolute h-[1392px] left-[1419px] top-[329px] w-[390px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(251, 249, 246) 0%, rgb(251, 249, 246) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Checkout & Payment">
      <Main1 />
      <MobileStickyCallToAction />
      <HeaderNavigationSuppressed />
    </div>
  );
}

export default function HajArafaStitch() {
  return (
    <div className="bg-white relative size-full" data-name="Haj Arafa Stitch">
      <HajArafaHome />
      <ShopSpicesHerbs />
      <PremiumAlmondsDetails />
      <CheckoutPayment />
    </div>
  );
}