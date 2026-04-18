"use client";
import { Search, Menu, X, LogOut } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar({ search, setSearch, onLogoutClick }) {
  const { data: session } = useSession();
  const [menu, setMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const handleMobileX = () => {
    if (search) setSearch("");
    else setMobileSearch(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            LB
          </div>
          <span className="hidden sm:block font-semibold text-gray-800">
            LinkBasket
          </span>
        </div>

        <div className="hidden md:flex flex-1 max-w-lg mx-6 items-center bg-gray-100 rounded-xl px-3 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition">
          <Search size={18} className="text-gray-400" />
          <input
            className="ml-2 bg-transparent outline-none w-full text-sm"
            placeholder="Search links..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} className="ml-2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setMobileSearch(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <Search size={20} />
          </button>

          {session ? (
            <button
              onClick={onLogoutClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-xl text-sm transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              Login
            </button>
          )}

          <button onClick={() => setMenu(!menu)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileSearch && (
        <div className="absolute inset-0 bg-white flex items-center px-4">
          <Search size={18} className="text-gray-500" />
          <input
            autoFocus
            className="ml-2 flex-1 outline-none text-base"
            placeholder="Search links..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleMobileX} className="ml-2 text-gray-600">
            <X size={22} />
          </button>
        </div>
      )}

      {menu && (
        <div className="md:hidden border-t bg-white px-4 py-4 shadow-sm">
          {session ? (
            <button
              onClick={() => {
                setMenu(false);
                onLogoutClick();
              }}
              className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium"
            >
              Login with Google
            </button>
          )}
        </div>
      )}
    </nav>
  );
}