"use client";

import React, { useState } from "react";
import { Users, Trash2, Plus, Save, UserPlus, ShieldCheck, Mail, Lock, Printer, Download, Edit } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface UserAccount {
  id?: string;
  fullName: string;
  email: string;
  password?: string;
  role: string;
  employeeLink: string;
  status: string;
}

export default function UsersPage() {
  const { data: users, addItem, removeItem, loading } = useFirestore<UserAccount>("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<UserAccount, 'id'>>({
    fullName: "",
    email: "",
    password: "",
    role: "موظف (Employee)",
    employeeLink: "لا يوجد ربط",
    status: "نشط",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    // In a real app, do NOT save plain text passwords in Firestore.
    // This is just a UI mock.
    delete dataToSave.password; 
    await addItem(dataToSave);
    setIsModalOpen(false);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      role: "موظف (Employee)",
      employeeLink: "لا يوجد ربط",
      status: "نشط",
    });
  };

  return (
    <div className="space-y-3 font-rubik">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black mb-2 tracking-tight text-white">إدارة المستخدمين</h1>
          <p className="text-sidebar-text font-medium text-sm">التحكم في صلاحيات الوصول وإنشاء حسابات الدخول للنظام.</p>
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
            إضافة مستخدم جديد
          </button>
        </div>
      </div>

      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-5">
            {users.map((user) => (
              <div key={user.id} className="p-4 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-5">
                 <div className="w-20 h-20 shrink-0 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={40} />
                 </div>
                 <div className="flex-1 w-full space-y-3">
                    <div>
                       <h4 className="font-black text-lg text-white mb-1">{user.fullName}</h4>
                       <p className="text-xs text-sidebar-text font-bold tracking-widest">{user.email}</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                       <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full font-bold uppercase tracking-widest">{user.role}</span>
                       <span className={`text-[10px] font-bold ${user.status === 'نشط' ? 'text-emerald-500' : 'text-rose-500'}`}>{user.status}</span>
                    </div>
                 </div>

                 <div className="absolute top-5 left-5 flex gap-2">

                  <button className="p-3 text-secondary opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary/10 rounded-xl" title="تعديل">
                     <Edit size={16} />
                  </button>
<button onClick={() => { if(window.confirm('هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.')) removeItem(user.id!); }} className=" p-3 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-xl">
                    <Trash2 size={16} />
                 </button>
</div>
              </div>
            ))}
         </div>
         {users.length === 0 && !loading && (
           <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <Users size={64} className="mx-auto text-white/5 mb-6" />
              <p className="text-sidebar-text text-lg font-black">لا يوجد مستخدمين مسجلين حالياً.</p>
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
                    <h2 className="text-xl font-black text-white tracking-tighter">إضافة مستخدم جديد</h2>
                    <p className="text-white/40 font-bold mt-3 text-lg">يرجى تعبئة بيانات حساب الدخول وتحديد الصلاحيات.</p>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-3">
                 
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الاسم الكامل</label>
                    <div className="relative group">
                       <input 
                         required placeholder="أدخل اسم المستخدم الثلاثي" value={formData.fullName}
                         onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/10" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">البريد الإلكتروني المهني</label>
                    <div className="relative group">
                       <input 
                         required type="email" placeholder="user@company.com" value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/10 font-sans" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">كلمة المرور المؤقتة</label>
                    <div className="relative group">
                       <input 
                         required type="password" placeholder="••••••••" value={formData.password}
                         onChange={(e) => setFormData({...formData, password: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/10 font-sans tracking-widest" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3 text-right relative z-50">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">صلاحية النظام</label>
                    <CustomSelect 
                       label="" value={formData.role} 
                       onChange={(val) => setFormData({...formData, role: val})}
                       options={[
                         { value: "موظف (Employee)", label: "موظف (Employee)" },
                         { value: "مدير (Manager)", label: "مدير (Manager)" },
                         { value: "مسؤول (Admin)", label: "مسؤول (Admin)" }
                       ]} 
                    />
                 </div>

                 <div className="space-y-3 text-right relative z-40">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">ربط بملف موظف (اختياري)</label>
                    <CustomSelect 
                       label="" value={formData.employeeLink} 
                       onChange={(val) => setFormData({...formData, employeeLink: val})}
                       options={[
                         { value: "لا يوجد ربط", label: "لا يوجد ربط" },
                         { value: "محمد عبد الله", label: "محمد عبد الله" }
                       ]} 
                    />
                 </div>

                 <div className="space-y-3 text-right relative z-30">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الحالة التشغيلية</label>
                    <CustomSelect 
                       label="" value={formData.status} 
                       onChange={(val) => setFormData({...formData, status: val})}
                       options={[
                         { value: "نشط", label: "نشط" },
                         { value: "موقوف", label: "موقوف" }
                       ]} 
                    />
                 </div>

              </div>

              <div className="pt-16">
                 <button type="submit" className="w-full bg-secondary text-primary py-2 rounded-3xl font-black text-xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-4">
                    إنشاء الحساب
                 </button>
              </div>
           </form>
        </div>
      </Modal>
    </div>
  );
}
