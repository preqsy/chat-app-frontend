import { useState, useEffect } from "react";
import PeopleList from "./People";
import { useAddNewFriend, useListNewFriends } from "../hooks/useDashboard";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";

export default function FriendsList() {
  const { sendFriendRequest, data, loading, error } = useAddNewFriend();
  const {
    listUsers,
    loading: friendLoading,
    error: friendError,
  } = useListNewFriends();

  const [listNewUser, setListNewUser] = useState([]);
  const [notification, setNotification] = useState(null);
  const [addingFriendId, setAddingFriendId] = useState(null);

  useEffect(() => {
    setListNewUser(listUsers);
  }, [listUsers]);

  const addFriend = async (e, id) => {
    e.preventDefault();
    setAddingFriendId(id);
    
    try {
      await sendFriendRequest({
        variables: {
          receiver_id: id,
        },
      });
      
      setListNewUser((prevFriend) =>
        prevFriend.filter((request) => request.id !== id)
      );
      
      setNotification({
        message: "Friend request sent successfully!",
        type: "success",
      });
    } catch (error) {
      console.log("Error adding friend", error);
      setNotification({
        message: error.message || "Failed to send friend request",
        type: "error",
      });
    } finally {
      setAddingFriendId(null);
    }
  };

  if (friendLoading)
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (listNewUser.length === 0) {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="w-12 h-12 mx-auto bg-gray-700 lg:bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-400 lg:text-gray-600 font-medium">No new users to add</p>
          <p className="text-gray-500 text-sm mt-1">All available users are already your friends</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {listNewUser.map((friend) => (
        <div key={friend.id} className="relative">
          <PeopleList
            firstName={friend.firstName}
            lastName={friend.lastName}
            onClick={(e) => addFriend(e, friend.id)}
            buttonName={addingFriendId === friend.id ? "Sending..." : "Add Friend"}
            showButton={true}
          />
          {addingFriendId === friend.id && (
            <div className="absolute inset-0 bg-gray-900/50 lg:bg-white/50 rounded-xl flex items-center justify-center">
              <LoadingSpinner size="sm" />
            </div>
          )}
        </div>
      ))}

      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
