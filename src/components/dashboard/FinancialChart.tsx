"use client";

import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const data = [
  { name: "يناير", income: 4000, expenses: 2400 },
  { name: "فبراير", income: 3000, expenses: 1398 },
  { name: "مارس", income: 2000, expenses: 9800 },
  { name: "أبريل", income: 2780, expenses: 3908 },
  { name: "مايو", income: 1890, expenses: 4800 },
  { name: "يونيو", income: 2390, expenses: 3800 },
];

export default function FinancialChart() {
  return (
    <div className="glass p-6 rounded-3xl h-[400px] border border-white/10">
      <h3 className="font-bold text-lg mb-6">الملخص المالي (6 أشهر)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#8892b0", fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#8892b0", fontSize: 12 }} 
          />
          <Tooltip 
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{ 
              backgroundColor: "#0A192F", 
              borderRadius: "16px", 
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff"
            }}
          />
          <Bar dataKey="income" radius={[10, 10, 0, 0]} fill="#D4AF37" />
          <Bar dataKey="expenses" radius={[10, 10, 0, 0]} fill="#112240" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
