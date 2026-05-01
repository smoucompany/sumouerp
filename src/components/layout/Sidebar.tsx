"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  ShieldCheck, 
  CreditCard, 
  Settings, 
  FileText, 
  ChevronDown,
  Briefcase,
  History,
  Users2,
  Calendar,
  Globe,
  Stethoscope,
  BookOpen,
  PieChart,
  LogOut,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const defaultGroups = [
  {
    id: "main",
    title: "الرئيسية",
    icon: Sparkles,
    items: [
      { label: "لوحة التحكم", href: "/", icon: PieChart },
      { label: "المهام اليومية", href: "/tasks", icon: Calendar },
      { label: "التقارير الإدارية", href: "/reports", icon: BookOpen },
    ]
  },
  {
    id: "employees",
    title: "شؤون الموظفين",
    icon: Users,
    items: [
      { label: "قاعدة البيانات", href: "/employees", icon: Users2 },
      { label: "الإقامات", href: "/employees/iqama", icon: ShieldCheck },
      { label: "جوازات السفر", href: "/employees/passport", icon: Globe },
      { label: "عقود العمل", href: "/employees/contracts", icon: FileText },
      { label: "الشهادات الصحية", href: "/employees/health", icon: Stethoscope },
      { label: "التأشيرات", href: "/employees/visas", icon: Globe },
      { label: "تذاكر الطيران", href: "/employees/tickets", icon: Globe },
      { label: "المهام الوظيفية", href: "/employees/tasks", icon: Briefcase },
    ]
  },
  {
    id: "licenses",
    title: "المنشأة",
    icon: ShieldCheck,
    items: [
      { label: "السجلات التجارية", href: "/licenses/cr", icon: FileText },
      { label: "التراخيص العامة", href: "/licenses", icon: ShieldCheck },
    ]
  },
  {
    id: "finance",
    title: "المالية",
    icon: CreditCard,
    items: [
      { label: "المدفوعات", href: "/finance", icon: CreditCard },
    ]
  },
  {
    id: "admin",
    title: "الإدارة",
    icon: Settings,
    items: [
      { label: "المستخدمين", href: "/admin/users", icon: Users2 },
      { label: "سجلات النشاط", href: "/admin/logs", icon: History },
      { label: "الإعدادات", href: "/settings", icon: Settings },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["الرئيسية", "شؤون الموظفين"]);
  const [mounted, setMounted] = useState(false);
  const [siteConfig, setSiteConfig] = useState({ siteName: "Sumou ERP", logoUrl: "" });
  const [menuGroups, setMenuGroups] = useState(defaultGroups);

  useEffect(() => {
    setMounted(true);
    const loadSettings = async () => {
      try {
        const { doc, onSnapshot, collection } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        
        onSnapshot(doc(db, "settings", "global"), (doc) => {
          if (doc.exists()) setSiteConfig(prev => ({ ...prev, ...doc.data() }));
        });

        onSnapshot(collection(db, "custom_pages"), (snapshot) => {
          const customItems = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          const newGroups = defaultGroups.map(group => {
            const itemsForGroup = customItems.filter((item: any) => item.groupId === group.id);
            return {
              ...group,
              items: [...group.items, ...itemsForGroup.map((item: any) => ({
                label: item.label,
                href: `/custom-view?id=${item.id}`,
                icon: FileText
              }))]
            };
          });
          setMenuGroups(newGroups);
        });
      } catch (err) {
        console.error("Firebase load error", err);
      }
    };
    loadSettings();
  }, []);

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  if (!mounted) return null;

  return (
    <div className="fixed right-6 top-6 bottom-6 w-72 z-50 font-rubik">
      <div className="h-full glass rounded-[3rem] flex flex-col overflow-hidden border border-white/10 shadow-2xl">
        {/* Logo Section */}
        <div className="p-8 pb-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 relative group">
            <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-xl group-hover:bg-secondary/40 transition-all duration-500"></div>
            {siteConfig.logoUrl ? (
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                 <img src={siteConfig.logoUrl} alt="Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-secondary to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-primary font-black text-3xl italic">S</span>
              </div>
            )}
          </div>
          <h1 className="text-white font-black text-xl tracking-tight leading-none">{siteConfig.siteName}</h1>
          <div className="mt-2 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
             <p className="text-[8px] text-secondary font-black uppercase tracking-[0.3em]">Premium ERP Solution</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group) => (
            <div key={group.id} className="mb-2">
              <button 
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-4 py-3 text-white/40 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest group"
              >
                <div className="flex items-center gap-3">
                  <group.icon size={16} className="group-hover:text-secondary transition-colors" />
                  <span>{group.title}</span>
                </div>
                <ChevronDown className={cn(
                  "w-3 h-3 transition-transform duration-500",
                  expandedGroups.includes(group.title) ? "rotate-180 text-secondary" : ""
                )} />
              </button>
              
              <AnimatePresence>
                {expandedGroups.includes(group.title) && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-1 pr-1"
                  >
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div className={cn(
                          "flex items-center gap-4 px-5 py-3 rounded-2xl text-sm transition-all relative group/item",
                          pathname === item.href 
                            ? "bg-secondary/10 text-secondary font-bold border border-secondary/20" 
                            : "hover:bg-white/[0.03] text-sidebar-text hover:text-white"
                        )}>
                          <item.icon size={16} className={cn(
                            "transition-all duration-500",
                            pathname === item.href ? "text-secondary scale-110" : "text-white/20 group-hover/item:text-secondary"
                          )} />
                          <span className="relative z-10">{item.label}</span>
                          {pathname === item.href && (
                            <motion.div 
                              layoutId="active-line"
                              className="absolute right-0 w-1 h-5 bg-secondary rounded-l-full"
                            />
                          )}
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Profile Footer */}
        <div className="p-6 mt-auto border-t border-white/5">
          <div className="bg-white/[0.03] p-4 rounded-3xl flex items-center gap-4 hover:bg-white/5 transition-all cursor-pointer group">
             <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary font-black group-hover:scale-110 transition-transform">
                S
             </div>
             <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-xs truncate">أدمن النظام</p>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">متصل الآن</span>
                </div>
             </div>
             <button className="text-white/20 hover:text-rose-500 transition-colors">
                <LogOut size={16} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
