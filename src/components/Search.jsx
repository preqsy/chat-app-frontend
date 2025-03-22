import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBox({ value, onChange, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search conversations..."
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
