"use client";

import React, { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Plus, Search, Trash2, Calendar, CreditCard, Building2, FileText, Save, X, Printer, Download, Edit } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import StatCard from "@/components/dashboard/StatCard";
import CustomSelect from "@/components/shared/Select";
import { cn } from "@/lib/utils";

interface Transaction {
  id?: string;
  employeeLink: string;
  companyName: string;
  serviceType: string;
  paymentReason: string;
  amount: string;
  sadadNumber: string;
  dueDate: string;
  status: string;
}

export default function FinancePage() {
  const { data: transactions, addItem, removeItem, loading } = useFirestore<Transaction>("transactions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    employeeLink: "بدون ربط",
    companyName: "",
    serviceType: "تحويل بنكي",
    paymentReason: "",
    amount: "",
    sadadNumber: "",
    dueDate: new Date().toISOString().split('T')[0],
    status: "معلق (Pending)",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
    setFormData({
      employeeLink: "بدون ربط",
      companyName: "",
      serviceType: "تحويل بنكي",
      paymentReason: "",
      amount: "",
      sadadNumber: "",
      dueDate: new Date().toISOString().split('T')[0],
      status: "معلق (Pending)",
    });
  };

  return (
    <div className="space-y-3 font-rubik">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black mb-2 tracking-tight">سجلات المدفوعات والمالية</h1>
          <p className="text-sidebar-text font-medium text-sm">إدارة التدفقات النقدية والطلبات المالية بدقة متناهية.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="bg-white/5 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
            <Printer size={18} /> طباعة
          </button>
          <button className="bg-white/5 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
            <Download size={18} /> تصدير
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-secondary text-primary px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 shadow-2xl shadow-secondary/20 hover:scale-105 transition-all"
          >
            <Plus size={18} />
            إضافة طلب دفع جديد
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="إجمالي المدفوعات" value="1,240,500" subValue="ريال سعودي" icon={DollarSign} color="blue" />
        <StatCard title="مدفوعات الشهر" value="540,000" subValue="ريال سعودي" icon={TrendingUp} color="emerald" />
        <StatCard title="طلبات معلقة" value="12" subValue="بحاجة للمراجعة" icon={CreditCard} color="rose" />
      </div>

      {/* Table Section */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-black">سجل طلبات الدفع</h3>
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary" />
            <input type="text" placeholder="بحث سريع..." className="bg-white/5 border border-white/5 rounded-2xl py-2 pr-12 pl-6 text-sm w-80 outline-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-xs font-black text-white/20 uppercase tracking-widest border-b border-white/5">
                <th className="pb-6 pr-6">جهة العمل / الموظف</th>
                <th className="pb-6">نوع الخدمة</th>
                <th className="pb-6">المبلغ</th>
                <th className="pb-6">تاريخ الاستحقاق</th>
                <th className="pb-6">الحالة</th>
                <th className="pb-6">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((t) => (
                <tr key={t.id} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="py-6 pr-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{t.companyName}</span>
                      <span className="text-[10px] text-sidebar-text">{t.employeeLink}</span>
                    </div>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-secondary" />
                      <span className="text-sm font-medium">{t.serviceType}</span>
                    </div>
                  </td>
                  <td className="py-6 font-black text-sm text-secondary">{t.amount} ر.س</td>
                  <td className="py-6 text-sm text-sidebar-text font-bold">{t.dueDate}</td>
                  <td className="py-6">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                      t.status === 'مدفوع (Paid)' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                    )}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-6">
                    <div className="flex gap-2">

                  <button className="p-3 text-secondary opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary/10 rounded-xl" title="تعديل">
                     <Edit size={16} />
                  </button>
<button onClick={() => removeItem(t.id!)} className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={18} />
                    </button>
</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Payment Modal - Based on User Images */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <div className="p-2">
          <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
             <div className="flex items-center gap-4 text-right">
                <div className="w-8 h-8 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 shadow-2xl">
                   <CreditCard size={18} />
                </div>
                <div>
                   <h2 className="text-xl font-black text-white tracking-tighter">إضافة طلب دفع جديد</h2>
                   <p className="text-white/40 font-bold mt-3 text-lg">يرجى إدخال كافة التفاصيل المالية لإتمام العملية بنجاح.</p>
                </div>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                {/* Row 1 */}
                <div className="space-y-3 text-right">
                   <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">ربط بالموظف (اختياري)</label>
                   <CustomSelect 
                      label="" value={formData.employeeLink} 
                      onChange={(val) => setFormData({...formData, employeeLink: val})}
                      options={[{ value: "بدون ربط", label: "بدون ربط" }, { value: "أحمد علي", label: "أحمد علي" }]} 
                   />
                </div>
                <div className="space-y-3 text-right">
                   <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">جهة العمل</label>
                   <div className="relative group">
                      <input 
                        required placeholder="اسم الشركة أو الجهة المستفيدة" value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                      />
                      <Building2 className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5 group-focus-within:text-secondary/10 transition-all" size={16} />
                   </div>
                </div>

                {/* Row 2 */}
                <div className="space-y-3 text-right">
                   <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">نوع الخدمة (SERVICE TYPE)</label>
                   <CustomSelect 
                      label="" value={formData.serviceType} 
                      onChange={(val) => setFormData({...formData, serviceType: val})}
                      options={[
                        { value: "تحويل بنكي", label: "تحويل بنكي" },
                        { value: "اشتراك", label: "اشتراك" },
                        { value: "سداد", label: "سداد" },
                        { value: "نقدي", label: "نقدي" },
                        { value: "أخرى", label: "أخرى" }
                      ]} 
                   />
                </div>
                <div className="space-y-3 text-right">
                   <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">سبب السداد (PAYMENT REASON)</label>
                   <input 
                      required placeholder="أدخل تفاصيل ومبررات السداد" value={formData.paymentReason}
                      onChange={(e) => setFormData({...formData, paymentReason: e.target.value})}
                      className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                   />
                </div>

                {/* Row 3 */}
                <div className="space-y-3 text-right">
                   <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">المبلغ الإجمالي (AMOUNT)</label>
                   <div className="relative">
                      <input 
                        required type="number" placeholder="0.00" value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right font-black text-secondary placeholder:text-white/5" 
                      />
                      <span className="absolute left-12 top-1/2 -translate-y-1/2 text-xs font-black text-white/10 uppercase tracking-widest">SAR</span>
                   </div>
                </div>
                <div className="space-y-3 text-right">
                   <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">رقم سداد (SADAD NUMBER)</label>
                   <input 
                      placeholder="رقم الفاتورة أو مرجع السداد" value={formData.sadadNumber}
                      onChange={(e) => setFormData({...formData, sadadNumber: e.target.value})}
                      className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right font-mono tracking-widest placeholder:text-white/5" 
                   />
                </div>

                {/* Row 4 */}
                <div className="space-y-3 text-right">
                   <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">تاريخ الاستحقاق (DUE DATE)</label>
                   <div className="relative">
                      <input 
                        required type="date" value={formData.dueDate}
                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                        className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                      />
                      <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                   </div>
                </div>
                <div className="space-y-3 text-right">
                   <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الحالة (STATUS)</label>
                   <CustomSelect 
                      label="" value={formData.status} 
                      onChange={(val) => setFormData({...formData, status: val})}
                      options={[
                        { value: "معلق (Pending)", label: "معلق (Pending)" },
                        { value: "مدفوع (Paid)", label: "مدفوع (Paid)" },
                        { value: "متأخر (Overdue)", label: "متأخر (Overdue)" }
                      ]} 
                   />
                </div>
             </div>

             <div className="pt-16 flex gap-4">
                <button type="submit" className="flex-[2] bg-secondary text-primary py-2 rounded-[2.8rem] font-black text-xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                   <Save size={16} /> حفظ البيانات والطلب المالي
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/[0.03] border border-white/5 py-2 rounded-[2.8rem] text-white/60 font-black text-sm hover:bg-white/10 transition-all">إلغاء</button>
             </div>
          </form>
        </div>
      </Modal>


    </div>
  );
}
