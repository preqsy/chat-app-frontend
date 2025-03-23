export default function ChatHeader({
  user,
  onVideoCall,
  onVoiceCall,
  onMoreOptions,
}) {
  console.log("This is the chatheader user", user);
  return (
    <div className="flex items-center justify-between p-4 border-b border-indigo-600">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={user.avatar}
            // alt={user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              user.status === "online" ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        </div>

        <div>
          <p className="font-medium text-white">{user.name}</p>
          <p className="text-sm text-gray-500">
            {user.status === "online" ? (
              <span className="text-green-500">Online</span>
            ) : user.lastSeen ? (
              `Last seen ${user.lastSeen}`
            ) : (
              "Offline"
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onVoiceCall}
          className="p-2 hover:bg-indigo-400 rounded-full text-gray-500 transition-colors bg-white cursor-pointer"
          title="Voice Call"
        >
          <svg
            className="w-5 h-5"
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
          className="p-2 hover:bg-indigo-400 rounded-full text-gray-500 transition-colors bg-white cursor-pointer"
          title="Video Call"
        >
          <svg
            className="w-5 h-5"
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
          className="p-2 hover:bg-indigo-400 rounded-full text-gray-500 transition-colors bg-white cursor-pointer"
          title="More Options"
        >
          <svg
            className="w-5 h-5"
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
