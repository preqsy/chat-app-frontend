import { useGetCurrentUser } from "../hooks/useDashboard";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import SearchBox from "../components/Search";
import GroupPeople from "../components/GroupPeople";
import FriendList from "../components/FriendList";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { useState } from "react";
import Ellipis_1 from "../assets/Ellipse_1.svg";

export default function Dashboard() {
  const { currentUser, loading, error } = useGetCurrentUser();
  const [activeTab, setActiveTab] = useState("chats"); // 'chats', 'friends', 'groups'
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  if (loading) {
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

  const peopleData = [
    {
      name: "Obinna",
      messagePreview: "Hahaha",
      messageTime: "Today, 9:52pm",
      messageAction: 4,
      picture: Ellipis_1,
    },
    {
      name: "Crazy bro",
      messagePreview: "How far you play that game??",
      messageTime: "Today, 9:52pm",
      messageAction: 8,
      picture: Ellipis_1,
    },
    {
      name: "Young Wolf",
      messagePreview: "He's Cheating on me 😭",
      messageTime: "Today, 9:52pm",
      messageAction: 1,
      picture: Ellipis_1,
    },
    {
      name: "Prehqsy",
      messagePreview: "How far you play that game??",
      messageTime: "Today, 9:52pm",
      messageAction: 8,
      picture: Ellipis_1,
    },
    {
      name: "Mountain",
      messagePreview: "He's Cheating on me 😭",
      messageTime: "Today, 9:52pm",
      messageAction: 1,
      picture: Ellipis_1,
    },
  ];

  const newFriendsData = [
    {
      firstName: "Obinna",
      lastName: "Ohanyere",
    },
    {
      firstName: "Jadon",
      lastName: "Sancho",
    },
    {
      firstName: "Enzo",
      lastName: "Fernandez",
    },
  ];

  const filteredPeople = peopleData.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex h-screen bg-gray-100">
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
              {["chats", "friends", "new friends"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content based on active tab */}
            <div className="space-y-4 overflow-y-auto flex-1">
              {activeTab === "new friends" &&
                newFriendsData.map((newFriend) => (
                  <FriendList key={newFriend.firstName} {...newFriend} />
                ))}

              {activeTab === "friends" && (
                <div className="space-y-2">
                  <h2 className="font-semibold text-gray-900">Friends</h2>
                  {filteredPeople.map((person) => (
                    <GroupPeople
                      key={person.name}
                      {...person}
                      className="hover:bg-gray-50 transition-colors rounded-xl p-2"
                    />
                  ))}
                </div>
              )}

              {activeTab === "chats" && (
                <>
                  <div className="space-y-2">
                    <h2 className="font-semibold text-gray-900">
                      Recent Chats
                    </h2>
                    {filteredPeople.slice(0, 3).map((person) => (
                      <GroupPeople
                        key={person.name}
                        {...person}
                        className="hover:bg-gray-50 transition-colors rounded-xl p-2"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden">
            <Chat
              username={currentUser.username}
              currentUserId={currentUser.id}
            />
          </div>
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
