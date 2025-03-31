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

  const [activeTab, setActiveTab] = useState("chats"); // 'chats', 'friends', 'groups'
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

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
      <SideBar />
      <div className="flex-1 flex flex-col p-6 h-screen">
        <div className="flex gap-6 h-full">
          <div className="w-1/3 space-y-6 h-full flex flex-col">
            <SearchBox
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-6"
            />

            {/* Tabs */}
            <div className="flex gap-2 mb-6 cursor-pointer">
              {["chats", "friends", "new friends", "friend requests"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-2 rounded-lg capitalize transition-colors cursor-pointer ${
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

            {/* Content based on active tab */}
            <div className="space-y-4 overflow-y-auto flex-1">
              {activeTab === "new friends" && <FriendList />}
              {activeTab === "friend requests" && <FriendRequest />}

              {activeTab === "friends" && (
                <div className="space-y-2">
                  <h2 className="font-semibold">Friends</h2>
                  <Friends setSelectedFriend={setSelectedFriend} />
                </div>
              )}

              {activeTab === "chats" && (
                <>
                  <div className="space-y-2">
                    <h2 className="font-semibold text-white">Recent Chats</h2>
                    <RecentChats
                      // key={person.name}
                      // {...person}
                      className="hover:bg-gray-50 transition-colors rounded-xl p-2"
                      onClick={setSelectedFriend}
                      sender={currentUser}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chat Section */}
          {selectedFriend && (
            <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden">
              <Chat sender={currentUser} receiver={selectedFriend} />
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
