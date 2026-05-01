"use client";

import React, { useState } from "react";
import { Globe, Calendar, Search, Filter, Plus, Edit, Trash2, User } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";

interface Passport {
  id?: string;
  employeeName: string;
  passportNumber: string;
  expiryDate: string;
}

export default function PassportsPage() {
  const { data: passports, addItem, updateItem, removeItem, loading } = useFirestore<Passport>("passports");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Passport | null>(null);
  const [formData, setFormData] = useState<Omit<Passport, 'id'>>({
    employeeName: "",
    passportNumber: "",
    expiryDate: "",
  });

  const handleOpenModal = (item?: Passport) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ employeeName: "", passportNumber: "", expiryDate: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem?.id) {
      await updateItem(editingItem.id, formData);
    } else {
      await addItem(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 font-rubik">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2">جوازات سفر الموظفين</h1>
          <p className="text-sidebar-text font-medium">متابعة تواريخ انتهاء جوازات السفر للموظفين لضمان تحديثها في النظام.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-secondary text-primary px-8 py-3.5 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/10">
          <Plus size={20} />
          إضافة جواز سفر
        </button>
      </div>

      <div className="glass p-10 rounded-[4rem] border border-white/5">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-black">قائمة الجوازات</h3>
           <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input type="text" placeholder="بحث..." className="bg-white/5 border border-white/5 rounded-2xl py-3 pr-12 pl-4 text-sm focus:ring-2 focus:ring-secondary/20 outline-none w-64" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {passports.map((p) => (
             <div key={p.id} className="p-8 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:border-blue-500/20 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Globe size={28} />
                   </div>
                   <div>
                      <h4 className="font-bold">{p.employeeName}</h4>
                      <p className="text-xs text-sidebar-text mt-1 italic tracking-widest uppercase">رقم الجواز: {p.passportNumber}</p>
                   </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-left hidden sm:block">
                      <p className="text-[10px] text-sidebar-text font-black uppercase mb-1">الانتهاء</p>
                      <p className="text-sm font-bold text-blue-400">{p.expiryDate}</p>
                   </div>
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(p)} className="p-3 text-secondary hover:bg-white/5 rounded-xl transition-all"><Edit size={18} /></button>
                      <button onClick={() => removeItem(p.id!)} className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "تعديل جواز سفر" : "إضافة جواز سفر"}>
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">اسم الموظف</label>
                 <input 
                   required value={formData.employeeName}
                   onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">رقم الجواز</label>
                 <input 
                   required value={formData.passportNumber}
                   onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">تاريخ الانتهاء</label>
                 <input 
                   type="date" required value={formData.expiryDate}
                   onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                 />
              </div>
           </div>
           <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-secondary/10">حفظ الجواز</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white/5 rounded-2xl text-sm font-black">إلغاء</button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
