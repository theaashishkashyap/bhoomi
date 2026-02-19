"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (token && userId) {
      // Fetch user details with the token to complete login
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          login(data.data, token);
          router.push("/discover");
        } else {
          setError("Failed to verify authentication token.");
          setTimeout(() => router.push("/auth/login"), 2000);
        }
      })
      .catch(err => {
         console.error(err);
         setError("Authentication error occurred.");
         setTimeout(() => router.push("/auth/login"), 2000);
      });
    } else {
      setError("Invalid authentication response.");
      setTimeout(() => router.push("/auth/login"), 2000);
    }
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen bg-mesh flex flex-col items-center justify-center text-center p-4">
      {error ? (
        <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-700 animate-in fade-in slide-in-from-bottom-4">
          <p className="font-black uppercase tracking-widest text-xs mb-2">Authentication Failed</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
           <div className="w-16 h-16 rounded-3xl bg-surface-dark flex items-center justify-center text-accent shadow-glow-blue mb-8">
             <Loader2 size={32} className="animate-spin" />
           </div>
           <h2 className="text-2xl font-black text-navy-trust tracking-tight mb-2">Synchronizing Credentials</h2>
           <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Handshake with Google Identity Nodes...</p>
        </div>
      )}
    </div>
  );
}
