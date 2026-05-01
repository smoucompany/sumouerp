"use client";

import React, { useState } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft,
  Filter,
  Download,
  Plus,
  Search,
  Trash2,
  Edit
} from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import StatCard from "@/components/dashboard/StatCard";

interface Transaction {
  id?: string;
  type: 'income' | 'expense';
  category: string;
  amount: string;
  date: string;
  status: string;
}

export default function FinancePage() {
  const { data: transactions, addItem, removeItem, loading } = useFirestore<Transaction>("transactions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    type: 'income',
    category: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "completed",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-10 font-rubik">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">سجلات المدفوعات والمالية</h1>
          <p className="text-sidebar-text font-medium text-lg">مراقبة التدفقات النقدية، الإيرادات والمصروفات بشكل دقيق.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-primary px-8 py-4 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/20 hover:shadow-secondary/30 transition-all"
        >
          <Plus size={20} />
          إضافة عملية مالية
        </button>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="إجمالي السيولة" 
          value="1,240,500" 
          subValue="ريال سعودي"
          icon={DollarSign} 
          trend={{ value: 12, isUp: true }}
          color="blue" 
        />
        <StatCard 
          title="إيرادات الشهر" 
          value="540,000" 
          subValue="ريال سعودي"
          icon={TrendingUp} 
          trend={{ value: 5, isUp: true }}
          color="emerald" 
        />
        <StatCard 
          title="مصروفات الشهر" 
          value="142,300" 
          subValue="ريال سعودي"
          icon={TrendingDown} 
          trend={{ value: 2, isUp: false }}
          color="rose" 
        />
      </div>

      {/* Transactions Table Card */}
      <div className="glass p-10 rounded-[4rem] border border-white/5 bg-white/[0.01]">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-black">سجل العمليات الأخير</h3>
          <div className="flex gap-4">
            <div className="relative group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary" />
              <input type="text" placeholder="بحث..." className="bg-white/5 border border-white/5 rounded-2xl py-4 pr-12 pl-6 text-sm w-80 transition-all" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-xs font-black text-white/20 uppercase tracking-widest border-b border-white/5">
                <th className="pb-6 pr-6">النوع</th>
                <th className="pb-6">الفئة / الوصف</th>
                <th className="pb-6">المبلغ</th>
                <th className="pb-6">التاريخ</th>
                <th className="pb-6">الحالة</th>
                <th className="pb-6">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((t) => (
                <tr key={t.id} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        {t.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                      </div>
                      <span className="font-bold">{t.type === 'income' ? 'إيداع' : 'صرف'}</span>
                    </div>
                  </td>
                  <td className="py-6 font-medium text-sidebar-text">{t.category}</td>
                  <td className={`py-6 font-black text-lg ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {t.amount} ر.س
                  </td>
                  <td className="py-6 text-sm text-sidebar-text font-bold">{t.date}</td>
                  <td className="py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${t.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {t.status === 'completed' ? 'مكتمل' : 'معلق'}
                    </span>
                  </td>
                  <td className="py-6">
                    <button 
                      onClick={() => removeItem(t.id!)}
                      className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Finance Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="إضافة عملية مالية جديدة">
        <form onSubmit={handleSubmit} className="space-y-8">
           <div className="grid grid-cols-2 gap-4 p-2 bg-white/5 rounded-2xl border border-white/5">
              <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'income'})}
                className={`py-4 rounded-xl text-xs font-black uppercase transition-all ${formData.type === 'income' ? 'bg-emerald-500 text-white' : 'text-sidebar-text hover:bg-white/5'}`}
              >إيراد (Income)</button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'expense'})}
                className={`py-4 rounded-xl text-xs font-black uppercase transition-all ${formData.type === 'expense' ? 'bg-rose-500 text-white' : 'text-sidebar-text hover:bg-white/5'}`}
              >مصروف (Expense)</button>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest">الوصف / الفئة</label>
                 <input 
                   required
                   value={formData.category}
                   onChange={(e) => setFormData({...formData, category: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-secondary/20 outline-none" 
                   placeholder="مثال: رواتب الموظفين"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest">المبلغ (ريال سعودي)</label>
                 <input 
                   required
                   type="number"
                   value={formData.amount}
                   onChange={(e) => setFormData({...formData, amount: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-secondary/20 outline-none font-bold" 
                   placeholder="0.00"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest">تاريخ العملية</label>
                 <input 
                   type="date"
                   value={formData.date}
                   onChange={(e) => setFormData({...formData, date: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                 />
              </div>
           </div>

           <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-secondary text-primary py-5 rounded-2xl font-black text-sm shadow-xl shadow-secondary/20">حفظ العملية المالية</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-5 bg-white/5 rounded-2xl text-sm font-black">إلغاء</button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
