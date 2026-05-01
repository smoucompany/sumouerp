"use client";

import React, { useState } from "react";
import { Stethoscope, Calendar, Plus, Trash2, Upload, User, Building2, Hash, Save, X, FileText, Printer, Download, Edit } from "lucide-react";
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
    <div className="space-y-3 font-rubik">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black mb-2 tracking-tight">الشهادات الصحية (كرت البلدية)</h1>
          <p className="text-sidebar-text font-medium text-sm">إدارة وتجديد الشهادات الصحية لضمان الامتثال للمعايير الصحية.</p>
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
            إضافة شهادة صحية جديدة
          </button>
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {certs.map((cert) => (
              <div key={cert.id} className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group relative">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                       <Stethoscope size={18} />
                    </div>
                    <div>
                       <h4 className="font-black text-sm text-white">{cert.fullName}</h4>
                       <p className="text-xs text-sidebar-text font-bold">{cert.companyName}</p>
                    </div>
                 </div>
                 
                 <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-sidebar-text">رقم الشهادة</span>
                       <span className="text-white">{cert.certNumber}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-sidebar-text">تاريخ الانتهاء</span>
                       <span className="text-emerald-500">{cert.expiryDate}</span>
                    </div>
                 </div>

                 <div className="absolute top-5 left-5 flex gap-2">

                  <button className="p-3 text-secondary opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary/10 rounded-xl" title="تعديل">
                     <Edit size={16} />
                  </button>
<button onClick={() => removeItem(cert.id!)} className=" p-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-lg">
                    <Trash2 size={16} />
                 </button>
</div>
              </div>
            ))}
         </div>
         {certs.length === 0 && !loading && (
           <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <FileText size={18} className="mx-auto text-white/10 mb-4" />
              <p className="text-sidebar-text font-black">لا توجد شهادات مسجلة حالياً.</p>
           </div>
         )}
      </div>

      {/* New Health Certificate Modal - Based on Image */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <div className="p-4">
           {/* Modal Header */}
           <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 text-right">
                 <div className="w-8 h-8 bg-white/5 rounded-2xl flex items-center justify-center text-secondary border border-white/10 shadow-2xl">
                    <Stethoscope size={18} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-white tracking-tighter">إضافة شهادة صحية جديدة</h2>
                    <p className="text-white/40 font-bold mt-3 text-lg">يرجى تعبئة كافة الحقول المطلوبة بدقة لمتابعة صلاحية الشهادة الصحية.</p>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-3">
                 {/* Employee Link Selection */}
                 <div className="space-y-3 text-right relative z-50">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الموظف <span className="text-rose-500">*</span></label>
                    <CustomSelect 
                       label="" value={formData.employeeId} 
                       onChange={(val) => setFormData({...formData, employeeId: val})}
                       options={[{ value: "أختر الموظف", label: "اختر الموظف" }]} 
                    />
                 </div>

                 {/* Full Name */}
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">اسم الموظف</label>
                    <div className="relative group">
                       <input 
                         required placeholder="الاسم الكامل" value={formData.fullName}
                         onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/10" 
                       />
                       <User className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                    </div>
                 </div>

                 {/* Cert Number and Company */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                    <div className="space-y-3 text-right">
                       <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">رقم الشهادة</label>
                       <div className="relative group">
                          <input 
                            required placeholder="رقم الشهادة الصحية" value={formData.certNumber}
                            onChange={(e) => setFormData({...formData, certNumber: e.target.value})}
                            className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/10" 
                          />
                          <Hash className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                       </div>
                    </div>
                    <div className="space-y-3 text-right">
                       <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">جهة العمل</label>
                       <div className="relative group">
                          <input 
                            required placeholder="اسم الشركة" value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/10" 
                          />
                          <Building2 className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                       </div>
                    </div>

                    {/* Dates */}
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
                 </div>

                 {/* Upload Section */}
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">صورة الشهادة</label>
                    <div className="relative group p-14 border-2 border-dashed border-white/10 rounded-[3.5rem] bg-white/[0.01] hover:bg-white/[0.03] hover:border-secondary/40 transition-all cursor-pointer text-center">
                       <div className="w-20 h-20 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mx-auto mb-6 group-hover:scale-110 transition-transform">
                          <Upload size={16} />
                       </div>
                       <h4 className="text-xl font-black text-white mb-2">اسحب وأفلت الملف أو انقر للاختيار</h4>
                       <p className="text-white/20 font-bold">يدعم الصور وملفات PDF (الحد الأقصى 5MB)</p>
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                 </div>
              </div>

              <div className="pt-12 flex gap-4">
                 <button type="submit" className="flex-[2] bg-secondary text-primary py-2 rounded-3xl font-black text-xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-4">
                    <Save size={16} /> حفظ البيانات
                 </button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/[0.03] border border-white/5 py-2 rounded-3xl text-white/60 font-black text-sm hover:bg-white/10 transition-all">إلغاء</button>
              </div>
           </form>
        </div>
      </Modal>
    </div>
  );
}
