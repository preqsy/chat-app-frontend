import { useState } from "react";
import PeopleList from "./People";
import { useAddNewFriend, useListNewFriends } from "../hooks/useDashboard";
import LoadingSpinner from "./LoadingSpinner";

export default function FriendsList() {
  const { sendFriendRequest, data, loading, error } = useAddNewFriend();
  const {
    listUsers,
    loading: friendLoading,
    error: friendError,
  } = useListNewFriends();

  const addFriend = async (e, id) => {
    e.preventDefault();
    try {
      const response = await sendFriendRequest({
        variables: {
          receiver_id: id,
        },
      });
      console.log("Response: ", response);
    } catch (error) {
      console.log("Error adding friend", error);
    }
  };
  const newFriendsData = listUsers || [];

  if (loading || friendLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  return (
    <>
      {newFriendsData.map((friend) => (
        <PeopleList
          key={friend.id}
          firstName={friend.firstName}
          lastName={friend.lastName}
          onClick={(e) => addFriend(e, friend.id)}
        />
      ))}
    </>
  );
}
