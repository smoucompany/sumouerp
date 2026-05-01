"use client";

import React, { useState } from "react";
import { 
  Stethoscope, 
  Calendar, 
  Plus, 
  Trash2, 
  Upload, 
  User, 
  Building2, 
  Hash, 
  Save, 
  X,
  FileText
} from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";
import { cn } from "@/lib/utils";

interface HealthCert {
  id?: string;
  employeeId: string;
  fullName: string;
  certNumber: string;
  companyName: string;
  issueDate: string;
  expiryDate: string;
  imagePath?: string;
}

export default function HealthCertificatesPage() {
  const { data: certs, addItem, removeItem, loading } = useFirestore<HealthCert>("health_certs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<HealthCert, 'id'>>({
    employeeId: "",
    fullName: "",
    certNumber: "",
    companyName: "",
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date().toISOString().split('T')[0],
    imagePath: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
    setFormData({
      employeeId: "",
      fullName: "",
      certNumber: "",
      companyName: "",
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date().toISOString().split('T')[0],
      imagePath: "",
    });
  };

  return (
    <div className="space-y-10 font-rubik">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">الشهادات الصحية (كرت البلدية)</h1>
          <p className="text-sidebar-text font-medium text-lg">إدارة وتجديد الشهادات الصحية لضمان الامتثال للمعايير الصحية.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-primary px-8 py-4 rounded-[2.5rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/20 hover:scale-105 transition-all"
        >
          <Plus size={20} />
          إضافة شهادة صحية جديدة
        </button>
      </div>

      {/* Grid of Certificates */}
      <div className="glass p-10 rounded-[4rem] border border-white/5 bg-white/[0.01]">
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {certs.map((cert) => (
              <div key={cert.id} className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group relative">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                       <Stethoscope size={24} />
                    </div>
                    <div>
                       <h4 className="font-black text-lg text-white">{cert.fullName}</h4>
                       <p className="text-xs text-sidebar-text font-bold">{cert.companyName}</p>
                    </div>
                 </div>
                 
                 <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-sidebar-text">رقم الشهادة</span>
                       <span className="text-white">{cert.certNumber}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-sidebar-text">تاريخ الانتهاء</span>
                       <span className="text-emerald-500">{cert.expiryDate}</span>
                    </div>
                 </div>

                 <button onClick={() => removeItem(cert.id!)} className="absolute top-6 left-6 p-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-lg">
                    <Trash2 size={16} />
                 </button>
              </div>
            ))}
         </div>
         {certs.length === 0 && !loading && (
           <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
              <FileText size={48} className="mx-auto text-white/10 mb-4" />
              <p className="text-sidebar-text font-black">لا توجد شهادات مسجلة حالياً.</p>
           </div>
         )}
      </div>

      {/* New Health Certificate Modal - Based on Image */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <div className="p-4">
           {/* Modal Header */}
           <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
              <div className="flex items-center gap-10 text-right">
                 <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-secondary border border-white/10 shadow-2xl">
                    <Stethoscope size={48} />
                 </div>
                 <div>
                    <h2 className="text-5xl font-black text-white tracking-tighter">إضافة شهادة صحية جديدة</h2>
                    <p className="text-white/40 font-bold mt-3 text-xl">يرجى تعبئة كافة الحقول المطلوبة بدقة لمتابعة صلاحية الشهادة الصحية.</p>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-12">
                 {/* Employee Link Selection */}
                 <div className="space-y-5 text-right relative z-50">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">الموظف <span className="text-rose-500">*</span></label>
                    <CustomSelect 
                       label="" value={formData.employeeId} 
                       onChange={(val) => setFormData({...formData, employeeId: val})}
                       options={[{ value: "أختر الموظف", label: "اختر الموظف" }]} 
                    />
                 </div>

                 {/* Full Name */}
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">اسم الموظف</label>
                    <div className="relative group">
                       <input 
                         required placeholder="الاسم الكامل" value={formData.fullName}
                         onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/10" 
                       />
                       <User className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={28} />
                    </div>
                 </div>

                 {/* Cert Number and Company */}
                 <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                    <div className="space-y-5 text-right">
                       <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">رقم الشهادة</label>
                       <div className="relative group">
                          <input 
                            required placeholder="رقم الشهادة الصحية" value={formData.certNumber}
                            onChange={(e) => setFormData({...formData, certNumber: e.target.value})}
                            className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/10" 
                          />
                          <Hash className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={28} />
                       </div>
                    </div>
                    <div className="space-y-5 text-right">
                       <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">جهة العمل</label>
                       <div className="relative group">
                          <input 
                            required placeholder="اسم الشركة" value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/10" 
                          />
                          <Building2 className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={28} />
                       </div>
                    </div>

                    {/* Dates */}
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
                 </div>

                 {/* Upload Section */}
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">صورة الشهادة</label>
                    <div className="relative group p-14 border-2 border-dashed border-white/10 rounded-[3.5rem] bg-white/[0.01] hover:bg-white/[0.03] hover:border-secondary/40 transition-all cursor-pointer text-center">
                       <div className="w-20 h-20 bg-secondary/10 rounded-[2rem] flex items-center justify-center text-secondary mx-auto mb-6 group-hover:scale-110 transition-transform">
                          <Upload size={32} />
                       </div>
                       <h4 className="text-2xl font-black text-white mb-2">اسحب وأفلت الملف أو انقر للاختيار</h4>
                       <p className="text-white/20 font-bold">يدعم الصور وملفات PDF (الحد الأقصى 5MB)</p>
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                 </div>
              </div>

              <div className="pt-12 flex gap-10">
                 <button type="submit" className="flex-[2] bg-secondary text-primary py-8 rounded-[3rem] font-black text-2xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-6">
                    <Save size={32} /> حفظ البيانات
                 </button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/[0.03] border border-white/5 py-8 rounded-[3rem] text-white/60 font-black text-lg hover:bg-white/10 transition-all">إلغاء</button>
              </div>
           </form>
        </div>
      </Modal>
    </div>
  );
}
