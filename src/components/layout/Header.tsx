"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, User, Settings, Moon, Sun, Command, ChevronDown, Globe, Zap, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-24" />;

  return (
    <header className="h-24 px-10 flex items-center justify-between sticky top-0 z-40 bg-[#050b14]/60 backdrop-blur-3xl border-b border-white/[0.03]">
      {/* Search Bar Section */}
      <div className="flex-1 max-w-2xl relative group">
        <div className={cn(
          "flex items-center gap-4 bg-white/[0.03] border rounded-[2rem] px-6 py-3 transition-all duration-500",
          isSearchFocused ? "border-secondary/40 bg-white/[0.05] shadow-2xl shadow-secondary/5 ring-4 ring-secondary/5" : "border-white/5"
        )}>
          <Search className={cn("w-5 h-5 transition-colors", isSearchFocused ? "text-secondary" : "text-white/20")} />
          <input 
            type="text"
            placeholder="ابحث عن موظف، مستند، أو عملية مالية..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/20 font-medium"
          />
          <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
            <Command size={12} className="text-white/40" />
            <span className="text-[10px] font-black text-white/40">K</span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-6">
        {/* Insight Core Indicator */}
        <div className="hidden xl:flex items-center gap-3 px-5 py-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Insight Core Active</span>
        </div>

        {/* Quick Help */}
        <button className="p-3 text-white/40 hover:text-secondary transition-all group">
          <HelpCircle size={22} />
        </button>


        {/* Notifications */}
        <div className="relative group">
          <button className="p-3 text-white/40 hover:text-secondary hover:bg-secondary/10 rounded-2xl transition-all relative">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-[#050b14] rounded-full animate-pulse"></span>
          </button>
          
          <div className="absolute top-full left-0 mt-4 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
             <div className="glass p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <h4 className="font-black text-sm mb-4">التنبيهات الأخيرة</h4>
                <div className="space-y-3">
                   <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-xs font-bold">انتهاء إقامة: أحمد علي</p>
                      <span className="text-[10px] text-sidebar-text">منذ 10 دقائق</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 text-white/40 hover:text-secondary hover:bg-secondary/10 rounded-2xl transition-all"
        >
          {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-white/10 mx-2"></div>

        {/* User Profile */}
        <button className="flex items-center gap-4 p-2 pl-6 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-secondary/20 transition-all group">
           <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-secondary to-amber-600 flex items-center justify-center text-primary font-black shadow-lg shadow-secondary/10 group-hover:scale-105 transition-transform">
              أ
           </div>
           <div className="text-right hidden md:block">
              <p className="text-sm font-black text-white">أدمن النظام</p>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Super Admin</p>
           </div>
           <ChevronDown size={14} className="text-white/20 group-hover:text-secondary transition-colors mr-2" />
        </button>
      </div>
    </header>
  );
}
