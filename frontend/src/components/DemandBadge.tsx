"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, BarChart3 } from "lucide-react";

interface DemandBadgeProps {
  score: number;
  label: string;
  className?: string;
}

export default function DemandBadge({ score, label, className = "" }: DemandBadgeProps) {
  const isHigh = label === "High Demand";
  const isModerate = label === "Moderate Demand";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm ${
        isHigh 
          ? "bg-red-50 text-red-600 border-red-100 shadow-red-500/10" 
          : isModerate
          ? "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-500/10"
          : "bg-slate-50 text-slate-500 border-slate-100"
      } ${className}`}
    >
      {isHigh ? (
        <Zap size={12} className="fill-current animate-pulse" />
      ) : isModerate ? (
        <TrendingUp size={12} />
      ) : (
        <BarChart3 size={12} />
      )}
      <span>{isHigh ? "🔥" : isModerate ? "📊" : "📉"} {label}</span>
      <div className="h-3 w-px bg-current opacity-20 mx-1" />
      <span className="font-bold opacity-70">LDI: {score}</span>
    </motion.div>
  );
}
