import { useChat } from "../hooks/useChat";
import Ellipis_1 from "../assets/Ellipse_1.svg";
import { formatTimestamp } from "../utils";

export default function RecentChats({ onClick, className = "", sender }) {
  const { messages: newMessages } = useChat(sender);
  const messageAction = 1;
  return (
    <div>
      {newMessages.map((newMessage) => (
        <div
          className={`flex items-center gap-3 cursor-pointer ${className} group`}
          onClick={() => onClick(newMessage.sender_id)}
          key={newMessage.id}
        >
          <div className="relative">
            <img
              src={Ellipis_1}
              alt={newMessage.receiver.firstName}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-white group-hover:text-black truncate">
                {newMessage.sender.firstName + " " + newMessage.sender.lastName}
              </h3>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatTimestamp(newMessage.createdAt)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 truncate group-hover:text-black">
                {newMessage.content}
              </p>
              {messageAction > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-white bg-indigo-600 rounded-full">
                  {1}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
