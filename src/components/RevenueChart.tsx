"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { salesData } from "../data/sales";

export default function RevenueChart() {
  // 1. Process the data for the chart
  // We want to group the sales by date and sum the amounts
  const chartData = useMemo(() => {
    const grouped = salesData.reduce((acc, sale) => {
      // If the date doesn't exist in our accumulator, create it
      if (!acc[sale.date]) {
        acc[sale.date] = 0;
      }
      // Add the sale amount to that date
      acc[sale.date] += sale.amount;
      return acc;
    }, {} as Record<string, number>);

    // Convert the object into an array for Recharts
    // Example: { "2026-10-20": 250, "2026-10-19": 570.50 }
    // Becomes: [ { date: "2026-10-19", revenue: 570.50 }, { date: "2026-10-20", revenue: 250 } ]
    return Object.keys(grouped)
      .map((date) => ({
        date,
        revenue: grouped[date],
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort oldest to newest
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold text-slate-800 mb-6">Revenue Over Time</h2>
      
      {/* ResponsiveContainer makes the chart adapt to the width of the screen */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: "#64748b", fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              tick={{ fill: "#64748b", fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#2563eb" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}