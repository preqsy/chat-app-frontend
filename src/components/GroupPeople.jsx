
export default function GroupPeople(props) {

  return (
    <div>
      
      <div className="mt-2 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center ml-2">
            <img src={props.picture} alt="" width={50} height={50} />
            <div className="ml-2">
              <p className="font-poppins">{props.name}</p>
              <p className="text-sm font-satoshi font-thin">{ props.messagePreview.length > 15 ? props.messagePreview.slice(0, 10) + "...." : props.messagePreview}</p>
            </div>
          </div>
          <div className="flex flex-col items-end text-sm font-satoshi mr-2 font-thin">
            <span>{props.messageTime}</span>
            <span className={props.className || "text-gray-400"}>
              {props.messageAction}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-2 w-[90%] ml-4"></div>
      </div>
      
      
      
    </div>
  );
}
