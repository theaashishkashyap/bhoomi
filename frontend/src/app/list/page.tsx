"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Upload, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  LandPlot, 
  IndianRupee,
  Loader2,
  X,
  Plus,
  LocateFixed
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";

const LocationPickerMap = dynamic(() => import("@/components/LocationPickerMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center">
      <Loader2 className="animate-spin text-slate-300" size={32} />
    </div>
  ),
});

export default function IngestionPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "PRIVATE", // or GOVERNMENT
    purpose: "SALE", // or LEASE
    location: "",
    state: "",
    price: "",
    area: "",
    areaUnit: "sq ft",
    description: "",
    authority: "",
    leaseTerms: "",
    eligibilityRules: "",
    buyerRequirements: "",
    latitude: "",
    longitude: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1: // Identity
         if (!formData.category || !formData.purpose) {
            alert("Please select a category and purpose.");
            return false;
         }
         return true;
      case 3: // Geospatial Data
        if (!formData.location || !formData.state || !formData.latitude || !formData.longitude) {
           alert("Please fill in location, select a state, and ensure coordinates are captured.");
           return false;
        }
        return true;
      case 4: // Registry Details
        if (!formData.title || !formData.price || !formData.area || !formData.description) {
           alert("Please complete all registry details (Title, Price, Area, Description).");
           return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    // Final check on current step (Step 4)
    if (!validateStep(4)) return;

    setLoading(true);
    try {
      // Validate all required fields again before submission
      const missingFields = [];
      if (!formData.title) missingFields.push("Title");
      if (!formData.location) missingFields.push("Location");
      if (!formData.price) missingFields.push("Valuation");
      if (!formData.latitude) missingFields.push("Latitude");
      if (!formData.longitude) missingFields.push("Longitude");

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Convert price/area to numbers for API
      const payload = {
        ...formData,
        price: Number(formData.price.replace(/,/g, '')), // Remove commas
        area: Number(formData.area),
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        // For images, we take the first one if available
        imageUrl: images.length > 0 ? images[0] : null,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit listing");
      }

      setCompleted(true);
      setTimeout(() => {
        router.push("/discover");
      }, 3000);
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(`Error: ${error.message || "Failed to create listing"}`);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Protocol Identity", desc: "Select listing authority type" },
    { title: "Visual Assets", desc: "Upload or click land photos" },
    { title: "Geospatial Data", desc: "Define location & coordinates" },
    { title: "Registry Details", desc: "Valuation, area, and protocols" }
  ];

  return (
    <main className="min-h-screen bg-mesh py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <div>
            <Link href="/discover" className="btn-secondary-premium !py-2 !px-4 mb-4 inline-flex items-center gap-2 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Registry
            </Link>
            <h1 className="text-5xl font-black text-navy-trust tracking-tighter">Asset Ingestion.</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">New Land Registry Pulse</p>
          </div>
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] font-black text-navy-trust uppercase tracking-widest mb-1">Status: Secure Node</span>
             <div className="flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`h-1 w-8 rounded-full ${s <= step ? 'bg-accent' : 'bg-slate-200'}`} />
                ))}
             </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div 
               key="form"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="card-premium p-10 bg-background-card border-none shadow-soft overflow-hidden relative"
            >
               {/* STEP INDICATOR */}
               <div className="mb-12 pb-8 border-b border-slate-50 flex items-center gap-10">
                  {steps.map((s, i) => (
                    <div key={i} className={`flex items-center gap-3 ${step === i+1 ? 'opacity-100' : 'opacity-30'}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${step === i+1 ? 'bg-surface-dark text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {i+1}
                      </div>
                      <div className="hidden lg:block">
                        <p className="text-[10px] font-black uppercase tracking-widest text-navy-trust leading-none mb-1">{s.title}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>

               {/* STEP CONTENT */}
               <div className="min-h-[400px]">
                 {step === 1 && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      <h2 className="text-3xl font-black text-navy-trust tracking-tight">Identity Handshake</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button 
                          onClick={() => setFormData({...formData, category: 'PRIVATE'})}
                          className={`p-8 rounded-[2.5rem] border-2 transition-all text-left group ${formData.category === 'PRIVATE' ? 'border-accent bg-accent/5' : 'border-slate-50 hover:border-slate-200'}`}
                        >
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${formData.category === 'PRIVATE' ? 'bg-accent text-white shadow-glow-blue' : 'bg-slate-100 text-slate-400'}`}>
                            <User size={28} />
                          </div>
                          <h3 className="text-xl font-black text-navy-trust mb-2">Private Seller</h3>
                          <p className="text-xs font-medium text-slate-500 leading-relaxed uppercase tracking-wide">For individual landowners and independent developers</p>
                        </button>
                        <button 
                          onClick={() => setFormData({...formData, category: 'GOVERNMENT'})}
                          className={`p-8 rounded-[2.5rem] border-2 transition-all text-left group ${formData.category === 'GOVERNMENT' ? 'border-accent bg-accent/5' : 'border-slate-50 hover:border-slate-200'}`}
                        >
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${formData.category === 'GOVERNMENT' ? 'bg-blue-600 text-white shadow-glow-blue' : 'bg-slate-100 text-slate-400'}`}>
                            <Building2 size={28} />
                          </div>
                          <h3 className="text-xl font-black text-navy-trust mb-2">Government Asset</h3>
                          <p className="text-xs font-medium text-slate-500 leading-relaxed uppercase tracking-wide">Reserved for institutional, state, or federal level property auctions</p>
                        </button>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Transfer Protocol</h4>
                         <div className="flex gap-4">
                            {["SALE", "LEASE"].map((p) => (
                              <button 
                                key={p}
                                onClick={() => setFormData({...formData, purpose: p})}
                                className={`px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${formData.purpose === p ? 'bg-surface-dark text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                              >
                                {p}
                              </button>
                            ))}
                         </div>
                      </div>
                   </motion.div>
                 )}

                 {step === 2 && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-navy-trust tracking-tight">Visual Asset Registry</h2>
                        <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{images.length} Nodes Locked</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div 
                           onClick={() => fileInputRef.current?.click()}
                           className="aspect-video rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-accent hover:bg-accent/5 transition-all group"
                         >
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-accent group-hover:text-white transition-all">
                               <Plus size={32} />
                            </div>
                            <div className="text-center">
                               <p className="text-sm font-black text-navy-trust uppercase tracking-widest">Inject Imagery</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Upload or Drag & Drop</p>
                            </div>
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleImageUpload} 
                              className="hidden" 
                              multiple 
                              accept="image/*"
                            />
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            {images.map((img, i) => (
                              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                                 <img src={img} alt="" className="w-full h-full object-cover" />
                                 <button 
                                   onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                   className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-black/50 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                   <X size={14} />
                                 </button>
                              </div>
                            ))}
                            {images.length === 0 && (
                              <div className="col-span-2 flex items-center justify-center h-full text-slate-300 italic text-sm font-medium">
                                No visual nodes uploaded yet
                              </div>
                            )}
                         </div>
                      </div>

                      <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4 items-start">
                         <ShieldCheck className="text-blue-500 mt-1" size={20} />
                         <div>
                            <p className="text-xs font-black text-blue-900 uppercase tracking-widest mb-1">Visual Fidelity Protocol</p>
                            <p className="text-[11px] font-bold text-blue-800/60 leading-relaxed uppercase">Ensure high-resolution empty land photography for automated geospatial verification.</p>
                         </div>
                      </div>
                   </motion.div>
                 )}

                 {step === 3 && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      <h2 className="text-3xl font-black text-navy-trust tracking-tight">Geospatial Ingestion</h2>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Location</label>
                             <div className="relative">
                               <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                               <input 
                                 name="location"
                                 value={formData.location}
                                 onChange={handleInputChange}
                                 className="registry-input !pl-14" 
                                 placeholder="e.g. Sector 20, Gomti Nagar" 
                               />
                             </div>
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">National State</label>
                             <select 
                               name="state"
                               value={formData.state}
                               onChange={handleInputChange}
                               className="registry-input !pl-6 cursor-pointer"
                             >
                                <option value="">Select State Node</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Delhi">Delhi Node</option>
                             </select>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                           <div className="space-y-2 md:col-span-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Latitude Node</label>
                              <input 
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleInputChange}
                                className="registry-input !pl-6" 
                                placeholder="26.7580" 
                              />
                           </div>
                           <div className="space-y-2 md:col-span-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Longitude Node</label>
                              <input 
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleInputChange}
                                className="registry-input !pl-6" 
                                placeholder="83.4350" 
                              />
                           </div>
                        <div className="md:col-span-4 flex justify-end">
                           <button 
                             type="button"
                             onClick={() => {
                               if (navigator.geolocation) {
                                  // Show visual feedback or loading state here if needed
                                 navigator.geolocation.getCurrentPosition((position) => {
                                   setFormData(prev => ({
                                     ...prev,
                                     latitude: position.coords.latitude.toFixed(6),
                                     longitude: position.coords.longitude.toFixed(6),
                                     location: prev.location || `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`
                                   }));
                                 }, (error) => {
                                   console.error("Error getting location:", error);
                                   alert("Unable to retrieve location. Please check browser permissions.");
                                 });
                               } else {
                                 alert("Geolocation is not supported by this browser.");
                               }
                             }}
                             className="text-[10px] font-black uppercase tracking-widest text-accent hover:text-accent/80 flex items-center gap-2 transition-colors py-2"
                           >
                              <LocateFixed size={14} /> Use Current Location
                           </button>
                        </div>
                        </div>

                         <div className="h-80 w-full rounded-3xl bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden relative">
                            <LocationPickerMap 
                              latitude={Number(formData.latitude) || undefined}
                              longitude={Number(formData.longitude) || undefined}
                              onLocationSelect={(lat, lng) => {
                                setFormData(prev => ({
                                  ...prev,
                                  latitude: lat.toFixed(6),
                                  longitude: lng.toFixed(6),
                                  // Auto-fill location if empty to pass validation
                                  location: prev.location || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
                                }));
                              }}
                            />
                            {!formData.latitude && (
                               <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm pointer-events-none z-[400]">
                                  Click on map to pin location
                               </div>
                            )}
                         </div>
                      </div>
                   </motion.div>
                 )}

                 {step === 4 && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      <h2 className="text-3xl font-black text-navy-trust tracking-tight">Registry Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Title</label>
                              <input 
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="registry-input !pl-6" 
                                placeholder="e.g. Commercial Hub Node A" 
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Valuation (INR)</label>
                                  <div className="relative">
                                     <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                     <input 
                                       name="price"
                                       value={formData.price}
                                       onChange={handleInputChange}
                                       className="registry-input !pl-10 !text-sm" 
                                       placeholder="50,00,000" 
                                     />
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Area</label>
                                  <div className="flex gap-2">
                                     <input 
                                       name="area"
                                       value={formData.area}
                                       onChange={handleInputChange}
                                       className="registry-input !pl-4 !text-sm flex-1" 
                                       placeholder="1200" 
                                     />
                                     <select 
                                       name="areaUnit"
                                       value={formData.areaUnit}
                                       onChange={handleInputChange}
                                       className="registry-input !px-2 !text-[9px] w-20 uppercase font-black"
                                     >
                                        <option>sq ft</option>
                                        <option>sq m</option>
                                        <option>Acres</option>
                                     </select>
                                  </div>
                               </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description Protocol</label>
                              <textarea 
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="registry-input !pl-6 !py-4 min-h-[120px] resize-none" 
                                placeholder="Detail the structural and geospatial advantages..." 
                              />
                            </div>
                         </div>

                         {formData.category === 'GOVERNMENT' ? (
                            <div className="p-8 bg-blue-50/30 rounded-[2.5rem] border border-blue-100/50 space-y-6">
                               <div className="flex items-center gap-3 mb-4">
                                  <ShieldCheck size={20} className="text-blue-600" />
                                  <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest">Sovereign Protocol Data</h3>
                               </div>
                               <div className="space-y-4">
                                  <div className="space-y-1">
                                     <label className="text-[9px] font-black uppercase tracking-widest text-blue-800/50 ml-1">Issuing Authority</label>
                                     <input 
                                       name="authority"
                                       value={formData.authority}
                                       onChange={handleInputChange}
                                       className="registry-input !bg-white/60 !border-blue-100 !pl-4 !py-2.5 !text-xs" 
                                       placeholder="e.g. MMMUT Gorakhpur" 
                                     />
                                  </div>
                                  <div className="space-y-1">
                                     <label className="text-[9px] font-black uppercase tracking-widest text-blue-800/50 ml-1">Lease Terms Node</label>
                                     <textarea 
                                       name="leaseTerms"
                                       value={formData.leaseTerms}
                                       onChange={handleInputChange}
                                       className="registry-input !bg-white/60 !border-blue-100 !pl-4 !py-2.5 !text-xs !min-h-[80px]" 
                                       placeholder="99-year institutional lease..." 
                                     />
                                  </div>
                                  <div className="space-y-1">
                                     <label className="text-[9px] font-black uppercase tracking-widest text-blue-800/50 ml-1">Eligibility Criteria</label>
                                     <textarea 
                                       name="eligibilityRules"
                                       value={formData.eligibilityRules}
                                       onChange={handleInputChange}
                                       className="registry-input !bg-white/60 !border-blue-100 !pl-4 !py-2.5 !text-xs !min-h-[80px]" 
                                       placeholder="Registered Educational Trust..." 
                                     />
                                  </div>
                               </div>
                            </div>
                         ) : (
                            <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-slate-100 rounded-[2.5rem] text-center opacity-50">
                               <LandPlot size={48} className="text-slate-200 mb-6" />
                               <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 leading-tight">Private Sector Verification Only</p>
                               <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-relaxed">External governance modules are restricted for private listings</p>
                            </div>
                         )}
                      </div>
                   </motion.div>
                 )}
               </div>

               {/* FORM ACTIONS */}
               <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
                  <button 
                    onClick={prevStep}
                    disabled={step === 1}
                    className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-navy-trust transition-colors disabled:opacity-0"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  
                  {step < 4 ? (
                    <button 
                      onClick={nextStep}
                      className="btn-premium !py-3 !px-10 flex items-center gap-2"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button 
                      onClick={handleSubmit}
                      disabled={loading}
                      className="btn-premium !bg-surface-dark !text-white !py-3 !px-12 flex items-center gap-3 overflow-hidden"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Nodal Sync...
                        </>
                      ) : (
                        <>
                          Submit to Registry
                          <ShieldCheck size={18} />
                        </>
                      )}
                    </button>
                  )}
               </div>
            </motion.div>
          ) : (
            <motion.div 
               key="success"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="card-premium p-20 bg-background-card border-none text-center shadow-4xl space-y-8"
            >
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", damping: 12 }}
                 className="w-32 h-32 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-glow-emerald"
               >
                  <CheckCircle2 size={64} />
               </motion.div>
               <div>
                  <h2 className="text-5xl font-black text-navy-trust tracking-tighter mb-4">Registry Success.</h2>
                  <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.3em] mb-12">Asset Node {Math.random().toString(36).substring(7).toUpperCase()} Created</p>
                  
                  <div className="max-w-md mx-auto p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-6 text-left">
                     <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                        <FileText size={28} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Blockchain Hash</p>
                        <p className="text-[12px] font-mono font-bold text-navy-trust break-all opacity-60">0x{Math.random().toString(16).substring(2, 40)}...</p>
                     </div>
                  </div>
               </div>
               
               <p className="text-sm font-bold text-slate-400 italic">Redirecting to Registry Explorer...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
