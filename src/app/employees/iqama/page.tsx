"use client";

import React, { useState } from "react";
import { ShieldCheck, Calendar, Search, Filter, AlertTriangle, Plus, Edit, Trash2, User } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";
import { motion } from "framer-motion";

interface Iqama {
  id?: string;
  employeeName: string;
  iqamaNumber: string;
  expiryDate: string;
  status: string;
}

export default function IqamaPage() {
  const { data: iqamas, addItem, updateItem, removeItem, loading } = useFirestore<Iqama>("iqamas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Iqama | null>(null);
  const [formData, setFormData] = useState<Omit<Iqama, 'id'>>({
    employeeName: "",
    iqamaNumber: "",
    expiryDate: "",
    status: "سارية",
  });

  const handleOpenModal = (item?: Iqama) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ employeeName: "", iqamaNumber: "", expiryDate: "", status: "سارية" });
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
          <h1 className="text-3xl font-black mb-2">إقامات الموظفين</h1>
          <p className="text-sidebar-text font-medium">متابعة صلاحية الإقامات وتواريخ التجديد لجميع الموظفين.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-secondary text-primary px-8 py-3.5 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/10 hover:shadow-secondary/20 transition-all"
        >
          <Plus size={20} />
          إضافة إقامة
        </button>
      </div>

      <div className="glass p-10 rounded-[4rem] border border-white/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-black">تفاصيل الإقامات</h3>
          <div className="relative group">
             <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
             <input type="text" placeholder="بحث..." className="bg-white/5 border border-white/5 rounded-2xl py-3 pr-12 pl-4 text-sm focus:ring-2 focus:ring-secondary/20 outline-none w-80" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
             <thead>
               <tr className="text-white/30 text-xs font-black uppercase tracking-widest border-b border-white/5">
                 <th className="pb-6">الموظف</th>
                 <th className="pb-6">رقم الإقامة</th>
                 <th className="pb-6">تاريخ الانتهاء</th>
                 <th className="pb-6">الحالة</th>
                 <th className="pb-6">الإجراءات</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {iqamas.map((iqama) => (
                  <tr key={iqama.id} className="group hover:bg-white/[0.01] transition-colors">
                     <td className="py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                              <User size={20} />
                           </div>
                           <span className="font-bold">{iqama.employeeName}</span>
                        </div>
                     </td>
                     <td className="py-6 text-sm font-mono text-white/60 tracking-wider">{iqama.iqamaNumber}</td>
                     <td className="py-6 text-sm font-bold">{iqama.expiryDate}</td>
                     <td className="py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${iqama.status === 'سارية' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {iqama.status}
                        </span>
                     </td>
                     <td className="py-6">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => handleOpenModal(iqama)} className="p-2 text-secondary hover:bg-secondary/10 rounded-lg"><Edit size={16}/></button>
                           <button onClick={() => removeItem(iqama.id!)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16}/></button>
                        </div>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "تعديل إقامة" : "إضافة إقامة جديدة"}>
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">اسم الموظف</label>
                 <input 
                   required value={formData.employeeName}
                   onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-secondary/20" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">رقم الإقامة</label>
                 <input 
                   required value={formData.iqamaNumber}
                   onChange={(e) => setFormData({...formData, iqamaNumber: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-secondary/20" 
                 />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">تاريخ الانتهاء</label>
                   <input 
                     type="date" required value={formData.expiryDate}
                     onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-secondary/20" 
                   />
                </div>
                <CustomSelect 
                  label="الحالة"
                  value={formData.status}
                  onChange={(val) => setFormData({...formData, status: val})}
                  options={[
                    { value: "سارية", label: "سارية" },
                    { value: "قريبة الانتهاء", label: "قريبة الانتهاء" },
                    { value: "منتهية", label: "منتهية" }
                  ]}
                />

              </div>
           </div>
           <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-secondary/10">حفظ البيانات</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white/5 rounded-2xl text-sm font-black">إلغاء</button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
