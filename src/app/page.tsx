"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  CreditCard, 
  AlertCircle, 
  FileCheck,
  ArrowUpRight,
  Filter,
  Download,
  PieChart,
  Zap,
  ShieldCheck,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import FinancialChart from "@/components/dashboard/FinancialChart";
import TasksList from "@/components/dashboard/TasksList";

export default function Home() {
  return (
    <div className="space-y-12 pb-20 font-rubik relative">
      {/* Mesh Background Overlay */}
      <div className="mesh-bg opacity-30"></div>

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-secondary/20">System Live</span>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          <h1 className="text-6xl font-black mb-4 tracking-tighter text-gradient leading-tight">
            مرحباً بك في <br/> <span className="text-secondary underline decoration-secondary/20 underline-offset-8">مستقبلك الإداري</span>
          </h1>
          <p className="text-sidebar-text font-medium text-xl max-w-xl leading-relaxed">
            لقد قمنا بتحليل بيانات اليوم؛ كل شيء يسير وفق الخطة. إليك أهم المؤشرات التي تتطلب انتباهك.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-4">
           <div className="flex items-center gap-3 bg-white/[0.03] p-2 pr-6 rounded-full border border-white/5 backdrop-blur-md">
              <span className="text-xs font-bold text-white/60">آخر تحديث: منذ دقيقتين</span>
              <div className="flex -space-x-3 space-x-reverse">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030712] bg-gradient-to-br from-secondary to-amber-600 flex items-center justify-center text-[10px] font-black text-primary ring-2 ring-white/5">
                      {i}
                   </div>
                 ))}
              </div>
           </div>
           <div className="flex gap-4">
              <button className="px-8 py-4 glass rounded-2xl text-sm font-black hover:bg-white/5 transition-all flex items-center gap-2 group">
                 <Download size={18} className="text-secondary group-hover:-translate-y-1 transition-transform" />
                 سجل العمليات
              </button>
              <button className="px-8 py-4 bg-secondary text-primary rounded-2xl text-sm font-black shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-105 transition-all flex items-center gap-2 active:scale-95">
                 <Sparkles size={18} />
                 ذكاء الأعمال AI
              </button>
           </div>
        </div>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        <StatCard 
          title="القوة البشرية" 
          value="156" 
          subValue="موظف نشط حالياً"
          icon={Users} 
          trend={{ value: 8, isUp: true }}
          color="secondary" 
        />
        <StatCard 
          title="الوثائق الحرجة" 
          value="03" 
          subValue="تتطلب تجديد فوري"
          icon={AlertCircle} 
          trend={{ value: 2, isUp: false }}
          color="rose" 
        />
        <StatCard 
          title="السيولة المتاحة" 
          value="42.5K" 
          subValue="ريال سعودي"
          icon={CreditCard} 
          trend={{ value: 15, isUp: true }}
          color="emerald" 
        />
        <StatCard 
          title="الامتثال القانوني" 
          value="100%" 
          subValue="حالة التراخيص"
          icon={ShieldCheck} 
          color="blue" 
        />
      </div>

      {/* Main Analysis Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        <div className="lg:col-span-2">
          <div className="glass p-10 rounded-[4rem] relative overflow-hidden group min-h-[500px]">
             <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="flex items-center justify-between mb-12">
                <div>
                   <h3 className="text-2xl font-black text-white flex items-center gap-3">
                      <PieChart className="text-secondary" /> التحليل المالي الذكي
                   </h3>
                   <p className="text-sidebar-text text-sm mt-1">تتبع التدفقات النقدية والنمو الربحي لهذا العام.</p>
                </div>
                <div className="flex gap-2">
                   {['Week', 'Month', 'Year'].map(t => (
                     <button key={t} className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">{t}</button>
                   ))}
                </div>
             </div>
             <FinancialChart />
          </div>
        </div>
        <div className="lg:col-span-1">
          <TasksList />
        </div>
      </div>

      {/* AI Recommendation Engine */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-12 rounded-[4.5rem] border border-secondary/20 bg-gradient-to-br from-secondary/[0.05] to-transparent relative overflow-hidden group"
      >
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] group-hover:bg-secondary/20 transition-all duration-1000"></div>
        <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
           <div className="w-24 h-24 bg-gradient-to-br from-secondary to-amber-600 rounded-[2.5rem] flex items-center justify-center text-primary shadow-2xl shadow-secondary/20 animate-float">
              <Zap size={48} fill="currentColor" />
           </div>
           <div className="flex-1 text-center lg:text-right">
              <h3 className="text-3xl font-black text-white mb-4">محرك التوصيات الذكي <span className="text-secondary">(Insight Core)</span></h3>
              <p className="text-sidebar-text font-medium text-lg leading-relaxed max-w-4xl">
                 اكتشفنا نمطاً متكرراً في تأخر تجديد الشهادات الصحية في فرع جدة. نوصي بتفعيل الإشعارات التلقائية قبل 45 يوماً بدلاً من 30 يوماً لتحسين الكفاءة بنسبة 22%. هل تود تفعيل هذا الإجراء الآن؟
              </p>
           </div>
           <button className="bg-white text-primary px-10 py-5 rounded-[2rem] font-black text-sm hover:bg-secondary transition-all shadow-xl shadow-white/5 active:scale-95 flex items-center gap-2">
              تفعيل التوصية <ChevronLeft size={18} />
           </button>
        </div>
      </motion.div>
    </div>
  );
}
