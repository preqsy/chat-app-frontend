import { useState, useEffect } from "react";
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

  const [listNewUser, setListNewUser] = useState([]);

  useEffect(() => {
    setListNewUser(listUsers);
  }, [listUsers]);

  const addFriend = async (e, id) => {
    e.preventDefault();
    try {
      await sendFriendRequest({
        variables: {
          receiver_id: id,
        },
      });
      setListNewUser((prevFriend) =>
        prevFriend.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.log("Error adding friend", error);
    }
  };

  if (loading || friendLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  return (
    <>
      {listNewUser.map((friend) => (
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
