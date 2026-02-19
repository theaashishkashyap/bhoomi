"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  Database, 
  Building2, 
  Lock 
} from "lucide-react";
import Link from "next/link";
import { useUI } from "@/context/UIContext";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "VERIFICATION",
    title: "Parcel Verified",
    desc: "Section 2B of Kharghar Industrial SEZ has passed institutional audit.",
    time: "2m ago",
    priority: "HIGH",
    icon: <ShieldCheck className="text-emerald-500" />
  },
  {
    id: 2,
    type: "SYSTEM",
    title: "Security Handshake",
    desc: "Your connection to the National Gateway has been rotated and secured.",
    time: "15m ago",
    priority: "MEDIUM",
    icon: <Lock className="text-blue-500" />
  },
  {
    id: 3,
    type: "REGISTRY",
    title: "New Public Tender",
    desc: "Gorakhpur Development Authority (GDA) has listed 14 new commercial nodes.",
    time: "1h ago",
    priority: "LOW",
    icon: <Building2 className="text-amber-500" />
  },
  {
    id: 4,
    type: "ALERT",
    title: "Node Maintenance",
    desc: "Geospatial Server GES-4 will undergo routine indexing at 02:00 UTC.",
    time: "4h ago",
    priority: "MEDIUM",
    icon: <AlertCircle className="text-slate-400" />
  }
];

export default function NotificationsPage() {
  const { nodeSync } = useUI();

  return (
    <main className="min-h-screen bg-mesh py-12 px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <Link href="/discover" className="btn-secondary-premium group !px-4 hover:scale-105 transition-all">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Registry Hub
          </Link>
          <div className="flex items-center gap-3">
             <div className={`w-2 h-2 rounded-full ${nodeSync ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
             <span className={`text-[10px] font-black uppercase tracking-widest ${nodeSync ? 'text-navy-trust' : 'text-red-500'}`}>
               {nodeSync ? 'Real-time Sync Active' : 'Synchronization Restricted'}
             </span>
          </div>
        </div>

        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-16 h-16 rounded-[2rem] bg-surface-dark text-white flex items-center justify-center shadow-2xl dark:bg-accent transition-colors">
                <Bell size={32} />
             </div>
             <div>
                <h1 className="text-5xl font-black text-navy-trust tracking-tighter">Notifications.</h1>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Institutional Alert System v4.0</p>
             </div>
          </div>
        </header>

        <div className="space-y-6">
          {NOTIFICATIONS.map((notif, i) => (
            <motion.div 
              key={notif.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-premium flex gap-8 p-10 hover:border-accent group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                {notif.icon}
              </div>
              <div className="flex-grow">
                 <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      notif.priority === 'HIGH' ? 'bg-red-500/10 text-red-500' : 
                      notif.priority === 'MEDIUM' ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      {notif.type} • {notif.priority}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                      <Clock size={12} />
                      {notif.time}
                    </span>
                 </div>
                 <h3 className="text-2xl font-black text-navy-trust mb-2 group-hover:text-accent transition-colors">{notif.title}</h3>
                 <p className="text-slate-500 font-medium text-base mb-6 leading-relaxed">{notif.desc}</p>
                 <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline flex items-center gap-1">
                      Acknowledge Node <ArrowRight size={12} />
                    </button>
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:underline">
                      View Audit Log
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-background-card rounded-[3rem] border border-slate-100 text-center shadow-3xl dark:border-slate-800 transition-colors">
           <div className="w-20 h-20 rounded-[2.5rem] bg-slate-50/10 flex items-center justify-center mx-auto mb-8">
              <Database size={32} className="text-accent" />
           </div>
           <h4 className="text-2xl font-black text-navy-trust mb-4">Registry Integrity Archived</h4>
           <p className="text-slate-400 font-medium mb-12">All notifications are immutably archived within the National Ledger.</p>
           <button className="btn-premium">Download Compliance Report</button>
        </div>
      </div>
    </main>
  );
}
