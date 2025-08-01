import { useState } from "react";
import PeopleList from "./People";
import { useListFriends } from "../hooks/useDashboard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Friends({ setSelectedFriend }) {
  const { listFriends, data, loading, error } = useListFriends();

  if (loading)
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (listFriends.length === 0) {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="w-12 h-12 mx-auto bg-gray-700 lg:bg-gray-300 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        </div>
        <div>
          <p className="text-gray-400 lg:text-gray-600 font-medium">
            No friends yet
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Add some friends to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {listFriends.map((friend) => (
        <PeopleList
          key={friend.id}
          firstName={friend.firstName}
          lastName={friend.lastName}
          showButton={false}
          onClick={() => setSelectedFriend(friend)}
        />
      ))}
    </div>
  );
}
