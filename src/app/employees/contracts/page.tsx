"use client";

import React, { useState } from "react";
import { FileText, Download, Edit, Trash2, Plus, Search, Filter } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";

interface Contract {
  id?: string;
  employeeName: string;
  startDate: string;
  salary: string;
  notes: string;
}

export default function ContractsPage() {
  const { data: contracts, addItem, updateItem, removeItem, loading } = useFirestore<Contract>("contracts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Contract | null>(null);
  const [formData, setFormData] = useState<Omit<Contract, 'id'>>({
    employeeName: "",
    startDate: "",
    salary: "",
    notes: "",
  });

  const handleOpenModal = (item?: Contract) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ employeeName: "", startDate: "", salary: "", notes: "" });
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
          <h1 className="text-3xl font-black mb-2">عقود العمل</h1>
          <p className="text-sidebar-text font-medium">إدارة وتوثيق عقود الموظفين (قوى / ورقية).</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-secondary text-primary px-8 py-3.5 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/10">
          <Plus size={20} />
          رفع عقد جديد
        </button>
      </div>

      <div className="space-y-4">
         {contracts.map((contract) => (
           <div key={contract.id} className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between hover:bg-white/[0.01] transition-all group">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                    <FileText size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold">عقد موظف: {contract.employeeName}</h4>
                    <p className="text-xs text-sidebar-text mt-1 italic tracking-widest uppercase">تاريخ البدء: {contract.startDate} • الراتب: {contract.salary} ريال</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(contract)} className="p-3 text-secondary hover:bg-white/5 rounded-xl transition-all"><Edit size={18} /></button>
                    <button onClick={() => removeItem(contract.id!)} className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                 </div>
                 <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-white/40 hover:text-white transition-all"><Download size={18}/></button>
              </div>
           </div>
         ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "تعديل عقد عمل" : "إضافة عقد عمل"}>
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
                   <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">تاريخ البدء</label>
                   <input 
                     type="date" required value={formData.startDate}
                     onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">الراتب الأساسي</label>
                   <input 
                     required value={formData.salary}
                     onChange={(e) => setFormData({...formData, salary: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                   />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">ملاحظات العقد</label>
                 <textarea 
                   value={formData.notes}
                   onChange={(e) => setFormData({...formData, notes: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none h-32"
                 />
              </div>
           </div>
           <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-secondary/10">حفظ العقد</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white/5 rounded-2xl text-sm font-black">إلغاء</button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
