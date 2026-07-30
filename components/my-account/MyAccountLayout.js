"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyAccountLayout({ children, activeTab, setActiveTab }) {
  const [user, setUser] = useState({ name: "Loading...", email: "Loading..." });
  const router = useRouter(); // Router hook

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login"); // Logout hone ke baad login page par bhej do
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user data...");
        const res = await fetch("/api/auth/me");

        // Response check karo
        console.log("Response status:", res.status);

        const data = await res.json();
        console.log("Fetched data:", data); // Yahan pura response object dikhega

        if (data.success) {
          setUser(data.user);
          console.log("User state set successfully");
        } else {
          console.error("API returned success: false");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchUser();
  }, []);

  const menuItems = [
    "Profile",
    "Approved Designs",
    "Order History",
    "Invoices",
    "Sample Quote",
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f4f4] p-6 font-sans mt-12">
      <aside className="w-[300px] bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-fit">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-md">
            {user.name && user.name !== "Loading..."
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>
          {/* Dynamic Name and Email */}
          <h2 className="mt-4 font-bold text-xl text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left p-4 rounded-xl flex items-center font-medium transition-all ${
                activeTab === item
                  ? "bg-[#ffa015] text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 ml-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-extrabold text-black mb-8 border-b pb-4">
          {activeTab}
        </h1>
        {children}
      </main>
    </div>
  );
}
