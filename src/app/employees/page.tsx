"use client";

import React, { useState } from "react";
import { Users2, Trash2, Plus, Calendar, Save, Building, Hash, User, Phone, Mail, UserPlus, Printer, Download, Edit } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface Employee {
  id?: string;
  fullName: string;
  empId: string;
  iqamaJob: string;
  internalJob: string;
  department: string;
  salary: string;
  manager: string;
  email: string;
  phone1: string;
  phone2: string;
  joinDate: string;
  status: string;
  crLink: string;
}

export default function EmployeesDBPage() {
  const { data: employees, addItem, removeItem, loading } = useFirestore<Employee>("employees");
  const { data: crsList } = useFirestore<any>("crs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    fullName: "",
    empId: "",
    iqamaJob: "",
    internalJob: "",
    department: "",
    salary: "",
    manager: "",
    email: "",
    phone1: "",
    phone2: "",
    joinDate: new Date().toISOString().split('T')[0],
    status: "نشط (على رأس العمل)",
    crLink: "بدون ربط",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
    setFormData({
      fullName: "",
      empId: "",
      iqamaJob: "",
      internalJob: "",
      department: "",
      salary: "",
      manager: "",
      email: "",
      phone1: "",
      phone2: "",
      joinDate: new Date().toISOString().split('T')[0],
      status: "نشط (على رأس العمل)",
      crLink: "بدون ربط",
    });
  };

  return (
    <div className="space-y-3 font-rubik">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black mb-2 tracking-tight text-white">قاعدة البيانات</h1>
          <p className="text-sidebar-text font-medium text-sm">سجل الموظفين الشامل وإدارة البيانات الأساسية والهيكلة الإدارية.</p>
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
            إضافة موظف جديد
          </button>
        </div>
      </div>

      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-5">
            {employees.map((emp) => (
              <div key={emp.id} className="p-4 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-5">
                 <div className="w-8 h-8 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform border-4 border-white/5">
                    <User size={40} />
                 </div>
                 <div className="flex-1 w-full space-y-3">
                    <div>
                       <h4 className="font-black text-lg text-white mb-1">{emp.fullName}</h4>
                       <p className="text-xs text-sidebar-text font-bold uppercase tracking-widest">{emp.internalJob || emp.iqamaJob} • {emp.department}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/5">
                       <div className="space-y-1">
                          <span className="text-[10px] text-white/40 font-bold uppercase">الرقم الوظيفي</span>
                          <p className="text-sm font-mono text-secondary font-bold">{emp.empId}</p>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[10px] text-white/40 font-bold uppercase">الحالة</span>
                          <p className={`text-[10px] font-bold ${emp.status.includes('نشط') ? 'text-emerald-500' : 'text-white'}`}>{emp.status}</p>
                       </div>
                    </div>
                 </div>

                 <div className="absolute top-5 left-5 flex gap-2">

                  <button className="p-3 text-secondary opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary/10 rounded-xl" title="تعديل">
                     <Edit size={16} />
                  </button>
<button onClick={() => removeItem(emp.id!)} className=" p-3 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-xl">
                    <Trash2 size={16} />
                 </button>
</div>
              </div>
            ))}
         </div>
         {employees.length === 0 && !loading && (
           <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <Users2 size={64} className="mx-auto text-white/5 mb-6" />
              <p className="text-sidebar-text text-lg font-black">لا يوجد موظفين مسجلين في قاعدة البيانات.</p>
           </div>
         )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <div className="p-2">
           <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 text-right">
                 <div className="w-8 h-8 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 shadow-2xl">
                    <UserPlus size={18} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-white tracking-tighter">إضافة موظف جديد</h2>
                    <p className="text-white/40 font-bold mt-3 text-lg">يرجى إدخال كافة البيانات المطلوبة بدقة.</p>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                 
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">اسم الموظف</label>
                    <div className="relative group">
                       <input 
                         required placeholder="الاسم الكامل" value={formData.fullName}
                         onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الرقم الوظيفي</label>
                    <div className="relative group">
                       <input 
                         required placeholder="مثال: EMP-1001" value={formData.empId}
                         onChange={(e) => setFormData({...formData, empId: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-mono tracking-widest" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">المهنة (حسب الإقامة)</label>
                    <div className="relative group">
                       <input 
                         placeholder="المهنة (اختياري)" value={formData.iqamaJob}
                         onChange={(e) => setFormData({...formData, iqamaJob: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">المسمى الوظيفي (داخلي)</label>
                    <div className="relative group">
                       <input 
                         placeholder="المسمى الوظيفي" value={formData.internalJob}
                         onChange={(e) => setFormData({...formData, internalJob: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">القسم</label>
                    <div className="relative group">
                       <input 
                         placeholder="اسم القسم" value={formData.department}
                         onChange={(e) => setFormData({...formData, department: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الراتب الأساسي</label>
                    <div className="relative group">
                       <input 
                         placeholder="." value={formData.salary}
                         onChange={(e) => setFormData({...formData, salary: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">المدير المباشر</label>
                    <div className="relative group">
                       <input 
                         placeholder="اسم المدير" value={formData.manager}
                         onChange={(e) => setFormData({...formData, manager: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">البريد الإلكتروني</label>
                    <div className="relative group">
                       <input 
                         type="email" placeholder="example@company.com" value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-sans" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">رقم الجوال الأساسي</label>
                    <div className="relative group">
                       <input 
                         placeholder="05xxxxxxxx" value={formData.phone1}
                         onChange={(e) => setFormData({...formData, phone1: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-mono tracking-widest" 
                       />
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">رقم الجوال الإضافي</label>
                    <div className="relative group">
                       <input 
                         placeholder="رقم إضافي" value={formData.phone2}
                         onChange={(e) => setFormData({...formData, phone2: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5 font-mono tracking-widest" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">تاريخ الانضمام</label>
                    <div className="relative">
                       <input 
                         required type="date" value={formData.joinDate}
                         onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                       />
                       <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                    </div>
                 </div>
                 <div className="space-y-3 text-right relative z-50">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الحالة الوظيفية</label>
                    <CustomSelect 
                       label="" value={formData.status} 
                       onChange={(val) => setFormData({...formData, status: val})}
                       options={[
                         { value: "نشط (على رأس العمل)", label: "نشط (على رأس العمل)" },
                         { value: "إجازة", label: "إجازة" },
                         { value: "منتهي الخدمات", label: "منتهي الخدمات" }
                       ]} 
                    />
                 </div>

                 <div className="col-span-2 space-y-3 text-right relative z-40">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">ربط بالسجل التجاري</label>
                    <CustomSelect 
                       label="" value={formData.crLink} 
                       onChange={(val) => setFormData({...formData, crLink: val})}
                       options={[{ value: "بدون ربط", label: "بدون ربط (مؤسسة رئيسية)" }, ...(crsList || []).map((cr: any) => ({ value: cr.companyName || cr.id, label: cr.companyName || cr.id }))]} 
                    />
                 </div>
              </div>

              <div className="pt-16 flex gap-4">
                 <button type="submit" className="flex-[2] bg-secondary text-primary py-2 rounded-3xl font-black text-xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-4">
                    <UserPlus size={16} /> إضافة الموظف
                 </button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/[0.03] border border-white/5 py-2 rounded-3xl text-white/60 font-black text-sm hover:bg-white/10 transition-all">إلغاء</button>
              </div>
           </form>
        </div>
      </Modal>
    </div>
  );
}
