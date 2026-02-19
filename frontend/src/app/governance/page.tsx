"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Scale, 
  ShieldCheck, 
  FileCheck, 
  Lock, 
  Eye, 
  Gavel,
  History,
  Database,
  Globe,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function GovernancePage() {
  return (
    <main className="min-h-screen bg-mesh pb-32">
      {/* HERO SECTION */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-emerald-500/5 blur-[120px] -z-10"></div>
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
             <div className="w-12 h-12 rounded-2xl bg-surface-dark flex items-center justify-center text-white font-black text-xl shadow-xl shadow-slate-900/10">B</div>
             <div className="h-6 w-px bg-slate-200 mx-2"></div>
             <span className="stat-badge badge-emerald">Governance Protocol v1.8</span>
          </motion.div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-navy-trust tracking-tighter mb-8 leading-[0.9]">
            The Protocol of <span className="text-gradient">Integrity.</span>
          </h1>
          
          <p className="text-xl text-slate-500 font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
            BHOOMI represents a new paradigm in national land governance. Our framework ensures absolute data sovereignty, legal transparency, and institutional accountability.
          </p>
          
          <div className="flex justify-center gap-6">
            <button className="btn-premium px-12 text-lg">Download Legal Whitepaper</button>
            <button className="btn-secondary-premium px-12 text-lg">View Audit Logs</button>
          </div>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="container py-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: <Scale size={28} />,
              title: "Legal Symmetry",
              desc: "100% synchronization with the National Land Records Modernization Program (NLRMP)."
            },
            {
              icon: <ShieldCheck size={28} />,
              title: "Data Sovereignty",
              desc: "Custodian-first data privacy model with RSA-4096 identity anchoring."
            },
            {
              icon: <History size={28} />,
              title: "Immutable Audits",
              desc: "Complete, non-erasable history for every asset record from provisioning to disposal."
            },
            {
              icon: <Gavel size={28} />,
              title: "Compliance Engine",
              desc: "Automatic verification against municipal, state, and central land use policies."
            }
          ].map((pillar, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="card-premium h-full flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-10">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-black mb-4 text-navy-trust">{pillar.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DETAILED GOVERNANCE LAYERS */}
      <section className="container py-32 border-t border-slate-100">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
             <div className="absolute inset-0 bg-blue-500/10 blur-[100px] animate-pulse"></div>
             <img 
               src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200" 
               className="relative z-10 rounded-[3rem] shadow-3xl border-8 border-white"
               alt="Legal Governance"
             />
             <div className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl shadow-2xl z-20 border border-white/40">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-glow-blue">
                      <FileCheck size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Sync</p>
                      <p className="text-lg font-black text-navy-trust">Institutional Active</p>
                   </div>
                </div>
                <div className="flex gap-2">
                   {[1,2,3,4,5].map(i => <div key={i} className="h-1 w-8 bg-emerald-500 rounded-full" />)}
                </div>
             </div>
          </div>

          <div>
             <h2 className="text-5xl font-black text-navy-trust tracking-tighter mb-10 leading-tight">
               Built for National <br />Scale Integrity.
             </h2>
             <div className="space-y-10">
                {[
                  { 
                    title: "RSA-Anchored Identity", 
                    desc: "Every custodian action is cryptographically signed and anchored to a sovereign identity node."
                  },
                  { 
                    title: "Multilateral Verification", 
                    desc: "Cross-departmental handshake protocol ensures that no record is updated without multi-node consensus."
                  },
                  { 
                    title: "Privacy First Disclosure", 
                    desc: "Contact information and private sensitive data are shielded until verified intent-to-transact is established."
                  }
                ].map((item, i) => (
                   <div key={i} className="flex gap-6">
                      <div className="w-8 h-8 rounded-full bg-surface-dark text-white flex items-center justify-center text-xs font-black shrink-0 shadow-lg">
                        {i + 1}
                      </div>
                      <div>
                         <h4 className="text-xl font-black text-navy-trust mb-2">{item.title}</h4>
                         <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* FINAL COMPLIANCE CTA */}
      <section className="container py-40">
        <div className="bg-surface-dark rounded-[4rem] p-16 lg:p-32 text-center relative overflow-hidden text-white">
           <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200')] bg-cover"></div>
           <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-black mb-10 tracking-tighter">BHOOMI Protocol Audit.</h2>
              <p className="text-xl text-white/60 mb-16 leading-relaxed font-medium">
                Access the real-time transparency dashboard to view performance metrics, node health, and anonymized verification audits.
              </p>
              <div className="flex justify-center flex-wrap gap-8">
                 <button className="btn-premium px-16 py-6 text-xl shadow-2xl">Enter Audit Terminal</button>
                 <button className="btn-secondary-premium !bg-white/5 !text-white !border-white/20 px-16 py-6 text-xl hover:!bg-white/10 transition-all">Download Compliance Pack</button>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
