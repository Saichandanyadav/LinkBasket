"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "react-hot-toast";

export function CopyButton({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 md:py-6 rounded-2xl md:rounded-[2.5rem] font-bold transition-all active:scale-95 w-full sm:w-auto"
    >
      {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
      <span>{copied ? "Copied" : "Copy Link"}</span>
    </button>
  );
}