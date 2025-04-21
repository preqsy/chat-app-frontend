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
  const [showSidebar, setShowSidebar] = useState(true);

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
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

  return (
    <main className="flex h-screen bg-black">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 rounded-lg text-white"
        onClick={() => setShowSidebar(!showSidebar)}
      >
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar - hidden on mobile unless showSidebar is true */}
      <div className={`${showSidebar ? "block" : "hidden"} md:block z-40`}>
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col p-2 md:p-6 h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 h-full w-full">
          {/* Left panel - full width on mobile, 1/3 on desktop */}
          <div className="w-full md:w-1/3 space-y-2 md:space-y-6 h-1/2 md:h-full flex flex-col">
            <SearchBox
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2 md:mb-6"
            />

            {/* Tabs - scrollable on mobile */}
            <div className="flex gap-1 md:gap-2 mb-2 md:mb-6 overflow-x-auto pb-2">
              {["chats", "friends", "new friends", "friend requests"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-1 md:py-2 rounded-lg capitalize transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-indigo-400"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Content - scrollable */}
            <div className="space-y-2 md:space-y-4 overflow-y-auto flex-1">
              {activeTab === "new friends" && <FriendList />}
              {activeTab === "friend requests" && <FriendRequest />}

              {activeTab === "friends" && (
                <div className="space-y-1 md:space-y-2">
                  <h2 className="font-semibold text-white">Friends</h2>
                  <Friends setSelectedFriend={setSelectedFriend} />
                </div>
              )}

              {activeTab === "chats" && (
                <>
                  <div className="space-y-1 md:space-y-2">
                    <h2 className="font-semibold text-white">Recent Chats</h2>
                    <RecentChats
                      className="hover:bg-gray-50 transition-colors rounded-xl p-2"
                      setSelectedFriend={setSelectedFriend}
                      sender={currentUser}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chat Section - hidden on mobile when no friend selected */}
          {selectedFriend ? (
            <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden h-1/2 md:h-full">
              <Chat sender={currentUser} receiver={selectedFriend} />
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-900 rounded-2xl">
              <p className="text-gray-500">Select a chat to start messaging</p>
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
