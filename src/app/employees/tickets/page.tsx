"use client";

import React, { useState } from "react";
import { Plane, Trash2, Plus, Calendar, Save, Building, Hash, User, FileText, Printer, Download, Edit } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import CustomSelect from "@/components/shared/Select";

interface FlightTicket {
  id?: string;
  employeeId: string;
  ticketNumber: string;
  airline: string;
  departureDate: string;
  returnDate: string;
  expiryDate: string;
  companyName: string;
  status: string;
}

export default function FlightTicketsPage() {
  const { data: tickets, addItem, removeItem, loading } = useFirestore<FlightTicket>("flight_tickets");
  const { data: employeesList } = useFirestore<any>("employees");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<FlightTicket, 'id'>>({
    employeeId: "اختر الموظف...",
    ticketNumber: "",
    airline: "",
    departureDate: new Date().toISOString().split('T')[0],
    returnDate: "",
    expiryDate: new Date().toISOString().split('T')[0],
    companyName: "اختر جهة العمل...",
    status: "نشطة",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
    setFormData({
      employeeId: "اختر الموظف...",
      ticketNumber: "",
      airline: "",
      departureDate: new Date().toISOString().split('T')[0],
      returnDate: "",
      expiryDate: new Date().toISOString().split('T')[0],
      companyName: "اختر جهة العمل...",
      status: "نشطة",
    });
  };

  return (
    <div className="space-y-3 font-rubik">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black mb-2 tracking-tight text-white">تذاكر الطيران</h1>
          <p className="text-sidebar-text font-medium text-sm">إدارة ومتابعة تذاكر الطيران للموظفين والرحلات الرسمية.</p>
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
            إضافة تذكرة طيران جديدة
          </button>
        </div>
      </div>

      {/* Tickets Display */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group relative overflow-hidden">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-12 rounded-[1.8rem] bg-secondary/10 flex items-center justify-center text-secondary">
                       <Plane size={16} />
                    </div>
                    <div>
                       <h4 className="font-black text-lg text-white">{ticket.employeeId}</h4>
                       <p className="text-xs text-sidebar-text font-bold uppercase tracking-widest">{ticket.airline}</p>
                    </div>
                 </div>
                 
                 <div className="space-y-3 pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="text-sidebar-text">المغادرة</span>
                       <span className="text-white font-mono">{ticket.departureDate}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="text-sidebar-text">العودة</span>
                       <span className="text-white font-mono">{ticket.returnDate || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="text-sidebar-text">الحالة</span>
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'نشطة' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {ticket.status}
                       </span>
                    </div>
                 </div>

                 <div className="absolute top-5 left-5 flex gap-2">

                  <button className="p-3 text-secondary opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary/10 rounded-xl" title="تعديل">
                     <Edit size={16} />
                  </button>
<button onClick={() => { if(window.confirm('هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.')) removeItem(ticket.id!); }} className=" p-3 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-xl">
                    <Trash2 size={16} />
                 </button>
</div>
              </div>
            ))}
         </div>
         {tickets.length === 0 && !loading && (
           <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <Plane size={64} className="mx-auto text-white/5 mb-6" />
              <p className="text-sidebar-text text-lg font-black">لا توجد تذاكر طيران مسجلة حالياً.</p>
           </div>
         )}
      </div>

      {/* New Flight Ticket Modal - Based on Image */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <div className="p-2">
           {/* Modal Header */}
           <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 text-right">
                 <div className="w-8 h-8 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 shadow-2xl">
                    <Plane size={18} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-white tracking-tighter">إضافة تذكرة طيران جديدة</h2>
                    <p className="text-white/40 font-bold mt-3 text-lg">يرجى تعبئة كافة الحقول المطلوبة بدقة.</p>
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                 
                 {/* Row 1 - Employee (Full Width) */}
                 <div className="col-span-2 space-y-3 text-right relative z-50">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الموظف <span className="text-rose-500">*</span></label>
                    <CustomSelect 
                       label="" value={formData.employeeId} 
                       onChange={(val) => setFormData({...formData, employeeId: val})}
                       options={[{ value: "اختر الموظف...", label: "اختر الموظف..." }, ...(employeesList || []).map((emp: any) => ({ value: emp.fullName || emp.id, label: emp.fullName || emp.id }))]} 
                    />
                 </div>

                 {/* Row 2 */}
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">رقم التذكرة</label>
                    <div className="relative group">
                       <input 
                         required placeholder="" value={formData.ticketNumber}
                         onChange={(e) => setFormData({...formData, ticketNumber: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right font-mono tracking-widest placeholder:text-white/5" 
                       />
                       <Hash className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">شركة الطيران</label>
                    <div className="relative group">
                       <input 
                         required placeholder="" value={formData.airline}
                         onChange={(e) => setFormData({...formData, airline: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right placeholder:text-white/5" 
                       />
                       <Plane className="absolute left-10 top-1/2 -translate-y-1/2 text-white/5" size={18} />
                    </div>
                 </div>

                 {/* Row 3 */}
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">تاريخ العودة (اختياري)</label>
                    <div className="relative">
                       <input 
                         type="date" value={formData.returnDate}
                         onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                       />
                       <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">تاريخ المغادرة</label>
                    <div className="relative">
                       <input 
                         required type="date" value={formData.departureDate}
                         onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                       />
                       <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                    </div>
                 </div>

                 {/* Row 4 */}
                 <div className="col-span-2 space-y-3 text-right">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">تاريخ انتهاء الصلاحية</label>
                    <div className="relative">
                       <input 
                         required type="date" value={formData.expiryDate}
                         onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                         className="w-full bg-white/[0.01] border border-white/10 rounded-2xl py-2 px-3 text-sm outline-none focus:ring-8 focus:ring-secondary/5 focus:border-secondary/40 transition-all text-right appearance-none" 
                       />
                       <Calendar className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                    </div>
                 </div>

                 {/* Row 5 */}
                 <div className="col-span-2 space-y-3 text-right relative z-40">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">جهة العمل</label>
                    <CustomSelect 
                       label="" value={formData.companyName} 
                       onChange={(val) => setFormData({...formData, companyName: val})}
                       options={[
                         { value: "اختر جهة العمل...", label: "اختر جهة العمل..." },
                         { value: "الشركة الرئيسية", label: "الشركة الرئيسية" }
                       ]} 
                    />
                 </div>

                 {/* Row 6 */}
                 <div className="col-span-2 space-y-3 text-right relative z-30">
                    <label className="text-sm font-black text-white/20 uppercase tracking-[0.2em] px-3">الحالة</label>
                    <CustomSelect 
                       label="" value={formData.status} 
                       onChange={(val) => setFormData({...formData, status: val})}
                       options={[
                         { value: "نشطة", label: "نشطة" },
                         { value: "ملغاة", label: "ملغاة" },
                         { value: "مستخدمة", label: "مستخدمة" }
                       ]} 
                    />
                 </div>
              </div>

              <div className="pt-16 flex gap-4">
                 <button type="submit" className="flex-[2] bg-secondary text-primary py-2 rounded-3xl font-black text-xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-4">
                    <Save size={16} /> حفظ
                 </button>
              </div>
           </form>
        </div>
      </Modal>
    </div>
  );
}
