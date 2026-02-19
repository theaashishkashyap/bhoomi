"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Map, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  Database,
  TrendingUp,
  Building2,
  Lock,
  Layers,
  ArrowUpRight,
  Activity,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function RegistryDashboardPage() {
  return (
    <main className="min-h-screen bg-mesh pb-32">
      {/* HUD HEADER */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-blue-500/5 blur-[150px] -z-10 animate-pulse"></div>
        <div className="container relative z-10 text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
             <div className="w-12 h-12 rounded-2xl bg-surface-dark flex items-center justify-center text-white font-black text-xl shadow-xl shadow-slate-900/10">B</div>
             <div className="h-6 w-px bg-slate-200 mx-2"></div>
             <span className="stat-badge badge-blue">Administered by National Gateway</span>
          </motion.div>
          
          <h1 className="text-6xl lg:text-9xl font-black text-navy-trust tracking-tighter mb-10 leading-[0.85]">
            National Asset <br />
            <span className="text-gradient">Registry Portal.</span>
          </h1>
          
          <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-16 max-w-3xl mx-auto">
            Gateway to the sovereign land data infrastructure. Unified discovery of government vacancies, private corridors, and institutional developments.
          </p>
          
          <div className="flex justify-center gap-6">
            <Link href="/discover" className="btn-premium px-16 text-xl group">
               Enter Registry Explorer
               <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* REAL TIME STATS */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto pt-16 border-t border-slate-100">
             {[
               { label: "Total Asset Nodes", value: "240,512" },
               { label: "Verified Area (Ha)", value: "1.2M+" },
               { label: "Registry Valuation", value: "₹42,000 Cr" },
               { label: "Live Data Sync", value: "99.98%" }
             ].map((stat, i) => (
               <div key={i} className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">{stat.label}</p>
                  <p className="text-3xl font-black text-navy-trust tracking-tight">{stat.value}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* REGISTRY CATEGORIES */}
      <section className="container py-32">
         <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                title: "Government Vacancies",
                desc: "Explore surplus institutional land earmarked for development, leasing, and strategic development nodes.",
                icon: <Building2 size={32} />,
                count: "12,405 Objects",
                color: "text-blue-500",
                bg: "bg-blue-50"
              },
              {
                title: "Private Corridors",
                desc: "Access verified private listings with full legal trail and institutional identity shielding.",
                icon: <ShieldCheck size={32} />,
                count: "154,201 Objects",
                color: "text-emerald-500",
                bg: "bg-emerald-50"
              },
              {
                title: "Industrial Nodes (SEZ)",
                desc: "High-level discovery of special economic zones with pre-verified utility handshake protocols.",
                icon: <Zap size={32} />,
                count: "405 Nodes",
                color: "text-amber-500",
                bg: "bg-amber-50"
              }
            ].map((cat, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -10 }}
                 className="card-premium group"
               >
                  <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-8`}>
                     {cat.icon}
                  </div>
                  <h3 className="text-2xl font-black text-navy-trust mb-4">{cat.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10">{cat.desc}</p>
                  <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.count}</span>
                     <Link href="/discover" className="p-3 bg-surface-dark rounded-xl text-white hover:bg-accent transition-all">
                        <ArrowUpRight size={18} />
                     </Link>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* SYSTEM INTEGRITY HUD */}
      <section className="container py-32">
         <div className="bg-navy-trust rounded-[4rem] p-12 lg:p-24 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541819661191-2090875b0ec8?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
               <div>
                  <div className="flex items-center gap-3 mb-10">
                     <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
                        <Activity size={24} />
                     </div>
                     <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Registry Health Status</span>
                  </div>
                  <h2 className="text-4xl lg:text-7xl font-black text-white mb-10 tracking-tighter leading-[0.9]">
                    Data Integrity <br />Node Cluster.
                  </h2>
                  <p className="text-white/50 text-xl font-medium leading-relaxed mb-12">
                    Every asset provisioned to the BHOOMI Registry is cross-referenced with 5 independent institutional nodes for absolute certainty.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                     {[
                       { label: "Verification Delay", value: "< 50ms" },
                       { label: "Encryption", value: "RSA-4096" }
                     ].map((stat, i) => (
                        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                           <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">{stat.label}</p>
                           <p className="text-2xl font-black text-white">{stat.value}</p>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="p-1 glass-dark rounded-[3.5rem] shadow-4xl relative">
                  <div className="absolute inset-0 bg-accent/20 blur-[120px] -z-10 animate-pulse"></div>
                  <div className="bg-slate-900/40 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10">
                     <div className="flex items-center justify-between mb-10">
                        <h4 className="text-white font-black text-sm tracking-widest uppercase">Live Registry Stream</h4>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                     </div>
                     <div className="space-y-6">
                        {[
                          { node: "Node-MUM-XP", status: "VERIFIED", price: "₹12.4 Cr", time: "2s ago" },
                          { node: "Node-BEN-Alpha", status: "PROVISIONED", price: "₹4.2 Cr", time: "15s ago" },
                          { node: "Node-DLH-Gate", status: "AUDITED", price: "₹250 Cr", time: "1m ago" },
                          { node: "Node-HYD-Core", status: "VERIFIED", price: "₹85 Cr", time: "3m ago" }
                        ].map((log, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                              <div>
                                 <p className="text-white font-bold text-xs">{log.node}</p>
                                 <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mt-1">{log.status}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-accent font-black text-xs">{log.price}</p>
                                 <p className="text-white/20 text-[9px] font-bold mt-1">{log.time}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL SEARCH CTA */}
      <section className="container py-40 text-center">
         <div className="max-w-3xl mx-auto p-12 lg:p-24 bg-background-card rounded-[4rem] shadow-3xl border border-slate-100 dark:border-slate-800">
            <div className="w-20 h-20 rounded-[2.5rem] bg-surface-dark text-white flex items-center justify-center mx-auto mb-10 shadow-xl shadow-slate-900/10">
               <Search size={36} />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-navy-trust mb-8 tracking-tighter">Unified Explorer.</h2>
            <p className="text-xl text-slate-500 mb-16 font-medium leading-relaxed">
               Access the most definitive land data repository in the region. Verified titles, verified availability, verified trust.
            </p>
            <Link href="/discover" className="btn-premium px-16 py-6 text-xl">Enter Registry Now</Link>
         </div>
      </section>
    </main>
  );
}
