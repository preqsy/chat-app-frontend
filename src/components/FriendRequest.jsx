import { useState, useEffect } from "react";
import PeopleList from "./People";
import {
  useAcceptFriendRequest,
  useListFriendRequests,
} from "../hooks/useDashboard";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "./Toast";

export default function FriendRequest() {
  const {
    acceptFriendRequest,
    loading: acceptFriendLoading,
    error: acceptFriendError,
  } = useAcceptFriendRequest();

  const {
    listFriendRequests,
    loading: friendRequestLoading,
    error: listRequestError,
  } = useListFriendRequests();

  // Sync state with fetched data
  const [friendRequests, setFriendRequests] = useState([]);
  const [notification, setNotification] = useState(null);
  const [acceptingRequestId, setAcceptingRequestId] = useState(null);

  useEffect(() => {
    setFriendRequests(listFriendRequests);
  }, [listFriendRequests]);

  const handleAcceptFriendRequest = async (e, id) => {
    e.preventDefault();
    setAcceptingRequestId(id);
    
    try {
      await acceptFriendRequest({
        variables: {
          sender_id: id,
        },
      });

      // Remove accepted friend request from state
      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
      
      setNotification({
        message: "Friend request accepted!",
        type: "success",
      });
    } catch (error) {
      console.error("Error accepting friend request", error);
      setNotification({
        message: error.message || "Failed to accept friend request",
        type: "error",
      });
    } finally {
      setAcceptingRequestId(null);
    }
  };

  if (friendRequestLoading)
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (friendRequests.length === 0) {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="w-12 h-12 mx-auto bg-gray-700 lg:bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-400 lg:text-gray-600 font-medium">No friend requests</p>
          <p className="text-gray-500 text-sm mt-1">You're all caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {friendRequests.map((friendRequest) => (
        <div key={friendRequest.id} className="relative">
          <PeopleList
            firstName={friendRequest.firstName}
            lastName={friendRequest.lastName}
            onClick={(e) => handleAcceptFriendRequest(e, friendRequest.id)}
            buttonName={acceptingRequestId === friendRequest.id ? "Accepting..." : "Accept"}
            showButton={true}
          />
          {acceptingRequestId === friendRequest.id && (
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
