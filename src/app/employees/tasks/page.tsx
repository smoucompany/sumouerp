"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  ShieldCheck, 
  History, 
  ChevronDown,
  Briefcase,
  CheckCircle2,
  Clock,
  Loader2,
  Save,
  User,
  Trash2
} from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import CustomSelect from "@/components/shared/Select";

interface Task {
  id?: string;
  title: string;
  assignedTo: string;
  jobTitle: string;
  dueDate: string;
  status: string;
  isAiGenerated?: boolean;
}

export default function SmartTasksPage() {
  const { data: tasks, addItem, removeItem } = useFirestore<Task>("tasks");
  const [employeeId, setEmployeeId] = useState("اختر الموظف...");
  const [jobTitle, setJobTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<Partial<Task>[] | null>(null);

  const handleGenerate = () => {
    if (employeeId === "اختر الموظف..." || !jobTitle) return;
    
    setIsGenerating(true);
    setGeneratedTasks(null);

    // Simulate AI Generation Delay
    setTimeout(() => {
      setGeneratedTasks([
        { title: `إعداد خطة تطويرية لمهام ${jobTitle}`, status: "قيد التنفيذ" },
        { title: `مراجعة مؤشرات الأداء الخاصة بـ ${jobTitle}`, status: "لم تبدأ" },
        { title: `تحليل الاحتياجات التدريبية وتحديث الإجراءات`, status: "لم تبدأ" },
        { title: `تقديم التقرير الشهري للإنجازات والتحديات`, status: "قيد التنفيذ" }
      ]);
      setIsGenerating(false);
    }, 3000);
  };

  const handleSaveTasks = async () => {
    if (!generatedTasks) return;
    
    for (const t of generatedTasks) {
      await addItem({
        title: t.title!,
        assignedTo: employeeId,
        jobTitle: jobTitle,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +7 days
        status: t.status!,
        isAiGenerated: true
      });
    }
    
    // Reset form after save
    setGeneratedTasks(null);
    setEmployeeId("اختر الموظف...");
    setJobTitle("");
  };

  return (
    <div className="space-y-6 font-rubik">
      {/* Smart AI Header Section (Matching the Image) */}
      <div className="relative glass p-14 rounded-3xl border border-secondary/10 bg-[#060b19] overflow-hidden flex flex-col items-center text-center">
         {/* Background Glows */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

         <div className="absolute top-6 left-10">
            <button className="flex items-center gap-3 px-6 py-3 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-bold text-white/80">
               سجل العمليات <History size={16} className="text-secondary" />
            </button>
         </div>

         <div className="flex gap-3 mb-8 z-10">
            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-secondary/10 text-secondary border border-secondary/20 flex items-center gap-2">
               الذكاء الاصطناعي التوليدي <Sparkles size={12} />
            </span>
            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-white/40 border border-white/10 flex items-center gap-2">
               AI HUB <ShieldCheck size={12} />
            </span>
         </div>

         <div className="flex items-center justify-center gap-6 mb-6 z-10">
            <h1 className="text-7xl font-black text-white tracking-tighter">المهام الذكية</h1>
            <div className="w-20 h-20 bg-secondary/10 border border-secondary/20 rounded-xl flex items-center justify-center text-secondary shadow-[0_0_50px_rgba(234,179,8,0.2)]">
               <Sparkles size={40} />
            </div>
         </div>

         <p className="text-xl text-sidebar-text font-bold max-w-2xl leading-relaxed z-10">
            توليد وتحليل التوصيف الوظيفي والمهام باستخدام تقنيات الذكاء الاصطناعي لرفع كفاءة الأداء.
         </p>
      </div>

      {/* AI Generation Form */}
      <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.01]">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Form Fields */}
            <div className="space-y-6">
               <div className="space-y-4 text-right relative z-50">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] px-4">اختيار الموظف المستهدف <span className="text-rose-500">*</span></label>
                  <CustomSelect 
                     label="" value={employeeId} 
                     onChange={(val) => setEmployeeId(val)}
                     options={[
                        { value: "اختر الموظف...", label: "ابحث عن موظف بالاسم أو الرقم الوظيفي..." },
                        { value: "محمد عبد الله", label: "محمد عبد الله - 1001" },
                        { value: "أحمد العلي", label: "أحمد العلي - 1002" }
                     ]} 
                  />
               </div>

               <div className="space-y-4 text-right">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] px-4">تأكيد المسمى الوظيفي</label>
                  <div className="relative group">
                     <input 
                       required placeholder="المسمى الوظيفي..." value={jobTitle}
                       onChange={(e) => setJobTitle(e.target.value)}
                       className="w-full bg-[#060b19] border border-white/10 rounded-xl py-3 px-5 text-lg outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary/40 transition-all text-right placeholder:text-white/20" 
                     />
                     <Briefcase className="absolute left-8 top-1/2 -translate-y-1/2 text-white/10" size={24} />
                  </div>
               </div>

               <button 
                 onClick={handleGenerate}
                 disabled={isGenerating || employeeId === "اختر الموظف..." || !jobTitle}
                 className="w-full bg-secondary text-primary py-6 rounded-2xl font-black text-xl shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:hover:scale-100"
               >
                 {isGenerating ? (
                   <>جاري التوليد بواسطة الذكاء الاصطناعي... <Loader2 size={24} className="animate-spin" /></>
                 ) : (
                   <>توليد المهام الوظيفية الذكية <Sparkles size={24} /></>
                 )}
               </button>
            </div>

            {/* Generated Results Area */}
            <div className="border border-white/5 bg-black/20 rounded-3xl p-6 flex flex-col justify-center min-h-[400px]">
               {isGenerating && (
                  <div className="text-center space-y-6">
                     <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mx-auto"></div>
                     <div>
                        <h3 className="text-2xl font-black text-white mb-2">الذكاء الاصطناعي يحلل...</h3>
                        <p className="text-sidebar-text">يتم الآن دراسة المسمى الوظيفي لـ "{jobTitle}" واستخراج المهام القياسية.</p>
                     </div>
                  </div>
               )}

               {!isGenerating && !generatedTasks && (
                  <div className="text-center space-y-4 opacity-30">
                     <Sparkles size={64} className="mx-auto text-secondary mb-4" />
                     <h3 className="text-2xl font-black text-white">منطقة النتائج الذكية</h3>
                     <p className="text-sidebar-text">قم بإدخال بيانات الموظف والمسمى الوظيفي لتبدأ عملية التوليد.</p>
                  </div>
               )}

               {!isGenerating && generatedTasks && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
                     <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black text-secondary flex items-center gap-3">
                           <CheckCircle2 size={24} /> تم توليد المهام بنجاح
                        </h3>
                        <span className="text-xs bg-white/5 px-4 py-2 rounded-full font-bold">{generatedTasks.length} مهام</span>
                     </div>
                     
                     <div className="space-y-4">
                        {generatedTasks.map((task, idx) => (
                           <div key={idx} className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black text-sm">
                                 {idx + 1}
                              </div>
                              <p className="font-bold text-sm text-white/90">{task.title}</p>
                           </div>
                        ))}
                     </div>

                     <button 
                       onClick={handleSaveTasks}
                       className="w-full bg-emerald-500 text-white py-3 rounded-xl font-black text-lg shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all flex items-center justify-center gap-3"
                     >
                        اعتماد وحفظ المهام للموظف <Save size={24} />
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* Saved Tasks List Below */}
      <div className="pt-10">
         <h3 className="text-2xl font-black mb-8 flex items-center gap-3"><History className="text-secondary" /> سجل المهام المعينة</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
               <div key={task.id} className="glass p-6 rounded-xl border border-white/5 flex flex-col relative group">
                  {task.isAiGenerated && (
                     <div className="absolute top-4 left-4 bg-secondary/10 text-secondary p-2 rounded-xl" title="تم التوليد بواسطة الذكاء الاصطناعي">
                        <Sparkles size={16} />
                     </div>
                  )}
                  <h4 className="font-bold text-lg mb-4 text-white pr-10">{task.title}</h4>
                  <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
                     <div className="flex justify-between text-xs font-bold text-sidebar-text">
                        <span>الموظف: {task.assignedTo}</span>
                        <span>{task.jobTitle}</span>
                     </div>
                     <div className="flex justify-between text-xs font-bold items-center">
                        <span className="text-amber-500 flex items-center gap-1"><Clock size={12}/> {task.dueDate}</span>
                        <span className="text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{task.status}</span>
                     </div>
                  </div>
                  <button onClick={() => removeItem(task.id!)} className="absolute bottom-4 left-4 p-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-xl">
                     <Trash2 size={16} />
                  </button>
               </div>
            ))}
            {tasks.length === 0 && (
               <div className="lg:col-span-3 text-center py-10 opacity-50 font-bold">لا توجد مهام محفوظة حتى الآن.</div>
            )}
         </div>
      </div>

    </div>
  );
}
