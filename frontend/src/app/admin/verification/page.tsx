"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  User, 
  ArrowRight,
  Database,
  Search,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  LayoutDashboard,
  Settings,
  Bell,
  Calendar,
  Lock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminVerificationPage() {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setVerifications(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch verifications:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchVerifications();
  }, [token]);

  const handleStatusChange = async (id: string, status: string) => {
    const adminReview = prompt("Enter institutional review notes:") || "";
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifications/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, adminReview }),
      });
      const data = await response.json();
      if (data.success) {
        setVerifications(prev => prev.map(v => v.id === id ? { ...v, status, adminReview } : v));
      }
    } catch (err) {
      alert("System synchronisation failed. Please verify auth token.");
    }
  };

  return (
    <div className="flex min-h-screen bg-mesh">
      {/* 1. ADMIN SIDEBAR */}
      <aside className="dashboard-sidebar glass sticky top-0">
        <Link href="/" className="flex items-center gap-3 mb-16 px-2">
          <div className="w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center text-white font-black text-xl shadow-xl shadow-slate-900/10">B</div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-navy-trust">BHOOMI</h1>
            <p className="text-[9px] font-black text-accent uppercase tracking-widest">Admin Control</p>
          </div>
        </Link>

        <nav className="flex flex-col gap-2 mb-auto">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">System Nodes</p>
          
          <Link href="/admin/verification" className="nav-item active">
            <ShieldCheck size={18} /> 
            <span>Verification Queue</span>
          </Link>
          
          <Link href="/discover" className="nav-item">
            <LayoutDashboard size={18} /> 
            <span>Registry Explorer</span>
          </Link>

          <Link href="/verification" className="nav-item">
            <Lock size={18} />
            <span>Identity Node</span>
          </Link>

          <div className="mt-12">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">Management</p>
            <Link href="/notifications" className="nav-item w-full font-black">
              <Bell size={18} /> Alerts Cluster
            </Link>
            <Link href="/settings" className="nav-item w-full font-black">
              <Settings size={18} /> Global Attributes
            </Link>
          </div>
        </nav>

        <div className="mt-10 p-6 bg-surface-dark rounded-[2rem] text-white relative overflow-hidden group shadow-glow-blue transition-all duration-500">
           <div className="relative z-10">
              <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-2">Internal Security</p>
              <p className="text-xs font-bold leading-relaxed">Admin Level 3 Verification Required for changes.</p>
           </div>
           <div className="absolute right-[-10%] bottom-[-10%] opacity-10">
              <ShieldCheck size={100} />
           </div>
        </div>
      </aside>

      {/* 2. MAIN ADMIN CONTENT */}
      <main className="flex-grow p-12 lg:p-20">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
          <div>
            <h2 className="text-5xl font-black tracking-tighter text-navy-trust mb-3 underline decoration-accent/20 decoration-8 underline-offset-8">Verification Cluster</h2>
            <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               Nationwide Compliance Handshake Active
            </div>
          </div>

          <div className="flex gap-6">
             <div className="glass p-6 rounded-[2rem] border border-white/60 shadow-soft min-w-[180px]">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <Clock size={12} className="text-amber-500" /> Pending Requests
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-navy-trust">{verifications.filter(v => v.status === 'PENDING').length}</p>
                  <p className="text-xs font-bold text-amber-500">+2 since last sync</p>
                </div>
             </div>
             <div className="glass p-6 rounded-[2rem] border border-white/60 shadow-soft min-w-[180px]">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <TrendingUp size={12} className="text-accent" /> System Health
                </p>
                <p className="text-3xl font-black text-navy-trust">99.8%</p>
             </div>
          </div>
        </header>

        {/* SEARCH & FILTERS AREA */}
        <section className="glass rounded-[2.5rem] p-8 mb-16 border border-white/60 shadow-soft dark:border-white/10">
           <div className="relative group max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Synchronize searching across all pending parcel IDs..." 
                className="registry-input !pl-16 bg-background-card/50"
              />
           </div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin shadow-glow-blue"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Fetching Institutional Queue...</p>
          </div>
        ) : (
          <div className="grid gap-10">
            <AnimatePresence>
              {verifications.map((v, index) => (
                <motion.div 
                  key={v.id} 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="card-premium grid md:grid-cols-12 gap-10 items-center hover:border-accent/10"
                >
                  <div className="md:col-span-8">
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`stat-badge !text-[9px] !py-1.5 !px-4 ${
                        v.status === 'PENDING' ? 'badge-amber' :
                        v.status === 'VERIFIED' ? 'badge-emerald' :
                        'badge-rose'
                      }`}>
                        {v.status} REQUEST
                      </span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={12} /> Sync: {new Date(v.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-black text-navy-trust mb-2 tracking-tight">{v.listing?.title || "Unknown Land Asset"}</h3>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-bold mb-8">
                      <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100"><User size={16} className="text-accent" /> {v.seller?.name || "Anonymous Node"}</span>
                      <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100"><FileText size={16} className="text-accent" /> ID Hash: {v.id.split('-')[0]}</span>
                    </div>

                    <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-dashed border-slate-200 text-sm text-navy-trust font-medium relative group/review">
                       <CheckCircle size={16} className="absolute top-[-8px] right-6 text-emerald-500 bg-white rounded-full" />
                       <p className="italic">{v.adminReview || "System waiting for institutional review notes. Pending node authorization."}</p>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex flex-col gap-4">
                    {v.status === 'PENDING' ? (
                      <div className="space-y-4">
                        <button 
                          onClick={() => handleStatusChange(v.id, 'VERIFIED')}
                          className="btn-premium w-full !bg-emerald-600 !shadow-emerald-500/10 hover:!bg-emerald-700"
                        >
                          <CheckCircle2 size={18} className="mr-2" /> 
                          Authorize Node
                        </button>
                        <button 
                          onClick={() => handleStatusChange(v.id, 'REJECTED')}
                          className="btn-secondary-premium w-full !text-rose-600 !border-rose-100 hover:!bg-rose-50"
                        >
                          <AlertCircle size={18} className="mr-2" /> 
                          Decline Request
                        </button>
                      </div>
                    ) : (
                      <div className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center text-center">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${v.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                           {v.status === 'VERIFIED' ? <CheckCircle2 /> : <XCircle />}
                         </div>
                         <p className="text-xs font-black uppercase tracking-widest text-slate-400">Final Handshake Complete</p>
                      </div>
                    )}
                    <Link href={`/discover/${v.listingId}`} target="_blank" className="btn-secondary-premium w-full text-center group">
                      Inspect Asset <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {verifications.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 glass rounded-[3rem] border border-white/40 shadow-soft"
              >
                <Clock size={80} className="mx-auto text-slate-200 mb-8 animate-pulse" />
                <h3 className="text-2xl font-black text-navy-trust mb-2">Queue Is Synchronized</h3>
                <p className="text-slate-400 font-medium tracking-tight">All pending verification nodes have been processed by the central authority.</p>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
