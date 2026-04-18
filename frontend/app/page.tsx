"use client";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "../lib/axios";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import LinkCard from "../components/LinkCard";
import AddLinkModal from "../components/AddLinkModal";
import ConfirmModal from "../components/ConfirmModal";
import Loader from "../components/Loader";
import { toast, Toaster } from "react-hot-toast";

interface LinkType {
  _id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<LinkType | null>(null);
  const [deleteItem, setDeleteItem] = useState<LinkType | null>(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const res = await axios.get<LinkType[]>(
        `/links?search=${search}&category=${category === "All" ? "" : category}`
      );
      setLinks(res.data);
    } catch {
      toast.error("API connection failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async () => {
    if (!deleteItem) return;
    try {
      await axios.delete(`/links/${deleteItem._id}`);
      toast.success("Link removed");
      setDeleteItem(null);
      fetchLinks();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    if (session) fetchLinks();
  }, [search, category, session]);

  if (status === "loading") return <Loader />;

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-white">
        <h1 className="text-5xl sm:text-6xl font-black text-indigo-600 mb-3">LinkBasket</h1>
        <p className="text-gray-500 text-base sm:text-lg mb-6">Your digital library, simplified.</p>
        <button
          onClick={() => signIn("google")}
          className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg active:scale-95"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="bottom-center" />
      <Navbar
        search={search}
        setSearch={setSearch}
        onLogoutClick={() => setLogoutConfirm(true)}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <FilterBar selected={category} setSelected={setCategory} />

        {loading ? (
          <div className="py-16">
            <Loader />
          </div>
        ) : links.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              No links found
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Start by adding your first link
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {links.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
                onDelete={() => setDeleteItem(link)}
                onEdit={(l: LinkType) => {
                  setEditData(l);
                  setOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => {
          setEditData(null);
          setOpen(true);
        }}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center text-3xl active:scale-90"
      >
        +
      </button>

      <AddLinkModal open={open} setOpen={setOpen} refresh={fetchLinks} editData={editData} />

      <ConfirmModal
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={deleteLink}
        title="Delete Link?"
        message={`Are you sure you want to remove "${deleteItem?.title}"?`}
        confirmText="Delete"
        type="danger"
      />

      <ConfirmModal
        open={logoutConfirm}
        onClose={() => setLogoutConfirm(false)}
        onConfirm={() => signOut()}
        title="Ready to leave?"
        message="Log out of your account to end your session."
        confirmText="Logout"
        type="primary"
      />
    </div>
  );
}