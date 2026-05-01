"use client";

import React, { useState } from "react";
import { FileText, Download, Edit, Trash2, Plus, Search, Filter, Calendar } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface CR {
  id?: string;
  name: string;
  crNumber: string;
  expiryDate: string;
  status: string;
}

export default function CRPage() {
  const { data: records, addItem, updateItem, removeItem, loading } = useFirestore<CR>("cr_records");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CR | null>(null);
  const [formData, setFormData] = useState<Omit<CR, 'id'>>({
    name: "",
    crNumber: "",
    expiryDate: "",
    status: "نشط",
  });

  const handleOpenModal = (item?: CR) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ name: "", crNumber: "", expiryDate: "", status: "نشط" });
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
          <h1 className="text-3xl font-black mb-2">السجلات التجارية (CR)</h1>
          <p className="text-sidebar-text font-medium">إدارة السجلات التجارية للمركز الرئيسي والفروع.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-secondary text-primary px-8 py-3.5 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/10"
        >
          <Plus size={20} />
          إضافة سجل تجاري
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {records.map((cr) => (
           <div key={cr.id} className="glass p-8 rounded-[3rem] border border-white/5 relative group overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                 <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                    <FileText size={24} />
                 </div>
                 <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${cr.status === 'نشط' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {cr.status}
                 </span>
              </div>
              <h3 className="text-lg font-black mb-1 group-hover:text-secondary transition-colors">{cr.name}</h3>
              <p className="text-sm font-mono text-white/40 mb-6">{cr.crNumber}</p>
              
              <div className="space-y-3 pt-6 border-t border-white/5">
                 <div className="flex items-center justify-between text-[11px]">
                    <span className="text-sidebar-text font-bold">تاريخ الانتهاء</span>
                    <span className="text-white font-black">{cr.expiryDate}</span>
                 </div>
                 <div className="flex gap-2 pt-4">
                    <button onClick={() => handleOpenModal(cr)} className="flex-1 bg-white/5 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-white/10 flex items-center justify-center gap-2">
                       <Edit size={12} /> تعديل
                    </button>
                    <button onClick={() => removeItem(cr.id!)} className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500/20"><Trash2 size={16}/></button>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "تعديل سجل تجاري" : "إضافة سجل جديد"}>
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">اسم الفرع / المنشأة</label>
                 <input 
                   required value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                   placeholder="المركز الرئيسي - الرياض"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">رقم السجل التجاري</label>
                 <input 
                   required value={formData.crNumber}
                   onChange={(e) => setFormData({...formData, crNumber: e.target.value})}
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
                <CustomSelect 
                  label="الحالة"
                  value={formData.status}
                  onChange={(val) => setFormData({...formData, status: val})}
                  options={[
                    { value: "نشط", label: "نشط" },
                    { value: "منتهي", label: "منتهي" },
                    { value: "قيد التجديد", label: "قيد التجديد" }
                  ]}
                />

              </div>
           </div>
           <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-secondary/10">حفظ السجل</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white/5 rounded-2xl text-sm font-black">إلغاء</button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
