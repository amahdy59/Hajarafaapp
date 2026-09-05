import React, { useState, useEffect, useRef } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Button } from "../../components/ui/Button";
import { useAppSettings } from "../../context/AppSettingsContext";
import type { SavedAddress } from "./types";

interface LeafletMapInstance {
  setView: (center: [number, number], zoom: number) => LeafletMapInstance;
  on: (event: string, fn: (e: { latlng: { lat: number; lng: number } }) => void) => void;
  remove: () => void;
}

interface LeafletMarkerInstance {
  addTo: (map: LeafletMapInstance) => LeafletMarkerInstance;
  setLatLng: (latlng: [number, number]) => LeafletMarkerInstance;
  getLatLng: () => { lat: number; lng: number };
  on: (event: string, fn: () => void) => void;
}

interface LeafletNamespace {
  map: (element: HTMLElement) => LeafletMapInstance;
  tileLayer: (url: string, options: { attribution: string }) => { addTo: (map: LeafletMapInstance) => void };
  divIcon: (options: { html: string; className: string; iconSize: [number, number]; iconAnchor: [number, number] }) => unknown;
  marker: (coords: [number, number], options: { draggable: boolean; icon: unknown }) => LeafletMarkerInstance;
  latLng: (coords: [number, number] | { lat: number; lng: number }) => { distanceTo: (other: unknown) => number };
}

interface LeafletMapProps {
  centerCoords: { lat: number; lng: number };
  onLocationSelect: (address: string, coords: { lat: number; lng: number }) => void;
  isRTL: boolean;
}

function LeafletMap({ centerCoords, onLocationSelect, isRTL }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMapInstance | null>(null);
  const markerRef = useRef<LeafletMarkerInstance | null>(null);

  const onLocationSelectRef = useRef(onLocationSelect);
  const isRTLRef = useRef(isRTL);

  useEffect(() => {
    onLocationSelectRef.current = onLocationSelect;
  }, [onLocationSelect]);

  useEffect(() => {
    isRTLRef.current = isRTL;
  }, [isRTL]);

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = () => {
      const L = (window as unknown as { L?: LeafletNamespace }).L;
      if (!L || !mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current).setView([centerCoords.lat, centerCoords.lng], 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
      }).addTo(map);

      const svgIcon = L.divIcon({
        html: `<div class="flex flex-col items-center transform -translate-y-1/2">
                 <svg class="text-destructive fill-destructive/20 drop-shadow-md animate-bounce" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                   <circle cx="12" cy="10" r="3"></circle>
                 </svg>
                 <div class="w-2.5 h-1.5 bg-black/30 rounded-full blur-[1.5px] mt-[-4px] transform scale-x-150"></div>
               </div>`,
        className: 'custom-leaflet-pin',
        iconSize: [34, 45],
        iconAnchor: [17, 45]
      });

      const marker = L.marker([centerCoords.lat, centerCoords.lng], { draggable: true, icon: svgIcon }).addTo(map);
      markerRef.current = marker;

      const reverseGeocode = async (lat: number, lng: number) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
            headers: { "Accept-Language": isRTLRef.current ? "ar" : "en" }
          });
          const data = await res.json();
          if (data && data.display_name) {
            onLocationSelectRef.current(data.display_name, { lat, lng });
          } else {
            onLocationSelectRef.current(`${lat.toFixed(5)}, ${lng.toFixed(5)}`, { lat, lng });
          }
        } catch {
          onLocationSelectRef.current(`${lat.toFixed(5)}, ${lng.toFixed(5)}`, { lat, lng });
        }
      };

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        reverseGeocode(lat, lng);
      });

      marker.on("dragend", () => {
        const position = marker.getLatLng();
        reverseGeocode(position.lat, position.lng);
      });

      reverseGeocode(centerCoords.lat, centerCoords.lng);
    };

    if (!(window as unknown as { L?: LeafletNamespace }).L) {
      if (!document.getElementById("leaflet-js")) {
        const script = document.createElement("script");
        script.id = "leaflet-js";
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;
        script.onload = initMap;
        document.head.appendChild(script);
      }
    } else {
      initMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const L = (window as unknown as { L?: LeafletNamespace }).L;
    if (!L || !mapInstanceRef.current || !markerRef.current) return;

    const currentLatLng = markerRef.current.getLatLng();
    const dist = L.latLng(currentLatLng).distanceTo(L.latLng([centerCoords.lat, centerCoords.lng]));

    if (dist > 5) {
      mapInstanceRef.current.setView([centerCoords.lat, centerCoords.lng], 15);
      markerRef.current.setLatLng([centerCoords.lat, centerCoords.lng]);
    }
  }, [centerCoords.lat, centerCoords.lng]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border shadow-soft my-2">
      <div ref={mapRef} className="h-44 w-full z-0" />
      <div className="absolute bottom-2 inset-x-2 z-10 bg-card/90 backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-[10px] text-muted-foreground shadow-sm pointer-events-none text-center">
        {isRTL ? "📍 انقر على الخريطة أو اسحب الدبوس لتحديد موقعك" : "📍 Tap the map or drag the pin to select location"}
      </div>
    </div>
  );
}

interface AccountAddressesModalProps {
  open: boolean;
  onClose: () => void;
  addresses: SavedAddress[];
  onUpdateAddresses: (addresses: SavedAddress[]) => void;
}

export function AccountAddressesModal({ open, onClose, addresses, onUpdateAddresses }: AccountAddressesModalProps) {
  const { t, isRTL } = useAppSettings();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrType, setNewAddrType] = useState("");
  const [newAddrDetails, setNewAddrDetails] = useState("");
  const [mapSearch, setMapSearch] = useState("");
  const [isMapSearching, setIsMapSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 30.0444, lng: 31.2357 });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrType || !newAddrDetails) {
      toast.error(isRTL ? "يرجى إدخال جميع الحقول أو تحديد موقعك على الخريطة" : "Please fill in all fields or pick from Google Maps");
      return;
    }
    onUpdateAddresses([...addresses, {
      id: Date.now().toString(),
      type: newAddrType,
      details: newAddrDetails
    }]);
    setNewAddrType("");
    setNewAddrDetails("");
    setMapSearch("");
    setIsAddingAddress(false);
    toast.success(isRTL ? "تم إضافة العنوان بنجاح" : "Location added successfully");
  };

  const handleMapSearch = async () => {
    if (!mapSearch.trim()) return;
    setIsMapSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapSearch)}&limit=1`, {
        headers: {
          "Accept-Language": isRTL ? "ar" : "en",
          "User-Agent": "HajArafaApp"
        }
      });
      const data = await res.json();
      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        setMapCenter({ lat, lng });
        setNewAddrDetails(item.display_name);
        toast.success(isRTL ? "تم العثور على الموقع وتحديث الخريطة!" : "Location found on Google Maps!");
      } else {
        toast.error(isRTL ? "لم يتم العثور على الموقع" : "Location not found");
      }
    } catch {
      const suffix = isRTL ? "، القاهرة، مصر" : ", Cairo, Egypt";
      setNewAddrDetails(mapSearch + suffix);
      toast.success(isRTL ? "تم تحديد الموقع (نسخة احتياطية)" : "Location set (offline backup)");
    } finally {
      setIsMapSearching(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              setIsAddingAddress(false);
            }}
            className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-md h-full sm:h-auto bg-card border-0 sm:border border-border rounded-none sm:rounded-3xl p-5 sm:p-6 z-50 shadow-elev overflow-hidden flex flex-col max-h-screen sm:max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-foreground font-display text-base sm:text-lg">{t.savedAddresses}</h3>
              <button 
                onClick={() => {
                  onClose();
                  setIsAddingAddress(false);
                }} 
                className="text-muted-foreground hover:text-foreground p-1"
                aria-label={isRTL ? "إغلاق" : "Close"}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pe-1.5 -me-1.5 ps-1.5 -ms-1.5 space-y-4">
              <AnimatePresence mode="wait">
                {isAddingAddress ? (
                  <motion.form
                    key="add-address-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSaveAddress}
                    className="space-y-4 border border-border/80 rounded-2xl p-4 bg-background/50 mb-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase text-brand-terracotta">
                        {isRTL ? "إضافة عنوان جديد" : "Add New Location"}
                      </h4>
                      <span className="text-[10px] bg-brand-peach text-brand-terracotta px-2 py-0.5 rounded-full font-medium flex items-center gap-1 select-none">
                        📍 Google Maps Enabled
                      </span>
                    </div>

                    {/* Google Maps Visual Interactive Simulator Block */}
                    <div className="border border-border rounded-2xl overflow-hidden relative">
                      <div className="p-2 bg-card/95 backdrop-blur-md border-b border-border flex gap-2 relative z-10">
                        <input
                          type="text"
                          placeholder={isRTL ? "ابحث في خرائط جوجل..." : "Search Google Maps..."}
                          value={mapSearch}
                          onChange={e => setMapSearch(e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-background border border-border rounded-xl text-xs outline-none text-foreground placeholder:text-muted-foreground focus:border-brand-terracotta"
                          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleMapSearch())}
                        />
                        <button
                          type="button"
                          onClick={handleMapSearch}
                          disabled={isMapSearching}
                          className="px-4 py-1.5 bg-brand-terracotta text-white rounded-xl text-xs font-semibold hover:bg-brand-terracotta-dark disabled:opacity-50 transition-colors"
                        >
                          {isMapSearching ? "..." : (isRTL ? "بحث" : "Search")}
                        </button>
                      </div>

                      <LeafletMap 
                        centerCoords={mapCenter} 
                        isRTL={isRTL} 
                        onLocationSelect={(addr, coords) => {
                          setNewAddrDetails(addr);
                          setMapCenter(coords);
                        }} 
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-muted-foreground mb-1">
                        {isRTL ? "اسم وتصنيف العنوان (مثال: المنزل، العمل)" : "Label / Address Type (e.g. Home, Work)"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isRTL ? "المنزل" : "Home"}
                        value={newAddrType}
                        onChange={e => setNewAddrType(e.target.value)}
                        className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] text-muted-foreground mb-1">
                        {isRTL ? "تفاصيل العنوان الجغرافي المستلم" : "Geocoded Street Address / Location Coordinates"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isRTL ? "انقر على الخريطة للحصول على الموقع" : "Tap the map above to autofill location info"}
                        value={newAddrDetails}
                        onChange={e => setNewAddrDetails(e.target.value)}
                        className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        size="md"
                        className="flex-1 text-xs font-semibold rounded-lg"
                      >
                        {isRTL ? "حفظ العنوان" : "Save Location"}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setIsAddingAddress(false);
                          setNewAddrDetails("");
                          setNewAddrType("");
                        }}
                        variant="outline"
                        size="md"
                        className="px-4 rounded-lg text-xs"
                      >
                        {isRTL ? "إلغاء" : "Cancel"}
                      </Button>
                    </div>
                  </motion.form>
                ) : null}
              </AnimatePresence>

              <div className="space-y-3">
                {addresses.map(addr => (
                  <div key={addr.id} className="bg-background border border-border/60 rounded-xl p-3.5 flex justify-between items-start">
                    <div>
                      <span className="bg-brand-peach text-brand-terracotta text-xs px-2.5 py-0.5 rounded-full font-medium mb-1 inline-block">
                        {addr.type}
                      </span>
                      <p className="text-foreground text-sm font-medium">{addr.details}</p>
                    </div>
                    <button 
                      onClick={() => {
                        onUpdateAddresses(addresses.filter(a => a.id !== addr.id));
                        toast.success(isRTL ? "تم حذف العنوان بنجاح" : "Address deleted successfully");
                      }}
                      className="text-destructive hover:text-destructive-dark p-1"
                      aria-label={isRTL ? `حذف ${addr.type}` : `Delete ${addr.type}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {!isAddingAddress && (
                  <button 
                    onClick={() => setIsAddingAddress(true)}
                    className="w-full py-2.5 bg-brand-peach text-brand-terracotta hover:bg-brand-terracotta hover:text-white rounded-xl text-xs font-semibold uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={14} /> {isRTL ? "تحديد عنوان جديد بخرائط جوجل" : "Pin Location on Google Maps"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
