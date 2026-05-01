"use client";

import React from "react";
import { History, User, Search, Filter, ShieldCheck, LogIn, Edit, Trash2 } from "lucide-react";

export default function ActivityLogsPage() {
  return (
    <div className="space-y-8 font-rubik">
      <div>
        <h1 className="text-3xl font-black mb-2">سجلات النشاط</h1>
        <p className="text-sidebar-text font-medium">مراقبة جميع العمليات والتغييرات التي تمت على النظام.</p>
      </div>

      <div className="glass p-10 rounded-[4rem] border border-white/5">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                 <History size={24} />
              </div>
              <h3 className="text-xl font-black">آخر العمليات</h3>
           </div>
           <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/10">تصدير CSV</button>
              <button className="px-4 py-2 bg-rose-500/10 text-rose-500 rounded-xl text-xs font-bold hover:bg-rose-500/20">مسح السجلات</button>
           </div>
        </div>

        <div className="space-y-6">
           {[
             { action: "تسجيل دخول", user: "أدمن النظام", time: "قبل 5 دقائق", icon: LogIn, color: "text-blue-500" },
             { action: "تعديل إقامة موظف", user: "سارة خالد", time: "قبل 15 دقيقة", icon: Edit, color: "text-amber-500" },
             { action: "حذف مستند مالي", user: "أدمن النظام", time: "قبل ساعة", icon: Trash2, color: "text-rose-500" },
             { action: "تحديث تراخيص", user: "أدمن النظام", time: "قبل 3 ساعات", icon: ShieldCheck, color: "text-emerald-500" },
           ].map((log, idx) => (
             <div key={idx} className="flex items-center justify-between p-5 rounded-[2rem] bg-white/[0.01] border border-white/5 relative group">
                <div className="flex items-center gap-6">
                   <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${log.color}`}>
                      <log.icon size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">{log.action}</h4>
                      <p className="text-xs text-sidebar-text flex items-center gap-2 mt-1">
                         <User size={12} /> {log.user}
                      </p>
                   </div>
                </div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{log.time}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
