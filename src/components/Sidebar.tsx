"use client";

import { useSidebar } from "@/context/SidebarContext";
import { Menu, Home, BarChart2, Settings } from "lucide-react";
import Link from "next/link"; 
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname(); // Gets the current URL path (e.g., "/analytics")

  const links = [
    { href: "/", icon: <Home size={20} />, text: "Dashboard" },
    { href: "/analytics", icon: <BarChart2 size={20} />, text: "Analytics" },
    { href: "/settings", icon: <Settings size={20} />, text: "Settings" },
  ];

  return (
    <aside
      className={`bg-slate-900 text-white transition-all duration-300 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        <span className={`font-bold text-xl truncate ${!isOpen && "hidden"}`}>
          🚀 SaaS App
        </span>
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-800 rounded-lg transition">
          <Menu size={24} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          // Check if this link matches the current URL
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="shrink-0">{link.icon}</div>
              <span
                className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  !isOpen && "opacity-0 w-0"
                }`}
              >
                {link.text}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}