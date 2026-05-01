"use client";

import React, { useState } from "react";
import { Briefcase, CheckCircle2, Clock, Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface Task {
  id?: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: string;
}

export default function JobTasksPage() {
  const { data: tasks, addItem, updateItem, removeItem, loading } = useFirestore<Task>("tasks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Task | null>(null);
  const [formData, setFormData] = useState<Omit<Task, 'id'>>({
    title: "",
    assignedTo: "",
    dueDate: "",
    status: "قيد التنفيذ",
  });

  const handleOpenModal = (item?: Task) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ title: "", assignedTo: "", dueDate: "", status: "قيد التنفيذ" });
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
          <h1 className="text-3xl font-black mb-2">المهام الوظيفية</h1>
          <p className="text-sidebar-text font-medium">توزيع المهام على الموظفين ومتابعة حالة الإنجاز الوظيفي.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-secondary text-primary px-8 py-3.5 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/10">
          <Plus size={20} />
          إضافة مهمة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between group transition-all">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                       <Briefcase size={24} />
                    </div>
                    <div>
                       <h4 className="font-bold">{task.title}</h4>
                       <p className="text-xs text-sidebar-text mt-1 italic tracking-widest uppercase">المسؤول: {task.assignedTo} • الموعد: {task.dueDate}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${task.status === 'مكتملة' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                       {task.status}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleOpenModal(task)} className="p-3 text-secondary hover:bg-white/5 rounded-xl transition-all"><Edit size={18} /></button>
                       <button onClick={() => removeItem(task.id!)} className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
         
         <div className="space-y-6">
            <div className="glass p-8 rounded-[3rem] border border-white/5">
               <h3 className="font-black mb-6">إحصائيات المهام</h3>
               <div className="space-y-6">
                  <div>
                     <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest">
                        <span>إنجاز الفريق</span>
                        <span>{Math.round((tasks.filter(t => t.status === 'مكتملة').length / (tasks.length || 1)) * 100)}%</span>
                     </div>
                     <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary transition-all duration-1000" 
                          style={{ width: `${(tasks.filter(t => t.status === 'مكتملة').length / (tasks.length || 1)) * 100}%` }}
                        ></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "تعديل مهمة" : "إضافة مهمة جديدة"}>
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">عنوان المهمة</label>
                 <input 
                   required value={formData.title}
                   onChange={(e) => setFormData({...formData, title: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">المسؤول عن التنفيذ</label>
                 <input 
                   required value={formData.assignedTo}
                   onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                 />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">الموعد النهائي</label>
                   <input 
                     type="date" required value={formData.dueDate}
                     onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                   />
                </div>
                <CustomSelect 
                  label="الحالة"
                  value={formData.status}
                  onChange={(val) => setFormData({...formData, status: val})}
                  options={[
                    { value: "قيد التنفيذ", label: "قيد التنفيذ" },
                    { value: "مكتملة", label: "مكتملة" },
                    { value: "متأخرة", label: "متأخرة" }
                  ]}
                />

              </div>
           </div>
           <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-secondary/10">حفظ المهمة</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white/5 rounded-2xl text-sm font-black">إلغاء</button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
