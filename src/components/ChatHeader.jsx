import Ellipis_1 from "../assets/Ellipse_1.svg";

export default function ChatHeader({
  user,
  onVideoCall,
  onVoiceCall,
  onMoreOptions,
}) {
  return (
    <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-700 lg:border-gray-200 bg-gray-800 lg:bg-white">
      <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <img
            src={Ellipis_1}
            alt={`${user.name} avatar`}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover ring-2 ring-gray-600 lg:ring-gray-200"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 rounded-full border-2 border-gray-800 lg:border-white ${
              user.status === "online" ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white lg:text-gray-900 text-base lg:text-lg truncate">
            {user.name}
          </h3>
          <p className="text-xs lg:text-sm text-gray-400 lg:text-gray-500 truncate">
            {user.status === "online" ? (
              <span className="text-green-500 font-medium">● Online</span>
            ) : user.lastSeen ? (
              `Last seen ${user.lastSeen}`
            ) : (
              "Offline"
            )}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
        <button
          onClick={onVoiceCall}
          className="p-2 lg:p-3 hover:bg-gray-700 lg:hover:bg-gray-100 rounded-full text-gray-400 lg:text-gray-600 transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
          title="Voice Call"
          aria-label="Start voice call"
        >
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>

        <button
          onClick={onVideoCall}
          className="p-2 lg:p-3 hover:bg-gray-700 lg:hover:bg-gray-100 rounded-full text-gray-400 lg:text-gray-600 transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
          title="Video Call"
          aria-label="Start video call"
        >
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
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>

        <button
          onClick={onMoreOptions}
          className="p-2 lg:p-3 hover:bg-gray-700 lg:hover:bg-gray-100 rounded-full text-gray-400 lg:text-gray-600 transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
          title="More Options"
          aria-label="More options"
        >
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
