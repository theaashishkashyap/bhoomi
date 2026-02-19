"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Trees, 
  Wind, 
  Map, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  Home, 
  ArrowLeft,
  Settings,
  Activity,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function SmartVillagePrototypePage() {
  return (
    <main className="min-h-screen bg-mesh pb-32 overflow-hidden transition-colors duration-500">
      {/* HEADER HUD */}
      <nav className="p-8 flex items-center justify-between relative z-50">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-background-card rounded-2xl flex items-center justify-center text-emerald-600 shadow-xl border border-emerald-100 group-hover:scale-110 transition-transform dark:border-white/10">
             <ArrowLeft size={24} />
          </div>
          <span className="text-sm font-black text-navy-trust tracking-widest uppercase">Registry Home</span>
        </Link>
        <div className="flex items-center gap-6">
           <div className="stat-badge badge-emerald !bg-emerald-600 !text-white !border-none !py-2 !px-6">ALPHA STAGE</div>
           <Settings className="text-slate-400 cursor-pointer hover:rotate-90 transition-transform duration-500" />
        </div>
      </nav>

      {/* RURAL HERO */}
      <section className="relative pt-20 pb-40">
        <div className="absolute top-0 right-0 w-[80%] h-full opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=1200')] bg-cover"></div>
        </div>
        
        <div className="container relative z-10 grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-100/50 backdrop-blur rounded-full mb-8"
            >
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
               </span>
               <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Village Node Active</span>
            </motion.div>
            
            <h1 className="text-7xl lg:text-9xl font-black text-navy-trust tracking-tighter mb-8 leading-[0.85]">
              Smart Village <br />
              <span className="text-emerald-600">Prototype Alpha.</span>
            </h1>
            
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-16 max-w-xl">
              Applying BHOOMI's sovereign data protocols to rural transformation. Digitizing land parcels with integrated utility nodes and ecological certificates.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-16">
               {[
                 { label: "Total Parcels", value: "154" },
                 { label: "Protocol sync", value: "98.4%" }
               ].map((stat, i) => (
                  <div key={i}>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                     <p className="text-3xl font-black text-navy-trust">{stat.value}</p>
                  </div>
               ))}
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] -z-10 animate-pulse"></div>
             <div className="aspect-square bg-background-card rounded-[4rem] shadow-4xl p-1 border-[16px] border-background-card relative group overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover rounded-[3rem] grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  alt="Rural Prototype"
                />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                   <div className="glass p-8 rounded-[3rem] w-full text-center border border-white/40 shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                      <p className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-4">Node Selection</p>
                      <h4 className="text-2xl font-black text-navy-trust mb-2">Cluster #42 (Aranya)</h4>
                      <p className="text-xs font-bold text-slate-500">Verified Geographic Identity Established</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SMART UTILITY NODES */}
      <section className="container py-32">
         <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-navy-trust tracking-tighter mb-6">Integrated Rural Framework</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
               In the prototype stage, we attach decentralized utility data directly to the land record, creating a 'Sovereign Plot Object'.
            </p>
         </div>

         <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Ecological Yield", 
                desc: "Soil nutrient telemetry and carbon credit potential attached to the cadastral record.",
                icon: <Trees className="text-emerald-500" />,
                bg: "bg-emerald-50"
              },
              { 
                title: "Energy Handshake", 
                desc: "Real-time micro-grid solar potential and energy distribution status for every parcel.",
                icon: <Zap className="text-amber-500" />,
                bg: "bg-amber-50"
              },
              { 
                title: "Hydrological Node", 
                desc: "Groundwater level monitoring and irrigation protocol synchronization.",
                icon: <Droplets className="text-blue-500" />,
                bg: "bg-blue-50"
              }
            ].map((node, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -10 }}
                 className="p-12 bg-white rounded-[3.5rem] shadow-2xl border border-slate-50 group"
               >
                  <div className={`w-16 h-16 rounded-[1.5rem] ${node.bg} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                     {node.icon}
                  </div>
                  <h3 className="text-2xl font-black text-navy-trust mb-6">{node.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">{node.desc}</p>
                  <div className="mt-10 pt-8 border-t border-slate-50 flex items-center gap-4 text-[10px] font-black text-navy-trust uppercase tracking-widest cursor-pointer group">
                     Inspect Protcol <Activity size={14} className="text-emerald-500" />
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* SYSTEM ARCHITECTURE MAP */}
      <section className="container py-40">
         <div className="bg-surface-dark rounded-[5rem] p-16 lg:p-32 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')] opacity-10 bg-cover"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
               <Globe size={64} className="mx-auto mb-12 text-emerald-400 shadow-glow-blue" />
               <h2 className="text-5xl lg:text-7xl font-black mb-10 tracking-tighter">Sovereign Rural Stack.</h2>
               <p className="text-xl text-white/50 mb-16 leading-relaxed font-medium">
                  We are testing the limits of BHOOMI to empower the next generation of smart villages. By digitizing the absolute foundations, we enable decentralized prosperity.
               </p>
               <div className="flex justify-center gap-8">
                  <button className="btn-premium px-16 py-6 text-xl !bg-emerald-600 shadow-2xl group">
                    View Alpha Roadmap
                  </button>
                  <Link href="/discover" className="btn-secondary-premium !bg-white/5 !text-white !border-white/20 px-16 py-6 text-xl hover:!bg-white/10 transition-all">
                    Return to Hub
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
