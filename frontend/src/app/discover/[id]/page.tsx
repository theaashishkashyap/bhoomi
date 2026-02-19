"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  Scale, 
  Calendar, 
  Lock, 
  Phone, 
  Mail, 
  Info,
  CheckCircle2,
  TrendingUp,
  Building2,
  Fingerprint,
  Link as LinkIcon,
  Search,
  Globe,
  Navigation,
  MessageSquare,
  ArrowRight,
  Share2,
  Bookmark,
  FileCheck,
  User
} from "lucide-react";
import dynamic from "next/dynamic";
import { LandListing } from "@/data/mockListings";
import { useAuth } from "@/context/AuthContext";
import PriceTrendChart from "@/components/PriceTrendChart";
import DemandBadge from "@/components/DemandBadge";

const InteractiveMap = dynamic<any>(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4 shadow-glow-blue"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Synchronizing Geospatial Node...</p>
    </div>
  )
});

export default function ListingDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const listingId = params.id as string;
  const { token } = useAuth();
  
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contactRevealed, setContactRevealed] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [proposalLoading, setProposalLoading] = useState(false);
  const [activeProtocolDetail, setActiveProtocolDetail] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/${listingId}`);
        const result = await response.json();
        if (result.success) {
          setListing(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      } finally {
        setLoading(false);
      }
    };

    if (listingId) fetchListing();
  }, [listingId]);

  const handleReveal = () => {
    setRequestLoading(true);
    setTimeout(() => {
      setContactRevealed(true);
      setRequestLoading(false);
    }, 2000);
  };

  const handleProposal = async () => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    setProposalLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}`);
      }

      alert("Formal Proposal Submitted! The institutional custodian will review your credentials.");
    } catch (err: any) {
      alert(err.message || "An error occurred. Please check your connection.");
    } finally {
      setProposalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh">
         <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin shadow-glow-blue"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center max-w-sm card-premium">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8">
             <Info size={40} />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tighter text-navy-trust">Object Not Located</h2>
          <p className="text-slate-500 font-medium mb-10">The requested registry node could not be synchronized with the central cluster.</p>
          <Link href="/discover" className="btn-premium w-full">Return to Explorer</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-mesh pb-32">
      <AnimatePresence>
        {activeProtocolDetail && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          >
            <div 
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
              onClick={() => setActiveProtocolDetail(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                      {activeProtocolDetail === 'LEASE' && <Scale size={24} />}
                      {activeProtocolDetail === 'ELIGIBILITY' && <Fingerprint size={24} />}
                      {activeProtocolDetail === 'IDENTITY' && <User size={24} />}
                      {activeProtocolDetail === 'GOVERNANCE' && <ShieldCheck size={24} />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-navy-trust tracking-tight uppercase">
                        {activeProtocolDetail === 'LEASE' && "Full Lease Disclosure"}
                        {activeProtocolDetail === 'ELIGIBILITY' && "Institutional Eligibility"}
                        {activeProtocolDetail === 'IDENTITY' && "Buyer Identity Protocol"}
                        {activeProtocolDetail === 'GOVERNANCE' && "Governance & Audit"}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Node: {listingId.slice(0, 8)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveProtocolDetail(null)}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  {activeProtocolDetail === 'LEASE' && (
                    <div className="space-y-6">
                      <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-900 mb-2">Primary Duration</h4>
                        <p className="text-xl font-black text-blue-900">{listing.leaseTerms?.match(/\d+ Year/) || "Indeterminate"} Lease Period</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Key Provisions</h4>
                        <ul className="grid grid-cols-1 gap-3">
                          {[
                            "Monthly/Quarterly payment nodes available",
                            "Automatic renewal handshake protocols",
                            "Sub-leasing restricted to subsidiary clusters",
                            "Sovereign audit access required"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <CheckCircle2 size={16} className="text-emerald-500" />
                              <span className="text-sm font-bold text-navy-trust">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeProtocolDetail === 'ELIGIBILITY' && (
                    <div className="space-y-6">
                       <p className="text-sm font-medium text-slate-500 bg-slate-50 p-6 rounded-2xl italic leading-relaxed">
                         "{listing.eligibilityRules}"
                       </p>
                       <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Required Document Nodes (Lease)</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Institutional Registration Node",
                            "3Y Credential Financials",
                            "Authorized Signatory KYC",
                            "Proposed Utilization vision",
                            "Environmental clearance",
                            "GST/Tax node status"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
                              <FileCheck size={16} className="text-indigo-500" />
                              <span className="text-xs font-black text-indigo-900 uppercase tracking-tight">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProtocolDetail === 'IDENTITY' && (
                    <div className="space-y-6">
                       <div className="p-6 bg-violet-50/50 rounded-2xl border border-violet-100 flex items-center gap-4">
                          <Building2 className="text-violet-500" size={32} />
                          <div>
                            <h4 className="text-[10px] font-black text-violet-900 uppercase tracking-widest">Master Identity Chain</h4>
                            <p className="text-sm font-bold text-violet-800 leading-tight">Identity of the buyer must be cryptographically verified against national registry.</p>
                          </div>
                       </div>
                       <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mandatory Sale Documents</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            "Property Title Deed Extract (Previous)",
                            "National PAN/Digital Identity Node",
                            "Institutional / Corporate Deed",
                            "Proof of Funds Node (Bank Ledger)",
                            "Encumbrance Certificate Q4 2025"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-3">
                                <FileCheck size={18} className="text-accent" />
                                <span className="text-sm font-bold text-navy-trust">{item}</span>
                              </div>
                              <span className="text-[9px] font-black text-accent uppercase tracking-widest">Required</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProtocolDetail === 'GOVERNANCE' && (
                    <div className="space-y-6">
                       <p className="text-sm font-medium text-slate-500 bg-slate-50 p-6 rounded-2xl italic leading-relaxed">
                         "{listing.additionalDetails || "This asset is subject to enhanced federal oversight and periodic registry synchronization."}"
                       </p>
                       <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Compliance Safeguards</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            "Bi-annual Geospatial Boundary Audit",
                            "Anti-corruption Transactional Sharding",
                            "Institutional Use-case Monitoring",
                            "Public Utility Resource quotas"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-colors hover:bg-white">
                              <ShieldCheck size={18} className="text-blue-500" />
                              <span className="text-sm font-bold text-navy-trust">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex gap-4">
                  <button 
                    onClick={() => setActiveProtocolDetail(null)}
                    className="flex-1 py-4 rounded-2xl bg-navy-trust text-white font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all"
                  >
                    Close Protocol
                  </button>
                  <button className="flex-1 py-4 rounded-2xl border border-slate-200 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-navy-trust transition-all">
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 1. TOP UTILITY NAV */}
      <nav className="glass sticky top-0 z-[100] border-b border-white/40 dark:border-white/10">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/discover" className="flex items-center gap-4 text-sm font-bold text-slate-500 hover:text-navy-trust transition-all group">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:bg-slate-50 shadow-sm transition-all">
              <ArrowLeft size={18} />
            </div>
            Back to Registry Cluster
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/50 rounded-xl border border-white/40">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Node</span>
               <span className="text-[10px] font-black text-navy-trust select-all">{listingId}</span>
            </div>
            <div className="flex items-center gap-2">
               <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-navy-trust transition-all shadow-sm">
                 <Bookmark size={18} />
               </button>
               <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-navy-trust transition-all shadow-sm">
                 <Share2 size={18} />
               </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="container pt-16">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(10,29,55,0.15)] bg-slate-100 mb-16 border-[12px] border-background-card relative group"
            >
              <img 
                src={listing.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=1200"} 
                alt={listing.title} 
                className="w-full h-full object-cover aspect-[21/10] transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=1200";
                }}
              />
              <div className="absolute top-10 left-10">
                 <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3 border border-white/40 shadow-2xl">
                    <ShieldCheck className="text-emerald-500" size={20} />
                    <span className="text-xs font-black text-navy-trust uppercase tracking-[0.2em]">Verified Institutional Record</span>
                 </div>
              </div>
            </motion.div>

            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                 <span className={`stat-badge !text-xs !py-1.5 !px-4 ${listing.category === 'GOVERNMENT' ? 'badge-blue' : 'badge-emerald'}`}>
                   {listing.category} ASSET
                 </span>
                 <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Digital India Framework v2.0</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.9] text-navy-trust">{listing.title}</h1>
              <div className="flex flex-wrap gap-6">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-slate-100 font-bold text-sm shadow-sm">
                  <MapPin size={18} className="text-accent" />
                  {listing.location}, {listing.state}
                </div>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-slate-100 font-bold text-sm shadow-sm">
                  <Building2 size={18} className="text-accent" />
                  Managed by <span className="text-navy-trust ml-1 font-black">{listing.authority}</span>
                </div>
              </div>
            </div>

            {/* SPECS GRID */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
              {[
                { label: "Parcel Area", value: `${listing.area} ${listing.areaUnit}`, icon: <Scale size={24} />, color: "text-blue-500", bg: "bg-blue-50" },
                { label: "Institutional Tier", value: listing.category, icon: <ShieldCheck size={24} />, color: "text-emerald-500", bg: "bg-emerald-50" },
                { label: "Compliance Audit", value: "Q1 2026 Sync", icon: <Calendar size={24} />, color: "text-amber-500", bg: "bg-amber-50" }
              ].map((s, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className="card-premium border-none shadow-soft"
                >
                  <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center ${s.color} mb-6 shadow-sm`}>
                    {s.icon}
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
                  <p className="text-xl font-black text-navy-trust">{s.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="mb-16">
               <h3 className="text-3xl font-black mb-8 tracking-tight flex items-center gap-4 text-navy-trust underline decoration-accent/20 decoration-8 underline-offset-8">
                 <Info size={32} className="text-accent" /> Property Extract
               </h3>
               <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-soft">
                 <p className="text-xl text-slate-600 leading-relaxed font-medium first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-navy-trust">
                   {listing.description || "Official institutional data extract for parcel node in the primary registry sequence. This property is strictly maintained under the Digital India Sovereignty framework with active geospatial monitoring and multi-layer compliance verification."}
                 </p>
               </div>
            </div>

            {listing.category === 'GOVERNMENT' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-32 space-y-8"
              >
                <h3 className="text-3xl font-black tracking-tight flex items-center gap-4 text-navy-trust">
                  <ShieldCheck size={32} className="text-blue-500" /> Government Protocol Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                   <motion.div 
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => setActiveProtocolDetail('LEASE')}
                      className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 shadow-soft cursor-pointer hover:bg-blue-50 transition-all group"
                   >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Scale size={18} className="text-blue-600" />
                          <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest">Lease Terms</h4>
                        </div>
                        <ArrowRight size={16} className="text-blue-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-sm font-medium text-blue-800/70 leading-relaxed mb-4">{listing.leaseTerms || "Standard 99-year institutional lease applicable."}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-lg text-[9px] font-black text-blue-700 uppercase tracking-widest">
                        Click for Duration Nodes
                      </div>
                   </motion.div>
                   
                   <motion.div 
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => setActiveProtocolDetail('ELIGIBILITY')}
                      className="p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 shadow-soft cursor-pointer hover:bg-indigo-50 transition-all group"
                   >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Fingerprint size={18} className="text-indigo-600" />
                          <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest">Eligibility Rules</h4>
                        </div>
                        <ArrowRight size={16} className="text-indigo-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-sm font-medium text-indigo-800/70 leading-relaxed mb-4">{listing.eligibilityRules || "Verification of institutional credentials required."}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 rounded-lg text-[9px] font-black text-indigo-700 uppercase tracking-widest">
                         Required Documents
                      </div>
                   </motion.div>

                   <motion.div 
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => setActiveProtocolDetail('IDENTITY')}
                      className="p-8 bg-violet-50/50 rounded-[2.5rem] border border-violet-100 shadow-soft cursor-pointer hover:bg-violet-50 transition-all group"
                   >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <User size={18} className="text-violet-600" />
                          <h4 className="text-sm font-black text-violet-900 uppercase tracking-widest">Buyer Identity Requirements</h4>
                        </div>
                        <ArrowRight size={16} className="text-violet-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-sm font-medium text-violet-800/70 leading-relaxed mb-4">{listing.buyerRequirements || "National ID, Institutional Node ID, and Proof of Funds mandatory."}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 rounded-lg text-[9px] font-black text-violet-700 uppercase tracking-widest">
                         KYC Protocol
                      </div>
                   </motion.div>

                   <motion.div 
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => setActiveProtocolDetail('GOVERNANCE')}
                      className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 shadow-soft cursor-pointer hover:bg-slate-50 transition-all group"
                   >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Info size={18} className="text-slate-600" />
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Additional Governance</h4>
                        </div>
                        <ArrowRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-sm font-medium text-slate-800/70 leading-relaxed mb-4">{listing.additionalDetails || "All transactions are subject to federal registry audits."}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 rounded-lg text-[9px] font-black text-slate-600 uppercase tracking-widest">
                         Audit Protocols
                      </div>
                   </motion.div>
                </div>
              </motion.div>
            )}

            {/* MAP SECTION */}
            <div className="mb-32">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-3xl font-black tracking-tight flex items-center gap-4 text-navy-trust">
                    <Globe size={32} className="text-accent" /> Geospatial Discovery
                  </h3>
                  <div className="flex gap-2">
                     <span className="stat-badge badge-blue">Real-time Node</span>
                  </div>
               </div>
               <div className="h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-background-card relative group">
                 <InteractiveMap listings={[listing]} isCityPage={true} className="w-full h-full" />
                 <div className="absolute top-10 right-10 glass p-4 rounded-2xl border border-white/40 shadow-2xl z-10 flex flex-col gap-3">
                    <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-navy-trust shadow-xl hover:bg-slate-50 transition-all font-bold">
                       +
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-navy-trust shadow-xl hover:bg-slate-50 transition-all font-bold">
                       -
                    </button>
                 </div>
               </div>
               <div className="mt-12 p-10 bg-surface-dark rounded-[3rem] flex flex-col md:flex-row gap-10 items-center justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  <div className="flex gap-6 items-center relative z-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-white/10 flex items-center justify-center text-accent shadow-glow-blue border border-white/10">
                      <Navigation size={40} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Verified Geoconfig</p>
                      <p className="text-3xl font-black text-white tracking-tighter">{listing.coordinates?.lat}, {listing.coordinates?.lng}</p>
                    </div>
                  </div>
                  <button className="btn-premium !bg-white !text-navy-trust relative z-10 hover:scale-105 px-10">
                    Extract GeoJSON
                  </button>
               </div>
            </div>
          </div>

          {/* RIGHT ACTION COLUMN */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="card-premium p-10 bg-background-card border-none shadow-soft relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Land Demand Index</h4>
                   <DemandBadge score={listing.demandScore || 0} label={listing.demandLabel} />
                </div>

                <div className="mb-10">
                   <div className="flex items-end justify-between mb-4">
                      <div>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth Index</p>
                         <p className="text-2xl font-black text-emerald-500">+{listing.priceGrowth || 0}% <span className="text-[10px] font-bold text-slate-300 ml-1">YoY</span></p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Traffic Pulse</p>
                         <p className="text-base font-black text-navy-trust">{listing.views || 0} Nodes Checked</p>
                      </div>
                   </div>
                   <PriceTrendChart data={[65, 72, 68, 85, 82, 94, 100]} color="#10b981" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Inquiries</p>
                      <p className="text-lg font-black text-navy-trust">{listing.inquiryCount || 0}</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Wishlist</p>
                      <p className="text-lg font-black text-navy-trust">{listing.saveCount || 0}</p>
                   </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Verified Institutional Interest</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-premium p-10 bg-background-card border-none shadow-[0_50px_100px_-20px_rgba(10,29,55,0.12)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/5 blur-[50px] -mr-10 -mt-10" />
                
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Current Valuation Node</p>
                <h2 className="text-6xl font-black mb-10 tracking-tighter text-navy-trust flex items-baseline">
                  ₹{(listing.price / 10000000).toFixed(2)} 
                  <span className="text-2xl font-black text-slate-300 ml-3 uppercase">Crore</span>
                </h2>

                <div className="space-y-4">
                  <button 
                    onClick={handleProposal}
                    disabled={proposalLoading}
                    className="btn-premium w-full py-5 text-lg group"
                  >
                    {proposalLoading ? "Syncing Handshake..." : "Formal Submission"}
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="btn-secondary-premium w-full py-5 text-lg flex items-center justify-center gap-3">
                    <FileCheck size={20} className="text-accent" />
                    Digital Title Extract
                  </button>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <ShieldCheck size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-trust">Audit Protocol Active</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
                    This registry action is cryptographically logged on node <span className="text-accent font-black">{listingId.slice(0, 8)}</span>. 
                    Unauthorised redistribution is strictly prohibited under federal laws.
                  </p>
                </div>
              </motion.div>

              {/* IDENTITY LOCK BOX */}
              <div className="relative rounded-[3.5rem] overflow-hidden bg-surface-dark p-12 min-h-[450px] flex flex-col justify-center text-center shadow-2xl group">
                <AnimatePresence mode="wait">
                  {!contactRevealed ? (
                    <motion.div 
                      key="locked"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative z-10"
                    >
                      <motion.div 
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-24 h-24 rounded-[2rem] bg-white/10 flex items-center justify-center mx-auto mb-10 backdrop-blur border border-white/20 shadow-glow-blue"
                      >
                        <Lock size={40} className="text-white" />
                      </motion.div>
                      <h4 className="text-2xl font-black text-white mb-6">Identity Shield Active</h4>
                      <p className="text-white/50 text-base mb-10 px-4 leading-relaxed font-medium">
                        Custodial contact nodes are restricted by the sovereignty protocol. Request disclosure to verify identity.
                      </p>
                      <button 
                        onClick={handleReveal}
                        disabled={requestLoading}
                        className="btn-premium !bg-white !text-navy-trust w-full py-5 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 text-lg shadow-2xl"
                      >
                        {requestLoading ? "Validating Stakeholder..." : "Reveal Disclosure"}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="revealed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative z-10"
                    >
                       <div className="bg-background-card p-10 rounded-[3rem] text-left shadow-2xl">
                          <div className="flex items-center gap-6 mb-10">
                            <div className="w-20 h-20 rounded-3xl bg-surface-dark flex items-center justify-center text-white font-black text-3xl shadow-xl">
                              {listing.sellerName?.[0] || 'U'}
                            </div>
                            <div>
                                {listing.isSellerVerified && (
                                   <div className="flex items-center gap-2 mb-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                      <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Verified Custodian</p>
                                   </div>
                                )}
                               <p className="text-2xl font-black text-navy-trust truncate">{listing.sellerName || "Authorized Node"}</p>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group/item hover:bg-white transition-all cursor-pointer">
                               <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover/item:text-accent shadow-sm transition-colors">
                                 <Mail size={20} />
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Contact Node</p>
                                  <span className="text-sm font-black text-navy-trust truncate">{listing.sellerEmail || "node@bhoomi.gov.in"}</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group/item hover:bg-white transition-all cursor-pointer">
                               <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover/item:text-accent shadow-sm transition-colors">
                                 <Phone size={20} />
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Voice Protocol</p>
                                  <span className="text-sm font-black text-navy-trust">{listing.sellerPhone || "+91-PROT-XXXX"}</span>
                               </div>
                            </div>
                          </div>

                          <button className="btn-premium w-full mt-10 !py-4 flex items-center justify-center gap-3">
                             <MessageSquare size={18} />
                             Initialize Handshake
                          </button>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* DECORATIVE BG */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800')] bg-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-navy-trust via-transparent to-accent/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
