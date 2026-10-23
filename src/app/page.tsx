"use client";

import SalesTable from "@/components/SalesTable";
import RevenueChart from "@/components/RevenueChart";

export default function Dashboard() {
  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500 hidden sm:block">Welcome back, User</span>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            U
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-slate-400">
            <p>Another Widget Here</p>
          </div>
        </div>
        
        <SalesTable />
      </div>
    </div>
  );
}