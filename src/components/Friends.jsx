export default function GroupPeople({ name, messagePreview, messageTime, messageAction, picture, className = "" }) {
  return (
    <div className={`flex items-center gap-3 cursor-pointer ${className}`}>
      <div className="relative">
        <img 
          src={picture} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 truncate">{name}</h3>
          <span className="text-xs text-gray-500 whitespace-nowrap">{messageTime}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 truncate">{messagePreview}</p>
          {messageAction > 0 && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-white bg-indigo-600 rounded-full">
              {messageAction}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
