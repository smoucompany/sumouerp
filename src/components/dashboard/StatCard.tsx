"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subValue: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: "secondary" | "emerald" | "rose" | "blue" | "amber";
}

const colorStyles = {
  secondary: "text-secondary bg-secondary/10 border-secondary/20 shadow-secondary/5",
  emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5",
  rose: "text-rose-500 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5",
  blue: "text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5",
  amber: "text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-amber-500/5",
};

export default function StatCard({ title, value, subValue, icon: Icon, trend, color = "secondary" }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card p-8 rounded-[3rem] relative overflow-hidden group"
    >
      <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 transition-all group-hover:opacity-40", color === 'secondary' ? 'bg-secondary' : 'bg-blue-500')}></div>
      
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className={cn(
          "w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all duration-500 group-hover:scale-110",
          colorStyles[color]
        )}>
          <Icon size={28} />
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
            trend.isUp ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
            {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}%
          </div>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">{title}</p>
        <div className="flex items-baseline gap-2">
           <h3 className="text-4xl font-black text-white tracking-tighter">{value}</h3>
           <span className="text-xs font-bold text-white/40">{subValue}</span>
        </div>
      </div>
      
      {/* Decorative Line */}
      <div className="mt-8 h-[1px] w-full bg-white/5 relative">
         <div className={cn("absolute top-0 right-0 h-full w-1/3 transition-all group-hover:w-full duration-1000", color === 'secondary' ? 'bg-secondary/40' : 'bg-blue-500/40')}></div>
      </div>
    </motion.div>
  );
}
