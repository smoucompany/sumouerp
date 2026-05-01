"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Clock, Plus, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "تجديد إقامات موظفي المستودع", completed: false, priority: "high" },
    { id: 2, text: "مراجعة كشف الرواتب الشهري", completed: false, priority: "medium" },
    { id: 3, text: "تحديث السجل التجاري لفرع الرياض", completed: true, priority: "high" },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        if (!task.completed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#0A192F', '#ffffff']
          });
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  return (
    <div className="glass p-6 rounded-3xl h-full flex flex-col border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-secondary" />
          المهام اليومية
        </h3>
        <button className="p-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={cn(
                "group flex items-center gap-4 p-4 rounded-2xl border transition-all",
                task.completed 
                  ? "bg-white/5 border-transparent opacity-60" 
                  : "bg-white/[0.02] border-white/5 hover:border-secondary/30"
              )}
            >
              <button 
                onClick={() => toggleTask(task.id)}
                className="transition-transform active:scale-90"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-sidebar-text group-hover:text-secondary" />
                )}
              </button>
              
              <span className={cn(
                "flex-1 text-sm transition-all",
                task.completed && "line-through"
              )}>
                {task.text}
              </span>

              <div className={cn(
                "w-2 h-2 rounded-full",
                task.priority === "high" ? "bg-rose-500" : task.priority === "medium" ? "bg-amber-500" : "bg-blue-500"
              )}></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
