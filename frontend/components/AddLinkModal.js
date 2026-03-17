"use client";
import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { X, Link as LinkIcon, AlignLeft, Type } from "lucide-react";

const categories = ["Tech", "AI", "Design", "Learning"];

export default function AddLinkModal({ open, setOpen, refresh, editData }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    category: categories[0]
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        url: editData.url || "",
        category: editData.category || categories[0]
      });
    } else {
      setForm({
        title: "",
        description: "",
        url: "",
        category: categories[0]
      });
    }
  }, [editData, open]);

  const submit = async () => {
    if (!form.title || !form.url) return toast.error("Title and URL are required");
    
    setLoading(true);
    try {
      if (editData) {
        await axios.put(`/links/${editData._id}`, form);
        toast.success("Link updated successfully");
      } else {
        await axios.post("/links", form);
        toast.success("New link added to basket");
      }
      setOpen(false);
      refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 z-[100] animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-6 relative shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        <div className="sticky top-0 bg-white pb-2 flex justify-between items-center z-10">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            {editData ? "Edit Link" : "Add New Link"}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              placeholder="Give it a name..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-gray-900 font-medium text-sm sm:text-base"
            />
          </div>

          <div className="relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              placeholder="Paste the URL here..."
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-gray-900 font-medium text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-wrap gap-2 py-1">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setForm({ ...form, category: c })}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  form.category === c
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative">
            <AlignLeft className="absolute left-4 top-4 text-gray-400" size={18} />
            <textarea
              placeholder="What's this about? (Optional)"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-gray-900 font-medium resize-none text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white pt-2">
          <button
            disabled={loading}
            onClick={submit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-4 sm:py-5 rounded-2xl sm:rounded-[1.5rem] font-black text-base sm:text-lg transition-all active:scale-[0.98] shadow-xl shadow-indigo-100"
          >
            {loading ? "Processing..." : editData ? "Update Changes" : "Save to Basket"}
          </button>
        </div>
      </div>
    </div>
  );
}