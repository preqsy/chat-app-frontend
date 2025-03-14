export default function UserAvatar({ 
  user, 
  size = 'md', 
  showStatus = false,
  className = '' 
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5'
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`${sizeClasses[size]} flex items-center justify-center bg-indigo-100 text-indigo-600`}>
            {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
        )}
      </div>
      
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizes[size]} rounded-full border-2 border-white ${
            user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
      )}
    </div>
  );
} 