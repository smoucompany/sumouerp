"use client";

import React from "react";
import TasksList from "@/components/dashboard/TasksList";
import { CheckCircle2, Clock, AlertCircle, Plus, Filter } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold mb-2">إدارة المهام</h1>
          <p className="text-sidebar-text">تنظيم ومتابعة المهام الإدارية والتشغيلية للفريق.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4" />
            تصفية
          </button>
          <button className="bg-secondary text-primary px-3 py-2 rounded-2xl font-bold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            مهمة جديدة
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-3xl border border-white/10 flex items-center gap-4">
          <div className="w-8 h-8 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-xs text-sidebar-text mb-1">قيد التنفيذ</p>
            <h3 className="text-xl font-bold">12</h3>
          </div>
        </div>
        <div className="glass p-4 rounded-3xl border border-white/10 flex items-center gap-4">
          <div className="w-8 h-8 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-xs text-sidebar-text mb-1">مكتملة</p>
            <h3 className="text-xl font-bold">48</h3>
          </div>
        </div>
        <div className="glass p-4 rounded-3xl border border-white/10 flex items-center gap-4">
          <div className="w-8 h-8 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <AlertCircle size={18} />
          </div>
          <div>
            <p className="text-xs text-sidebar-text mb-1">متأخرة</p>
            <h3 className="text-xl font-bold">3</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <TasksList />
        </div>
        <div className="lg:col-span-1 space-y-3">
          <div className="glass p-5 rounded-[40px] border border-white/10">
            <h3 className="font-bold mb-6">إحصائيات الإنجاز</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>المهام الإدارية</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[80%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>تجديد الوثائق</span>
                  <span>45%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
