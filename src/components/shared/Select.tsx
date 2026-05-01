"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({ label, options, value, onChange, placeholder }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);

  const dropdownMenu = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.98 }}
          style={{
            position: "absolute",
            top: coords.top + 8,
            left: coords.left,
            width: coords.width,
            zIndex: 9999,
          }}
          className="bg-[#0d1b35] border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl neon-gold font-rubik"
        >
          <div className="max-h-64 overflow-y-auto custom-scrollbar p-3">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all text-right group",
                  value === opt.value ? "bg-secondary text-primary font-bold" : "text-sidebar-text hover:bg-white/5 hover:text-white"
                )}
              >
                <span>{opt.label}</span>
                {value === opt.value && <Check size={14} />}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-2 font-rubik relative" ref={containerRef}>
      <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">{label}</label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm transition-all text-right",
          isOpen ? "border-secondary/40 ring-4 ring-secondary/5" : "hover:border-white/20"
        )}
      >
        <span className={cn(selectedOption ? "text-white font-bold" : "text-white/20")}>
          {selectedOption ? selectedOption.label : placeholder || "اختر..."}
        </span>
        <ChevronDown size={18} className={cn("text-secondary transition-transform duration-300", isOpen ? "rotate-180" : "")} />
      </button>

      {typeof document !== "undefined" && createPortal(dropdownMenu, document.body)}
    </div>
  );
}
