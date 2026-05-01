"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { 
  Printer, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  Globe, 
  Stethoscope,
  Filter,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import ReportTemplate from "@/components/reports/ReportTemplate";
import { cn } from "@/lib/utils";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

const categories = [
  { id: 'employees', label: "الموظفين", icon: Users, collection: "employees" },
  { id: 'iqama', label: "الإقامات", icon: ShieldCheck, collection: "iqamas" },
  { id: 'passport', label: "الجوازات", icon: Globe, collection: "passports" },
  { id: 'contracts', label: "عقود العمل", icon: FileText, collection: "contracts" },
  { id: 'health', label: "الشهادات الصحية", icon: Stethoscope, collection: "health_certs" },
  { id: 'visas', label: "التأشيرات", icon: Globe, collection: "visas" },
  { id: 'tasks', label: "المهام الوظيفية", icon: Briefcase, collection: "tasks" },
  { id: 'finance', label: "سجلات المدفوعات", icon: CreditCard, collection: "finance" },
  { id: 'cr', label: "السجلات التجارية", icon: ShieldCheck, collection: "cr" },
];

export default function ReportsPage() {
  const componentRef = useRef<HTMLDivElement>(null);
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [reportType, setReportType] = useState("شهري");
  const [loading, setLoading] = useState(true);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `تقرير_${activeCat.label}_${reportType}`,
  });

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, activeCat.collection));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => {
        const data = doc.data();
        
        // Custom Mapping based on collection
        let title = "بدون عنوان";
        let user = "النظام";
        let time = "غير محدد";

        if (activeCat.id === 'employees') {
          title = data.name;
          user = data.role;
          time = data.joinDate;
        } else if (activeCat.id === 'iqama') {
          title = data.employeeName;
          user = `رقم: ${data.iqamaNumber}`;
          time = data.expiryDate;
        } else if (activeCat.id === 'cr') {
          title = data.companyName;
          user = `سجل: ${data.crNumber}`;
          time = data.expiryDate;
        } else if (activeCat.id === 'tasks') {
          title = data.title;
          user = data.assignedTo;
          time = data.dueDate;
        } else if (activeCat.id === 'finance') {
          title = data.description;
          user = data.category;
          time = data.date;
        } else {
          title = data.name || data.employeeName || data.title || data.companyName || "سجل إداري";
          user = data.department || data.assignedTo || data.category || "عام";
          time = data.date || data.expiryDate || data.dueDate || "---";
        }

        return {
          title,
          user,
          status: data.status || "نشط",
          time
        };
      });
      setReportData(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [activeCat]);


  return (
    <div className="space-y-10 font-rubik">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">مركز التقارير الإدارية</h1>
          <p className="text-sidebar-text font-medium text-lg">تقارير ذكية مستخرجة مباشرة من قاعدة البيانات.</p>
        </div>
        <button 
          onClick={() => handlePrint()}
          className="bg-secondary text-primary px-8 py-4 rounded-[2rem] font-black text-sm flex items-center gap-2 shadow-xl"
        >
          <Printer size={20} /> طباعة تقرير {activeCat.label}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[3rem] border border-white/5 bg-white/[0.01]">
            <h3 className="text-[10px] font-black text-sidebar-text uppercase tracking-widest mb-6 flex items-center gap-2">
               <Filter size={14} className="text-secondary" /> تصنيف التقارير
            </h3>
            <div className="space-y-2">
               {categories.map((cat) => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCat(cat)}
                   className={cn(
                     "w-full flex items-center gap-4 p-4 rounded-2xl text-sm transition-all group",
                     activeCat.id === cat.id ? "bg-secondary text-primary font-bold shadow-lg" : "hover:bg-white/5 text-sidebar-text hover:text-white"
                   )}
                 >
                   <cat.icon size={18} />
                   <span>{cat.label}</span>
                 </button>
               ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
           {loading ? (
             <div className="h-[600px] flex items-center justify-center glass rounded-[4rem]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary/20 border-t-secondary"></div>
             </div>
           ) : (
             <div className="glass p-10 rounded-[4rem] border border-white/5 bg-[#0a192f]/50 overflow-auto flex justify-center min-h-[800px]">
                <div className="scale-[0.75] origin-top lg:scale-100">
                   <ReportTemplate 
                     ref={componentRef}
                     title={activeCat.label}
                     date={new Date().toLocaleDateString('ar-SA')}
                     type={reportType}
                     data={reportData}
                   />
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
