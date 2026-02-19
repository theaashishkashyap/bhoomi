"use client";

import React from "react";
import { motion } from "framer-motion";

interface PriceTrendChartProps {
  data?: number[];
  color?: string;
  height?: number;
}

export default function PriceTrendChart({ 
  data = [45, 52, 48, 61, 55, 67, 72], 
  color = "#3b82f6", 
  height = 80 
}: PriceTrendChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 200;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height * 0.8) - (height * 0.1);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {/* Fill area */}
        <motion.path
          initial={{ opacity: 0, d: `M 0,${height} ${points.replace(/[^, ]+,/g, "0,")} ${width},${height} Z` }}
          animate={{ opacity: 0.1, d: `M 0,${height} ${points} ${width},${height} Z` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          fill={color}
        />
        {/* Line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={`M ${points}`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Points */}
        {data.map((val, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - ((val - min) / range) * (height * 0.8) - (height * 0.1);
          return (
            <motion.circle
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + (i * 0.1) }}
              cx={x}
              cy={y}
              r="3"
              fill="white"
              stroke={color}
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </div>
  );
}
