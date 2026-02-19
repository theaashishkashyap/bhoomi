"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Map as MapIcon, 
  LayoutDashboard, 
  ChevronRight, 
  ShieldCheck, 
  LocateFixed,
  TrendingUp,
  Filter,
  Layers,
  Globe,
  Database,
  ArrowRight,
  Bell,
  Settings,
  Plus
} from "lucide-react";
import dynamic from "next/dynamic";
import { LandListing } from "@/data/mockListings";
import { useUI } from "@/context/UIContext";
import DemandBadge from "@/components/DemandBadge";

const InteractiveMap = dynamic<any>(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50/10 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4 shadow-glow-blue"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Synchronizing Geospatial Node...</p>
    </div>
  )
});

export default function DiscoverPage() {
  const { nodeSync, activeHandshake, darkMode } = useUI();
  const [listings, setListings] = useState<LandListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const [stateFilter, setStateFilter] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"LIST" | "MAP">("LIST");

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (category !== "ALL") queryParams.append("category", category);
        if (search) queryParams.append("search", search);
        if (stateFilter !== "ALL") queryParams.append("state", stateFilter);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings?${queryParams.toString()}`);
        const data = await response.json();
        if (data.success) {
          setListings(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchListings, 300);
    return () => clearTimeout(timer);
  }, [search, category, stateFilter]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const filteredListings = listings;

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ].sort();

  return (
    <div className="flex min-h-screen bg-mesh transition-colors duration-500">
      {/* 1. PROFESSIONAL SIDEBAR */}
      <aside 
        className={`dashboard-sidebar glass sticky top-0 transition-all duration-500 flex flex-col ${
          isSidebarCollapsed ? 'w-24 px-4' : 'w-80 px-8'
        }`}
      >
        <div className="relative mb-16 px-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-10 min-h-10 w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center text-white font-black text-xl shadow-xl shadow-slate-900/10">B</div>
            <div className={`transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
              <h1 className="text-xl font-black tracking-tighter text-navy-trust truncate">BHOOMI</h1>
              <p className="text-[9px] font-black text-accent uppercase tracking-widest truncate">Live Registry</p>
            </div>
          </Link>
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-accent transition-colors z-[20]"
          >
            <ChevronRight size={14} className={`transition-transform duration-500 ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 mb-auto">
          <p className={`text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4 transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>Navigation</p>
          
          <button 
            onClick={() => setViewMode("LIST")}
            className={`nav-item ${viewMode === 'LIST' ? 'active' : ''} ${isSidebarCollapsed ? '!px-0 justify-center' : ''}`}
            title="Registry Explorer"
          >
            <LayoutDashboard size={18} /> 
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Registry Explorer</span>
          </button>
          
          <button 
            onClick={() => setViewMode("MAP")}
            className={`nav-item ${viewMode === 'MAP' ? 'active' : ''} ${isSidebarCollapsed ? '!px-0 justify-center' : ''}`}
            title="Geospatial Node"
          >
            <Globe size={18} /> 
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Geospatial Node</span>
          </button>

          <div className="my-8 h-px bg-slate-100" />

          <Link 
            href="/list" 
            className={`nav-item group !bg-accent/5 hover:!bg-accent !text-accent hover:!text-white transition-all shadow-sm ${isSidebarCollapsed ? '!px-0 justify-center' : ''}`}
            title="List New Asset"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            <span className={`font-black transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>List New Asset</span>
          </Link>

          <Link 
            href="/verification" 
            className={`nav-item ${isSidebarCollapsed ? '!px-0 justify-center' : ''}`}
            title="Verification Hub"
          >
            <ShieldCheck size={18} />
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Verification Hub</span>
          </Link>

          <div className="mt-12">
            <p className={`text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4 transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>Account</p>
            <Link 
              href="/notifications" 
              className={`nav-item w-full font-black ${isSidebarCollapsed ? '!px-0 justify-center' : ''}`}
              title="Notifications"
            >
              <Bell size={18} /> 
              <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Notifications</span>
            </Link>
            <Link 
              href="/settings" 
              className={`nav-item w-full font-black ${isSidebarCollapsed ? '!px-0 justify-center' : ''}`}
              title="System Settings"
            >
              <Settings size={18} /> 
              <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>System Settings</span>
            </Link>
          </div>
        </nav>

        {activeHandshake && (
          <div className={`mt-10 p-6 bg-surface-dark rounded-[2rem] text-white relative overflow-hidden group shadow-glow-blue transition-all duration-500 ${isSidebarCollapsed ? 'p-4 items-center flex flex-col' : ''}`}>
            <div className={`absolute right-[-20%] bottom-[-20%] opacity-20 group-hover:scale-110 transition-transform ${isSidebarCollapsed ? 'hidden' : ''}`}>
               <ShieldCheck size={120} />
            </div>
            <div className={`relative z-10 ${isSidebarCollapsed ? 'text-center' : ''}`}>
              <div className={`flex items-center gap-2 mb-3 ${isSidebarCollapsed ? 'justify-center mb-0' : ''}`}>
                <span className={`w-2 h-2 rounded-full ${nodeSync ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                <span className={`text-[9px] font-black uppercase tracking-widest ${nodeSync ? 'text-emerald-400' : 'text-red-400'} ${isSidebarCollapsed ? 'hidden' : ''}`}>
                  {nodeSync ? 'Active Handshake' : 'Offline Mode'}
                </span>
              </div>
              <p className={`text-xs font-bold leading-relaxed mb-4 ${isSidebarCollapsed ? 'hidden' : ''}`}>
                {nodeSync ? 'You are connected to the Primary National Data Node.' : 'Synchronization protocol is currently restricted.'}
              </p>
              <div className={`text-[10px] font-black uppercase tracking-widest text-white/40 ${isSidebarCollapsed ? 'hidden' : ''}`}>Tier 1 Compliance</div>
            </div>
          </div>
        )}
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-grow p-12 transition-colors duration-500">
        {/* HEADER AREA */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-navy-trust mb-2">Registry Explorer</h2>
            <div className="flex items-center gap-3 text-slate-500 font-medium">
               <Globe size={16} className="text-accent" />
               <span>Nationwide Discovery Cluster</span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span className={`text-accent ${!nodeSync ? 'opacity-30' : ''}`}>
                 {nodeSync ? 'Live Updates Syncing' : 'Local Archive Cache'}
               </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
               ))}
             </div>
             <p className="text-xs font-bold text-slate-400">2,401 users currently viewing</p>
          </div>
        </header>

        {/* SEARCH AND FILTER HUD */}
        <section className="bg-background-card rounded-[3rem] p-4 shadow-3xl mb-12 border border-slate-100 flex flex-col lg:flex-row items-center gap-4 dark:border-slate-800 transition-colors">
           <div className="flex-grow relative w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Search by Locality, Authority, or Parcel ID..."
                className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50/50 border-none focus:ring-2 focus:ring-accent/20 font-medium text-navy-trust dark:bg-slate-800/50 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>

           <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative">
                <select 
                  className="appearance-none pl-12 pr-10 py-5 rounded-2xl bg-slate-50/50 border-none font-black text-[10px] uppercase tracking-widest text-navy-trust cursor-pointer hover:bg-slate-100 transition-colors dark:bg-slate-800/50"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                   <option value="ALL">All Categories</option>
                   <option value="GOVERNMENT">Government</option>
                   <option value="PRIVATE">Private</option>
                </select>
                <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" size={16} />
              </div>

              <div className="relative">
                <select 
                  className="appearance-none pl-12 pr-10 py-5 rounded-2xl bg-slate-50/50 border-none font-black text-[10px] uppercase tracking-widest text-navy-trust cursor-pointer hover:bg-slate-100 transition-colors dark:bg-slate-800/50"
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                >
                   <option value="ALL">All States</option>
                   {indianStates.map(state => (
                     <option key={state} value={state}>{state}</option>
                   ))}
                </select>
                <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" size={16} />
              </div>
           </div>

           <div className="hidden lg:block w-px h-10 bg-slate-100 dark:bg-slate-800 mx-4" />

           <div className="px-8 py-4 bg-navy-trust rounded-2xl text-white flex flex-col justify-center min-w-[140px] dark:bg-accent transition-colors">
              <span className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">Objects Syncing</span>
              <span className="text-xl font-black">{listings.length}</span>
           </div>
        </section>

        {/* CONTENT SWITCHER */}
        <AnimatePresence mode="wait">
          {viewMode === "LIST" ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-10"
            >
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card-premium h-[450px] animate-pulse bg-slate-50/10 border-none" />
                ))
              ) : (
                filteredListings.map((listing) => (
                  <Link key={listing.id} href={`/discover/${listing.id}`}>
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="card-premium group h-full border-none shadow-premium hover:shadow-glow-blue transition-all duration-500"
                    >
                      <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden mb-8">
                        <img 
                          src={listing.imageUrl || "https://images.unsplash.com/photo-1541819661191-2090875b0ec8?auto=format&fit=crop&q=80&w=800"} 
                          alt={listing.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=800";
                          }}
                        />
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                           <span className={`stat-badge ${listing.category === 'GOVERNMENT' ? 'badge-blue' : 'badge-emerald'} w-fit`}>
                             {listing.category}
                           </span>
                           {(listing as any).demandLabel && (
                             <DemandBadge 
                               score={(listing as any).demandScore || 0} 
                               label={(listing as any).demandLabel}
                               className="scale-90 origin-left"
                             />
                           )}
                        </div>
                        {listing.verified && (
                          <div className="absolute bottom-6 left-6 glass px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/40 shadow-xl">
                             <ShieldCheck size={14} className="text-emerald-500" />
                             <span className="text-[10px] font-black text-navy-trust uppercase tracking-widest">Verified Record</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-trust/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      <div className="p-8">
                        <div className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-widest mb-3">
                           <TrendingUp size={12} />
                           High Value Corridor
                        </div>
                        <h3 className="text-xl font-black mb-2 text-navy-trust truncate group-hover:text-accent transition-colors">{listing.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold mb-8">
                           <LocateFixed size={14} className="text-slate-300" />
                           <span>{listing.location}, {listing.state}</span>
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-slate-50/10">
                           <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Value</p>
                              <p className="text-2xl font-black text-navy-trust">₹{(listing.price / 10000000).toFixed(2)} Cr</p>
                           </div>
                           <motion.div 
                             whileHover={{ scale: 1.1, x: 5 }}
                             className="w-12 h-12 rounded-2xl bg-surface-dark flex items-center justify-center text-white shadow-xl shadow-slate-900/20 transition-colors"
                           >
                              <ArrowRight size={20} />
                           </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="map"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-[calc(100vh-280px)] rounded-[3rem] overflow-hidden border-[12px] border-background-card shadow-2xl relative transition-colors"
            >
               <InteractiveMap listings={filteredListings} className="w-full h-full" />
               <div className="absolute top-10 left-10 z-[10]">
                  <div className="glass p-6 rounded-[2rem] border border-white/40 shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                       <span className={`w-2 h-2 rounded-full ${nodeSync ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                       <p className="text-[10px] font-black uppercase tracking-widest text-navy-trust">
                         {nodeSync ? 'Node Synchronization Hub' : 'Offline Access Mode'}
                       </p>
                    </div>
                    <p className="text-xl font-black text-navy-trust">{filteredListings.length} Parcels Identified</p>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
