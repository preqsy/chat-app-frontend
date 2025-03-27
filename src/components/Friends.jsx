import { useState } from "react";
import PeopleList from "./People";
import { useListFriends } from "../hooks/useDashboard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Friends({ setSelectedFriend }) {
  const { listFriends, data, loading, error } = useListFriends();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  // console.log("These are the props", listFriends);

  return (
    <>
      {listFriends.map((friend) => (
        <PeopleList
          key={friend.id}
          firstName={friend.firstName}
          lastName={friend.lastName}
          showButton={false}
          onClick={() => setSelectedFriend(friend)}
        />
      ))}
    </>
  );
}
