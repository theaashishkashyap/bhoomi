"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Search, 
  Fingerprint, 
  FileCheck, 
  Activity, 
  Globe, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  History,
  Info
} from "lucide-react";
import Link from "next/link";

export default function VerificationPortal() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<null | "SUCCESS" | "ERROR">(null);
  const [searchId, setSearchId] = useState("");

  const handleVerify = () => {
    if (!searchId) return;
    setIsVerifying(true);
    setResult(null);
    
    // Simulate high-fidelity multi-node verification
    setTimeout(() => {
      setIsVerifying(false);
      setResult(searchId.length > 5 ? "SUCCESS" : "ERROR");
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-mesh py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center text-white font-black text-xl shadow-lg">B</div>
              <div className="h-4 w-px bg-slate-200"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Security Node 04</span>
            </div>
            <h1 className="text-6xl font-black text-navy-trust tracking-tighter leading-tight">
              Registry <br /> <span className="text-gradient">Verification.</span>
            </h1>
          </div>
          <div className="flex flex-col items-end text-right">
             <p className="text-sm font-bold text-slate-500 max-w-xs mb-4">
               Perform deep cryptographic audits on property titles and institutional claims using national data sync.
             </p>
             <div className="flex gap-2">
                <span className="stat-badge badge-blue">Live Audit Protocol v4.0</span>
                <span className="stat-badge badge-emerald">RSA-4096 Active</span>
             </div>
          </div>
        </header>

        {/* VERIFICATION ENGINE */}
        <section className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* SEARCH TERMINAL */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-premium p-10 bg-background-card border-none shadow-premium relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
              
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-sm">
                    <Fingerprint size={28} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-navy-trust tracking-tight">Institutional Handshake</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verify Property ID or Survey Node</p>
                 </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter Parcel ID (e.g. L001-GKP or UP-7724...)"
                    className="registry-input !pl-16 !py-6 !text-lg !font-bold"
                  />
                </div>

                <button 
                  onClick={handleVerify}
                  disabled={isVerifying || !searchId}
                  className="w-full btn-premium !py-6 !text-lg flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      Cross-Referencing Multi-Nodes...
                    </>
                  ) : (
                    <>
                      Execute Verification Protocol
                      <ShieldCheck size={24} />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-50 flex flex-wrap gap-8 justify-between">
                 <div className="flex items-center gap-2">
                    <Activity size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Sync: 99.9%</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Lock size={16} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">End-to-End Encrypted</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Globe size={16} className="text-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Regional Cluster: North</span>
                 </div>
              </div>
            </motion.div>

            {/* RESULTS DISPLAY */}
            <AnimatePresence mode="wait">
              {result === "SUCCESS" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-1 rounded-[2.5rem] bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-glow-emerald"
                >
                  <div className="bg-white/95 backdrop-blur rounded-[2.3rem] p-10">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-4">
                          <CheckCircle2 className="text-emerald-500" size={40} />
                          <div>
                             <h3 className="text-2xl font-black text-navy-trust tracking-tight">Record Authenticated</h3>
                             <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Hash Node Match Confirmed</p>
                          </div>
                       </div>
                       <div className="px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest border border-emerald-100">
                          Sovereign Check: Pass
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Property Metadata</p>
                          <div className="space-y-3">
                             <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-500">Survey No.</span>
                                <span className="text-navy-trust">771/2B</span>
                             </div>
                             <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-500">Registry Date</span>
                                <span className="text-navy-trust">14 AUG 2023</span>
                             </div>
                             <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-500">Owner Identity</span>
                                <span className="text-navy-trust blur-[4px]">PROTECTED</span>
                             </div>
                          </div>
                       </div>
                       <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col justify-center">
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Verification Audit</p>
                          <div className="flex items-center gap-3 mb-2">
                             <FileCheck size={20} className="text-blue-600" />
                             <span className="text-lg font-black text-blue-900 leading-none">Institutional Badge</span>
                          </div>
                          <p className="text-[11px] font-bold text-blue-800/60 leading-relaxed uppercase tracking-wider">
                            Title verified by CIDCO & National Land Council Hub.
                          </p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {result === "ERROR" && (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="p-1 rounded-[2.5rem] bg-red-400 shadow-glow-red"
                >
                   <div className="bg-white/95 rounded-[2.3rem] p-10 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
                         <AlertCircle size={32} />
                      </div>
                      <h3 className="text-2xl font-black text-navy-trust mb-2">Node Mismatch Detected</h3>
                      <p className="text-slate-500 font-medium max-w-sm mb-8">
                        The provisioned Parcel ID could not be synchronized across institutional node clusters. This could indicate an unregistered parcel or database lag.
                      </p>
                      <button className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:opacity-70 transition-opacity flex items-center gap-2">
                         Download Red Flag Report <ArrowRight size={14} />
                      </button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SIDEBAR INFO */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-2">Verification Pillars</h3>
               {[
                 { 
                   icon: <Lock size={20} className="text-blue-500" />, 
                   title: "RSA-4096 Anchoring", 
                   desc: "Every title verification is cryptographically signed and recorded on the protocol audit trail." 
                 },
                 { 
                   icon: <History size={20} className="text-emerald-500" />, 
                   title: "Chain of Title Audits", 
                   desc: "Trace property ownership history back to institutional provisioning with sub-second accuracy." 
                 },
                 { 
                   icon: <Zap size={20} className="text-amber-500" />, 
                   title: "Sub-ms Latency", 
                   desc: "Node-cluster architecture ensures real-time cross-referencing across state departmental silos." 
                 }
               ].map((pillar, i) => (
                  <div key={i} className="flex gap-5 p-6 rounded-3xl hover:bg-white/50 transition-all cursor-default border border-transparent hover:border-slate-100 group">
                     <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        {pillar.icon}
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-navy-trust mb-1">{pillar.title}</h4>
                        <p className="text-sm font-medium text-slate-400 leading-relaxed uppercase text-[10px] tracking-wider">{pillar.desc}</p>
                     </div>
                  </div>
               ))}
            </div>

            <div className="p-10 bg-surface-dark rounded-[3rem] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full bg-accent/20 blur-[100px] -z-10 animate-pulse" />
               <h3 className="text-2xl font-black mb-6 tracking-tight">Public Audit <br /> Transparency Hub.</h3>
               <p className="text-white/50 text-sm font-medium leading-relaxed mb-10">
                 BHOOMI is an open-source data protocol. While personal data is shielded, the integrity of the data mesh is public.
               </p>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Audits Today</span>
                     <span className="text-accent font-black">2,401</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Fraudulent Checks Blocked</span>
                     <span className="text-red-400 font-black">12</span>
                  </div>
               </div>
            </div>
            
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex items-start gap-4">
               <Info className="text-slate-400 mt-1 shrink-0" size={20} />
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">
                 Institutional users: Please ensure your RSA security key is inserted into your auth-node for high-level title provisioning.
               </p>
            </div>
          </div>

        </section>

        {/* FOOTER NAV */}
        <footer className="mt-32 pt-12 border-t border-slate-100 flex items-center justify-between">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-navy-trust transition-colors">
              BHOOMI National Infrastructure
            </Link>
            <div className="flex gap-10">
               <Link href="/discover" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-navy-trust transition-colors">Registry Explorer</Link>
               <Link href="/governance" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-navy-trust transition-colors">Legal Framework</Link>
            </div>
        </footer>
      </div>
    </main>
  );
}
