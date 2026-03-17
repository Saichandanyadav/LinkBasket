"use client";
import { Search, Menu, X, LogOut } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar({ search, setSearch, onLogoutClick }) {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-4 h-16 flex items-center justify-between gap-4">
      <h1 className="text-2xl font-black text-indigo-600 shrink-0">
        LB
      </h1>

      <div className="hidden md:flex flex-1 max-w-md items-center bg-gray-100 rounded-xl px-4 py-2 group focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <Search size={18} className="text-gray-400" />
        <input
          className="ml-3 bg-transparent outline-none w-full text-sm"
          placeholder="Search your links..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="md:hidden p-2 text-gray-600"
        >
          <Search size={20} />
        </button>

        {session ? (
          <button
            onClick={onLogoutClick}
            className="hidden md:flex items-center gap-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-xl font-medium transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="hidden md:block bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold"
          >
            Login
          </button>
        )}

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {showMobileSearch && (
        <div className="absolute inset-0 bg-white flex items-center px-4 md:hidden">
          <Search size={18} className="text-indigo-600" />
          <input
            autoFocus
            className="ml-3 outline-none w-full text-lg"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setShowMobileSearch(false)}>
            <X size={24} />
          </button>
        </div>
      )}

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b p-4 space-y-4 md:hidden shadow-xl">
          {session ? (
            <button
              onClick={() => { setIsMenuOpen(false); onLogoutClick(); }}
              className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-bold"
            >
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold"
            >
              Login with Google
            </button>
          )}
        </div>
      )}
    </nav>
  );
}