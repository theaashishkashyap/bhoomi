"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Lock, ArrowRight, Fingerprint, Globe, Key, User, Wallet, Building2, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"SELLER" | "BUYER" | "GOVERNMENT">("GOVERNMENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        login(result.data.user, result.data.token);
        router.push("/discover");
      } else {
        setError(result.message || "Invalid institutional credentials. Access denied.");
      }
    } catch (err: any) {
      setError(err.message || "A verification error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Exchange Firebase Token for App Token
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
      setError(err.message || "Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen bg-mesh flex items-center justify-center p-4 md:p-6 overflow-hidden select-none">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[1100px] max-h-[90vh] grid lg:grid-cols-2 bg-background-card/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 dark:border-white/5 ring-1 ring-white/10"
      >
        {/* LEFT: FORM SIDE */}
        <section className="p-8 md:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto custom-scrollbar">
          <Link href="/" className="flex items-center gap-2 mb-6 group shrink-0">
            <motion.div 
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-10 h-10 bg-surface-dark rounded-xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-slate-900/10"
            >
              B
            </motion.div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-navy-trust leading-none">BHOOMI</h1>
              <p className="text-[8px] font-black text-accent uppercase tracking-widest mt-1">Registry Authority</p>
            </div>
          </Link>

          <header className="mb-4 shrink-0">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-navy-trust mb-1">Sovereign Access</h2>
            <p className="text-slate-500 font-medium text-[10px]">Synchronize your perspective to manage land assets.</p>
          </header>

          <div className="mb-6 grid grid-cols-3 gap-2 shrink-0">
            {[
              { id: 'SELLER', label: 'Seller', icon: <Store size={14} />, desc: 'Own Land' },
              { id: 'BUYER', label: 'Buyer', icon: <Wallet size={14} />, desc: 'Invest' },
              { id: 'GOVERNMENT', label: 'Govt', icon: <Building2 size={14} />, desc: 'Authority' }
            ].map((persona) => (
              <button
                key={persona.id}
                onClick={() => setRole(persona.id as any)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-300 ${
                  role === persona.id 
                    ? 'bg-accent/10 border-accent shadow-sm' 
                    : 'bg-slate-50 border-slate-100 hover:border-slate-200 opacity-60'
                }`}
              >
                <div className={`${role === persona.id ? 'text-accent' : 'text-slate-400'} mb-1`}>
                  {persona.icon}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${role === persona.id ? 'text-navy-trust' : 'text-slate-400'}`}>
                  {persona.label}
                </span>
                <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{persona.desc}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-700"
              >
                <div className="w-1.5 h-6 rounded-full bg-red-500" />
                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                {role === 'GOVERNMENT' ? 'Institutional ID' : role === 'SELLER' ? 'Seller ID' : 'Investor ID'}
              </label>
              <div className="relative group/field">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder={role === 'GOVERNMENT' ? "name@authority.gov.in" : "identity@bhoomi.com"}
                  className="registry-input !pl-14 !py-3.5 !rounded-2xl shadow-inner text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Sovereign Key</label>
                <Link href="#" className="text-[9px] font-black text-accent uppercase hover:underline tracking-widest">Forgot Key?</Link>
              </div>
              <div className="relative group/field">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-accent transition-colors" size={18} />
                <input 
                   type="password" 
                  placeholder="••••••••••••"
                  className="registry-input !pl-14 !py-3.5 !rounded-2xl shadow-inner text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-premium w-full !py-4 text-base group"
            >
              {loading ? "Authenticating..." : "Identity Handshake"}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 shrink-0">
             <div className="h-px flex-1 bg-slate-100" />
             <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">OR PROVIDE OAUTH</span>
             <div className="h-px flex-1 bg-slate-100" />
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 rounded-2xl border border-slate-100 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shrink-0 disabled:opacity-50"
          >
             <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
             <span className="text-xs font-black text-navy-trust uppercase tracking-widest">
               {loading ? "Verifying..." : "Continue with Google"}
             </span>
          </button>

          <div className="mt-8 pt-8 border-t border-slate-100 shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                <ShieldCheck size={14} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Demo Access Protocol</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Guest Explorer', role: 'BUYER', verified: false, color: 'text-slate-600', bg: 'hover:bg-slate-50' },
                { label: 'Verified Investor', role: 'BUYER', verified: true, color: 'text-emerald-600', bg: 'hover:bg-emerald-50/50' },
                { label: 'Land Owner', role: 'SELLER', verified: true, color: 'text-blue-600', bg: 'hover:bg-blue-50/50' },
                { label: 'Govt Admin', role: 'GOVERNMENT', verified: true, color: 'text-accent', bg: 'hover:bg-accent/5' }
              ].map((demo) => (
                <button
                  key={demo.label}
                  type="button"
                  onClick={() => {
                    login({
                      id: `demo-${demo.role.toLowerCase()}`,
                      email: `${demo.role.toLowerCase()}@demo.bhoomi.gov`,
                      name: demo.label,
                      role: demo.role,
                      isAadharVerified: demo.verified,
                      showIdentity: true
                    }, "demo-token-12345");
                    router.push("/discover");
                  }}
                  className={`flex flex-col items-start p-3 rounded-2xl border border-slate-100 transition-all ${demo.bg} group/demo`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-widest ${demo.color}`}>{demo.label}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">One-click bypass access</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-[10px] font-bold text-slate-500 shrink-0">
            Node not provisioned? {" "}
            <Link href="/auth/signup" className="font-black text-accent hover:underline">Apply for Node Access</Link>
          </p>
        </section>

        {/* RIGHT: BRAND SIDE */}
        <section className="hidden lg:flex relative bg-slate-950 items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
              alt="Data Network"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-accent/30"></div>
          </div>

          <div className="relative z-10 text-center max-w-sm">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-24 h-24 rounded-[2.5rem] bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mx-auto mb-10 shadow-glow-blue"
            >
              <Fingerprint size={48} className="text-white" />
            </motion.div>
            <h3 className="text-3xl font-black text-white mb-6 tracking-tighter leading-tight">Securing National <br />Land Integrity.</h3>
            <p className="text-white/60 text-base leading-relaxed font-medium mb-10">
              Access is restricted to authorized stakeholders. All interactions are signed.
            </p>
            
            <div className="grid grid-cols-1 gap-4 text-left">
               <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10 backdrop-blur flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-white mb-0.5">RSA-4096 Secure</h4>
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Encryption Active</p>
                  </div>
               </div>
               <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10 backdrop-blur flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Key size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-white mb-0.5">Institutional TLS</h4>
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">End-to-End Auth</p>
                  </div>
               </div>
            </div>

            <div className="mt-12 pt-6 border-t border-white/5">
                <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
                  © 2026 BHOOMI PROTOCOL
                </p>
             </div>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
