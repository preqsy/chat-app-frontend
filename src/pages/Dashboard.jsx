import { useGetCurrentUser } from "../hooks/useDashboard";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import SearchBox from "../components/Search";
import Friends from "../components/Friends";
import RecentChats from "../components/RecentChats";
import FriendList from "../components/AddFriends";
import FriendRequest from "../components/FriendRequest";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { useState } from "react";
import Ellipis_1 from "../assets/Ellipse_1.svg";

export default function Dashboard() {
  const { currentUser, loading: userLoading, error } = useGetCurrentUser();
  const [activeTab, setActiveTab] = useState("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false); // Default closed on mobile
  const [showChatList, setShowChatList] = useState(true); // For mobile navigation

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    setNotification({
      message: "Failed to load user data",
      type: "error",
    });
    return <Navigate to="/login" />;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  localStorage.setItem("user", JSON.stringify(currentUser));

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setShowChatList(false); // Hide chat list on mobile when chat is opened
  };

  const handleBackToChatList = () => {
    setSelectedFriend(null);
    setShowChatList(true); // Show chat list when back button is pressed
  };

  return (
    <main className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-indigo-600 rounded-xl text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        onClick={() => setShowSidebar(!showSidebar)}
        aria-label="Toggle sidebar"
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
            d={showSidebar ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar with overlay on mobile */}
      <div
        className={`${showSidebar ? "block" : "hidden"} lg:block z-40 relative`}
      >
        {/* Mobile overlay */}
        {showSidebar && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setShowSidebar(false)}
          />
        )}
        <div className="relative z-40">
          <SideBar />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-0 lg:gap-6 h-screen overflow-hidden lg:p-6">
        {/* Chat List Panel - responsive visibility */}
        <div
          className={`${
            showChatList ? "flex" : "hidden"
          } lg:flex w-full lg:w-1/3 flex-col bg-gray-800 lg:bg-transparent lg:rounded-2xl overflow-hidden`}
        >
          {/* Mobile header for chat list */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
            <h1 className="text-xl font-semibold text-white">Messages</h1>
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4H9L3 7V9H21ZM3 10V12H21V10H3ZM3 13V15H21V13H3ZM3 16V18H21V16H3ZM3 19V21H21V19H3Z" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-hidden">
            {/* Search Box */}
            <SearchBox
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-shrink-0"
            />

            {/* Tabs - improved mobile layout */}
            <div className="flex-shrink-0">
              <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
                {["chats", "friends", "new friends", "friend requests"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl capitalize transition-all duration-200 whitespace-nowrap text-sm font-medium ${
                        activeTab === tab
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Content - scrollable */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {activeTab === "new friends" && <FriendList />}
              {activeTab === "friend requests" && <FriendRequest />}

              {activeTab === "friends" && (
                <div className="space-y-3">
                  <h2 className="font-semibold text-white text-lg">Friends</h2>
                  <Friends setSelectedFriend={handleFriendSelect} />
                </div>
              )}

              {activeTab === "chats" && (
                <div className="space-y-3">
                  <h2 className="font-semibold text-white text-lg">
                    Recent Chats
                  </h2>
                  <RecentChats
                    className="hover:bg-gray-700 transition-colors rounded-xl p-3"
                    setSelectedFriend={handleFriendSelect}
                    sender={currentUser}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Section - responsive visibility */}
        <div
          className={`${
            !showChatList || selectedFriend ? "flex" : "hidden"
          } lg:flex flex-1 flex-col bg-gray-800 lg:bg-white lg:rounded-2xl shadow-lg overflow-hidden`}
        >
          {selectedFriend ? (
            <>
              {/* Mobile back button */}
              <div className="lg:hidden flex items-center p-4 bg-gray-800 border-b border-gray-700">
                <button
                  onClick={handleBackToChatList}
                  className="mr-3 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                  aria-label="Back to chat list"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-white font-medium">Back</span>
              </div>

              <div className="flex-1 flex flex-col">
                <Chat sender={currentUser} receiver={selectedFriend} />
              </div>
            </>
          ) : (
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-800 rounded-2xl">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-lg font-medium">
                    Select a chat to start messaging
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Choose from your existing conversations or start a new one
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </main>
  );
}
