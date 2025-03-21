import { useState } from "react";
import PeopleList from "./People";
import { useAddNewFriend } from "../hooks/useDashboard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function FriendRequest(props) {
  const { sendFriendRequest, data, loading, error } = useAddNewFriend();

  const addFriend = async (e) => {
    e.preventDefault();
    try {
      const response = await sendFriendRequest({
        variables: {
          receiver_id: props.id,
        },
      });
      console.log("Response: ", response);
    } catch (error) {
      console.log("Error adding friend", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  console.log("These are the props", props);

  return (
    <>
      <PeopleList
        firstName={props.firstName}
        lastName={props.lastName}
        onClick={addFriend}
      />
    </>
  );
}
