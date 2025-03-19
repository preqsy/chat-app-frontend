import { useState } from "react";
import Ellipis_1 from "../assets/Ellipse_1.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Search, UserPlus } from "lucide-react";

const friendsList = ["Alice", "Bob", "Charlie", "David"];

export default function FriendsList(props) {
  const [friends, setFriends] = useState(friendsList);
  const [newFriend, setNewFriend] = useState("");

  const addFriend = () => {
    if (newFriend.trim() && !friends.includes(newFriend)) {
      setFriends([...friends, newFriend.trim()]);
      setNewFriend("");
    }
  };

  return (
    <div className="mb-8">
      <div className="flex gap-2 ">
        <img src={Ellipis_1} alt="" />
        <div className="flex flex-col gap-2">
          <p className="font-poppins">
            {props.firstName} {props.lastName}
          </p>

          <div className="flex gap-2 items-center">
            <button className="p-2 bg-indigo-600 text-white rounded w-30 cursor-pointer">
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
