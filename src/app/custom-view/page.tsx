"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Search, Edit, Trash2, FileText, Database, AlertCircle, ArrowRight } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import Modal from "@/components/shared/Modal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface DynamicItem {
  id?: string;
  name: string;
  details: string;
  date: string;
}

function CustomViewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { data, addItem, removeItem, loading: dataLoading } = useFirestore<DynamicItem>(id ? `custom_data_${id}` : "temp");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", details: "", date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    if (!id) {
      setError("لم يتم تحديد معرف الصفحة.");
      return;
    }
    
    const fetchPageInfo = async () => {
      try {
        const docSnap = await getDoc(doc(db, "custom_pages", id));
        if (docSnap.exists()) {
          setPageInfo(docSnap.data());
        } else {
          setError("هذه الصفحة غير موجودة في النظام.");
        }
      } catch (err) {
        setError("فشل الاتصال بقاعدة البيانات.");
      }
    };
    fetchPageInfo();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(formData);
    setIsModalOpen(false);
    setFormData({ name: "", details: "", date: new Date().toISOString().split('T')[0] });
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-20 glass rounded-[4rem] text-center space-y-6">
        <AlertCircle size={64} className="text-rose-500 animate-pulse" />
        <h2 className="text-2xl font-black">{error}</h2>
        <Link href="/" className="flex items-center gap-2 text-secondary hover:underline">
          <ArrowRight size={18} /> العودة للرئيسية
        </Link>
      </div>
    );
  }

  if (!pageInfo) {
    return (
      <div className="p-20 text-center space-y-4">
        <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mx-auto"></div>
        <p className="font-black text-sidebar-text animate-pulse">جاري تحميل إعدادات الصفحة...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-rubik">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-4xl font-black mb-2">{pageInfo.label}</h1>
           <p className="text-sidebar-text">إدارة بيانات القسم المخصص: {pageInfo.label}.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-primary px-8 py-4 rounded-[2rem] font-black flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
        >
          <Plus size={20} /> إضافة سجل جديد
        </button>
      </div>

      <div className="glass p-10 rounded-[4rem] border border-white/5 bg-white/[0.01]">
         {data.length === 0 && !dataLoading ? (
           <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
              <Database size={48} className="mx-auto text-white/10 mb-4" />
              <p className="text-sidebar-text font-medium">هذا القسم فارغ حالياً.</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((item) => (
                <div key={item.id} className="p-8 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:border-secondary/20 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                         <FileText size={24} />
                      </div>
                      <button onClick={() => removeItem(item.id!)} className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                         <Trash2 size={18} />
                      </button>
                   </div>
                   <h4 className="font-black text-xl mb-2">{item.name}</h4>
                   <p className="text-sidebar-text text-sm mb-6 leading-relaxed">{item.details}</p>
                   <div className="pt-6 border-t border-white/5 flex justify-between items-center text-xs font-bold">
                      <span className="text-secondary tracking-widest">تاريخ التسجيل</span>
                      <span>{item.date}</span>
                   </div>
                </div>
              ))}
           </div>
         )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`إضافة بيانات - ${pageInfo.label}`}>
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
               <label className="text-xs font-black text-sidebar-text uppercase px-2">العنوان</label>
               <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-secondary/20" />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-black text-sidebar-text uppercase px-2">التفاصيل</label>
               <textarea required value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none h-32 focus:ring-2 focus:ring-secondary/20" />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-black text-sidebar-text uppercase px-2">التاريخ</label>
               <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-secondary/20" />
            </div>
            <div className="pt-6 flex gap-4">
               <button type="submit" className="flex-1 bg-secondary text-primary py-4 rounded-2xl font-black">حفظ البيانات</button>
               <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white/5 rounded-2xl font-black">إلغاء</button>
            </div>
         </form>
      </Modal>
    </div>
  );
}

export default function CustomViewPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <CustomViewContent />
    </Suspense>
  );
}
