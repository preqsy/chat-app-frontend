import { useState } from "react";
import Ellipis_1 from "../assets/Ellipse_1.svg";
import { useAddNewFriend } from "../hooks/useDashboard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function FriendsList(props) {
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
    <div className="mb-8">
      <div className="flex gap-2 ">
        <img src={Ellipis_1} alt="" />
        <div className="flex flex-col gap-2">
          <p className="font-poppins">
            {props.firstName} {props.lastName}
          </p>

          <div className="flex gap-2 items-center">
            <button
              className="p-2 bg-indigo-600 text-white rounded w-30 cursor-pointer"
              onClick={addFriend}
            >
              Add Friend
            </button>
            <button className="p-2 bg-white text-indigo-600 rounded w-30 cursor-pointer">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
