"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

//  1. We now have data for different time ranges
interface TrafficData {
  month: string;
  organic: number;
  paid: number;
}

interface DashboardData {
  chart: TrafficData[];
  stats: {
    revenue: string;
    users: string;
    conversion: string;
    session: string;
  };
}

const dataSets: Record<string, DashboardData> = {
  "1M": {
    chart: [
      { month: "Week 1", organic: 1200, paid: 400 },
      { month: "Week 2", organic: 1500, paid: 600 },
      { month: "Week 3", organic: 1100, paid: 500 },
      { month: "Week 4", organic: 1800, paid: 800 },
    ],
    stats: { revenue: "$12,450", users: "840", conversion: "2.1%", session: "3m 15s" },
  },
  "3M": {
    chart: [
      { month: "Month 1", organic: 3000, paid: 1200 },
      { month: "Month 2", organic: 4500, paid: 1800 },
      { month: "Month 3", organic: 3800, paid: 2100 },
    ],
    stats: { revenue: "$28,900", users: "1,200", conversion: "2.8%", session: "3m 45s" },
  },
  "6M": {
    chart: [
      { month: "Jan", organic: 4000, paid: 2400 },
      { month: "Feb", organic: 3000, paid: 1398 },
      { month: "Mar", organic: 2000, paid: 9800 },
      { month: "Apr", organic: 2780, paid: 3908 },
      { month: "May", organic: 1890, paid: 4800 },
      { month: "Jun", organic: 2390, paid: 3800 },
    ],
    stats: { revenue: "$45,231", users: "2,350", conversion: "3.24%", session: "4m 32s" },
  },
  "1Y": {
    chart: [
      { month: "Q1", organic: 12000, paid: 6000 },
      { month: "Q2", organic: 15000, paid: 8500 },
      { month: "Q3", organic: 11000, paid: 7200 },
      { month: "Q4", organic: 18000, paid: 9500 },
    ],
    stats: { revenue: "$98,400", users: "5,120", conversion: "4.1%", session: "5m 10s" },
  },
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6M");

  // Get the whole dataset (chart + stats) based on the selected time range
  const activeData = useMemo(() => {
    return dataSets[timeRange] || dataSets["6M"];
  }, [timeRange]);

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
        
        <div className="bg-slate-200 p-1 rounded-lg flex gap-1">
          {["1M", "3M", "6M", "1Y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                timeRange === range ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Use the dynamic data here instead of hardcoded strings */}
        <StatCard icon={<DollarSign size={24} />} label="Total Revenue" value={activeData.stats.revenue} trend="+20.1%" color="blue" />
        <StatCard icon={<Users size={24} />} label="Active Users" value={activeData.stats.users} trend="+15.5%" color="green" />
        <StatCard icon={<Activity size={24} />} label="Conversion Rate" value={activeData.stats.conversion} trend="-2.1%" color="red" />
        <StatCard icon={<TrendingUp size={24} />} label="Avg. Session" value={activeData.stats.session} trend="+4.8%" color="purple" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Traffic Sources</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {/*  Use activeData.chart instead of activeData */}
            <BarChart data={activeData.chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              {/* ... (keep the rest of the chart identical) ... */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                cursor={{ fill: "#f1f5f9" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar dataKey="organic" name="Organic Search" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="paid" name="Paid Ads" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color }: { icon: React.ReactNode, label: string, value: string, trend: string, color: "blue" | "green" | "red" | "purple" }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  };

  const isPositive = !trend.startsWith("-");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          {icon}
        </div>
        <span className={`text-sm font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );
}