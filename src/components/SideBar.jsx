import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import bx_bell from "../assets/bx_bell.svg";
import ci_settings from "../assets/ci_settings.svg";
import codicon_home from "../assets/codicon_home.svg";
import Ellipse from "../assets/Ellipse.svg";
import logout from "../assets/logout.svg";
import Vector from "../assets/Vector.svg";

export default function SideBar() {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigationItems = [
    {
      path: "/",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Home",
    },
    // {
    //   path: "#",
    //   icon: (
    //     <svg
    //       className="w-6 h-6"
    //       fill="none"
    //       stroke="currentColor"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
    //       />
    //     </svg>
    //   ),
    //   label: "Messages",
    // },
    // {
    //   path: "#",
    //   icon: (
    //     <svg
    //       classNamess="w-6 h-6"
    //       fill="none"
    //       stroke="currentColor"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    //       />
    //     </svg>
    //   ),
    //   label: "Notifications",
    // },
  ];

  return (
    <div className="h-screen bg-black border-r border-gray-200 flex flex-col items-center py-6">
      {/* Logo */}
      <Link to="/" className="mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">B</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-4">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-3 rounded-xl transition-colors relative group ${
              location.pathname === item.path
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            {item.icon}
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 hover:border-indigo-600 transition-colors "
        >
          <img
            src={Vector}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>

        {isSettingsOpen && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-indigo-600 rounded-lg shadow-lg py-1 border border-gray-200">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm t hover:bg-gray-100 text-black"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
