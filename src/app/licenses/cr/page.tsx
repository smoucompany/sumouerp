"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Trash2, 
  Plus, 
  Building2,
  Hash,
  MapPin,
  Calendar,
  Save,
  Building
} from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface CR {
  id?: string;
  name: string;
  crNumber: string;
  location: string;
  issueDate: string;
  expiryDate: string;
  registerDate: string;
  taxNumber: string;
  sponsor: string;
  status: string;
}

export default function CRPage() {
  const { data: records, addItem, updateItem, removeItem, loading } = useFirestore<CR>("cr_records");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<CR, 'id'>>({
    name: "",
    crNumber: "",
    location: "",
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date().toISOString().split('T')[0],
    registerDate: new Date().toISOString().split('T')[0],
    taxNumber: "",
    sponsor: "اختر جهة العمل...",
    status: "نشط",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
    setFormData({
      name: "",
      crNumber: "",
      location: "",
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date().toISOString().split('T')[0],
      registerDate: new Date().toISOString().split('T')[0],
      taxNumber: "",
      sponsor: "اختر جهة العمل...",
      status: "نشط",
    });
  };

  return (
    <div className="space-y-10 font-rubik">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">السجلات التجارية (CR)</h1>
          <p className="text-sidebar-text font-medium text-lg">إدارة السجلات التجارية للمركز الرئيسي والفروع.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-primary px-10 py-5 rounded-[2.5rem] font-black text-sm flex items-center gap-3 shadow-2xl shadow-secondary/20 hover:scale-105 transition-all"
        >
          <Plus size={22} />
          إضافة سجل تجاري جديد
        </button>
      </div>

      {/* CR Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {records.map((cr) => (
           <div key={cr.id} className="glass p-8 rounded-[3.5rem] border border-white/5 relative group overflow-hidden hover:border-secondary/20 transition-all bg-white/[0.02]">
              <div className="flex justify-between items-start mb-6">
                 <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                    <Building size={32} />
                 </div>
                 <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${cr.status === 'نشط' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {cr.status}
                 </span>
              </div>
              <h3 className="text-xl font-black mb-2 text-white">{cr.name}</h3>
              <p className="text-sm font-mono text-sidebar-text mb-6 tracking-widest">{cr.crNumber}</p>
              
              <div className="space-y-4 pt-6 border-t border-white/5">
                 <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-sidebar-text">الموقع</span>
                    <span className="text-white">{cr.location}</span>
                 </div>
                 <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-sidebar-text">تاريخ الانتهاء</span>
                    <span className="text-amber-500">{cr.expiryDate}</span>
                 </div>
              </div>

              <button onClick={() => removeItem(cr.id!)} className="absolute top-8 left-8 p-3 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-xl">
                 <Trash2 size={20} />
              </button>
           </div>
         ))}
         {records.length === 0 && !loading && (
           <div className="lg:col-span-3 py-24 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
              <Building size={64} className="mx-auto text-white/5 mb-6" />
              <p className="text-sidebar-text text-xl font-black">لا توجد سجلات تجارية مسجلة حالياً.</p>
           </div>
         )}
      </div>

      {/* New CR Modal - Based on Image */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <div className="p-2">
           {/* Modal Header */}
           <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
              <div className="flex items-center gap-10 text-right">
                 <div className="w-24 h-24 bg-secondary/10 rounded-[2.5rem] flex items-center justify-center text-secondary border border-secondary/20 shadow-2xl">
                    <Building size={48} />
                 </div>
                 <div>
                    <h2 className="text-5xl font-black text-white tracking-tighter">إضافة سجل تجاري جديد</h2>
                    <p className="text-white/40 font-bold mt-3 text-xl">يرجى تعبئة كافة الحقول المطلوبة بدقة.</p>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-14">
              <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                 
                 {/* Row 1 */}
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">اسم المنشأة</label>
                    <div className="relative group">
                       <input 
                         required placeholder="اسم الفرع أو المؤسسة" value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">رقم السجل</label>
                    <div className="relative group">
                       <input 
                         required placeholder="رقم السجل التجاري" value={formData.crNumber}
                         onChange={(e) => setFormData({...formData, crNumber: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-mono tracking-widest" 
                       />
                    </div>
                 </div>

                 {/* Row 2 */}
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">الموقع</label>
                    <div className="relative group">
                       <input 
                         required placeholder="المدينة أو المنطقة" value={formData.location}
                         onChange={(e) => setFormData({...formData, location: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">تاريخ الإصدار</label>
                    <div className="relative">
                       <input 
                         required type="date" value={formData.issueDate}
                         onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                       />
                       <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={28} />
                    </div>
                 </div>

                 {/* Row 3 */}
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">تاريخ الانتهاء</label>
                    <div className="relative">
                       <input 
                         required type="date" value={formData.expiryDate}
                         onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                       />
                       <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={28} />
                    </div>
                 </div>
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">تاريخ التسجيل</label>
                    <div className="relative">
                       <input 
                         required type="date" value={formData.registerDate}
                         onChange={(e) => setFormData({...formData, registerDate: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                       />
                       <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={28} />
                    </div>
                 </div>

                 {/* Row 4 */}
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">الرقم الضريبي (اختياري)</label>
                    <div className="relative group">
                       <input 
                         placeholder="الرقم الضريبي للمنشأة" value={formData.taxNumber}
                         onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-mono tracking-widest" 
                       />
                    </div>
                 </div>
                 <div className="space-y-5 text-right relative z-50">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">جهة العمل / الكفيل <span className="text-rose-500">*</span></label>
                    <CustomSelect 
                       label="" value={formData.sponsor} 
                       onChange={(val) => setFormData({...formData, sponsor: val})}
                       options={[
                         { value: "اختر جهة العمل...", label: "اختر جهة العمل..." },
                         { value: "الشركة الرئيسية", label: "الشركة الرئيسية" }
                       ]} 
                    />
                 </div>
              </div>

              <div className="pt-16 flex gap-10">
                 <button type="submit" className="flex-[2] bg-secondary text-primary py-8 rounded-[3rem] font-black text-2xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-6">
                    <Save size={32} /> حفظ السجل
                 </button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/[0.03] border border-white/5 py-8 rounded-[3rem] text-white/60 font-black text-lg hover:bg-white/10 transition-all">إلغاء</button>
              </div>
           </form>
        </div>
      </Modal>
    </div>
  );
}
