"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Box,
  ShoppingCart,
  Settings,
  Image as ImageIcon,
  Menu,
  Square,
} from "lucide-react"; // Icons ke liye npm install lucide-react karein

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    {
      name: "Categories",
      icon: <Layers size={20} />,
      path: "/admin/categories",
    },
    { name: "Navbar Categories", icon: <Square size={20} />, path: "/admin/navbar-categories" }, 
    { name: "Subcategories", icon: <Box size={20} />, path: "/admin/subcategories" },
    { name: "Products", icon: <Box size={20} />, path: "/admin/products" },
    { name: "Media Kit", icon: <ImageIcon size={20} />, path: "/admin/media" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/orders" },
    { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="p-6">
          <h2 className="text-white text-xl font-black uppercase tracking-tighter">
            Sire <span className="text-orange-500">Admin</span>
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-900/20"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span
                  className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-orange-400"}`}
                >
                  {item.icon}
                </span>
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 transition-colors">
            <span className="text-sm font-bold uppercase tracking-widest">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 text-slate-500">
            <Menu size={20} className="cursor-pointer lg:hidden" />
            <span className="text-sm font-medium">Welcome back, Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <section className="flex-1 overflow-y-auto bg-slate-50 p-8">
          {children}
        </section>
      </main>
    </div>
  );
}
