import Ellipis_1 from "../assets/Ellipse_1.svg";

export default function PeopleList({
  firstName,
  lastName,
  onClick,
  buttonName = "Add Friends",
  showButton = true,
}) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 cursor-pointer" onClick={onClick}>
        <img src={Ellipis_1} alt="" />
        <div className="flex flex-col gap-2">
          <p className="font-poppins">
            {firstName} {lastName}
          </p>

          {showButton && (
            <div className="flex gap-2 items-center">
              <button
                className="p-2 bg-indigo-600 text-white rounded w-30 cursor-pointer"
                onClick={onClick}
              >
                {buttonName}
              </button>
              <button
                className="p-2 bg-white text-indigo-600 rounded w-30 cursor-pointer"
                disabled
              >
                View Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
