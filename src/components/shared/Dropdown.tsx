"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  label: string;
  items: { label: string; onClick: () => void; icon?: React.ElementType; variant?: 'default' | 'danger' }[];
  className?: string;
}

export default function Dropdown({ label, items, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative inline-block text-right font-rubik", className)} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all text-white active:scale-95"
      >
        {label}
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 mt-3 w-56 bg-[#0a192f] border border-white/10 rounded-[2rem] shadow-2xl z-[150] overflow-hidden backdrop-blur-xl"
          >
            <div className="py-2">
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-6 py-4 text-sm transition-all text-right",
                    item.variant === 'danger' 
                      ? "text-rose-500 hover:bg-rose-500/10" 
                      : "text-sidebar-text hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.icon && <item.icon size={16} className={item.variant === 'danger' ? "text-rose-500" : "text-secondary"} />}
                  <span className="font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
