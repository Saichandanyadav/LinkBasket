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
      <div className="h-screen flex flex-col justify-center items-center bg-white text-gray-900 p-6">
        <h1 className="text-7xl font-black mb-4 tracking-tighter text-indigo-600">LinkBasket</h1>
        <p className="text-xl text-gray-400 mb-8 font-medium">Your digital library, simplified.</p>
        <button
          onClick={() => signIn("google")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 transition-all hover:scale-105"
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
      <main className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar selected={category} setSelected={setCategory} />
        {loading ? (
          <div className="py-20"><Loader /></div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {links.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
                onDelete={() => setDeleteItem(link)}
                onEdit={(l: LinkType) => { setEditData(l); setOpen(true); }}
              />
            ))}
          </div>
        )}
      </main>
      <button
        onClick={() => { setEditData(null); setOpen(true); }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-300 flex items-center justify-center text-3xl hover:rotate-90 transition-transform active:scale-90"
      >
        +
      </button>
      <AddLinkModal
        open={open}
        setOpen={setOpen}
        refresh={fetchLinks}
        editData={editData}
      />
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