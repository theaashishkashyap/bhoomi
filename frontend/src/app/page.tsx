"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Map, Search, FileCheck, Building2, Globe, Database, ArrowRight, TrendingUp, Lock, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <main className="min-h-screen flex flex-col bg-mesh relative overflow-hidden">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-screen opacity-50 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/10 blur-[120px] animate-pulse" />
      </div>

      {/* 1. NAVIGATION */}
      <nav className="glass sticky top-0 z-[100] border-b border-white/40">
        <div className="container py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-12 h-12 bg-surface-dark rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-slate-900/20"
            >
              B
            </motion.div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-navy-trust leading-none">BHOOMI</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mt-1">National Registry Hub</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-12">
            {["Registry", "List Property", "Verification", "Governance"].map((item) => (
              <Link 
                key={item} 
                href={item === "List Property" ? "/list" : `/${item.toLowerCase()}`} 
                className="text-sm font-bold text-slate-500 hover:text-navy-trust transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                 <span className="hidden md:block text-xs font-black text-navy-trust uppercase tracking-widest">{user.name}</span>
                 <button 
                   onClick={logout} 
                   className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest border border-red-100 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100"
                 >
                   Logout Node
                 </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-bold text-navy-trust hover:opacity-70">Internal Access</Link>
                <Link href="/auth/signup" className="btn-premium !py-3 !px-8 !rounded-xl !text-sm">
                  Verify Identity
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 2. PREMIUM HERO SECTION */}
      <section className="relative flex-grow flex items-center py-20 lg:py-32 overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-background-card/80 backdrop-blur rounded-2xl border border-slate-100 shadow-sm mb-10"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Cluster Alpha Active</span>
            </motion.div>
            
            <h1 className="text-6xl lg:text-[88px] font-black mb-8 tracking-tighter leading-[0.9] text-navy-trust">
              The Sovereign <br />
              <span className="text-gradient">Land Layer.</span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
              National-scale infrastructure for transparent property management and cryptographically verified discovery. Empowering the digital era of Indian land trust.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/discover" className="btn-premium group text-lg">
                Enter Registry Explorer
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/prototype/village" className="btn-secondary-premium text-lg group">
                <Map size={20} className="mr-3 text-accent group-hover:rotate-12 transition-transform" />
                Smart Village Alpha
              </Link>
            </div>

            {/* TRUST INDICATORS */}
            <div className="mt-20 pt-10 border-t border-slate-200/60 flex items-center gap-10">
              <div className="flex -space-x-4">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
                ].map((src, i) => (
                  <motion.img 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    key={i} 
                    src={src} 
                    className="w-12 h-12 rounded-full border-4 border-background-card object-cover shadow-lg" 
                    alt="Trusted User" 
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-black text-navy-trust tracking-tight">Verified by 50,000+ Institutional Custodians</p>
                <div className="flex items-center gap-2 mt-1">
                   <ShieldCheck size={14} className="text-emerald-500" />
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RSA-4096 Secure Access</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* DECORATIVE ELEMENTS */}
            <div className="absolute inset-0 bg-accent/20 rounded-[3rem] blur-3xl transform -rotate-6 animate-pulse" />
            
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(10,29,55,0.2)] border-[12px] border-background-card z-10 group">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                alt="BHOOMI Terminal Interface" 
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=1000";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-trust/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* FLOATING DATA CARD */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-2xl z-20 border border-white/20 dark:border-white/10 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="text-emerald-500" size={20} />
                </div>
                <h4 className="text-sm font-black text-navy-trust">Registry Velocity</h4>
              </div>
              <p className="text-2xl font-black text-navy-trust mb-1">+12.4%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth in Verified Assets</p>
            </motion.div>

             {/* FLOATING SECURITY CARD */}
             <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass-dark p-6 rounded-3xl shadow-2xl z-20 border border-white/10 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-4 text-white">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Lock className="text-white" size={20} />
                </div>
                <h4 className="text-sm font-black">Data Integrity</h4>
              </div>
              <p className="text-2xl font-black text-white mb-1">100.00%</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Sovereignty Check Passed</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2.5 TRENDING LANDS SECTION (NEW) */}
      <section className="py-24 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                  <TrendingUp size={16} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Live Demand Pulse</span>
              </motion.div>
              <h2 className="text-5xl font-black text-navy-trust tracking-tight">Trending Plots</h2>
            </div>
            <Link href="/discover" className="btn-secondary-premium group">
              View All High-Demand Assets
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Gateway East Corridor",
                location: "New Town, WB",
                price: "₹18.4 Cr",
                growth: "+14.2%",
                score: 92,
                image: "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=800",
                label: "High Demand"
              },
              {
                title: "Noida Tech Cluster II",
                location: "Sector 144, UP",
                price: "₹42.0 Cr",
                growth: "+8.7%",
                score: 78,
                image: "https://images.unsplash.com/photo-1449156001931-82833da72aa0?auto=format&fit=crop&q=80&w=800",
                label: "High Demand"
              },
              {
                title: "Aerocity Smart Node",
                location: "Mohali, PB",
                price: "₹9.2 Cr",
                growth: "+11.5%",
                score: 85,
                image: "https://images.unsplash.com/photo-1464933058529-01f77960a3f1?auto=format&fit=crop&q=80&w=800",
                label: "High Demand"
              }
            ].map((land, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-premium group overflow-hidden p-3"
              >
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                   <img src={land.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={land.title} />
                   <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        <Zap size={10} className="fill-current" /> {land.label}
                      </div>
                   </div>
                   <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-2xl flex justify-between items-center">
                      <div>
                        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Est. Market Value</p>
                        <p className="text-lg font-black text-white">{land.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Growth (YoY)</p>
                        <p className="text-lg font-black text-emerald-400">{land.growth}</p>
                      </div>
                   </div>
                </div>
                <div className="px-4 pb-4">
                   <h3 className="text-xl font-black text-navy-trust mb-1">{land.title}</h3>
                   <p className="text-xs font-bold text-slate-400 mb-6">{land.location}</p>
                   <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                         {[1,2,3,4,5].map(j => (
                           <div key={j} className={`h-1 w-6 rounded-full ${j <= 4 ? 'bg-red-500' : 'bg-slate-200'}`} />
                         ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-400">LDI Index: {land.score}</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE INFRASTRUCTURE GRID */}
      <section className="py-32 relative">
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4"
            >
              The Architecture of Trust
            </motion.p>
            <h2 className="text-5xl font-black text-navy-trust mb-6 tracking-tight">Institutional Core Assets</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              BHOOMI is engineered for nationwide scalability, delivering real-time land insights 
              through deep-level geospatial and cryptographic synchronization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: <ShieldCheck size={40} />, 
                title: "Decentralized Custody", 
                desc: "Every record is distributed across high-performance government data nodes, eliminating single points of failure.",
                color: "text-emerald-500",
                bg: "bg-emerald-50"
              },
              { 
                icon: <Map size={40} />, 
                title: "Precision Geospatial", 
                desc: "High-resolution satellite overlays combined with verified cadastral boundaries for accurate plot identification.",
                color: "text-blue-500",
                bg: "bg-blue-50"
              },
              { 
                icon: <Database size={40} />, 
                title: "Systemic Transparency", 
                desc: "Open access to development trends and vacancies while maintaining strict identity-based access control.",
                color: "text-amber-500",
                bg: "bg-amber-50"
              }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="card-premium group"
              >
                <div className={`w-20 h-20 rounded-3xl ${f.bg} flex items-center justify-center ${f.color} mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm dark:bg-background-card/50`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{f.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/10 flex items-center text-xs font-black uppercase tracking-widest text-accent group-hover:gap-4 gap-2 transition-all cursor-pointer">
                   Explore Framework <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROFESSIONAL FOOTER */}
      <footer className="bg-surface-dark text-white py-32 mt-20 relative overflow-hidden">
        {/* FOOTER BACKGROUND */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-[60%] h-full bg-blue-500/20 blur-[150px]" />
        </div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white text-navy-deep flex items-center justify-center font-black text-xl">B</div>
                <h3 className="text-2xl font-black tracking-tighter">BHOOMI</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed font-medium mb-10">
                National infrastructure for transparent land management and verified discovery across the Indian union.
              </p>
              <div className="flex gap-4">
                 {[Globe, TrendingUp, ShieldCheck].map((Icon, i) => (
                   <div key={i} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                      <Icon size={18} />
                   </div>
                 ))}
              </div>
            </div>
            
            {[
              { title: "Registry Hub", links: ["Government Vacancies", "Private Corridors", "Locality Trends", "Verification API"] },
              { title: "Governance", links: ["Legal Protocols", "Privacy Sovereignty", "Data Standards", "Audit Trails"] },
              { title: "Institution", links: ["Verification Hub", "Auth Documentation", "Node Access", "Contact Desk"] }
            ].map((cat, i) => (
              <div key={i}>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-white/40">{cat.title}</h4>
                <ul className="space-y-4">
                  {cat.links.map((item, j) => (
                    <li key={j}>
                      <Link href="#" className="text-sm font-bold text-white/60 hover:text-white transition-colors flex items-center group">
                        <span className="w-0 h-0.5 bg-accent mr-0 group-hover:w-3 group-hover:mr-3 transition-all" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                © 2026 BHOOMI NATIONAL LAND REGISTRY INFRASTRUCTURE
              </p>
              <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest mt-2">Department of Digital Realities • Ministry of Progress</p>
            </div>
            <div className="flex gap-10">
              {["Terms", "Privacy", "Security"].map((item) => (
                <Link key={item} href="#" className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hover:text-white transition-colors">{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
