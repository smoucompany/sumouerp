"use client";

import React, { useState } from "react";
import { Stethoscope, Calendar, Search, Filter, Plus, Edit, Trash2 } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";

interface HealthCert {
  id?: string;
  employeeName: string;
  expiryDate: string;
  category: string;
}

export default function HealthCertificatesPage() {
  const { data: certs, addItem, updateItem, removeItem, loading } = useFirestore<HealthCert>("health_certs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HealthCert | null>(null);
  const [formData, setFormData] = useState<Omit<HealthCert, 'id'>>({
    employeeName: "",
    expiryDate: "",
    category: "فئة أ",
  });

  const handleOpenModal = (item?: HealthCert) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ employeeName: "", expiryDate: "", category: "فئة أ" });
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
          <h1 className="text-3xl font-black mb-2">الشهادات الصحية</h1>
          <p className="text-sidebar-text font-medium">متابعة الشهادات الصحية لموظفي الأغذية والمستودعات.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-secondary text-primary px-8 py-3.5 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/10">
          <Plus size={20} />
          إضافة شهادة صحية
        </button>
      </div>

      <div className="glass p-10 rounded-[4rem] border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {certs.map((cert) => (
             <div key={cert.id} className="p-8 rounded-[3rem] bg-white/[0.01] border border-white/5 flex items-center justify-between group relative overflow-hidden">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Stethoscope size={28} />
                   </div>
                   <div>
                      <h4 className="font-bold">{cert.employeeName}</h4>
                      <p className="text-xs text-sidebar-text mt-1 italic uppercase tracking-widest">{cert.category}</p>
                   </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-left">
                      <p className="text-[10px] text-sidebar-text font-black uppercase mb-1">الانتهاء</p>
                      <p className="text-sm font-bold text-emerald-500">{cert.expiryDate}</p>
                   </div>
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(cert)} className="p-3 text-secondary hover:bg-white/5 rounded-xl transition-all"><Edit size={18} /></button>
                      <button onClick={() => removeItem(cert.id!)} className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "تعديل شهادة صحية" : "إضافة شهادة"}>
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
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">تاريخ الانتهاء</label>
                   <input 
                     type="date" required value={formData.expiryDate}
                     onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">الفئة / النوع</label>
                   <select 
                     value={formData.category}
                     onChange={(e) => setFormData({...formData, category: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none"
                   >
                      <option value="فئة أ">فئة أ (مطاعم)</option>
                      <option value="فئة ب">فئة ب (مستودعات)</option>
                      <option value="أخرى">أخرى</option>
                   </select>
                </div>
              </div>
           </div>
           <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-secondary/10">حفظ الشهادة</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white/5 rounded-2xl text-sm font-black">إلغاء</button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
