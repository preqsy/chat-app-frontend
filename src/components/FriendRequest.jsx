import { useState } from "react";
import PeopleList from "./People";
import {
  useAcceptFriendRequest,
  useListFriendRequest,
} from "../hooks/useDashboard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function FriendRequest() {
  const {
    acceptFriendRequest,
    data,
    loading: acceptFriendLoading,
    error: acceptFriendError,
  } = useAcceptFriendRequest();

  const {
    listFriendRequests,
    loading: friendRequestLoading,
    error: listRequestError,
  } = useListFriendRequest();

  const handleAcceptFriendRequest = async (e, id) => {
    e.preventDefault();
    try {
      const response = await acceptFriendRequest({
        variables: {
          sender_id: id,
        },
      });
      console.log("Response: ", response);
    } catch (error) {
      console.log("Error adding friend", error);
    }
  };

  if (acceptFriendLoading || friendRequestLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  console.log("These are the props", listFriendRequests);

  return (
    <>
      {listFriendRequests.map((friendRequest) => (
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
