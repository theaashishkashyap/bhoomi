"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  Landmark, 
  Maximize, 
  FileImage, 
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText,
  BadgeCent,
  Layers,
  Globe
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function NewListingPage() {
  const router = useRouter();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "PRIVATE",
    purpose: "SALE",
    location: "",
    state: "",
    area: "",
    areaUnit: "sq ft",
    price: "",
    authority: "",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=800"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          area: parseFloat(formData.area),
          price: parseFloat(formData.price || "0"),
          sellerId: user?.id
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/discover/${data.data.id}`);
      } else {
        alert(data.message || "Failed to create listing");
      }
    } catch (err) {
      console.error(err);
      alert("System synchronisation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mesh py-20 px-6">
      <div className="container max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-surface-dark text-white flex items-center justify-center font-black">B</div>
               <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Protocol v2.0</span>
            </div>
            <h1 className="text-5xl font-black text-navy-trust tracking-tighter mb-4 leading-tight">Registry Submission</h1>
            <p className="text-slate-500 text-lg font-medium">Provision a new validated land parcel cluster to the national infrastructure.</p>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-background-card rounded-2xl border border-slate-100 shadow-soft dark:border-white/10">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-trust">Sync: High Priority</span>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid gap-12">
          {/* Section 1: Core Institutional Details */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="card-premium relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500/5 blur-[60px] -mr-10 -mt-10" />
            
            <h3 className="text-2xl font-black text-navy-trust mb-10 flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-accent shadow-sm">
                 <Building2 size={24} />
               </div>
               Primary Allocation Logic
            </h3>
            
            <div className="grid gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Title of Asset Node</label>
                <div className="relative group/field">
                  <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="e.g. Industrial Expansion Zone - Plot 4" 
                    className="registry-input !pl-16 shadow-inner" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Institutional Category</label>
                  <div className="relative group/field">
                    <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={20} />
                    <select 
                      className="registry-input !pl-16 appearance-none" 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="PRIVATE">Private / Commercial</option>
                      <option value="GOVERNMENT">Government / Institutional</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Provisioning Purpose</label>
                  <div className="relative group/field">
                    <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={20} />
                    <select 
                      className="registry-input !pl-16 appearance-none" 
                      value={formData.purpose}
                      onChange={e => setFormData({...formData, purpose: e.target.value})}
                    >
                      <option value="SALE">Outright Sale</option>
                      <option value="LEASE">Term Lease</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Asset Description Protocol</label>
                <textarea 
                  rows={4} 
                  placeholder="Describe zoning details, soil type, accessibility and utility handshake clusters..." 
                  className="registry-input !min-h-[160px] shadow-inner" 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Estimated Valuation (INR)</label>
                <div className="relative group/field">
                  <BadgeCent className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={20} />
                  <input 
                    type="number" 
                    placeholder="e.g. 75000000 (7.5 Cr)" 
                    className="registry-input !pl-16 shadow-inner" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Geospatial Attributes */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="card-premium relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-emerald-500/5 blur-[60px] -mr-10 -mt-10" />
            
            <h3 className="text-2xl font-black text-navy-trust mb-10 flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm">
                 <Globe size={24} />
               </div>
               Geospatial Coordinate Matrix
            </h3>
            
            <div className="grid gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">City / Primary Node</label>
                  <div className="relative group/field">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="e.g. Whitefield Cluster" 
                      className="registry-input !pl-16 shadow-inner" 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">National State</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Karnataka" 
                    className="registry-input shadow-inner px-6" 
                    value={formData.state}
                    onChange={e => setFormData({...formData, state: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Total Metric Area</label>
                  <div className="relative group/field">
                    <Maximize className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={20} />
                    <input 
                      type="number" 
                      placeholder="2400" 
                      className="registry-input !pl-16 shadow-inner" 
                      value={formData.area}
                      onChange={e => setFormData({...formData, area: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Unit Protocol</label>
                  <select 
                    className="registry-input shadow-inner px-6" 
                    value={formData.areaUnit}
                    onChange={e => setFormData({...formData, areaUnit: e.target.value})}
                  >
                    <option value="sq ft">Square Feet</option>
                    <option value="sq m">Square Meters</option>
                    <option value="Acres">Acres</option>
                    <option value="Hectares">Hectares</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Licensing Authority Cluster</label>
                <div className="relative group/field">
                  <Landmark className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="e.g. BBMP / CIDCO / Revenue Dept" 
                    className="registry-input !pl-16 shadow-inner" 
                    value={formData.authority}
                    onChange={e => setFormData({...formData, authority: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Sovereign Data Image (URL)</label>
                <div className="relative group/field">
                  <FileImage className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Institutional image node URL..." 
                    className="registry-input !pl-16 shadow-inner" 
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-10 bg-surface-dark p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800')] bg-cover"></div>
             <div className="w-20 h-20 rounded-[2rem] bg-white/10 flex items-center justify-center text-emerald-400 shadow-glow-blue border border-white/10 shrink-0 relative z-10">
                <ShieldCheck size={40} />
             </div>
             <div className="relative z-10">
                <h4 className="text-xl font-black text-white mb-2 tracking-tight">Data Sovereignty Compliance</h4>
                <p className="text-white/60 text-sm font-medium leading-relaxed">
                  By submitting this parcel node, you agree to the national registry protocols. Your record will enter the institutional verification cluster immediately for audit.
                </p>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-premium w-full py-6 text-xl shadow-[0_30px_60px_-15px_rgba(10,29,55,0.3)] group"
          >
            {loading ? "Synchronizing with Cluster..." : "Authorized Resource Provisioning"} 
            <ArrowRight size={24} className="ml-3 group-hover:translate-x-3 transition-transform" />
          </button>
        </form>
      </div>
    </main>
  );
}
