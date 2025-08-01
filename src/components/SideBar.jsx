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
          className="w-5 h-5 lg:w-6 lg:h-6"
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
  ];

  return (
    <div className="h-screen w-16 lg:w-20 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 lg:py-6 shadow-lg">
      {/* Logo */}
      <Link to="/" className="mb-6 lg:mb-8 group">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-lg">
          <span className="text-white font-bold text-lg lg:text-xl">W</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-3 lg:space-y-4">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative block p-3 lg:p-3 rounded-xl transition-all duration-200 group ${
              location.pathname === item.path
                ? "text-white bg-indigo-600 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            {item.icon}

            {/* Tooltip - only show on larger screens */}
            <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden lg:block">
              {item.label}
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </Link>
        ))}
      </nav>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-gray-600 hover:border-indigo-500 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-label="User menu"
        >
          <img
            src={Vector}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Settings Dropdown - improved mobile positioning */}
        {isSettingsOpen && (
          <>
            {/* Mobile backdrop */}
            <div
              className="lg:hidden fixed inset-0 z-40"
              onClick={() => setIsSettingsOpen(false)}
            />

            <div className="absolute bottom-full left-1/2 lg:left-full lg:bottom-0 transform -translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2 mb-2 lg:mb-0 lg:ml-3 w-48 bg-gray-800 rounded-xl shadow-xl py-2 border border-gray-700 z-50">
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="text-sm font-medium text-white">Account</p>
              </div>

              <Link
                to="/profile"
                className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setIsSettingsOpen(false)}
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>

              <Link
                to="/settings"
                className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setIsSettingsOpen(false)}
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </Link>

              <div className="border-t border-gray-700 mt-2 pt-2">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
