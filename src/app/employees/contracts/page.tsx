"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Trash2, 
  Plus, 
  Calendar,
  Save,
  Building,
  Hash,
  User,
  Upload,
  Briefcase
} from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface Contract {
  id?: string;
  employeeLink: string;
  employeeName: string;
  contractNumber: string;
  iqamaNumber: string;
  jobTitle: string;
  companyName: string;
  issueDate: string;
  expiryDate: string;
  contractType: string;
  salary: string;
  noticePeriod: string;
  delayTimes: string;
  filePath?: string;
}

export default function ContractsPage() {
  const { data: contracts, addItem, removeItem, loading } = useFirestore<Contract>("contracts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Contract, 'id'>>({
    employeeLink: "اختر الموظف...",
    employeeName: "",
    contractNumber: "",
    iqamaNumber: "",
    jobTitle: "",
    companyName: "اختر جهة العمل...",
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date().toISOString().split('T')[0],
    contractType: "اختر النوع...",
    salary: "",
    noticePeriod: "مثلاً: 30 يوم",
    delayTimes: "",
    filePath: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
    setFormData({
      employeeLink: "اختر الموظف...",
      employeeName: "",
      contractNumber: "",
      iqamaNumber: "",
      jobTitle: "",
      companyName: "اختر جهة العمل...",
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date().toISOString().split('T')[0],
      contractType: "اختر النوع...",
      salary: "",
      noticePeriod: "مثلاً: 30 يوم",
      delayTimes: "",
      filePath: "",
    });
  };

  return (
    <div className="space-y-10 font-rubik">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight text-white">عقود العمل</h1>
          <p className="text-sidebar-text font-medium text-lg">إدارة وتوثيق عقود الموظفين (قوى / ورقية) والاحتفاظ بنسخ رقمية.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-primary px-10 py-5 rounded-[2.5rem] font-black text-sm flex items-center gap-3 shadow-2xl shadow-secondary/20 hover:scale-105 transition-all"
        >
          <Plus size={22} />
          إضافة عقد عمل جديد
        </button>
      </div>

      {/* Contracts Display */}
      <div className="glass p-10 rounded-[4rem] border border-white/5 bg-white/[0.01]">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {contracts.map((contract) => (
              <div key={contract.id} className="p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                 <div className="w-24 h-24 shrink-0 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <FileText size={40} />
                 </div>
                 <div className="flex-1 w-full space-y-4">
                    <div>
                       <h4 className="font-black text-xl text-white mb-1">{contract.employeeName || contract.employeeLink}</h4>
                       <p className="text-xs text-sidebar-text font-bold uppercase tracking-widest">{contract.jobTitle} • {contract.contractType}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                       <div className="space-y-1">
                          <span className="text-[10px] text-white/40 font-bold uppercase">تاريخ الانتهاء</span>
                          <p className="text-sm font-mono text-emerald-500 font-bold">{contract.expiryDate}</p>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[10px] text-white/40 font-bold uppercase">رقم الإقامة</span>
                          <p className="text-sm font-mono text-white font-bold">{contract.iqamaNumber || "-"}</p>
                       </div>
                    </div>
                 </div>

                 <button onClick={() => removeItem(contract.id!)} className="absolute top-8 left-8 p-3 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-xl">
                    <Trash2 size={20} />
                 </button>
              </div>
            ))}
         </div>
         {contracts.length === 0 && !loading && (
           <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
              <FileText size={64} className="mx-auto text-white/5 mb-6" />
              <p className="text-sidebar-text text-xl font-black">لا توجد عقود عمل مسجلة حالياً.</p>
           </div>
         )}
      </div>

      {/* New Contract Modal - Based on Image */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <div className="p-2">
           {/* Modal Header */}
           <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
              <div className="flex items-center gap-10 text-right">
                 <div className="w-24 h-24 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-2xl">
                    <FileText size={48} />
                 </div>
                 <div>
                    <h2 className="text-5xl font-black text-white tracking-tighter">إضافة عقد عمل جديد</h2>
                    <p className="text-white/40 font-bold mt-3 text-xl">يرجى تعبئة كافة الحقول المطلوبة بدقة لمتابعة عقد العمل الموحد.</p>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-14">
              <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                 
                 {/* Row 1 - Employee Link (Full Width) */}
                 <div className="col-span-2 space-y-5 text-right relative z-50">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">ربط بالموظف <span className="text-rose-500">*</span></label>
                    <CustomSelect 
                       label="" value={formData.employeeLink} 
                       onChange={(val) => setFormData({...formData, employeeLink: val})}
                       options={[
                         { value: "اختر الموظف...", label: "اختر الموظف..." },
                         { value: "محمد عبد الله", label: "محمد عبد الله" }
                       ]} 
                    />
                 </div>

                 {/* Row 2 - Employee Name (Full Width) */}
                 <div className="col-span-2 space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">اسم الموظف</label>
                    <div className="relative group">
                       <input 
                         placeholder="الاسم الكامل" value={formData.employeeName}
                         onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                       <User className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={28} />
                    </div>
                 </div>

                 {/* Row 3 */}
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">رقم الإقامة</label>
                    <div className="relative group">
                       <input 
                         placeholder="10 أرقام" value={formData.iqamaNumber}
                         onChange={(e) => setFormData({...formData, iqamaNumber: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-mono tracking-widest" 
                       />
                       <Hash className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={28} />
                    </div>
                 </div>
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">رقم العقد</label>
                    <div className="relative group">
                       <input 
                         placeholder="رقم العقد الموحد" value={formData.contractNumber}
                         onChange={(e) => setFormData({...formData, contractNumber: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-mono tracking-widest" 
                       />
                       <FileText className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={28} />
                    </div>
                 </div>

                 {/* Row 4 */}
                 <div className="space-y-5 text-right relative z-40">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">جهة العمل <span className="text-rose-500">*</span></label>
                    <CustomSelect 
                       label="" value={formData.companyName} 
                       onChange={(val) => setFormData({...formData, companyName: val})}
                       options={[
                         { value: "اختر جهة العمل...", label: "اختر جهة العمل..." },
                         { value: "الشركة الرئيسية", label: "الشركة الرئيسية" }
                       ]} 
                    />
                 </div>
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">المهنة</label>
                    <div className="relative group">
                       <input 
                         placeholder="المسمى الوظيفي في العقد" value={formData.jobTitle}
                         onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                       <Briefcase className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={28} />
                    </div>
                 </div>

                 {/* Row 5 */}
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

                 {/* Row 6 */}
                 <div className="space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">الراتب</label>
                    <div className="relative group">
                       <input 
                         placeholder="0.00" value={formData.salary}
                         onChange={(e) => setFormData({...formData, salary: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>
                 <div className="space-y-5 text-right relative z-30">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">نوع التوظيف</label>
                    <CustomSelect 
                       label="" value={formData.contractType} 
                       onChange={(val) => setFormData({...formData, contractType: val})}
                       options={[
                         { value: "اختر النوع...", label: "اختر النوع..." },
                         { value: "دوام كامل", label: "دوام كامل" },
                         { value: "دوام جزئي", label: "دوام جزئي" },
                         { value: "عن بعد", label: "عن بعد" }
                       ]} 
                    />
                 </div>

                 {/* Row 7 - Full Width */}
                 <div className="col-span-2 space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">فترة الإشعار</label>
                    <div className="relative group">
                       <input 
                         placeholder="مثلاً: 30 يوم" value={formData.noticePeriod}
                         onChange={(e) => setFormData({...formData, noticePeriod: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>

                 {/* Row 8 - Full Width */}
                 <div className="col-span-2 space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">مرات التأخير</label>
                    <div className="relative group">
                       <input 
                         placeholder="0" value={formData.delayTimes}
                         onChange={(e) => setFormData({...formData, delayTimes: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-[2.5rem] py-7 px-12 text-lg outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>

                 {/* Row 9 - Upload Section (Full Width) */}
                 <div className="col-span-2 space-y-5 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-6">ملف العقد (صورة أو PDF)</label>
                    <div className="relative group p-20 border-2 border-dashed border-white/10 rounded-[4rem] bg-white/[0.01] hover:bg-white/[0.03] hover:border-secondary/40 transition-all cursor-pointer text-center">
                       <div className="w-24 h-24 bg-secondary/10 rounded-[2.5rem] flex items-center justify-center text-secondary mx-auto mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                          <Upload size={40} />
                       </div>
                       <h4 className="text-3xl font-black text-white mb-3">اسحب وأفلت الملف أو انقر للاختيار</h4>
                       <p className="text-white/20 text-lg font-bold">يدعم الصور وملفات PDF (الحد الأقصى 5MB)</p>
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                 </div>
              </div>

              <div className="pt-16 flex gap-10">
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
