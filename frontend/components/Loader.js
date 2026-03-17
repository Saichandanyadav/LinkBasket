"use client";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-64 w-full space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-12 h-12 bg-indigo-500/20 rounded-full animate-ping" />
        <div className="relative w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-indigo-600/50 font-black text-xs uppercase tracking-widest animate-pulse">
        Loading Basket
      </p>
    </div>
  );
}