"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

interface ReportTemplateProps {
  title: string;
  date: string;
  type: string;
  data: any[];
}

const ReportTemplate = forwardRef<HTMLDivElement, ReportTemplateProps>(({ title, date, type, data }, ref) => {
  return (
    <div 
      ref={ref} 
      className="bg-white text-[#0a192f] p-[2.5cm] w-[210mm] min-h-[297mm] mx-auto shadow-2xl print:shadow-none print:p-12 font-rubik"
      style={{ direction: 'rtl' }}
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-3 bg-[#0a192f]"></div>
      <div className="absolute top-0 right-0 w-1/3 h-3 bg-[#d4af37]"></div>

      {/* Corporate Header */}
      <div className="flex justify-between items-center border-b-4 border-[#0a192f] pb-10 mb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-[#0a192f] text-white flex items-center justify-center font-black text-4xl rounded-2xl shadow-xl shadow-slate-200">
            G
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#0a192f]">شركة قرافتي للحلول البرمجية</h1>
            <p className="text-[#d4af37] font-bold text-sm tracking-widest uppercase">Premium Enterprise Systems</p>
          </div>
        </div>
        <div className="text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h2 className="text-2xl font-black text-[#0a192f] mb-1">{title}</h2>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">التاريخ والهوية</span>
            <p className="text-slate-600 text-sm font-bold">{date}</p>
            <p className="text-[#d4af37] text-xs font-black uppercase">النوع: تقرير {type}</p>
          </div>
        </div>
      </div>

      {/* Dynamic Summary based on Category */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-slate-50 border-r-4 border-[#0a192f] rounded-xl">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">إجمالي السجلات في {title}</p>
          <p className="text-2xl font-black text-[#0a192f]">{data.length}</p>
        </div>
        <div className="p-6 bg-slate-50 border-r-4 border-[#d4af37] rounded-xl">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">الحالات المكتملة</p>
          <p className="text-2xl font-black text-emerald-600">{data.filter(i => i.status === 'Completed' || i.status === 'Active').length}</p>
        </div>
        <div className="p-6 bg-[#0a192f] rounded-xl">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">تاريخ التقرير</p>
          <p className="text-2xl font-black text-[#d4af37]">{date}</p>
        </div>
      </div>


      {/* Main Table Content */}
      <div className="mb-12">
        <h3 className="text-lg font-black text-[#0a192f] mb-6 flex items-center gap-3">
          <span className="w-2 h-8 bg-[#d4af37] rounded-full"></span>
          تفاصيل التقرير الإداري
        </h3>
        <table className="w-full text-right border-collapse overflow-hidden rounded-xl border border-slate-200">
          <thead>
            <tr className="bg-[#0a192f] text-white">
              <th className="px-6 py-5 text-sm font-black uppercase tracking-wider">البيان</th>
              <th className="px-6 py-5 text-sm font-black uppercase tracking-wider">المسؤول</th>
              <th className="px-6 py-5 text-sm font-black uppercase tracking-wider">الحالة</th>
              <th className="px-6 py-5 text-sm font-black uppercase tracking-wider">التوقيت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, idx) => (
              <tr key={idx} className={cn(
                "transition-colors",
                idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              )}>
                <td className="px-6 py-4 text-sm font-bold text-[#0a192f]">{item.title}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{item.user}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                    item.status === 'Completed' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400 font-mono">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes Section */}
      <div className="p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 mb-20 relative">
        <h4 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">ملاحظات الإدارة العليا</h4>
        <div className="h-24"></div>
        <div className="absolute top-4 left-4 opacity-5">
           <BookOpen size={100} className="text-[#0a192f]" />
        </div>
      </div>

      {/* Signature Section */}
      <div className="flex justify-between items-end px-12">
        <div className="text-center">
          <div className="w-40 h-40 border-4 border-[#0a192f]/5 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-2 border-2 border-[#d4af37]/20 rounded-full border-dashed animate-spin-slow"></div>
            <span className="text-[8px] font-black text-slate-300 uppercase absolute top-4">Official Stamp</span>
            <div className="text-[#0a192f] font-black text-xl opacity-20 rotate-12">قرافتي ERP</div>
          </div>
          <p className="text-xs font-black text-[#0a192f] uppercase tracking-widest">ختم المنشأة المعتمد</p>
        </div>
        <div className="text-center w-64 pb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-16 tracking-widest">توقيع المدير المسؤول</p>
          <div className="h-[2px] bg-[#0a192f] w-full relative">
            <div className="absolute -top-1 right-0 w-3 h-3 bg-[#d4af37] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-[1.5cm] left-[1.5cm] right-[1.5cm] flex items-center justify-between pt-6 border-t border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
        <span>شركة قرافتي للبرمجيات • الرياض، المملكة العربية السعودية</span>
        <div className="flex gap-4">
          <span>{date}</span>
          <span className="bg-[#0a192f] text-white px-3 py-1 rounded-full text-[8px]">Page 01 of 01</span>
        </div>
      </div>
    </div>
  );
});

ReportTemplate.displayName = "ReportTemplate";

export default ReportTemplate;
