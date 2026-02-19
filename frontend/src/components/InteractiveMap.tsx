import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { LandListing } from "@/data/mockListings";
import { useUI } from "@/context/UIContext";

// Fix Leaflet marker icons - removed global mutation to avoid SSR/Hydration conflicts
const getIcon = (category: string) => createSnapIcon(category);

// CUSTOM SNAP-STYLE PULSING ICON
const createSnapIcon = (category: string) => {
  const color = category === 'GOVERNMENT' ? '#2563eb' : '#059669';
  const glowColor = category === 'GOVERNMENT' ? 'rgba(37, 99, 235, 0.4)' : 'rgba(5, 150, 105, 0.4)';
  
  return L.divIcon({
    className: 'snap-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-12 h-12 rounded-full animate-ping" style="background-color: ${glowColor}"></div>
        <div class="relative w-5 h-5 rounded-full border-4 border-white shadow-2xl transition-transform hover:scale-125" style="background-color: ${color}"></div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
};

function HeatMapLayer({ listings }: { listings: LandListing[] }) {
  const map = useMap();

  useEffect(() => {
    if (!listings || listings.length === 0) return;

    const heatData = listings
      .filter(l => l.coordinates)
      .map(l => [l.coordinates!.lat, l.coordinates!.lng, 0.5] as [number, number, number]);

    // Ensure map is still valid during effect
    if (!map) return;

    // @ts-ignore
    if (!L.heatLayer) {
      console.warn("Leaflet.heat not loaded");
      return;
    }

    // @ts-ignore
    const heat = L.heatLayer(heatData, {
      radius: 50,
      blur: 30,
      maxZoom: 17,
      gradient: {
        0.2: '#eff6ff', 
        0.4: '#3b82f6', 
        0.6: '#10b981', 
        1.0: '#f59e0b'
      }
    });

    heat.addTo(map);

    return () => {
      if (map && heat) {
        map.removeLayer(heat);
      }
    };
  }, [listings, map]);

  return null;
}

function ChangeView({ listings }: { listings: LandListing[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (listings.length > 0) {
      const coords = listings
        .filter(l => l.coordinates)
        .map(l => [l.coordinates!.lat, l.coordinates!.lng] as [number, number]);
      
      if (coords.length > 0) {
        const bounds = L.latLngBounds(coords);
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [100, 100], maxZoom: 12 });
        }
      }
    }
  }, [listings, map]);

  return null;
}

interface InteractiveMapProps {
  listings: LandListing[];
  onMarkerClick?: (listing: LandListing) => void;
  className?: string;
  isCityPage?: boolean;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  listings, 
  onMarkerClick, 
  className = "h-[500px] w-full rounded-2xl overflow-hidden",
  isCityPage = false
}) => {
  const { darkMode } = useUI();
  const defaultCenter: [number, number] = [20.5937, 78.9629];
  const zoom = isCityPage ? 12 : 5;

  // Tile URL switches based on dark mode setting
  const tileUrl = darkMode 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  useEffect(() => {
    // Fix for Leaflet default icon issues in React environments
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className={className} style={{ position: "relative", zIndex: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .snap-marker {
          background: none !important;
          border: none !important;
        }
        .snap-tooltip {
          background: var(--bg-card) !important;
          border: 1px solid var(--border-main) !important;
          border-radius: 1rem !important;
          padding: 8px 16px !important;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2) !important;
          font-family: 'Outfit', sans-serif !important;
          font-weight: 800 !important;
          color: var(--navy-trust) !important;
          font-size: 11px !important;
          transform: translateY(-20px) !important;
          transition: background-color 0.5s ease;
        }
        .snap-tooltip::before {
          display: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 2rem !important;
          padding: 0 !important;
          overflow: hidden !important;
          background: var(--bg-card) !important;
          color: var(--slate-900) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .leaflet-popup-tip-container {
          display: none !important;
        }
      `}} />
      <MapContainer 
        key={`${darkMode}-${isCityPage}-${listings.length}`} // Force remount on data group changes
        center={defaultCenter} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
        />
        
        <HeatMapLayer listings={listings} />
        
        {listings.map((listing) => {
          if (!listing.coordinates) return null;
          
          return (
            <Marker 
              key={listing.id} 
              position={[listing.coordinates.lat, listing.coordinates.lng]}
              icon={createSnapIcon(listing.category)}
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(listing),
              }}
            >
              <Tooltip 
                permanent 
                direction="top" 
                className="snap-tooltip"
                offset={[0, -10]}
              >
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${listing.category === 'GOVERNMENT' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                   <span>{listing.title}</span>
                </div>
              </Tooltip>
              
              <Popup>
                <div className="p-4 min-w-[260px]">
                  <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 shadow-inner">
                    <img src={listing.imageUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-background-card/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-navy-trust shadow-sm border border-white/50">
                      {listing.category}
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-navy-trust mb-1 tracking-tight">{listing.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    {listing.location}
                  </p>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-slate-50/10">
                    <div className="flex flex-col">
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">National Valuation</span>
                       <span className="text-xl font-black text-navy-trust tracking-tight">₹{(listing.price / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <Link 
                      href={`/discover/${listing.id}`} 
                      className="w-12 h-12 rounded-2xl bg-surface-dark text-white flex items-center justify-center shadow-xl shadow-slate-900/20 hover:bg-accent transition-all"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        <ChangeView listings={listings} />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
