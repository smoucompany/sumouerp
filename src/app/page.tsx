"use client";

import React from "react";
import { 
  Users, 
  FileText, 
  AlertCircle, 
  TrendingUp, 
  Zap, 
  Plus, 
  Calendar, 
  ArrowUpRight,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import FinancialChart from "@/components/dashboard/FinancialChart";
import TasksList from "@/components/dashboard/TasksList";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
  const quickActions = [
    { label: "إضافة موظف", icon: Users, color: "secondary", href: "/employees" },
    { label: "عقد جديد", icon: FileText, color: "blue", href: "/employees/contracts" },
    { label: "تسجيل دفعة", icon: CreditCard, color: "emerald", href: "/finance" },
    { label: "تنبيه جديد", icon: Zap, color: "rose", href: "/notifications" },
  ];

  return (
    <div className="space-y-10 font-rubik">
      {/* Welcome & Quick Actions Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="relative p-12 rounded-[4rem] overflow-hidden border border-white/5 bg-gradient-to-br from-secondary/10 to-transparent group"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-colors"></div>
              <h1 className="text-5xl font-black mb-4 tracking-tighter">مرحباً بك في <span className="text-secondary">Sumou ERP</span></h1>
              <p className="text-sidebar-text text-xl max-w-xl leading-relaxed">أهلاً بك مجدداً. النظام يراقب الآن كافة العمليات والوثائق لضمان استمرارية عمل مؤسستك بكفاءة عالية.</p>
              
              <div className="mt-10 flex gap-4">
                 <div className="px-6 py-3 bg-secondary text-primary rounded-2xl font-black text-sm flex items-center gap-2">
                    <ShieldCheck size={18} /> النظام مؤمن بالكامل
                 </div>
                 <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-sidebar-text flex items-center gap-2">
                    <Calendar size={18} /> {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                 </div>
              </div>
           </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           {quickActions.map((action, idx) => (
             <Link key={idx} href={action.href}>
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="h-full p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center gap-4 hover:bg-white/[0.05] hover:border-secondary/20 transition-all cursor-pointer group"
                >
                   <div className={`w-14 h-14 rounded-2xl bg-${action.color}/10 flex items-center justify-center text-${action.color} group-hover:scale-110 transition-transform`}>
                      <action.icon size={28} />
                   </div>
                   <span className="font-black text-sm">{action.label}</span>
                   <ArrowUpRight size={14} className="text-white/10 group-hover:text-secondary" />
                </motion.div>
             </Link>
           ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="إجمالي الموظفين" 
          value="156" 
          subValue="+12 هذا الشهر"
          icon={Users} 
          trend={{ value: 8.5, isUp: true }}
          color="secondary" 
        />
        <StatCard 
          title="وثائق منتهية" 
          value="3" 
          subValue="إقامات وسجلات"
          icon={AlertCircle} 
          trend={{ value: 2, isUp: false }}
          color="rose" 
        />
        <StatCard 
          title="الإيرادات الشهرية" 
          value="540k" 
          subValue="ريال سعودي"
          icon={TrendingUp} 
          trend={{ value: 15, isUp: true }}
          color="emerald" 
        />
        <StatCard 
          title="المهام المكتملة" 
          value="92%" 
          subValue="معدل الإنجاز"
          icon={Zap} 
          trend={{ value: 4, isUp: true }}
          color="blue" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2">
          <FinancialChart />
        </div>
        <div>
          <TasksList />
        </div>
      </div>
    </div>
  );
}
