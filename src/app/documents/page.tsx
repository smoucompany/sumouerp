"use client";

import React from "react";
import { motion } from "framer-motion";
import { File, Folder, Search, Grid, List, Download, Share2, MoreVertical, Plus } from "lucide-react";

const folders = [
  { name: "عقود الموظفين", count: 156, color: "text-blue-500" },
  { name: "أوراق المنشأة", count: 12, color: "text-amber-500" },
  { name: "التقارير المالية", count: 48, color: "text-emerald-500" },
  { name: "التراخيص", count: 8, color: "text-rose-500" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">أرشيف الوثائق</h1>
          <p className="text-sidebar-text">مركز إدارة وحفظ جميع المستندات الرقمية للشركة بشكل آمن.</p>
        </div>
        <button className="bg-secondary text-primary px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" />
          رفع مستند جديد
        </button>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {folders.map((folder, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="glass p-6 rounded-3xl border border-white/10 hover:border-secondary/30 transition-all cursor-pointer group"
          >
            <Folder className={`w-10 h-10 ${folder.color} mb-4 group-hover:scale-110 transition-transform`} />
            <h4 className="font-bold mb-1">{folder.name}</h4>
            <p className="text-xs text-sidebar-text">{folder.count} ملف</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Files Table */}
      <div className="glass p-8 rounded-[40px] border border-white/10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold">آخر المستندات المضافة</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 rounded-lg text-sidebar-text"><Grid size={18}/></button>
            <button className="p-2 bg-secondary text-primary rounded-lg"><List size={18}/></button>
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <File size={20} className="text-sidebar-text" />
                </div>
                <div>
                  <h5 className="text-sm font-bold">عقد عمل - أحمد الحربي.pdf</h5>
                  <p className="text-[10px] text-sidebar-text uppercase">تم الرفع قبل ساعتين • 2.4 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg text-sidebar-text"><Download size={16}/></button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-sidebar-text"><Share2 size={16}/></button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-sidebar-text"><MoreVertical size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
