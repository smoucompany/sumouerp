"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Plus, 
  Search, 
  Trash2, 
  Upload, 
  Hash, 
  Save, 
  Building,
  Tag,
  Link as LinkIcon
} from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";
import { cn } from "@/lib/utils";

interface License {
  id?: string;
  name: string;
  licenseNumber: string;
  category: string;
  additionalType: string;
  expiryDate: string;
  crLink: string;
  imagePath?: string;
}

export default function LicensesPage() {
  const { data: licenses, addItem, removeItem, loading } = useFirestore<License>("licenses");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<License, 'id'>>({
    name: "",
    licenseNumber: "",
    category: "أخرى",
    additionalType: "",
    expiryDate: new Date().toISOString().split('T')[0],
    crLink: "بدون ربط",
    imagePath: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
    setFormData({
      name: "",
      licenseNumber: "",
      category: "أخرى",
      additionalType: "",
      expiryDate: new Date().toISOString().split('T')[0],
      crLink: "بدون ربط",
      imagePath: "",
    });
  };

  return (
    <div className="space-y-3 font-rubik">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black mb-2 tracking-tight text-white">التراخيص والسجلات</h1>
          <p className="text-sidebar-text font-medium text-sm">إدارة التراخيص الحكومية والسجلات التجارية لضمان الالتزام بكافة الأنظمة.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-primary px-3 py-2 rounded-2xl font-black text-sm flex items-center gap-3 shadow-2xl shadow-secondary/20 hover:scale-105 transition-all"
        >
          <Plus size={22} />
          إضافة ترخيص جديد
        </button>
      </div>

      {/* Licenses Display */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {licenses.map((lic) => (
              <div key={lic.id} className="p-4 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group relative overflow-hidden">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-12 rounded-[1.8rem] bg-secondary/10 flex items-center justify-center text-secondary">
                       <ShieldCheck size={16} />
                    </div>
                    <div>
                       <h4 className="font-black text-lg text-white">{lic.name}</h4>
                       <p className="text-xs text-sidebar-text font-bold uppercase tracking-widest">{lic.category} • {lic.additionalType}</p>
                    </div>
                 </div>
                 
                 <div className="space-y-3 pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="text-sidebar-text">رقم الترخيص</span>
                       <span className="text-white font-mono">{lic.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="text-sidebar-text">تاريخ الانتهاء</span>
                       <span className="text-amber-500">{lic.expiryDate}</span>
                    </div>
                 </div>

                 <button onClick={() => removeItem(lic.id!)} className="absolute top-5 left-8 p-3 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-xl">
                    <Trash2 size={16} />
                 </button>
              </div>
            ))}
         </div>
         {licenses.length === 0 && !loading && (
           <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <FileText size={64} className="mx-auto text-white/5 mb-6" />
              <p className="text-sidebar-text text-lg font-black">لا توجد تراخيص مسجلة حالياً.</p>
           </div>
         )}
      </div>

      {/* New License Modal - Based on Image */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <div className="p-2">
           {/* Modal Header */}
           <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 text-right">
                 <div className="w-8 h-8 bg-white/5 rounded-2xl flex items-center justify-center text-secondary border border-white/10 shadow-2xl">
                    <FileText size={18} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-white tracking-tighter">إضافة ترخيص جديد</h2>
                    <p className="text-white/40 font-bold mt-3 text-lg">يرجى تعبئة كافة الحقول المطلوبة بدقة لضمان صحة بيانات الترخيص.</p>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                 {/* Row 1 */}
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">اسم الترخيص</label>
                    <div className="relative group">
                       <input 
                         required placeholder="مثال: رخصة البلدية" value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                       <Building className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">رقم الترخيص</label>
                    <div className="relative group">
                       <input 
                         required placeholder="رقم الشهادة أو الترخيص" value={formData.licenseNumber}
                         onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-mono tracking-widest" 
                       />
                       <Hash className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                    </div>
                 </div>

                 {/* Row 2 */}
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">التصنيف</label>
                    <CustomSelect 
                       label="" value={formData.category} 
                       onChange={(val) => setFormData({...formData, category: val})}
                       options={[
                         { value: "أخرى", label: "أخرى" },
                         { value: "رخصة بلدية", label: "رخصة بلدية" },
                         { value: "دفاع مدني", label: "دفاع مدني" }
                       ]} 
                    />
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">النوع الإضافي</label>
                    <div className="relative group">
                       <input 
                         required placeholder="بلدية / صحي / إلخ" value={formData.additionalType}
                         onChange={(e) => setFormData({...formData, additionalType: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                       <Tag className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                    </div>
                 </div>

                 {/* Row 3 */}
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
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">ربط بالسجل التجاري</label>
                    <CustomSelect 
                       label="" value={formData.crLink} 
                       onChange={(val) => setFormData({...formData, crLink: val})}
                       options={[
                         { value: "بدون ربط", label: "بدون ربط" },
                         { value: "السجل التجاري الرئيسي", label: "السجل التجاري الرئيسي" }
                       ]} 
                    />
                 </div>
              </div>

              {/* Upload Section */}
              <div className="space-y-3 text-right">
                 <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">صورة الترخيص</label>
                 <div className="relative group p-20 border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] hover:border-secondary/40 transition-all cursor-pointer text-center">
                    <div className="w-8 h-8 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                       <Upload size={40} />
                    </div>
                    <h4 className="text-lg font-black text-white mb-3">اسحب وأفلت الملف أو انقر للاختيار</h4>
                    <p className="text-white/20 text-sm font-bold">يدعم الصور وملفات PDF (الحد الأقصى 5MB)</p>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                 </div>
              </div>

              <div className="pt-16 flex gap-4">
                 <button type="submit" className="flex-[2] bg-secondary text-primary py-2 rounded-3xl font-black text-xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-4">
                    <Save size={16} /> حفظ بيانات الترخيص
                 </button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/[0.03] border border-white/5 py-2 rounded-3xl text-white/60 font-black text-sm hover:bg-white/10 transition-all">إلغاء</button>
              </div>
           </form>
        </div>
      </Modal>
    </div>
  );
}
