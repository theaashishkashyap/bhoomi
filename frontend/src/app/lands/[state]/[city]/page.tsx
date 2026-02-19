"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Search, 
  Filter, 
  ShieldCheck, 
  ArrowRight, 
  Scale, 
  TrendingUp, 
  Building2, 
  Navigation,
  CheckCircle2,
  Globe,
  Database,
  LocateFixed,
  Layers,
  ArrowUpRight,
  Zap,
  Bookmark,
  Share2
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { LandListing } from "@/data/mockListings";

const InteractiveMap = dynamic<any>(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center rounded-[3rem]">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4 shadow-glow-blue"></div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Activating Geospatial Node Cluster...</p>
    </div>
  )
});

// Mock Data for Gorakhpur Listings
const GORAKHPUR_PLOTS = [
  {
    id: "GKP-001",
    title: "Taramandal Premium Residential Plot",
    locality: "Taramandal",
    area: 2400,
    unit: "sq ft",
    price: 6500000,
    type: "RESIDENTIAL",
    verified: true,
    roadAccess: "40ft Wide Road",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=800",
    description: "Located near the lake, fast developing area with high appreciation potential.",
    nearby: ["Gorakhpur Zoo", "Planetarium"],
    coordinates: { lat: 26.7112, lng: 83.3980 }
  },
  {
    id: "GKP-002",
    title: "GIDA Industrial Expansion Parcel",
    locality: "GIDA",
    area: 15000,
    unit: "sq ft",
    price: 32000000,
    type: "COMMERCIAL",
    verified: true,
    roadAccess: "National Highway Touch",
    imageUrl: "https://images.unsplash.com/photo-1541819661191-2090875b0ec8?auto=format&fit=crop&q=80&w=800",
    description: "Ideally suited for warehousing or light manufacturing. Excellent logisitic support.",
    nearby: ["NH-27", "Industrial Hub"],
    coordinates: { lat: 26.7126, lng: 83.2504 }
  },
  {
    id: "GKP-003",
    title: "Basharatpur Prime Corner Plot",
    locality: "Basharatpur",
    area: 1800,
    unit: "sq ft",
    price: 4500000,
    type: "RESIDENTIAL",
    verified: true,
    roadAccess: "25ft Road",
    imageUrl: "https://images.unsplash.com/photo-1524413135269-a86f784400ee?auto=format&fit=crop&q=80&w=800",
    description: "Established neighborhood, walking distance to reputable schools.",
    nearby: ["St. Paul's School", "Medical Market"],
    coordinates: { lat: 26.7725, lng: 83.3812 }
  },
  {
    id: "GKP-004",
    title: "Fertile Land Near Rapti Nagar",
    locality: "Rapti Nagar",
    area: 5200,
    unit: "sq ft",
    price: 8500000,
    type: "AGRICULTURAL",
    verified: false,
    roadAccess: "Link Road",
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800",
    description: "Near the river basin, excellent soil for organic farming or investment.",
    nearby: ["Rapti River", "Phase 4 Market"],
    coordinates: { lat: 26.7821, lng: 83.3951 }
  },
  {
    id: "GKP-005",
    title: "Medical College Road Commercial Space",
    locality: "Medical College Road",
    area: 3600,
    unit: "sq ft",
    price: 18000000,
    type: "COMMERCIAL",
    verified: true,
    roadAccess: "Main Road (60ft)",
    imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800",
    description: "High traffic zone, perfect for diagnostic centers or retail showrooms.",
    nearby: ["BRD Medical College", "Apollo Clinic"],
    coordinates: { lat: 26.7915, lng: 83.4120 }
  },
  {
    id: "GKP-006",
    title: "Golghar Central Investment Area",
    locality: "Golghar",
    area: 1200,
    unit: "sq ft",
    price: 12500000,
    type: "COMMERCIAL",
    verified: true,
    roadAccess: "Shopping District Hub",
    imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800",
    description: "Rare availability in the heart of Gorakhpur shopping district. Very high ROI.",
    nearby: ["City Mall", "Main Market"],
    coordinates: { lat: 26.7583, lng: 83.3732 }
  }
];

// Helper to adapt GORAKHPUR_PLOTS to LandListing interface for the map
const mapPlotsToListings = (plots: any[]): LandListing[] => {
  return plots.map(p => ({
    id: p.id,
    title: p.title,
    location: p.locality,
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    area: p.area,
    areaUnit: p.unit,
    price: p.price,
    category: p.type === 'COMMERCIAL' ? 'GOVERNMENT' : 'PRIVATE', // Mock categorization
    verified: p.verified,
    authority: "GDA",
    imageUrl: p.imageUrl,
    description: p.description,
    coordinates: p.coordinates,
    purpose: p.id.includes('GKP-001') ? "SALE" : "LEASE",
    currency: "INR",
    tags: [],
    sellerName: "GDA Official Node",
    sellerEmail: "contact@gda.gov.in",
    sellerPhone: "+91-551-XXXXXXX"
  }));
};

export default function CityPage() {
  const params = useParams();
  const city = (params.city as string).charAt(0).toUpperCase() + (params.city as string).slice(1);
  const state = (params.state as string).replace('-', ' ').split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

  // Filter State
  const [filters, setFilters] = useState({
    locality: "ALL",
    type: "ALL",
    verifiedOnly: false,
    priceRange: 50000000, // Max 5 Cr
    minSize: 0,
    mainRoadOnly: false
  });

  const filteredPlots = useMemo(() => {
    return GORAKHPUR_PLOTS.filter(plot => {
      if (filters.locality !== "ALL" && plot.locality !== filters.locality) return false;
      if (filters.type !== "ALL" && plot.type !== filters.type) return false;
      if (filters.verifiedOnly && !plot.verified) return false;
      if (plot.price > filters.priceRange) return false;
      if (plot.area < filters.minSize) return false;
      if (filters.mainRoadOnly && !plot.roadAccess.toLowerCase().includes("main")) return false;
      return true;
    });
  }, [filters]);

  return (
    <main className="min-h-screen bg-mesh pb-32">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-500/5 blur-[120px] -z-10 animate-pulse"></div>
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-surface-dark flex items-center justify-center text-white font-black text-xl shadow-xl shadow-slate-900/10">B</div>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2">
               <span className="stat-badge badge-emerald">Vetted by node {city.slice(0,3).toUpperCase()}</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{state} Division</span>
            </div>
          </motion.div>

          <h1 className="text-6xl lg:text-9xl font-black text-navy-trust tracking-tighter mb-8 leading-[0.85]">
            Sovereign Land in <br />
            <span className="text-gradient">{city}.</span>
          </h1>

          <p className="text-2xl text-slate-500 max-w-3xl leading-relaxed mb-16 font-medium">
            Explore secure, cryptographically-verified land assets in the {city} cluster. Synchronized directly with the Development Authority data nodes.
          </p>

          <div className="flex flex-wrap gap-6">
            <button className="btn-premium group text-lg px-12">
               Enter Map Hub
               <Navigation size={20} className="ml-3 group-hover:rotate-12 transition-transform" />
            </button>
            <button className="btn-secondary-premium text-lg px-12">
               Market Analytics
            </button>
          </div>

          <div className="mt-20 flex flex-wrap gap-12 pt-12 border-t border-slate-200/60 max-w-4xl">
             {[
               { label: "Active Objects", value: "24,051" },
               { label: "Registry Value", value: "₹4,200 Cr" },
               { label: "Node Health", value: "100.0%" }
             ].map((stat, i) => (
               <div key={i}>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                 <p className="text-2xl font-black text-navy-trust tracking-tight">{stat.value}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 2. ADVANCED FILTERS HUD */}
      <section className="sticky top-0 z-[100] glass border-b border-white/40 shadow-soft">
        <div className="container py-8">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col gap-2 min-w-[240px]">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.3em] ml-2">Locality Matrix</label>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={16} />
                <select 
                  className="registry-input !pl-16 !py-4 shadow-inner bg-background-card/50"
                  value={filters.locality}
                  onChange={(e) => setFilters({...filters, locality: e.target.value})}
                >
                  <option value="ALL">All Discovery Hubs</option>
                  <option value="Taramandal">Taramandal Lake City</option>
                  <option value="GIDA">GIDA Industrial Core</option>
                  <option value="Golghar">Golghar Central Hub</option>
                  <option value="Medical College Road">Medical Corridor</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-w-[180px]">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.3em] ml-2">Node Type</label>
              <select 
                className="registry-input !py-4 shadow-inner bg-background-card/50 appearance-none"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="ALL">Any Asset Use</option>
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="AGRICULTURAL">Agricultural</option>
              </select>
            </div>

            <div className="flex-grow flex flex-col gap-3 min-w-[200px]">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-[0.3em]">Valuation (Cr)</label>
                <span className="text-xs font-black text-navy-trust">Max ₹{(filters.priceRange / 10000000).toFixed(1)} Cr</span>
              </div>
              <input 
                type="range" min="1000000" max="50000000" step="1000000"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-navy-trust"
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: parseInt(e.target.value)})}
              />
            </div>

            <div className="flex items-center gap-4 bg-navy-trust p-1.5 rounded-2xl">
               <button 
                 onClick={() => setFilters({...filters, verifiedOnly: !filters.verifiedOnly})}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${filters.verifiedOnly ? 'bg-emerald-500 text-white' : 'bg-transparent text-white/40'}`}
               >
                 <ShieldCheck size={14} /> 
                 Verified Only
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARCEL GRID */}
      <section className="container py-24">
        <div className="flex items-center justify-between mb-16">
          <div>
             <h2 className="text-4xl font-black text-navy-trust tracking-tighter mb-2">Registry Results</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Synchronized with {city} Development Node</p>
          </div>
          <div className="flex items-center gap-4 bg-background-card px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
             <span className="text-sm font-black text-slate-400">Sort by:</span>
             <select className="bg-transparent border-none text-navy-trust font-black text-sm focus:ring-0 cursor-pointer">
                <option>System Default</option>
                <option>Price: Floor</option>
                <option>Area: Max</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPlots.map((plot, index) => (
            <motion.div 
              key={plot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
              className="card-premium p-0 group overflow-hidden"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={plot.imageUrl} 
                  alt={plot.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                   <div className="glass px-4 py-1.5 rounded-xl border border-white/40 shadow-xl">
                      <p className="text-[10px] font-black text-navy-trust uppercase tracking-[0.2em]">{plot.type}</p>
                   </div>
                </div>
                {plot.verified && (
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-2xl">
                     <ShieldCheck size={14} />
                     <span className="text-[9px] font-black uppercase tracking-widest">Digital Audit Passed</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-trust/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>

              <div className="p-10">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <p className="text-[10px] font-black text-accent uppercase tracking-widest">{plot.locality}</p>
                 </div>
                 <h3 className="text-2xl font-black text-navy-trust mb-10 group-hover:text-accent transition-colors leading-tight line-clamp-2">{plot.title}</h3>
                 
                 <div className="grid grid-cols-2 gap-8 mb-10 pt-10 border-t border-slate-50">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-accent transition-colors shadow-sm">
                         <Scale size={20} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Parcel Area</p>
                          <p className="text-sm font-black text-navy-trust">{plot.area} {plot.unit}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-accent transition-colors shadow-sm">
                         <Zap size={20} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol</p>
                          <p className="text-sm font-black text-navy-trust">L1 Direct</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Valuation</p>
                       <p className="text-3xl font-black text-navy-trust tracking-tight">₹{(plot.price / 10000000).toFixed(2)} Cr</p>
                    </div>
                    <Link href={`/discover/${plot.id}`} className="w-14 h-14 bg-surface-dark rounded-2xl text-white flex items-center justify-center shadow-2xl hover:bg-accent transition-all transform group-hover:scale-110">
                       <ArrowUpRight size={24} />
                    </Link>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. GEOSPATIAL NODE HUB */}
      <section className="bg-navy-trust py-32 lg:py-48 relative overflow-hidden mt-20">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200')] bg-cover mix-blend-overlay"></div>
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:items-center">
           <div>
              <div className="w-20 h-1 bg-accent mb-12"></div>
              <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-10 leading-[0.9]">
                 Geospatial Node <br />Infrastructure.
              </h2>
              <p className="text-white/50 text-xl mb-12 leading-relaxed font-medium">
                 Direct visualization of the {city} land cluster. Our mapping engine integrates high-resolution satellite telemetry with verified cadastral boundaries.
              </p>
              
              <div className="space-y-6">
                 {[
                   { title: "Waterfront Development Cluster", node: "Node-GKP-Lake" },
                   { title: "Industrial Growth Corridor", node: "Node-GIDA-Alpha" },
                   { title: "Institutional Central Core", node: "Node-GKP-Main" }
                 ].map((hub, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur flex justify-between items-center group cursor-pointer"
                    >
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-black shadow-glow-blue">
                            {i+1}
                          </div>
                          <p className="text-white font-black text-lg tracking-tight">{hub.title}</p>
                       </div>
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-accent transition-colors">{hub.node}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
           
           <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-[100px] animate-pulse"></div>
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[12px] border-white/5 relative z-10">
                  <InteractiveMap 
                    listings={mapPlotsToListings(filteredPlots)} 
                    isCityPage={true}
                    className="w-full h-full"
                  />
                  <div className="absolute top-10 left-10 z-[20] glass p-6 rounded-[2.5rem] border border-white/10 shadow-3xl">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">{city} Data Cluster</p>
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <p className="text-sm font-black text-white">Registry Precision: 100%</p>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. INSTITUTIONAL CTA */}
      <section className="container py-40 text-center relative">
         <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 rounded-[2.5rem] bg-accent/10 flex items-center justify-center mx-auto mb-12 text-accent shadow-glow-blue"
            >
               <Database size={40} />
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black text-navy-trust tracking-tighter mb-10 leading-tight">
               Provision Your Assets <br />to the National Hub.
            </h2>
            <p className="text-xl text-slate-500 mb-16 font-medium max-w-2xl mx-auto leading-relaxed">
               Onboard land records directly to the {city} verified node cluster. Access institutional discovery and secure sovereign management.
            </p>
            <div className="flex justify-center flex-wrap gap-8">
               <Link href="/discover/new" className="btn-premium px-16 py-6 text-xl shadow-2xl">
                 Onboard Land Node
               </Link>
               <button className="btn-secondary-premium px-16 py-6 text-xl">
                 Contact Node Authority
               </button>
            </div>
         </div>
      </section>
    </main>
  );
}
