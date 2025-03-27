import { useState } from "react";
import Ellipis_1 from "../assets/Ellipse_1.svg";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Notifications() {
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane", lastName: "Smith" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const acceptRequest = (requestId) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  const declineRequest = (requestId) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">Error loading friend requests</p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Friend Requests</h2>
        <div className="space-y-4">
          {friendRequests.length === 0 ? (
            <p className="text-gray-500 text-center">No new friend requests</p>
          ) : (
            friendRequests.map((request) => (
              <div
                key={request.id}
                className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm border"
              >
                <img
                  src={Ellipis_1}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="font-poppins font-medium text-lg">
                    {request.firstName} {request.lastName}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      onClick={() => acceptRequest(request.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      onClick={() => declineRequest(request.id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
