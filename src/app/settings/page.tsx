"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Trash2, 
  Database, 
  Settings, 
  Globe, 
  Link as LinkIcon, 
  Type, 
  Save, 
  RefreshCcw,
  Download,
  CheckCircle2,
  AlertTriangle,
  X,
  Lock,
  Plus
} from "lucide-react";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [config, setConfig] = useState({
    siteName: "قرافتي ERP",
    logoUrl: "",
    faviconUrl: "",
    autoBackup: true,
  });

  const [newPage, setNewPage] = useState({ name: "", group: "main" });
  const [showNukeModal, setShowNukeModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [nukeStep, setNukeStep] = useState(1);

  // Load Config
  useEffect(() => {
    const loadConfig = async () => {
      const docRef = doc(db, "settings", "global");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setConfig(docSnap.data() as any);
      }
    };
    loadConfig();
  }, []);

  const handleSaveConfig = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "settings", "global"), config);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      alert("خطأ في حفظ الإعدادات");
    }
    setLoading(false);
  };

  const handleCreatePage = async () => {
    if (!newPage.name) return alert("يرجى إدخال اسم الصفحة");
    setLoading(true);
    try {
      await addDoc(collection(db, "custom_pages"), {
        label: newPage.name,
        groupId: newPage.group,
        createdAt: new Date()
      });
      alert("تم إضافة الصفحة الجديدة بنجاح!");
      setNewPage({ name: "", group: "main" });
    } catch (e) {
      alert("خطأ في إنشاء الصفحة");
    }
    setLoading(false);
  };

  const handleNuke = () => {
    if (adminPassword === "admin123") {
      setNukeStep(2);
      setTimeout(() => setNukeStep(3), 3000);
    } else {
      alert("كلمة المرور غير صحيحة!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 font-rubik">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black mb-2">إعدادات النظام المركزية</h1>
          <p className="text-sidebar-text font-medium text-lg">تخصيص الهوية البصرية وإدارة أمان البيانات.</p>
        </div>
        <button 
          onClick={handleSaveConfig}
          disabled={loading}
          className="bg-secondary text-primary px-10 py-4 rounded-[2rem] font-black text-sm flex items-center gap-3 shadow-xl shadow-secondary/20 hover:shadow-secondary/30 transition-all active:scale-95 disabled:opacity-50"
        >
          {saveSuccess ? <CheckCircle2 size={20} /> : <Save size={20} />}
          {saveSuccess ? "تم الحفظ بنجاح" : "حفظ التغييرات"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Dynamic Page Generator */}
          <div className="glass p-10 rounded-[4rem] border border-white/5 bg-white/[0.01]">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-secondary">
               <Plus /> إضافة قسم أو صفحة جديدة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase px-4">اسم الصفحة</label>
                 <input 
                   value={newPage.name}
                   onChange={(e) => setNewPage({...newPage, name: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-secondary/20"
                   placeholder="مثال: أرشيف الوثائق"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase px-4">القسم التابع له</label>
                 <select 
                   value={newPage.group}
                   onChange={(e) => setNewPage({...newPage, group: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none"
                 >
                    <option value="main">الرئيسية</option>
                    <option value="employees">شؤون الموظفين</option>
                    <option value="licenses">المنشأة</option>
                    <option value="finance">المالية</option>
                    <option value="admin">الإدارة</option>
                 </select>
              </div>
            </div>
            <button 
              onClick={handleCreatePage}
              disabled={loading}
              className="w-full p-5 bg-secondary/10 border border-secondary/20 rounded-[2rem] text-secondary font-black text-xs uppercase hover:bg-secondary hover:text-primary transition-all disabled:opacity-50"
            >
               تأكيد إضافة الصفحة للنظام
            </button>
          </div>

          {/* Visual Identity Section */}
          <div className="glass p-10 rounded-[4rem] border border-white/5 bg-white/[0.01]">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-secondary">
               <Globe /> الهوية البصرية للموقع
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-black text-sidebar-text uppercase px-4">اسم الموقع</label>
                 <input 
                   value={config.siteName}
                   onChange={(e) => setConfig({...config, siteName: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-secondary/20"
                 />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-black text-sidebar-text uppercase px-4">رابط الشعار</label>
                   <input 
                     value={config.logoUrl}
                     onChange={(e) => setConfig({...config, logoUrl: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black text-sidebar-text uppercase px-4">رابط الأيقونة</label>
                   <input 
                     value={config.faviconUrl}
                     onChange={(e) => setConfig({...config, faviconUrl: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none"
                   />
                </div>
              </div>
            </div>
          </div>

          {/* Backup Management Section */}
          <div className="glass p-10 rounded-[4rem] border border-white/5 bg-white/[0.01]">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-secondary">
               <Database /> إدارة النسخ الاحتياطي والبيانات
            </h3>
            
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-[2.5rem] border border-white/5 mb-6">
               <div>
                  <h4 className="font-bold text-sm">النسخ الاحتياطي التلقائي</h4>
                  <p className="text-xs text-sidebar-text">حفظ نسخة من البيانات كل 24 ساعة في السحابة.</p>
               </div>
               <button 
                 onClick={() => setConfig({...config, autoBackup: !config.autoBackup})}
                 className={cn(
                   "w-14 h-8 rounded-full relative transition-all duration-300",
                   config.autoBackup ? "bg-secondary" : "bg-white/10"
                 )}
               >
                  <motion.div 
                    animate={{ x: config.autoBackup ? 28 : 4 }}
                    className="absolute top-1 left-1 w-6 h-6 bg-primary rounded-full shadow-lg"
                  />
               </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button className="flex items-center justify-center gap-2 p-5 bg-white/5 border border-white/5 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  <RefreshCcw size={16} className="text-secondary" />
                  مزامنة سحابية الآن
               </button>
               <button className="flex items-center justify-center gap-2 p-5 bg-white/5 border border-white/5 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  <Download size={16} className="text-secondary" />
                  تحميل نسخة CSV
               </button>
            </div>
          </div>
        </div>


        <div className="lg:col-span-1 space-y-8">
           <div className="glass p-10 rounded-[4rem] border border-rose-500/20 bg-rose-500/[0.02]">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                 <ShieldAlert size={32} />
              </div>
              <h3 className="text-xl font-black text-rose-500 mb-4 text-right">منطقة الخطر</h3>
              <p className="text-sidebar-text text-sm leading-relaxed mb-8">
                 تحذير: العمليات هنا غير قابلة للتراجع.
              </p>
              <button 
                onClick={() => setShowNukeModal(true)}
                className="w-full p-5 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] text-rose-500 font-black text-xs uppercase"
              >
                 حذف كافة بيانات الموقع
              </button>
           </div>
        </div>
      </div>

      {/* Nuke Modal */}
      <AnimatePresence>
        {showNukeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowNukeModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-[#0a192f] border border-rose-500/30 rounded-[3rem] p-12 text-center">
              {nukeStep === 1 && (
                <div className="space-y-8">
                  <div className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto text-rose-500"><AlertTriangle size={50} /></div>
                  <div>
                    <h2 className="text-2xl font-black text-rose-500 mb-2">تأكيد الحذف النهائي</h2>
                    <p className="text-sidebar-text text-sm">أدخل كلمة مرور الأدمن للتأكيد.</p>
                  </div>
                  <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-center outline-none" placeholder="كلمة المرور" />
                  <div className="flex gap-4">
                    <button onClick={handleNuke} className="flex-1 bg-rose-600 text-white py-4 rounded-2xl font-black">تدمير البيانات</button>
                    <button onClick={() => setShowNukeModal(false)} className="flex-1 bg-white/5 text-white py-4 rounded-2xl font-black">إلغاء</button>
                  </div>
                </div>
              )}
              {nukeStep === 2 && <div className="py-10 text-center"><div className="w-20 h-20 border-8 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mx-auto mb-6" /><h2 className="text-xl font-black text-rose-500 animate-pulse">جاري المسح...</h2></div>}
              {nukeStep === 3 && <div className="py-10 text-center"><CheckCircle2 size={80} className="text-emerald-500 mx-auto mb-6" /><h2 className="text-xl font-black text-white">تم تصفير النظام بنجاح</h2><button onClick={() => window.location.reload()} className="mt-6 text-secondary underline">إعادة تحميل الصفحة</button></div>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
