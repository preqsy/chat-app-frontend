import Ellipis_1 from "../assets/Ellipse_1.svg";

export default function PeopleList({
  firstName,
  lastName,
  onClick,
  buttonName = "Add Friends",
  showButton = true,
}) {
  return (
    <div 
      className="p-3 lg:p-4 rounded-xl hover:bg-gray-700 lg:hover:bg-gray-100 transition-all duration-200 group cursor-pointer"
      onClick={!showButton ? onClick : undefined}
    >
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={Ellipis_1}
            alt={`${firstName} ${lastName}`}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-gray-600 lg:ring-gray-200 group-hover:ring-indigo-500 transition-all duration-200"
          />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 lg:border-white"></span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white lg:text-gray-900 group-hover:text-indigo-600 lg:group-hover:text-indigo-600 truncate text-sm lg:text-base transition-colors duration-200">
                {firstName} {lastName}
              </h3>
              <p className="text-xs lg:text-sm text-gray-400 lg:text-gray-500 mt-1">
                Online
              </p>
            </div>

            {showButton && (
              <div className="flex flex-col sm:flex-row gap-2 ml-3 flex-shrink-0">
                <button
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs lg:text-sm font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:ring-indigo-500 transform hover:scale-105 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick && onClick(e);
                  }}
                >
                  {buttonName}
                </button>
                <button
                  className="px-3 py-2 bg-gray-700 lg:bg-gray-200 hover:bg-gray-600 lg:hover:bg-gray-300 text-gray-300 lg:text-gray-700 text-xs lg:text-sm font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:ring-gray-500"
                  disabled
                  onClick={(e) => e.stopPropagation()}
                >
                  Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
