import { useState } from "react";

import Ellipis_1 from "../assets/Ellipse_1.svg";
import phone from "../assets/phone.svg";
import video from "../assets/video.svg";
import option from "../assets/option.svg";
import paperClip from "../assets/paper-clip.svg";
import emoji from "../assets/emoji-face.svg";
import camera from "../assets/camera.svg";
import send from "../assets/send-3.svg";
import MessageBubble from "./MessageBubble";

export default function Chat(props) {
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello ", sender: "me" },
    { id: 2, content: "Guy how far", sender: "other" },
    { id: 3, content: "i dey bro, how are you?", sender: "me" },
    { id: 4, content: "i'm good brother", sender: "me" },
  ]);
  const [input, setInput] = useState("");
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        content: input,
        sender: "me",
      },
    ]);
    setInput("");
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mt-4 w-[95%]">
          <div className="flex items-center justify-center ml-8">
            <img src={Ellipis_1} alt=" Display Image" width={75} height={75} />
            <div className="ml-2">
              <p className="font-poppins text-lg">{props.username}</p>
              <p className="font-noto-serif font-thin text-sm">
                Onlinr- last seen 2025
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <img src={phone} alt="Phone Call" width={42} height={42} />
            <img src={video} alt="Video Call" width={48} height={48} />
            <img src={option} alt="More Options" width={40} height={40} />
          </div>
        </div>
        <div className="border-t border-gray-300 w-[90%] ml-8 mt-4"></div>
      </div>

      <div className="mt-4 w-full h-[500px] flex-1 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
      </div>

      <div>
        <div className="relative mt-10 flex font-poppins">
          <input
            type="text"
            placeholder="Type your message here"
            value={input}
            className="bg-[#EFF6FC] w-[80%] ml-8 h-[50px] py-2 pl-14 rounded-lg"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <img
            src={paperClip}
            alt="Attachment"
            className="absolute left-10 top-1/2 transform -translate-y-1/2"
            width={42}
            height={42}
          />
          <img
            src={emoji}
            alt="Emoji"
            className="absolute right-46 top-1/2 transform -translate-y-1/2"
            width={42}
            height={42}
          />
          <img
            src={camera}
            alt="Image"
            className="absolute right-33 top-1/2 transform -translate-y-1/2"
            width={42}
            height={42}
          />
          <img
            src={send}
            alt="Send Message"
            width={50}
            height={45}
            className={`bg-white p-2 ml-4 rounded-lg ${
              input.trim() === ""
                ? "cursor-not-allowed"
                : "cursor-pointer opacity-100"
            }`}
            onClick={(e) => sendMessage(e)}
          />
        </div>
      </div>
    </div>
  );
}
