"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  Briefcase,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface Employee {
  id?: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  joinDate: string;
}

export default function EmployeesPage() {
  const { data: employees, addItem, updateItem, removeItem, loading } = useFirestore<Employee>("employees");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    name: "",
    role: "",
    email: "",
    phone: "",
    department: "",
    joinDate: new Date().toISOString().split('T')[0],
  });

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({ ...employee });
    } else {
      setEditingEmployee(null);
      setFormData({
        name: "",
        role: "",
        email: "",
        phone: "",
        department: "",
        joinDate: new Date().toISOString().split('T')[0],
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEmployee?.id) {
        await updateItem(editingEmployee.id, formData);
      } else {
        await addItem(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      alert("حدث خطأ أثناء حفظ البيانات. تأكد من إعدادات Firebase.");
    }
  };

  return (
    <div className="space-y-8 font-rubik">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">قاعدة بيانات الموظفين</h1>
          <p className="text-sidebar-text font-medium text-lg">إدارة بيانات موظفي الشركة، إضافة، تعديل وحذف السجلات.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-secondary text-primary px-8 py-4 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl shadow-secondary/20 hover:shadow-secondary/30 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة موظف جديد
        </button>
      </div>

      {/* Main Content Card */}
      <div className="glass p-10 rounded-[4rem] border border-white/5 bg-white/[0.01]">
         <div className="flex items-center justify-between mb-10">
            <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary transition-colors" />
                <input 
                  type="text" 
                  placeholder="بحث عن موظف..." 
                  className="bg-white/5 border border-white/5 rounded-2xl py-4 pr-12 pl-6 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 w-96 transition-all" 
                />
            </div>
            <div className="flex gap-4">
               <button className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white">
                  <Filter size={20} />
               </button>
            </div>
         </div>

         {loading ? (
            <div className="flex items-center justify-center py-20">
               <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((emp) => (
                <motion.div 
                  key={emp.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all relative group overflow-hidden"
                >
                   <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-[4rem]"></div>
                   
                   <div className="flex items-center gap-6 mb-8 relative z-10">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-secondary to-amber-600 flex items-center justify-center text-primary font-black text-2xl shadow-xl shadow-secondary/10">
                         {emp.name.charAt(0)}
                      </div>
                      <div>
                         <h4 className="font-black text-lg group-hover:text-secondary transition-colors">{emp.name}</h4>
                         <p className="text-xs text-sidebar-text font-bold uppercase tracking-widest mt-1">{emp.role}</p>
                      </div>
                   </div>

                   <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-sm text-sidebar-text font-medium">
                         <Mail size={14} className="text-secondary/50" />
                         <span>{emp.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-sidebar-text font-medium">
                         <Phone size={14} className="text-secondary/50" />
                         <span>{emp.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-sidebar-text font-medium">
                         <Briefcase size={14} className="text-secondary/50" />
                         <span>{emp.department}</span>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <button 
                        onClick={() => handleOpenModal(emp)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase text-secondary tracking-widest hover:bg-secondary/10 px-4 py-2 rounded-xl transition-all"
                      >
                         <Edit size={12} /> تعديل
                      </button>
                      <button 
                        onClick={() => removeItem(emp.id!)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase text-rose-500 tracking-widest hover:bg-rose-500/10 px-4 py-2 rounded-xl transition-all"
                      >
                         <Trash2 size={12} /> حذف
                      </button>
                   </div>
                </motion.div>
              ))}
            </div>
         )}
      </div>

      {/* CRUD Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingEmployee ? "تعديل بيانات موظف" : "إضافة موظف جديد"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">الاسم الكامل</label>
                 <input 
                   required
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-secondary/20 outline-none" 
                   placeholder="أدخل الاسم..."
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">المسمى الوظيفي</label>
                 <input 
                   required
                   value={formData.role}
                   onChange={(e) => setFormData({...formData, role: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-secondary/20 outline-none" 
                   placeholder="مثال: مدير مشاريع"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">البريد الإلكتروني</label>
                 <input 
                   required
                   type="email"
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-secondary/20 outline-none" 
                   placeholder="email@company.sa"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">رقم الجوال</label>
                 <input 
                   required
                   value={formData.phone}
                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-secondary/20 outline-none" 
                   placeholder="05XXXXXXXX"
                 />
              </div>
              <CustomSelect 
                label="القسم"
                value={formData.department}
                onChange={(val) => setFormData({...formData, department: val})}
                options={[
                  { value: "الإدارة العامة", label: "الإدارة العامة" },
                  { value: "الموارد البشرية", label: "الموارد البشرية" },
                  { value: "المالية", label: "المالية" },
                  { value: "العمليات", label: "العمليات" },
                  { value: "التقنية", label: "التقنية" }
                ]}
              />

              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase tracking-widest px-2">تاريخ التعيين</label>
                 <input 
                   type="date"
                   value={formData.joinDate}
                   onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-secondary/20 outline-none" 
                 />
              </div>
           </div>
           <div className="pt-8 flex gap-4">
              <button 
                type="submit"
                className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-secondary/10 hover:shadow-secondary/20 transition-all"
              >
                 {editingEmployee ? "تحديث البيانات" : "حفظ الموظف الجديد"}
              </button>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-black hover:bg-white/10 transition-all"
              >
                 إلغاء
              </button>
           </div>
        </form>
      </Modal>
    </div>
  );
}
