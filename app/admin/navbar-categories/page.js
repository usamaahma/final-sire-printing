"use client";
import { useState, useEffect } from "react";
import { Save, Loader2, CheckSquare, Square } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function NavbarCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedMap, setSelectedMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const catRes = await fetch("/api/categories");
        const catData = await catRes.json();
        setCategories(Array.isArray(catData) ? catData : catData.data || []);

        try {
          // Endpoint updated to match your folder name: navbarcategories
          const navRes = await fetch("/api/navbarcategories");
          if (navRes.ok) {
            const navData = await navRes.json();
            const initialMap = {};
            if (navData.success && Array.isArray(navData.data)) {
              navData.data.forEach((item, index) => {
                const catId = item.category?._id || item.category;
                if (catId) {
                  initialMap[catId] = {
                    selected: true,
                    customLabel: item.customLabel || "",
                    order: item.order !== undefined ? item.order : index,
                  };
                }
              });
            }
            setSelectedMap(initialMap);
          }
        } catch (navErr) {
          console.log(
            "Navbar categories API not found yet, skipping pre-selection.",
          );
        }
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Failed to load categories!");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleToggle = (catId) => {
    setSelectedMap((prev) => {
      const updated = { ...prev };
      if (updated[catId]?.selected) {
        delete updated[catId];
      } else {
        const nextOrder = Object.keys(updated).length;
        updated[catId] = { selected: true, customLabel: "", order: nextOrder };
      }
      return updated;
    });
  };

  const handleChange = (catId, field, value) => {
    setSelectedMap((prev) => ({
      ...prev,
      [catId]: {
        ...prev[catId],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const tId = toast.loading("Saving Navbar Categories...");

    try {
      const items = Object.keys(selectedMap).map((catId, index) => ({
        categoryId: catId,
        customLabel: selectedMap[catId].customLabel || "",
        order:
          selectedMap[catId].order !== undefined
            ? Number(selectedMap[catId].order)
            : index,
      }));

      // Endpoint updated to match your folder name: navbarcategories
      const res = await fetch("/api/navbarcategories/admin/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Navbar Categories Updated!", { id: tId });
      } else {
        toast.error(data.message || "Failed to update navbar.", { id: tId });
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Network Error!", { id: tId });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4">
      <Toaster position="top-right" />

      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Navbar Categories Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Select which categories should appear on your website navbar and
            arrange their order.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 bg-slate-50 px-6 py-4 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500 items-center">
          <div className="col-span-5">Category Name</div>
          <div className="col-span-4">Custom Navbar Label</div>
          <div className="col-span-2">Display Order</div>
          <div className="col-span-1 text-right">Select</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-100">
          {categories.map((cat) => {
            const isSelected = !!selectedMap[cat._id]?.selected;
            return (
              <div
                key={cat._id}
                className={`grid grid-cols-12 gap-4 items-center px-6 py-4 transition-colors ${
                  isSelected ? "bg-orange-50/40" : "hover:bg-slate-50/60"
                }`}
              >
                {/* Category Name */}
                <div className="col-span-5">
                  <p className="font-semibold text-slate-800 text-sm leading-snug">
                    {cat.title || cat.name}
                  </p>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    slug: {cat.slug}
                  </span>
                </div>

                {/* Custom Label Input */}
                <div className="col-span-4">
                  <input
                    type="text"
                    disabled={!isSelected}
                    placeholder={cat.title || cat.name}
                    value={selectedMap[cat._id]?.customLabel || ""}
                    onChange={(e) =>
                      handleChange(cat._id, "customLabel", e.target.value)
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-orange-500 disabled:opacity-40"
                  />
                </div>

                {/* Order Input */}
                <div className="col-span-2">
                  <input
                    type="number"
                    disabled={!isSelected}
                    value={selectedMap[cat._id]?.order ?? 0}
                    onChange={(e) =>
                      handleChange(cat._id, "order", e.target.value)
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-orange-500 disabled:opacity-40"
                  />
                </div>

                {/* Checkbox Toggle */}
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleToggle(cat._id)}
                    className="text-orange-500 hover:text-orange-600 transition-colors p-1"
                  >
                    {isSelected ? (
                      <CheckSquare size={22} />
                    ) : (
                      <Square size={22} className="text-slate-300" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
