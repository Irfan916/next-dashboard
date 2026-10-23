"use client";

import { salesData } from "../data/sales";
import { useSalesTable } from "../hooks/useSalesTable";
import { ArrowUpDown, Search } from "lucide-react";

export default function SalesTable() {
    const { state, dispatch, filteredData } = useSalesTable(salesData);

    // Calculate total revenue of the FILTERED data
    const totalRevenue = filteredData.reduce((sum, sale) => sum + sale.amount, 0);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header controls */}
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 " size={18} />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={state.search}
                        onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                    />
                </div>

                <select
                    value={state.statusFilter}
                    onChange={(e) => dispatch({ type: "SET_STATUS", payload: e.target.value as "all" | "completed" | "pending" | "failed" })}
                    className="px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
                >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                </select>
            </div>

            {/* Table */}
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-4 font-semibold text-slate-600 cursor-pointer hover:bg-slate-100" onClick={() => dispatch({ type: "SET_SORT", payload: "customer" })}>
                            <div className="flex items-center gap-2">Customer <ArrowUpDown size={14} /></div>
                        </th>
                        <th className="p-4 font-semibold text-slate-600 cursor-pointer hover:bg-slate-100" onClick={() => dispatch({ type: "SET_SORT", payload: "amount" })}>
                            <div className="flex items-center gap-2">Amount <ArrowUpDown size={14} /></div>
                        </th>
                        <th className="p-4 font-semibold text-slate-600 cursor-pointer hover:bg-slate-100" onClick={() => dispatch({ type: "SET_SORT", payload: "status" })}>
                            <div className="flex items-center gap-2">Status <ArrowUpDown size={14} /></div>
                        </th>
                        <th className="p-4 font-semibold text-slate-600">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-500">No sales found.</td>
                        </tr>
                    ) : (
                        filteredData.map((sale) => (
                            <tr key={sale.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                                <td className="p-4 font-medium text-slate-800">{sale.customer}</td>
                                <td className="p-4 font-bold text-slate-900">${sale.amount.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${sale.status === "completed" ? "bg-green-100 text-green-700" :
                                            sale.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                                "bg-red-100 text-red-700"
                                        }`}>
                                        {sale.status}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-400">{sale.date}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot className="bg-slate-50 border-t border-slate-200">
                    <tr>
                        <td className="p-4 font-bold text-slate-800">Total Revenue (Filtered)</td>
                        <td className="p-4 font-bold text-blue-600">${totalRevenue.toFixed(2)}</td>
                        <td colSpan={2}></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}