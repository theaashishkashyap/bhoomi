"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  ArrowLeft, 
  Shield, 
  Globe, 
  Cpu, 
  Database, 
  Bell, 
  Lock, 
  Eye, 
  Moon,
  Check,
  Zap,
  RefreshCw,
  Loader2,
  HardDrive,
  Network,
  Share2
} from "lucide-react";
import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { 
    darkMode, 
    nodeSync, 
    identityMasking, 
    toggleDarkMode, 
    toggleNodeSync, 
    toggleIdentityMasking 
  } = useUI();

  const [activeTab, setActiveTab] = useState("General");
  const [deploying, setDeploying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { user, token, updateUser } = useAuth();
  const [aadharInput, setAadharInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState("");

  const handleVerifyAadhar = async () => {
    if (aadharInput.length !== 12 || !/^\d+$/.test(aadharInput)) {
      setVerificationError("Please enter a valid 12-digit Aadhar number.");
      return;
    }
    setVerifying(true);
    setVerificationError("");
    setVerificationSuccess("");
    
    try {
      const res = await fetch("http://localhost:3001/api/users/verify-aadhar", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ aadharNumber: aadharInput })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Verification failed");
      }
      
      updateUser(data.data);
      setVerificationSuccess("Identity verified successfully!");
      setAadharInput("");
    } catch (err: any) {
      setVerificationError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  const toggleDisclosure = async () => {
    if (!user?.isAadharVerified) return;
    
    try {
      const res = await fetch("http://localhost:3001/api/users/toggle-identity-disclosure", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        }
      });
      
      const data = await res.json();
      if (res.ok) {
        updateUser(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const tabs = [
    { name: "General", icon: <Settings size={18} /> },
    { name: "Identity", icon: <Shield size={18} /> },
    { name: "Security & Keys", icon: <Lock size={18} /> },
    { name: "Geo-Processing", icon: <Globe size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
    { name: "Data Sovereignty", icon: <Database size={18} /> }
  ];

  const configOptions = [
    { key: "darkMode", label: "Institutional Dark Mode", desc: "Reduce eye strain during high-frequency data audits", icon: <Moon size={18}/>, active: darkMode, toggle: toggleDarkMode },
    { key: "nodeSync", label: "Real-time Node Sync", desc: "Instant updates from national gateway clusters", icon: <RefreshCw size={18}/>, active: nodeSync, toggle: toggleNodeSync },
    { key: "identityMasking", label: "Identity Shielding", desc: "Cryptographically hide your identity during initial discovery", icon: <Eye size={18}/>, active: identityMasking, toggle: toggleIdentityMasking },
    { key: "auditLogging", label: "Audit Event Streaming", desc: "Real-time logging of all registry interactions", icon: <Share2 size={18}/>, active: true, toggle: () => {} }
  ];

  const [loadingModules, setLoadingModules] = useState<Record<string, boolean>>({});
  const [localSettings, setLocalSettings] = useState<Record<string, boolean>>({
    "Hardware Node Key": true,
    "2FA Protocol Node": true,
    "API Rotation Cycle": false,
    "High-Fidelity LIDAR": true,
    "Satellite Buffer Pulse": true,
    "Geo-Fence Alerts": false,
    "Protocol Change Alerts": true,
    "Handshake Request Nodes": true,
    "Email Audit Digests": false,
    "Local Data Sovereignty": true,
    "Gateway Sharding": false,
    "Audit Log Masking": true
  });

  const toggleLocalSetting = (label: string) => {
    setLocalSettings(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleTabChange = (name: string) => {
    setActiveTab(name);
    if (name !== "General" && !loadingModules[name]) {
      setLoadingModules(prev => ({ ...prev, [name]: true }));
      setTimeout(() => {
        setLoadingModules(prev => ({ ...prev, [name]: false }));
      }, 1500);
    }
  };

  const securityOptions = [
    { label: "Hardware Node Key", desc: "Physical security key requirement for registry access", icon: <HardDrive size={18}/>, active: localSettings["Hardware Node Key"] },
    { label: "2FA Protocol Node", desc: "Multi-factor handshake for every land transaction", icon: <Shield size={18}/>, active: localSettings["2FA Protocol Node"] },
    { label: "API Rotation Cycle", desc: "Auto-rotate national registry access keys every 24h", icon: <RefreshCw size={18}/>, active: localSettings["API Rotation Cycle"] }
  ];

  const geoOptions = [
    { label: "High-Fidelity LIDAR", desc: "Access 1:1000 scale geospatial depth maps", icon: <Globe size={18}/>, active: localSettings["High-Fidelity LIDAR"] },
    { label: "Satellite Buffer Pulse", desc: "Refresh frequency for real-time boundary monitoring", icon: <Zap size={18}/>, active: localSettings["Satellite Buffer Pulse"] },
    { label: "Geo-Fence Alerts", desc: "Instant notification on boundary encroachments", icon: <Bell size={18}/>, active: localSettings["Geo-Fence Alerts"] }
  ];

  const notificationOptions = [
    { label: "Protocol Change Alerts", desc: "Notify on any federal land policy updates", icon: <Bell size={18}/>, active: localSettings["Protocol Change Alerts"] },
    { label: "Handshake Request Nodes", desc: "Browser push for new buyer interest identity nodes", icon: <Share2 size={18}/>, active: localSettings["Handshake Request Nodes"] },
    { label: "Email Audit Digests", desc: "Daily summary of all registry nodal activities", icon: <Database size={18}/>, active: localSettings["Email Audit Digests"] }
  ];

  const sovereigntyOptions = [
    { label: "Local Data Sovereignty", desc: "Store all registry extracts only on your hardware node", icon: <HardDrive size={18}/>, active: localSettings["Local Data Sovereignty"] },
    { label: "Gateway Sharding", desc: "Enable multi-hop data routing for enhanced privacy", icon: <Network size={18}/>, active: localSettings["Gateway Sharding"] },
    { label: "Audit Log Masking", desc: "Obfuscate sensitive identity nodes in shared audit logs", icon: <Eye size={18}/>, active: localSettings["Audit Log Masking"] }
  ];

  return (
    <main className="min-h-screen bg-mesh py-12 px-6 transition-colors duration-500">
      <AnimatePresence>
        {deploying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface-dark/90 backdrop-blur-xl flex flex-col items-center justify-center text-white"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-8"
            >
              <Loader2 size={80} className="text-accent" />
            </motion.div>
            <h2 className="text-4xl font-black tracking-tighter mb-4">Synchronizing System Protocols</h2>
            <p className="text-white/50 font-bold uppercase tracking-[0.4em] text-xs">Propagating Changes across 8 National Nodes</p>
            <div className="mt-12 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }} className="h-full bg-accent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <Link href="/discover" className="btn-secondary-premium group !px-4 hover:scale-105 transition-all">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-[10px] font-black uppercase text-navy-trust">
                <Network size={14} className="text-accent" />
                Latency: 14ms
             </div>
             <div className="glass px-6 py-2 rounded-full border border-white/40 shadow-xl">
                <span className="text-[10px] font-black text-navy-trust uppercase tracking-widest">Node ID: BHM-01-TX</span>
             </div>
          </div>
        </div>

        <header className="mb-20">
          <div className="flex items-center gap-6 mb-8">
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="w-24 h-24 rounded-[3rem] bg-surface-dark text-white flex items-center justify-center shadow-4xl dark:bg-accent transition-colors">
                <Settings size={44} />
             </motion.div>
             <div>
                <h1 className="text-7xl font-black text-navy-trust tracking-tighter">System Console.</h1>
                <div className="flex items-center gap-3 mt-2">
                   <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.3em]">Core Configuration Terminal</p>
                   <span className="px-2 py-0.5 bg-emerald-100/10 text-emerald-500 text-[8px] font-black uppercase rounded tracking-widest border border-emerald-500/20">Active Sync</span>
                </div>
             </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-16">
           <div className="lg:col-span-4 space-y-4">
              <div className="glass p-4 rounded-[2.5rem] border border-white/40 shadow-2xl">
                {tabs.map((tab) => (
                  <button 
                    key={tab.name}
                    onClick={() => handleTabChange(tab.name)}
                    className={`nav-item !w-full !px-8 !py-5 mb-2 ${
                      activeTab === tab.name ? 'active !bg-surface-dark !text-white shadow-xl translate-x-2' : ''
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </div>
              <div className="mt-8 p-8 bg-accent/10 rounded-[2rem] border border-accent/20">
                 <div className="flex items-center gap-3 mb-4"><Zap size={18} className="text-accent" /><span className="text-[10px] font-black uppercase tracking-widest text-accent">Node Performance</span></div>
                 <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6">Efficiency: 98%. All L1 protocols are green.</p>
                 <button className="text-[10px] font-black text-navy-trust uppercase tracking-widest flex items-center gap-2 hover:underline">Diagnostic Run <RefreshCw size={12} /></button>
              </div>
           </div>

           <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                 <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                    <section className="card-premium p-12 relative overflow-hidden">
                       <h2 className="text-3xl font-black text-navy-trust mb-12 flex items-center gap-4 relative z-10"><Database size={28} className="text-accent" />{activeTab} Protocols</h2>
                        <div className="space-y-6 relative z-10">
                           {loadingModules[activeTab] ? (
                             <div className="py-20 text-center">
                               <div className="w-20 h-20 rounded-[2rem] bg-slate-50/10 flex items-center justify-center mx-auto mb-8"><Loader2 size={32} className="text-accent animate-spin" /></div>
                               <h3 className="text-2xl font-black text-navy-trust mb-2">Module Initializing</h3>
                               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Handshake with {activeTab} Node in progress...</p>
                             </div>
                           ) : (
                             <>
                               {activeTab === "General" && configOptions.map((setting, i) => (
                                 <div key={i} className="flex items-center justify-between p-8 bg-slate-50/10 rounded-[2rem] border border-slate-100/50 hover:border-accent/40 transition-all group">
                                    <div className="flex items-center gap-6">
                                       <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-navy-trust shadow-sm group-hover:scale-110 transition-transform">{setting.icon}</div>
                                       <div><p className="font-black text-navy-trust text-xl mb-1">{setting.label}</p><p className="text-xs font-semibold text-slate-400">{setting.desc}</p></div>
                                    </div>
                                    <button onClick={setting.toggle} className={`w-16 h-9 rounded-full relative transition-all duration-500 ease-in-out cursor-pointer p-1 ${setting.active ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-200/20'}`}>
                                       <motion.div animate={{ x: setting.active ? 28 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-7 h-7 rounded-full bg-white shadow-md" />
                                    </button>
                                 </div>
                               ))}

                               {activeTab === "Security & Keys" && securityOptions.map((setting, i) => (
                                 <div key={i} className="flex items-center justify-between p-8 bg-slate-50/10 rounded-[2rem] border border-slate-100/50 hover:border-accent/40 transition-all group">
                                    <div className="flex items-center gap-6">
                                       <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-navy-trust shadow-sm group-hover:scale-110 transition-transform">{setting.icon}</div>
                                       <div><p className="font-black text-navy-trust text-xl mb-1">{setting.label}</p><p className="text-xs font-semibold text-slate-400">{setting.desc}</p></div>
                                    </div>
                                    <button onClick={() => toggleLocalSetting(setting.label)} className={`w-16 h-9 rounded-full relative transition-all duration-500 ease-in-out cursor-pointer p-1 ${setting.active ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-200/20'}`}>
                                       <motion.div animate={{ x: setting.active ? 28 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-7 h-7 rounded-full bg-white shadow-md" />
                                    </button>
                                 </div>
                               ))}

                               {activeTab === "Geo-Processing" && geoOptions.map((setting, i) => (
                                 <div key={i} className="flex items-center justify-between p-8 bg-slate-50/10 rounded-[2rem] border border-slate-100/50 hover:border-accent/40 transition-all group">
                                    <div className="flex items-center gap-6">
                                       <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-navy-trust shadow-sm group-hover:scale-110 transition-transform">{setting.icon}</div>
                                       <div><p className="font-black text-navy-trust text-xl mb-1">{setting.label}</p><p className="text-xs font-semibold text-slate-400">{setting.desc}</p></div>
                                    </div>
                                    <button onClick={() => toggleLocalSetting(setting.label)} className={`w-16 h-9 rounded-full relative transition-all duration-500 ease-in-out cursor-pointer p-1 ${setting.active ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-200/20'}`}>
                                       <motion.div animate={{ x: setting.active ? 28 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-7 h-7 rounded-full bg-white shadow-md" />
                                    </button>
                                 </div>
                               ))}

                               {activeTab === "Notifications" && notificationOptions.map((setting, i) => (
                                 <div key={i} className="flex items-center justify-between p-8 bg-slate-50/10 rounded-[2rem] border border-slate-100/50 hover:border-accent/40 transition-all group">
                                    <div className="flex items-center gap-6">
                                       <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-navy-trust shadow-sm group-hover:scale-110 transition-transform">{setting.icon}</div>
                                       <div><p className="font-black text-navy-trust text-xl mb-1">{setting.label}</p><p className="text-xs font-semibold text-slate-400">{setting.desc}</p></div>
                                    </div>
                                    <button onClick={() => toggleLocalSetting(setting.label)} className={`w-16 h-9 rounded-full relative transition-all duration-500 ease-in-out cursor-pointer p-1 ${setting.active ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-200/20'}`}>
                                       <motion.div animate={{ x: setting.active ? 28 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-7 h-7 rounded-full bg-white shadow-md" />
                                    </button>
                                 </div>
                               ))}

                               {activeTab === "Data Sovereignty" && sovereigntyOptions.map((setting, i) => (
                                 <div key={i} className="flex items-center justify-between p-8 bg-slate-50/10 rounded-[2rem] border border-slate-100/50 hover:border-accent/40 transition-all group">
                                    <div className="flex items-center gap-6">
                                       <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-navy-trust shadow-sm group-hover:scale-110 transition-transform">{setting.icon}</div>
                                       <div><p className="font-black text-navy-trust text-xl mb-1">{setting.label}</p><p className="text-xs font-semibold text-slate-400">{setting.desc}</p></div>
                                    </div>
                                    <button onClick={() => toggleLocalSetting(setting.label)} className={`w-16 h-9 rounded-full relative transition-all duration-500 ease-in-out cursor-pointer p-1 ${setting.active ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-200/20'}`}>
                                       <motion.div animate={{ x: setting.active ? 28 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-7 h-7 rounded-full bg-white shadow-md" />
                                    </button>
                                 </div>
                               ))}
                           {activeTab === "Identity" && (
                              <div className="space-y-8">
                                <div className="p-8 bg-slate-50/10 rounded-[2rem] border border-slate-100/50 hover:border-accent/40 transition-all">
                                  <div className="flex items-center gap-6 mb-8">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${user?.isAadharVerified ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                                      <Shield size={32} />
                                    </div>
                                    <div>
                                      <h3 className="text-2xl font-black text-navy-trust mb-1">Identity Verification</h3>
                                      <p className="text-sm font-semibold text-slate-400">Secure your account with Aadhar linkage.</p>
                                    </div>
                                    {user?.isAadharVerified && (
                                      <div className="ml-auto px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-xl border border-emerald-500/20 flex items-center gap-2">
                                        <Check size={16} strokeWidth={3} />
                                        <span className="text-xs font-black uppercase tracking-widest">Verified</span>
                                      </div>
                                    )}
                                  </div>

                                  {!user?.isAadharVerified ? (
                                    <div className="max-w-xl">
                                      <p className="mb-6 text-sm text-slate-500 font-medium leading-relaxed">
                                        To enable secure transactions (Buy/Sell) on the BHOOMI protocol, you must verify your identity. This adds a layer of trust and accountability to the registry.
                                      </p>
                                      <div className="flex gap-4">
                                        <div className="flex-1 relative">
                                          <input 
                                            type="text" 
                                            placeholder="Enter 12-digit Aadhar Number" 
                                            className="w-full px-6 py-4 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:border-accent font-mono text-navy-trust placeholder:text-slate-400"
                                            value={aadharInput}
                                            onChange={(e) => setAadharInput(e.target.value)}
                                            maxLength={12}
                                            disabled={verifying}
                                          />
                                        </div>
                                        <button 
                                          onClick={handleVerifyAadhar} 
                                          disabled={verifying || aadharInput.length !== 12}
                                          className="px-8 py-4 bg-accent text-white font-black uppercase tracking-wider text-xs rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                          {verifying ? <Loader2 className="animate-spin" size={16} /> : "Verify Identity"}
                                        </button>
                                      </div>
                                      {verificationError && (
                                        <p className="mt-4 text-xs font-bold text-rose-500 flex items-center gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                          {verificationError}
                                        </p>
                                      )}
                                      {verificationSuccess && (
                                        <p className="mt-4 text-xs font-bold text-emerald-500 flex items-center gap-2">
                                          <Check size={14} strokeWidth={3} />
                                          {verificationSuccess}
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="space-y-8">
                                      <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start gap-4">
                                        <div className="pt-1"><Check size={20} className="text-emerald-500" strokeWidth={3} /></div>
                                        <div>
                                          <p className="font-bold text-navy-trust mb-1">Verification Complete</p>
                                          <p className="text-xs text-slate-500 mb-2">Your identity has been cryptographically linked to your account.</p>
                                          <p className="font-mono text-sm text-slate-600 bg-white/50 inline-block px-3 py-1 rounded border border-emerald-200">
                                            Aadhar: XXXX-XXXX-{user.aadharNumber?.slice(-4)}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      <div className="pt-8 border-t border-slate-200/50">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="font-black text-navy-trust text-lg mb-1">Public Disclosure</p>
                                            <p className="text-xs font-semibold text-slate-400">Allow other verified users (buyers/sellers) to see your identity.</p>
                                          </div>
                                          <button 
                                            onClick={toggleDisclosure} 
                                            className={`w-16 h-9 rounded-full relative transition-all duration-500 ease-in-out cursor-pointer p-1 ${user.showIdentity ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-200/20'}`}
                                          >
                                            <motion.div 
                                              animate={{ x: user.showIdentity ? 28 : 0 }} 
                                              transition={{ type: "spring", stiffness: 500, damping: 30 }} 
                                              className="w-7 h-7 rounded-full bg-white shadow-md" 
                                            />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                           )}

                             </>
                           )}
                       </div>
                    </section>
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-between p-10 glass rounded-[3rem] border border-white/40 shadow-4xl relative overflow-hidden group">
           <AnimatePresence>{showSuccess && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute inset-x-0 bottom-full mb-6 flex justify-center"><div className="bg-emerald-500 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3"><Check size={16} strokeWidth={4} /> Protocol Synchronized Successfully</div></motion.div>)}</AnimatePresence>
           <div className="flex items-center gap-6 mb-8 md:mb-0"><div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500 text-white flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform"><Check size={32} strokeWidth={3} /></div><div><p className="text-xl font-black text-navy-trust tracking-tight mb-1">Configuration Prepared.</p><p className="text-xs font-semibold text-slate-400">Updates ready for national deployment.</p></div></div>
           <button onClick={handleDeploy} disabled={deploying} className="btn-premium px-12 py-5 text-lg flex items-center gap-4 group/btn overflow-hidden transition-colors"><span className="relative z-10">Deploy System Updates</span><RefreshCw size={20} className={`z-10 group-hover/btn:rotate-180 transition-transform ${deploying ? 'animate-spin' : ''}`} /></button>
        </div>
      </div>
    </main>
  );
}
