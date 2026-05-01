"use client";

import React, { useState } from "react";
import { Users2, ShieldCheck, Mail, MoreVertical, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface AdminUser {
  id?: string;
  name: string;
  role: string;
  email: string;
  status: string;
}

export default function UsersAdminPage() {
  const { data: users, addItem, updateItem, removeItem, loading } = useFirestore<AdminUser>("admin_users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState<Omit<AdminUser, 'id'>>({
    name: "",
    role: "User",
    email: "",
    status: "Active",
  });

  const handleOpenModal = (item?: AdminUser) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ name: "", role: "User", email: "", status: "Active" });
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
          <h1 className="text-3xl font-black mb-2">إدارة مستخدمي النظام</h1>
          <p className="text-sidebar-text font-medium">التحكم في صلاحيات الوصول وإضافة مدراء جدد للنظام.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-secondary text-primary px-8 py-3.5 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/10"
        >
          <Plus size={20} />
          إضافة مستخدم
        </button>
      </div>

      <div className="glass p-10 rounded-[4rem] border border-white/5">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black">قائمة المستخدمين</h3>
            <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input type="text" placeholder="بحث..." className="bg-white/5 border border-white/5 rounded-2xl py-3 pr-12 pl-4 text-sm focus:ring-2 focus:ring-secondary/20 outline-none w-64" />
            </div>
         </div>

         <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center text-secondary font-black text-xl">
                       {user.name.charAt(0)}
                    </div>
                    <div>
                       <h4 className="font-black">{user.name}</h4>
                       <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black uppercase text-secondary tracking-widest">{user.role}</span>
                          <span className="text-[10px] text-sidebar-text flex items-center gap-1">
                             <Mail size={10} /> {user.email}
                          </span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                       <span className={`text-[10px] font-black uppercase ${user.status === 'Active' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {user.status === 'Active' ? 'نشط' : 'معطل'}
                       </span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleOpenModal(user)} className="p-3 text-secondary hover:bg-white/5 rounded-xl transition-all"><Edit size={18} /></button>
                       <button onClick={() => removeItem(user.id!)} className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "تعديل مستخدم" : "إضافة مستخدم جديد"}>
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">الاسم الكامل</label>
                 <input 
                   required value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">البريد الإلكتروني</label>
                 <input 
                   required type="email" value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" 
                 />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <CustomSelect 
                  label="الدور / الصلاحية"
                  value={formData.role}
                  onChange={(val) => setFormData({...formData, role: val})}
                  options={[
                    { value: "Admin", label: "Super Admin" },
                    { value: "Manager", label: "Manager" },
                    { value: "User", label: "Standard User" }
                  ]}
                />
                <CustomSelect 
                  label="الحالة"
                  value={formData.status}
                  onChange={(val) => setFormData({...formData, status: val})}
                  options={[
                    { value: "Active", label: "نشط" },
                    { value: "Disabled", label: "معطل" }
                  ]}
                />

              </div>
           </div>
           <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-secondary/10">حفظ المستخدم</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white/5 rounded-2xl text-sm font-black">إلغاء</button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
