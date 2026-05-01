"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Plane, 
  Trash2, 
  Plus, 
  Calendar,
  Save,
  Building2,
  Hash,
  User,
  Upload,
  FileText
} from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface Visa {
  id?: string;
  employeeLink: string;
  fullName: string;
  visaNumber: string;
  companyName: string;
  visaType: string;
  status: string;
  issueDate: string;
  expiryDate: string;
  imagePath?: string;
}

export default function VisasPage() {
  const { data: visas, addItem, removeItem, loading } = useFirestore<Visa>("visas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Visa, 'id'>>({
    employeeLink: "اختر الموظف...",
    fullName: "",
    visaNumber: "",
    companyName: "اختر جهة العمل...",
    visaType: "خروج وعودة",
    status: "نشطة",
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date().toISOString().split('T')[0],
    imagePath: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
    setFormData({
      employeeLink: "اختر الموظف...",
      fullName: "",
      visaNumber: "",
      companyName: "اختر جهة العمل...",
      visaType: "خروج وعودة",
      status: "نشطة",
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date().toISOString().split('T')[0],
      imagePath: "",
    });
  };

  return (
    <div className="space-y-3 font-rubik">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black mb-2 tracking-tight text-white">التأشيرات</h1>
          <p className="text-sidebar-text font-medium text-sm">متابعة تأشيرات الخروج والعودة وتأشيرات العمل الجديدة بدقة.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-primary px-3 py-2 rounded-2xl font-black text-sm flex items-center gap-3 shadow-2xl shadow-secondary/20 hover:scale-105 transition-all"
        >
          <Plus size={22} />
          إضافة تأشيرة جديدة
        </button>
      </div>

      {/* Visas Display */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visas.map((v) => (
              <div key={v.id} className="p-4 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group relative overflow-hidden flex flex-col items-center text-center">
                 <div className="w-20 h-20 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                    <Plane size={40} />
                 </div>
                 <h4 className="font-black text-lg text-white mb-2">{v.visaType}</h4>
                 <p className="text-sm text-sidebar-text font-bold mb-6">{v.fullName || v.employeeLink}</p>
                 
                 <div className="w-full space-y-3 pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-sidebar-text">رقم التأشيرة</span>
                       <span className="text-white font-mono">{v.visaNumber || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-sidebar-text">تاريخ الانتهاء</span>
                       <span className="text-blue-400">{v.expiryDate}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-sidebar-text">الحالة</span>
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${v.status === 'نشطة' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {v.status}
                       </span>
                    </div>
                 </div>

                 <button onClick={() => removeItem(v.id!)} className="absolute top-5 left-8 p-3 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-xl">
                    <Trash2 size={16} />
                 </button>
              </div>
            ))}
         </div>
         {visas.length === 0 && !loading && (
           <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <Globe size={64} className="mx-auto text-white/5 mb-6" />
              <p className="text-sidebar-text text-lg font-black">لا توجد تأشيرات مسجلة حالياً.</p>
           </div>
         )}
      </div>

      {/* New Visa Modal - Based on Image */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <div className="p-2">
           {/* Modal Header */}
           <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 text-right">
                 <div className="w-8 h-8 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-2xl">
                    <Plane size={18} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-white tracking-tighter">إضافة تأشيرة جديدة</h2>
                    <p className="text-white/40 font-bold mt-3 text-lg">يرجى تعبئة كافة الحقول المطلوبة بدقة لمتابعة صلاحية التأشيرة.</p>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                 
                 {/* Row 1 - Employee Link (Full Width) */}
                 <div className="col-span-2 space-y-3 text-right relative z-50">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">ربط بالموظف <span className="text-rose-500">*</span></label>
                    <CustomSelect 
                       label="" value={formData.employeeLink} 
                       onChange={(val) => setFormData({...formData, employeeLink: val})}
                       options={[
                         { value: "اختر الموظف...", label: "اختر الموظف..." },
                         { value: "أحمد علي", label: "أحمد علي" }
                       ]} 
                    />
                 </div>

                 {/* Row 2 - Employee Name (Full Width) */}
                 <div className="col-span-2 space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">اسم الموظف</label>
                    <div className="relative group">
                       <input 
                         placeholder="الاسم الكامل" value={formData.fullName}
                         onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                       <User className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                    </div>
                 </div>

                 {/* Row 3 */}
                 <div className="space-y-3 text-right relative z-40">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">جهة العمل <span className="text-rose-500">*</span></label>
                    <CustomSelect 
                       label="" value={formData.companyName} 
                       onChange={(val) => setFormData({...formData, companyName: val})}
                       options={[
                         { value: "اختر جهة العمل...", label: "اختر جهة العمل..." },
                         { value: "الشركة الرئيسية", label: "الشركة الرئيسية" }
                       ]} 
                    />
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">رقم التأشيرة</label>
                    <div className="relative group">
                       <input 
                         required placeholder="رقم التأشيرة" value={formData.visaNumber}
                         onChange={(e) => setFormData({...formData, visaNumber: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-mono tracking-widest" 
                       />
                       <Hash className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                    </div>
                 </div>

                 {/* Row 4 */}
                 <div className="space-y-3 text-right relative z-30">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الحالة</label>
                    <CustomSelect 
                       label="" value={formData.status} 
                       onChange={(val) => setFormData({...formData, status: val})}
                       options={[
                         { value: "نشطة", label: "نشطة" },
                         { value: "منتهية", label: "منتهية" },
                         { value: "ملغاة", label: "ملغاة" }
                       ]} 
                    />
                 </div>
                 <div className="space-y-3 text-right relative z-30">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">النوع</label>
                    <CustomSelect 
                       label="" value={formData.visaType} 
                       onChange={(val) => setFormData({...formData, visaType: val})}
                       options={[
                         { value: "خروج وعودة", label: "خروج وعودة" },
                         { value: "خروج نهائي", label: "خروج نهائي" },
                         { value: "تأشيرة عمل", label: "تأشيرة عمل" }
                       ]} 
                    />
                 </div>

                 {/* Row 5 */}
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">تاريخ الانتهاء</label>
                    <div className="relative">
                       <input 
                         required type="date" value={formData.expiryDate}
                         onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                       />
                       <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">تاريخ الإصدار</label>
                    <div className="relative">
                       <input 
                         required type="date" value={formData.issueDate}
                         onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                       />
                       <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                    </div>
                 </div>

                 {/* Row 6 - Upload Section (Full Width) */}
                 <div className="col-span-2 space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">صورة التأشيرة</label>
                    <div className="relative group p-20 border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] hover:border-secondary/40 transition-all cursor-pointer text-center">
                       <div className="w-8 h-8 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                          <Upload size={40} />
                       </div>
                       <h4 className="text-lg font-black text-white mb-3">اسحب وأفلت الملف أو انقر للاختيار</h4>
                       <p className="text-white/20 text-sm font-bold">يدعم الصور وملفات PDF (الحد الأقصى 5MB)</p>
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                 </div>
              </div>

              <div className="pt-16 flex gap-4">
                 <button type="submit" className="flex-[2] bg-secondary text-primary py-2 rounded-3xl font-black text-xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-4">
                    <Save size={16} /> حفظ التأشيرة
                 </button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/[0.03] border border-white/5 py-2 rounded-3xl text-white/60 font-black text-sm hover:bg-white/10 transition-all">إلغاء</button>
              </div>
           </form>
        </div>
      </Modal>
    </div>
  );
}
