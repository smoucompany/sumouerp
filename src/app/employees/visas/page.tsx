"use client";

import React, { useState } from "react";
import { Globe, Plane, Search, Filter, Plus, Edit, Trash2 } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";

interface Visa {
  id?: string;
  employeeName: string;
  visaType: string;
  expiryDate: string;
}

export default function VisasPage() {
  const { data: visas, addItem, updateItem, removeItem, loading } = useFirestore<Visa>("visas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Visa | null>(null);
  const [formData, setFormData] = useState<Omit<Visa, 'id'>>({
    employeeName: "",
    visaType: "خروج وعودة",
    expiryDate: "",
  });

  const handleOpenModal = (item?: Visa) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ employeeName: "", visaType: "خروج وعودة", expiryDate: "" });
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
          <h1 className="text-3xl font-black mb-2">التأشيرات</h1>
          <p className="text-sidebar-text font-medium">متابعة تأشيرات الخروج والعودة وتأشيرات العمل الجديدة.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-secondary text-primary px-8 py-3.5 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/10">
          <Plus size={20} />
          إضافة تأشيرة
        </button>
      </div>

      <div className="glass p-10 rounded-[4rem] border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {visas.map((v) => (
             <div key={v.id} className="p-8 rounded-[3rem] bg-white/[0.01] border border-white/5 flex flex-col items-center text-center group relative overflow-hidden">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                   <Plane size={40} />
                </div>
                <h4 className="font-black text-lg mb-1">{v.visaType}</h4>
                <p className="text-sm text-sidebar-text mb-6">الموظف: {v.employeeName}</p>
                
                <div className="w-full pt-6 border-t border-white/5 flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase text-blue-400">سارية</span>
                   <span className="text-xs font-bold">{v.expiryDate}</span>
                </div>

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleOpenModal(v)} className="p-2 text-secondary hover:bg-white/5 rounded-lg"><Edit size={16}/></button>
                   <button onClick={() => removeItem(v.id!)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16}/></button>
                </div>
             </div>
           ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "تعديل تأشيرة" : "إضافة تأشيرة جديدة"}>
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
                   <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">نوع التأشيرة</label>
                   <select 
                     value={formData.visaType}
                     onChange={(e) => setFormData({...formData, visaType: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none"
                   >
                      <option value="خروج وعودة">خروج وعودة</option>
                      <option value="خروج نهائي">خروج نهائي</option>
                      <option value="تأشيرة عمل">تأشيرة عمل</option>
                   </select>
                </div>
              </div>
           </div>
           <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-secondary/10">حفظ التأشيرة</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white/5 rounded-2xl text-sm font-black">إلغاء</button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
