"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4"
          >
            <div className="glass border border-white/10 w-full max-w-3xl rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto overflow-hidden relative bg-[#060b19]/90 backdrop-blur-3xl transition-all duration-300">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h3 className="text-2xl font-black text-white">{title}</h3>
                <button 
                  onClick={onClose}
                  className="p-3 bg-white/5 hover:bg-rose-500/20 text-white/60 hover:text-rose-500 rounded-2xl transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-10 max-h-[75vh] overflow-y-auto font-rubik custom-scrollbar">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
