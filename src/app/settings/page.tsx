"use client";

import React, { useState } from "react";
import { 
  Settings, 
  Bell, 
  Palette, 
  Layout, 
  MessageSquare,
  Eye,
  Save,
  CheckCircle2,
  Clock,
  FileText,
  Building,
  Plus,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false);

  // States matching UI
  const [personalAlerts, setPersonalAlerts] = useState({
    docsExpiry: true,
    tasks: true,
    systemUpdates: true,
    browserAlerts: true,
    emailAlerts: true,
  });

  const [identity, setIdentity] = useState({
    siteName: "شركة سمو الإدارية",
    logoUrl: "https://j.top4top.io/p_37563f6gd1.png",
    faviconUrl: "https://j.top4top.io/p_37563f6gd1.png",
    accentColor: "gold",
    sidebarColor: "default",
    fontFamily: "cairo",
    viewMode: "cards",
  });

  const [displayPrefs, setDisplayPrefs] = useState({
    cardSize: "S",
    designStyle: "premium",
    reportStyle: "modern",
    enableExpiryAlerts: true,
    daysToAlert: "60",
  });

  const [whatsapp, setWhatsapp] = useState({
    enabled: true,
    phoneNumber: "9665XXXXXXX",
    apiKey: "*********************",
    alertDays: "30",
    messageTemplate: "تنبيه: إقامة الموظف {name} ستنتهي بتاريخ {date}. يرجى التجديد.",
  });

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={cn(
        "w-12 h-6 rounded-full relative transition-all duration-300 shrink-0",
        checked ? "bg-secondary" : "bg-white/10"
      )}
    >
      <div 
        className={cn(
          "absolute top-1 w-4 h-4 bg-primary rounded-full transition-all duration-300 shadow-md",
          checked ? "left-7" : "left-1"
        )}
      />
    </button>
  );

  return (
    <div className="space-y-3 font-rubik pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black mb-2 tracking-tight text-white flex items-center gap-4">
            إعدادات النظام
            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-secondary/10 text-secondary border border-secondary/20 flex items-center gap-2">
               الإدارة العليا <Settings size={12} />
            </span>
          </h1>
          <p className="text-sidebar-text font-medium text-sm">تخصيص هوية النظام، إشعارات واتساب، وإدارة صلاحيات الوصول.</p>
        </div>
      </div>

      {/* 1. تفضيلات التنبيهات الشخصية */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="flex items-center justify-between mb-12">
            <div>
               <h2 className="text-lg font-black text-white mb-2 flex items-center gap-4">
                  تفضيلات التنبيهات الشخصية
                  <div className="w-8 h-8 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                     <Bell size={18} />
                  </div>
               </h2>
               <p className="text-sidebar-text">إدارة قنوات التنبيه وأنواع الإشعارات التي ترغب في استلامها.</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10">
            <div className="space-y-3">
               <h4 className="text-sm font-black text-white/30 uppercase tracking-[0.2em] mb-4">أنواع التنبيهات</h4>
               
               <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="text-right">
                     <h5 className="font-bold text-white mb-1">انتهاء صلاحية الوثائق</h5>
                     <p className="text-xs text-sidebar-text">تنبيهات عند اقتراب انتهاء الوثائق الرسمية.</p>
                  </div>
                  <Toggle checked={personalAlerts.docsExpiry} onChange={() => setPersonalAlerts({...personalAlerts, docsExpiry: !personalAlerts.docsExpiry})} />
               </div>
               
               <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="text-right">
                     <h5 className="font-bold text-white mb-1">تكليفات المهام</h5>
                     <p className="text-xs text-sidebar-text">تنبيهات عند إسناد مهمة جديدة لك.</p>
                  </div>
                  <Toggle checked={personalAlerts.tasks} onChange={() => setPersonalAlerts({...personalAlerts, tasks: !personalAlerts.tasks})} />
               </div>

               <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="text-right">
                     <h5 className="font-bold text-white mb-1">تحديثات النظام العامة</h5>
                     <p className="text-xs text-sidebar-text">تنبيهات عن الميزات الجديدة والتحسينات.</p>
                  </div>
                  <Toggle checked={personalAlerts.systemUpdates} onChange={() => setPersonalAlerts({...personalAlerts, systemUpdates: !personalAlerts.systemUpdates})} />
               </div>
            </div>

            <div className="space-y-3">
               <h4 className="text-sm font-black text-white/30 uppercase tracking-[0.2em] mb-4">قنوات التنبيه</h4>
               
               <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="text-right">
                     <h5 className="font-bold text-white mb-1">تنبيهات المتصفح</h5>
                     <p className="text-xs text-sidebar-text">استلام تنبيهات فورية داخل النظام.</p>
                  </div>
                  <Toggle checked={personalAlerts.browserAlerts} onChange={() => setPersonalAlerts({...personalAlerts, browserAlerts: !personalAlerts.browserAlerts})} />
               </div>
               
               <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="text-right">
                     <h5 className="font-bold text-white mb-1">تنبيهات البريد الإلكتروني</h5>
                     <p className="text-xs text-sidebar-text">استلام ملخص أسبوعي وتقارير على البريد.</p>
                  </div>
                  <Toggle checked={personalAlerts.emailAlerts} onChange={() => setPersonalAlerts({...personalAlerts, emailAlerts: !personalAlerts.emailAlerts})} />
               </div>
            </div>
         </div>

         <div className="mt-10">
            <button onClick={handleSave} className="bg-secondary text-primary px-8 py-2 rounded-xl font-black text-sm shadow-xl hover:scale-105 transition-all flex gap-3 items-center">
               <Save size={18} /> حفظ تفضيلات التنبيهات
            </button>
         </div>
      </div>

      {/* 2. تخصيص النظام والهوية */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="flex items-center justify-between mb-12">
            <div>
               <h2 className="text-lg font-black text-white mb-2 flex items-center gap-4">
                  تخصيص النظام والهوية
                  <div className="w-8 h-8 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                     <Palette size={18} />
                  </div>
               </h2>
               <p className="text-sidebar-text">تغيير اسم النظام، الألوان الأساسية، والشعار.</p>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left Side (Actually Right Side visually for RTL) - Names & URLs */}
            <div className="space-y-3 text-right order-2 lg:order-1">
               <div className="space-y-3">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] px-4">اسم النظام</label>
                  <input 
                    value={identity.siteName}
                    onChange={(e) => setIdentity({...identity, siteName: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-2 px-8 text-sm outline-none focus:ring-4 focus:ring-secondary/10 text-right font-bold text-white" 
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] px-4">رابط الشعار (LOGO URL)</label>
                  <input 
                    value={identity.logoUrl}
                    onChange={(e) => setIdentity({...identity, logoUrl: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-2 px-8 text-sm outline-none focus:ring-4 focus:ring-secondary/10 text-right font-mono text-sidebar-text" 
                  />
                  <p className="text-xs text-white/40 px-4">يفضل استخدام صورة بخلفية شفافة (PNG).</p>
               </div>
               <div className="space-y-3">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] px-4">أيقونة المتصفح (FAVICON URL)</label>
                  <input 
                    value={identity.faviconUrl}
                    onChange={(e) => setIdentity({...identity, faviconUrl: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-2 px-8 text-sm outline-none focus:ring-4 focus:ring-secondary/10 text-right font-mono text-sidebar-text" 
                  />
                  <p className="text-xs text-white/40 px-4">الأيقونة التي تظهر في تبويب المتصفح.</p>
               </div>

               <div className="pt-6">
                  <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-6">لون التمييز (ACCENT COLOR)</h4>
                  <div className="flex flex-wrap justify-end gap-4">
                     {[
                        { id: 'gold', color: '#EAB308', name: 'ذهبي' },
                        { id: 'blue', color: '#3B82F6', name: 'أزرق' },
                        { id: 'green', color: '#10B981', name: 'أخضر' },
                        { id: 'purple', color: '#8B5CF6', name: 'بنفسجي' },
                        { id: 'red', color: '#EF4444', name: 'أحمر' },
                        { id: 'orange', color: '#F97316', name: 'برتقالي' },
                        { id: 'custom', color: '#EAB308', name: 'مخصص', isCustom: true },
                     ].map(c => (
                        <button 
                           key={c.id}
                           onClick={() => setIdentity({...identity, accentColor: c.id})}
                           className={cn(
                              "w-24 h-28 rounded-xl flex flex-col items-center justify-center gap-3 transition-all border-2",
                              identity.accentColor === c.id ? "border-secondary bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"
                           )}
                        >
                           <div className="w-10 h-10 rounded-full" style={{ backgroundColor: c.color }} />
                           <span className="text-xs font-bold text-white/70">{c.name}</span>
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Side (Actually Left Side visually for RTL) - Fonts & Sidebars */}
            <div className="space-y-3 text-right order-1 lg:order-2 border-l border-white/5 pl-10">
               <div>
                  <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-6">لون القائمة الجانبية</h4>
                  <div className="grid grid-cols-3 gap-4">
                     {[
                        { id: 'default', color: '#060B19', name: 'الافتراضي' },
                        { id: 'royal_blue', color: '#1E3A8A', name: 'أزرق ملكي' },
                        { id: 'purple_dark', color: '#4C1D95', name: 'بنفسجي' },
                        { id: 'green_dark', color: '#064E3B', name: 'أخضر غامق' },
                        { id: 'black', color: '#000000', name: 'أسود فاخر' },
                        { id: 'gold_dark', color: '#422006', name: 'ذهبي غامق' },
                     ].map(c => (
                        <button 
                           key={c.id}
                           onClick={() => setIdentity({...identity, sidebarColor: c.id})}
                           className={cn(
                              "h-28 rounded-xl flex flex-col items-center justify-center gap-3 transition-all border-2",
                              identity.sidebarColor === c.id ? "border-secondary bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"
                           )}
                        >
                           <div className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: c.color }} />
                           <span className="text-xs font-bold text-white/70">{c.name}</span>
                        </button>
                     ))}
                  </div>
               </div>

               <div>
                  <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-6">نوع الخط الأساسي (TYPOGRAPHY)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                        { id: 'cairo', name: 'Cairo (افتراضي)', style: 'font-cairo' },
                        { id: 'tajawal', name: 'Tajawal', style: 'font-tajawal' },
                        { id: 'almarai', name: 'Almarai', style: 'font-almarai' },
                        { id: 'ibm', name: 'IBM Plex Sans', style: 'font-sans' },
                        { id: 'inter', name: 'Inter (English Optimized)', style: 'font-sans' },
                     ].map(f => (
                        <button 
                           key={f.id}
                           onClick={() => setIdentity({...identity, fontFamily: f.id})}
                           className={cn(
                              "p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all border-2",
                              identity.fontFamily === f.id ? "border-secondary bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"
                           )}
                        >
                           <span className="font-bold text-white">{f.name}</span>
                           <span className="text-[9px] text-sidebar-text">The quick brown fox jumps over the lazy dog</span>
                        </button>
                     ))}
                  </div>
               </div>
            </div>

         </div>

         {/* عرض البطاقات والجدول */}
         <div className="mt-12 pt-12 border-t border-white/5">
            <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-6 text-right">طريقة عرض الموظفين</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <button 
                  onClick={() => setIdentity({...identity, viewMode: 'cards'})}
                  className={cn(
                     "p-5 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all border-2",
                     identity.viewMode === 'cards' ? "border-secondary bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"
                  )}
               >
                  <Layout size={16} className={identity.viewMode === 'cards' ? "text-secondary" : "text-white/40"} />
                  <span className="font-bold text-sm text-white">عرض البطاقات (Cards)</span>
               </button>
               <button 
                  onClick={() => setIdentity({...identity, viewMode: 'list'})}
                  className={cn(
                     "p-5 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all border-2",
                     identity.viewMode === 'list' ? "border-secondary bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"
                  )}
               >
                  <Layout size={16} className={identity.viewMode === 'list' ? "text-secondary" : "text-white/40"} />
                  <span className="font-bold text-sm text-white">عرض الجدول (List)</span>
               </button>
            </div>
         </div>

         <div className="mt-10">
            <button onClick={handleSave} className="bg-secondary text-primary px-8 py-2 rounded-xl font-black text-sm shadow-xl hover:scale-105 transition-all flex gap-3 items-center">
               <Save size={18} /> حفظ إعدادات الهوية
            </button>
         </div>
      </div>

      {/* 3. تفضيلات عرض البطاقات */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="space-y-3">
            <div>
               <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-6 text-right flex items-center justify-end gap-3">
                  حجم البطاقات <Layout size={16}/>
               </h4>
               <div className="flex gap-4 justify-end">
                  {[
                     { id: 'S', name: 'صغير', icon: 'S' },
                     { id: 'M', name: 'متوسط', icon: 'M' },
                     { id: 'L', name: 'كبير', icon: 'L' },
                     { id: 'simple', name: 'بسيط', icon: <FileText size={16}/> },
                  ].map(size => (
                     <button 
                        key={size.id}
                        onClick={() => setDisplayPrefs({...displayPrefs, cardSize: size.id})}
                        className={cn(
                           "w-32 h-32 rounded-xl flex flex-col items-center justify-center gap-3 transition-all border-2",
                           displayPrefs.cardSize === size.id ? "border-secondary bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"
                        )}
                     >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 font-black">
                           {size.icon}
                        </div>
                        <span className="text-sm font-bold text-white">{size.name}</span>
                     </button>
                  ))}
               </div>
            </div>

            <div>
               <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-6 text-right flex items-center justify-end gap-3">
                  نمط التصميم <Palette size={16}/>
               </h4>
               <div className="flex gap-4 justify-end">
                  {[
                     { id: 'premium', name: 'فاخر' },
                     { id: 'glassy', name: 'زجاجي' },
                     { id: 'simple', name: 'بسيط' },
                  ].map(style => (
                     <button 
                        key={style.id}
                        onClick={() => setDisplayPrefs({...displayPrefs, designStyle: style.id})}
                        className={cn(
                           "w-32 h-32 rounded-xl flex flex-col items-center justify-center gap-3 transition-all border-2",
                           displayPrefs.designStyle === style.id ? "border-secondary bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"
                        )}
                     >
                        <span className="text-sm font-bold text-white">{style.name}</span>
                     </button>
                  ))}
               </div>
            </div>

            <div>
               <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-6 text-right flex items-center justify-end gap-3">
                  تصميم التقارير (REPORT TEMPLATES)
               </h4>
               <div className="grid grid-cols-4 gap-4">
                  {[
                     { id: 'modern', name: 'عصري (Modern)', desc: 'تصميم بلمسات زجاجية وألوان ذهبية' },
                     { id: 'classic', name: 'كلاسيكي (Classic)', desc: 'تصميم رسمي تقليدي بخطوط واضحة' },
                     { id: 'executive', name: 'تنفيذي (Executive)', desc: 'تصميم فاخر للمدراء والتقارير المالية' },
                     { id: 'compact', name: 'مختصر (Compact)', desc: 'تصميم مكثف لتوفير الورق والمساحة' },
                  ].map(template => (
                     <button 
                        key={template.id}
                        onClick={() => setDisplayPrefs({...displayPrefs, reportStyle: template.id})}
                        className={cn(
                           "p-4 rounded-xl flex flex-col justify-center text-right gap-2 transition-all border-2",
                           displayPrefs.reportStyle === template.id ? "border-secondary bg-white/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"
                        )}
                     >
                        <span className="font-bold text-white">{template.name}</span>
                        <span className="text-[10px] text-white/40 leading-relaxed">{template.desc}</span>
                     </button>
                  ))}
               </div>
            </div>

            <div className="pt-10 border-t border-white/5 space-y-3">
               <div className="flex items-center justify-between">
                  <div className="text-right">
                     <h4 className="font-bold text-white mb-1">إشعارات انتهاء الصلاحية</h4>
                     <p className="text-xs text-sidebar-text">تحديد متى يرسل النظام تنبيهات للمسؤولين قبل انتهاء الوثائق.</p>
                  </div>
                  <Toggle checked={displayPrefs.enableExpiryAlerts} onChange={() => setDisplayPrefs({...displayPrefs, enableExpiryAlerts: !displayPrefs.enableExpiryAlerts})} />
               </div>

               <div className="bg-white/[0.02] border border-white/5 p-5 rounded-3xl flex items-center justify-between">
                  <div className="flex gap-2">
                     {['15 يوم', '30 يوم', '45 يوم', '60 يوم', '90 يوم'].map(day => (
                        <button 
                           key={day}
                           onClick={() => setDisplayPrefs({...displayPrefs, daysToAlert: day})}
                           className={cn(
                              "px-3 py-2 rounded-3xl font-bold text-sm transition-all",
                              displayPrefs.daysToAlert === day ? "bg-secondary text-primary" : "bg-white/5 text-white/60 hover:bg-white/10"
                           )}
                        >
                           {day}
                        </button>
                     ))}
                  </div>
                  <div className="text-right flex items-center gap-4">
                     <div>
                        <h5 className="font-bold text-white">الأيام المتبقية للتنبيه</h5>
                        <p className="text-xs text-white/40 mt-1">سيتم تفعيل الإشعارات عندما يبقى هذا العدد من الأيام.</p>
                     </div>
                     <div className="w-8 h-8 rounded-2xl bg-white/5 flex items-center justify-center text-white/40">
                        <Clock size={16} />
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>

      {/* 4. تنبيهات واتساب الذكية */}
      <div className="glass p-4 rounded-3xl border border-[#25D366]/20 bg-[#25D366]/[0.02] shadow-[0_0_50px_rgba(37,211,102,0.05)]">
         <div className="flex items-center justify-between mb-12">
            <div>
               <h2 className="text-lg font-black text-white mb-2 flex items-center gap-4">
                  تنبيهات واتساب الذكية
                  <div className="w-8 h-8 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                     <MessageSquare size={18} />
                  </div>
               </h2>
               <p className="text-sidebar-text">إرسال تنبيهات تلقائية لانتهاء صلاحية الوثائق عبر واتساب.</p>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 text-right order-2 lg:order-1">
               <div className="space-y-3">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] px-4">توقيت التنبيهات (أيام قبل الانتهاء)</label>
                  <div className="flex flex-wrap justify-end gap-3">
                     {['1 يوم', '3 يوم', '7 يوم', '15 يوم', '30 يوم'].map(day => (
                        <button 
                           key={day}
                           onClick={() => setWhatsapp({...whatsapp, alertDays: day})}
                           className={cn(
                              "px-3 py-2 rounded-[1.5rem] font-bold text-sm transition-all",
                              whatsapp.alertDays === day ? "bg-[#25D366] text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
                           )}
                        >
                           {day}
                        </button>
                     ))}
                  </div>
               </div>
               
               <div className="space-y-3">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] px-4">قالب الرسالة</label>
                  <textarea 
                    value={whatsapp.messageTemplate}
                    onChange={(e) => setWhatsapp({...whatsapp, messageTemplate: e.target.value})}
                    className="w-full h-24 bg-white/[0.02] border border-white/10 rounded-xl py-2 px-8 text-sm outline-none focus:ring-4 focus:ring-[#25D366]/10 text-right font-bold text-white resize-none" 
                  />
                  <p className="text-xs text-white/40 px-4">استخدم {"{name}"} لاسم الموظف و {"{date}"} لتاريخ الانتهاء.</p>
               </div>
            </div>

            <div className="space-y-3 text-right order-1 lg:order-2">
               <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="text-right">
                     <h5 className="font-bold text-white mb-1">تفعيل التنبيهات</h5>
                     <p className="text-xs text-sidebar-text">إرسال رسائل تلقائية للمسؤولين.</p>
                  </div>
                  <button 
                     onClick={() => setWhatsapp({...whatsapp, enabled: !whatsapp.enabled})}
                     className={cn(
                        "w-16 h-8 rounded-full relative transition-all duration-300",
                        whatsapp.enabled ? "bg-[#25D366]" : "bg-white/10"
                     )}
                  >
                     <div 
                        className={cn(
                           "absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-md",
                           whatsapp.enabled ? "left-9" : "left-1"
                        )}
                     />
                  </button>
               </div>

               <div className="space-y-3">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] px-4">رقم هاتف المسؤول</label>
                  <input 
                    value={whatsapp.phoneNumber}
                    onChange={(e) => setWhatsapp({...whatsapp, phoneNumber: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-2 px-8 text-sm outline-none focus:ring-4 focus:ring-[#25D366]/10 text-right font-mono tracking-widest text-sidebar-text" 
                    dir="ltr"
                  />
               </div>
               
               <div className="space-y-3">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.2em] px-4">مفتاح (API (TWILIO/CLOUD</label>
                  <input 
                    type="password"
                    value={whatsapp.apiKey}
                    onChange={(e) => setWhatsapp({...whatsapp, apiKey: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-2 px-8 text-sm outline-none focus:ring-4 focus:ring-[#25D366]/10 text-right font-mono tracking-widest text-sidebar-text" 
                    dir="ltr"
                  />
               </div>
            </div>
         </div>

         <div className="mt-10">
            <button onClick={handleSave} className="bg-[#25D366] text-white px-8 py-2 rounded-xl font-black text-sm shadow-xl hover:scale-105 transition-all flex gap-3 items-center">
               <Save size={18} /> حفظ إعدادات واتساب
            </button>
         </div>
      </div>

      {/* 5. معاينة تصميم التقرير */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="flex items-center justify-between">
            <button className="bg-secondary text-primary px-3 py-2 rounded-2xl font-black text-sm shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex gap-3 items-center">
               فتح المعاينة <Eye size={16} />
            </button>
            <div className="text-right">
               <h2 className="text-lg font-black text-white mb-2 flex justify-end items-center gap-4">
                  معاينة تصميم التقرير
                  <div className="w-8 h-8 rounded-2xl bg-white/5 flex items-center justify-center text-white/60">
                     <FileText size={18} />
                  </div>
               </h2>
               <p className="text-sidebar-text">عرض كيف سيظهر التقرير النهائي للمسؤولين بالهوية المختارة.</p>
            </div>
         </div>
      </div>

      {/* 6. إدارة جهات العمل (المؤسسات) */}
      <div className="glass p-4 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="flex items-center justify-end mb-10">
            <div className="text-right">
               <h2 className="text-lg font-black text-white mb-2 flex justify-end items-center gap-4">
                  إدارة جهات العمل (المؤسسات)
                  <div className="w-8 h-8 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                     <Building size={18} />
                  </div>
               </h2>
               <p className="text-sidebar-text">إضافة وإدارة بيانات المؤسسات والشركات التابعة لك.</p>
            </div>
         </div>
         <button className="w-full py-2 border-2 border-dashed border-white/10 hover:border-secondary/50 rounded-3xl bg-white/[0.01] hover:bg-white/[0.02] transition-all flex items-center justify-center gap-3 text-white/60 hover:text-white font-bold text-sm group">
            <Plus className="text-secondary group-hover:scale-125 transition-transform" />
            إضافة مؤسسة جديدة
         </button>
      </div>

      {/* 7. منطقة الخطر */}
      <div className="glass p-4 rounded-3xl border border-rose-500/20 bg-rose-500/[0.02] shadow-[0_0_50px_rgba(244,63,94,0.05)]">
         <div className="flex items-center justify-end mb-12">
            <div className="text-right">
               <h2 className="text-lg font-black text-rose-500 mb-2 flex justify-end items-center gap-4">
                  منطقة الخطر
                  <div className="w-8 h-8 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                     <ShieldAlert size={18} />
                  </div>
               </h2>
               <p className="text-sidebar-text">إجراءات حساسة لا يمكن التراجع عنها.</p>
            </div>
         </div>
         <div className="bg-[#0a0508] border border-rose-500/10 rounded-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-5">
            <button className="bg-rose-500 text-white px-3 py-2 rounded-2xl font-black text-sm shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:scale-105 transition-all shrink-0">
               مسح قاعدة البيانات
            </button>
            <div className="text-right space-y-2">
               <h4 className="text-lg font-black text-rose-400">حذف جميع بيانات النظام</h4>
               <p className="text-sidebar-text text-sm leading-relaxed">
                  سيتم مسح جميع سجلات الموظفين، الإقامات، الجوازات، التراخيص، وكافة البيانات المحفوظة في قاعدة البيانات بشكل نهائي. تأكد من أنك قمت بأخذ نسخة احتياطية قبل المتابعة.
               </p>
            </div>
         </div>
      </div>

    </div>
  );
}
