import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/links/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

const getHostname = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "resource";
  }
};

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl w-full max-w-sm">
          <p className="text-gray-900 font-bold text-xl">Access Denied</p>
          <Link href="/" className="text-indigo-600 font-medium mt-4 inline-block hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const { id } = await params;
  const link = await getData(id);

  if (!link) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <p className="text-gray-400 text-lg mb-4 font-medium">Link not found</p>
        <Link href="/" className="bg-gray-100 px-8 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-indigo-100">
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50 flex gap-2">
        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md border border-gray-100 p-3 md:px-5 md:py-2.5 rounded-2xl font-bold text-sm shadow-xl shadow-gray-200/50 hover:bg-gray-50 hover:-translate-x-1 transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:text-indigo-600 transition-colors" />
          <span className="hidden md:inline">Back</span>
        </Link>
      </div>

      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.04] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
        </div>

        <div className="w-full max-w-4xl text-center space-y-6 md:space-y-10 relative z-10">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100">
              {link.category}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[0.9] text-gray-900 break-words">
              {link.title}
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium px-4">
            {link.description}
          </p>

          <div className="pt-6 md:pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gray-900 hover:bg-indigo-600 text-white text-lg md:text-xl font-black px-10 py-4 md:px-16 md:py-6 rounded-2xl md:rounded-[2.5rem] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gray-200 hover:shadow-indigo-200 w-full sm:w-auto justify-center"
            >
              Open Resource
              <ExternalLink size={20} className="md:w-6 md:h-6" />
            </a>
            
            <CopyButton url={link.url} />
          </div>

          <div className="pt-8 md:pt-16 flex justify-center items-center gap-4 text-gray-200">
            <div className="h-px w-8 md:w-16 bg-current" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">
              {getHostname(link.url)}
            </span>
            <div className="h-px w-8 md:w-16 bg-current" />
          </div>
        </div>
      </main>
    </div>
  );
}