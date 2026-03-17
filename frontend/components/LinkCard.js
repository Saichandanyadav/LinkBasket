"use client";
import Link from "next/link";
import { MoreHorizontal, ExternalLink, Edit3, Trash2, Eye } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function LinkCard({ link, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="group p-6 rounded-[2rem] bg-white border border-gray-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50/50 transition-all duration-300 relative">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg">
          {link.category}
        </span>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-gray-900"
          >
            <MoreHorizontal size={20} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-2xl w-40 py-2 z-50 border border-gray-50 animate-in fade-in zoom-in-95 duration-150">
              <Link href={`/links/${link._id}`} className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Eye size={16} /> View
              </Link>
              <button
                onClick={() => { setOpen(false); onEdit(link); }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <Edit3 size={16} /> Edit
              </button>
              <div className="h-px bg-gray-50 my-1 mx-2" />
              <button
                onClick={() => { setOpen(false); onDelete(); }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <Link href={`/links/${link._id}`} className="block group-hover:translate-x-1 transition-transform">
        <h2 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">{link.title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {link.description}
        </p>
      </Link>

      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline"
      >
        Visit Site <ExternalLink size={14} />
      </a>
    </div>
  );
}