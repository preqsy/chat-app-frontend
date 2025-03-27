import { useState, useEffect } from "react";
import PeopleList from "./People";
import {
  useAcceptFriendRequest,
  useListFriendRequests,
} from "../hooks/useDashboard";
import LoadingSpinner from "../components/LoadingSpinner";

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

  useEffect(() => {
    setFriendRequests(listFriendRequests);
  }, [listFriendRequests]);

  const handleAcceptFriendRequest = async (e, id) => {
    e.preventDefault();
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
    } catch (error) {
      console.error("Error adding friend", error);
    }
  };

  if (acceptFriendLoading || friendRequestLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );

  return (
    <>
      {friendRequests.map((friendRequest) => (
        <PeopleList
          key={friendRequest.id}
          firstName={friendRequest.firstName}
          lastName={friendRequest.lastName}
          onClick={(e) => handleAcceptFriendRequest(e, friendRequest.id)}
          buttonName="Add Friend"
        />
      ))}
    </>
  );
}
