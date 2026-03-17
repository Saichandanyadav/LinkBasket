"use client";

const categories = ["All", "Tech", "AI", "Design", "Learning"];

export default function FilterBar({ selected, setSelected }) {
  return (
    <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar items-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`px-6 py-2 rounded-2xl whitespace-nowrap font-bold transition-all duration-200 active:scale-95 ${
            selected === cat
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}