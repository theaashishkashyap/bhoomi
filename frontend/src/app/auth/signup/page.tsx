"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, ShieldCheck, ArrowRight, Fingerprint, Globe, Building2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // We'll use login from context to set user state after Google Auth

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Account creation failed");
      }

      setError("Success! Identity node provisioned. Redirecting...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Account creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const idToken = await user.getIdToken();

        // Exchange Firebase Token for App Token (backend handles create-if-not-exists)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/firebase-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
             token: idToken,
             email: user.email,
             name: user.displayName,
             googleId: user.uid
          }),
        });

        const data = await res.json();
        if (data.success) {
          login(data.data.user, data.data.token);
          router.push("/discover");
        } else {
          throw new Error(data.message || "Failed to authenticate with backend.");
        }
    } catch (err: any) {
        console.error(err);
        setError(err.message || "Google Sign-Up failed.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <main className="h-screen bg-mesh relative overflow-hidden flex items-center justify-center p-4 md:p-6 select-none">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[140px] animate-pulse" style={{ animationDelay: '2.s' }} />
      </div>
      
      <div className="container relative z-10 flex items-center justify-center">

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1000px] max-h-[90vh] grid lg:grid-cols-2 bg-background-card/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 dark:border-white/5 ring-1 ring-white/10"
        >
          {/* LEFT: FORM SIDE */}
          <section className="p-6 md:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto custom-scrollbar">
            <header className="mb-4 shrink-0 flex items-center justify-between">
               <div>
                 <h2 className="text-2xl font-black text-navy-trust tracking-tight mb-1">Request Verified Access</h2>
                 <p className="text-slate-500 font-medium text-[10px]">Provision your institutional identity node.</p>
               </div>
               <Link href="/" className="flex items-center gap-2 group shrink-0 lg:hidden">
                  <div className="w-8 h-8 bg-surface-dark rounded-lg flex items-center justify-center text-white font-black text-xs">B</div>
               </Link>
            </header>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`mb-8 p-5 rounded-3xl border flex items-center gap-4 ${error.includes('Success') ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}
                >
                  <div className={`w-2 h-8 rounded-full ${error.includes('Success') ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <p className="text-xs font-black uppercase tracking-widest">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Legal Name</label>
                <div className="relative group/field">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={16} />
                  <input 
                    type="text" 
                    className="registry-input !pl-14 !py-3.5 !rounded-2xl text-xs"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Official Email Node</label>
                <div className="relative group/field">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={16} />
                  <input 
                    type="email" 
                    className="registry-input !pl-14 !py-3.5 !rounded-2xl text-xs"
                    placeholder="name@authority.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Sovereign Password</label>
                <div className="relative group/field">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={16} />
                  <input 
                    type="password" 
                    className="registry-input !pl-14 !py-3.5 !rounded-2xl text-xs"
                    placeholder="Minimum 12 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-premium w-full !py-3.5 text-sm group"
              >
                {loading ? "Initializing..." : "Register Protocol Node"}
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>

            <div className="my-4 flex items-center gap-3 shrink-0">
               <div className="h-px flex-1 bg-slate-100" />
               <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">OR PROVIDO OAUTH</span>
               <div className="h-px flex-1 bg-slate-100" />
            </div>

            <button 
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-3 rounded-2xl border border-slate-100 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shrink-0 disabled:opacity-50"
            >
               <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
               <span className="text-[10px] font-black text-navy-trust uppercase tracking-widest">
                 {loading ? "Verifying..." : "Signup with Google"}
               </span>
            </button>

            <div className="mt-6 text-center shrink-0">
              <p className="text-[10px] font-bold text-slate-500">
                Already possess a node ID? {" "}
                <Link href="/auth/login" className="text-accent hover:underline font-black">Secure Sign In</Link>
              </p>
            </div>
          </section>

          {/* RIGHT: BRAND/INFO SIDE */}
          <section className="hidden lg:flex relative bg-slate-950 items-center justify-center p-12 overflow-hidden">
             {/* DECORATIVE BACKGROUND */}
             <div className="absolute inset-0 z-0">
               <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
                alt="Digital Sovereignty"
               />
               <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-accent/30"></div>
             </div>

             <div className="relative z-10 text-center max-w-sm">
               <motion.div 
                 animate={{ rotate: [0, 10, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 5 }}
                 className="w-24 h-24 rounded-[2.5rem] bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mx-auto mb-10 shadow-glow-blue"
               >
                 <Fingerprint size={48} className="text-white" />
               </motion.div>
               <h3 className="text-2xl font-black text-white mb-4 tracking-tighter leading-tight">Establishing Digital <br />Sovereignty.</h3>
               <p className="text-white/60 text-xs leading-relaxed font-medium mb-8">
                 Every identity on BHOOMI is provisioned into the national trust cluster.
               </p>
               
               <div className="grid grid-cols-1 gap-4 text-left">
                  {[
                    { icon: <ShieldCheck size={20} />, title: "L1 Verification", desc: "Base level node provisioning." },
                    { icon: <Building2 size={20} />, title: "Institutional Tier", desc: "Advanced access for stakeholders." },
                    { icon: <Globe size={20} />, title: "Cross-Node Sync", desc: "Identity recognized globally." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="p-4 bg-white/5 rounded-[1.5rem] border border-white/10 backdrop-blur flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-white mb-0.5">{item.title}</h4>
                        <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest leading-none">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>

               <div className="mt-12 pt-6 border-t border-white/5">
                  <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
                    © 2026 BHOOMI PROTOCOL
                  </p>
               </div>
             </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
