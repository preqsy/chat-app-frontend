export default function MessageBubble(props) {
  return (
    <div
      className={`mt-2 rounded-3xl w-[35%] p-2 pl-8 ${
        props.sender === "me"
          ? "bg-[#6E00FF] text-white self-end ml-auto mr-4"
          : "bg-gray-200 text-black ml-4"
      }`}
    >
      {props.content}
    </div>
  );
}
