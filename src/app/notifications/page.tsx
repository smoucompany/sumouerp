"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, AlertCircle, FileCheck, CreditCard, Mail, Trash2, CheckSquare, Printer, Download, Edit } from "lucide-react";

const notifications = [
  { id: 1, title: "تنبيه انتهاء إقامة", desc: "إقامة الموظف أحمد الحربي تنتهي خلال 5 أيام.", time: "قبل 10 دقائق", icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
  { id: 2, title: "تم تجديد السجل التجاري", desc: "تم تحديث السجل التجاري الرئيسي بنجاح.", time: "قبل ساعة", icon: FileCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: 3, title: "دفعة جديدة مستلمة", desc: "تم استلام مبلغ 15,000 ريال من العميل شركة أ.", time: "قبل 3 ساعات", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 4, title: "رسالة من النظام", desc: "تم تحديث إعدادات الأمان الخاصة بحسابك.", time: "يوم أمس", icon: Mail, color: "text-secondary", bg: "bg-secondary/10" },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold mb-2">الإشعارات</h1>
          <p className="text-sidebar-text">تابع آخر التحديثات والتنبيهات الخاصة بنظامك.</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-secondary hover:underline">
          <CheckSquare size={16} />
          تحديد الكل كمقروء
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n, idx) => (
          <motion.div 
            key={n.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-4 rounded-3xl border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 group"
          >
            <div className={`w-8 h-8 rounded-2xl ${n.bg} ${n.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <n.icon size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold">{n.title}</h4>
                <span className="text-[10px] text-sidebar-text uppercase">{n.time}</span>
              </div>
              <p className="text-sm text-sidebar-text leading-relaxed">{n.desc}</p>
            </div>
            <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all">
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="pt-10 text-center">
        <button className="text-sm font-bold text-sidebar-text hover:text-white transition-colors">
          تحميل الإشعارات الأقدم
        </button>
      </div>
    </div>
  );
}
