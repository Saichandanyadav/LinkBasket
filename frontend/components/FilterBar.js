"use client";

const categories = ["All", "Tech", "AI", "Design", "Learning"];

export default function FilterBar({ selected, setSelected }) {
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="flex flex-wrap sm:flex-nowrap gap-2 bg-gray-100 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              selected === cat
                ? "bg-white text-indigo-600 shadow"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}