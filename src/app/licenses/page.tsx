"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Calendar, FileText, AlertTriangle, ExternalLink, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const licenses = [
  { id: 1, name: "السجل التجاري الرئيسي", type: "CR", expiry: "2026/08/12", status: "active", issuer: "وزارة التجارة" },
  { id: 2, name: "رخصة الدفاع المدني", type: "Permit", expiry: "2026/05/15", status: "warning", issuer: "الدفاع المدني" },
  { id: 3, name: "شهادة الزكاة والدخل", type: "Tax", expiry: "2027/01/01", status: "active", issuer: "ZATCA" },
  { id: 4, name: "رخصة البلدية", type: "Municipal", expiry: "2026/04/30", status: "expired", issuer: "البلدية" },
];

export default function LicensesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">التراخيص والسجلات</h1>
        <p className="text-sidebar-text">إدارة جميع التراخيص الحكومية والسجلات التجارية للمنشأة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Licenses List */}
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            قائمة التراخيص
          </h3>
          <div className="space-y-4">
            {licenses.map((license) => (
              <motion.div 
                key={license.id}
                whileHover={{ scale: 1.01 }}
                className="glass p-6 rounded-3xl border border-white/10 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border",
                    license.status === 'active' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' :
                    license.status === 'warning' ? 'bg-amber-500/5 border-amber-500/20 text-amber-500' :
                    'bg-rose-500/5 border-rose-500/20 text-rose-500'
                  )}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold group-hover:text-secondary transition-colors">{license.name}</h4>
                    <p className="text-xs text-sidebar-text">{license.issuer} • {license.type}</p>
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="flex items-center gap-2 text-xs mb-1 justify-end">
                    <Calendar className="w-3 h-3" />
                    <span>ينتهي في: {license.expiry}</span>
                  </div>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                    license.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' :
                    license.status === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-rose-500/10 text-rose-500'
                  )}>
                    {license.status === 'active' ? 'ساري' : license.status === 'warning' ? 'قريب الانتهاء' : 'منتهي'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Renewal Alerts & Action */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[40px] border border-amber-500/20 bg-amber-500/5 relative overflow-hidden">
            <div className="relative z-10">
              <AlertTriangle className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">تنبيهات التجديد</h3>
              <p className="text-sm text-sidebar-text mb-6">
                هناك تراخيص تتطلب انتباهك الفوري لتجنب الغرامات المالية. رخصة البلدية منتهية بالفعل.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-xl border border-white/5">
                  <span>رخصة البلدية</span>
                  <span className="text-rose-500 font-bold">منذ يومين</span>
                </div>
                <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-xl border border-white/5">
                  <span>الدفاع المدني</span>
                  <span className="text-amber-500 font-bold">خلال 15 يوم</span>
                </div>
              </div>
              <button className="w-full bg-secondary text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                <ExternalLink className="w-5 h-5" />
                الدخول لبوابة "بلدي" للتجديد
              </button>
            </div>
          </div>

          <div className="glass p-8 rounded-[40px] border border-secondary/20 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <ShieldAlert size={32} />
            </div>
            <div>
              <h4 className="font-bold mb-1">الالتزام الحكومي</h4>
              <p className="text-xs text-sidebar-text leading-relaxed">جميع سجلاتك يتم مراقبتها آلياً لضمان الالتزام بكافة الأنظمة واللوائح المعمول بها في المملكة.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
