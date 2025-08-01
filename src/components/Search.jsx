import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBox({ value, onChange, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search conversations..."
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 lg:py-4 rounded-xl lg:rounded-2xl border border-gray-600 lg:border-gray-300 bg-gray-700 lg:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white lg:text-gray-900 placeholder-gray-400 lg:placeholder-gray-500 transition-all duration-200 focus:bg-gray-600 lg:focus:bg-white"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 lg:text-gray-500 w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
