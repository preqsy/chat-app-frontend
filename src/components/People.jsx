import Ellipis_1 from "../assets/Ellipse_1.svg";

export default function PeopleList({ firstName, lastName, onClick }) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 ">
        <img src={Ellipis_1} alt="" />
        <div className="flex flex-col gap-2">
          <p className="font-poppins">
            {firstName} {lastName}
          </p>

          <div className="flex gap-2 items-center">
            <button
              className="p-2 bg-indigo-600 text-white rounded w-30 cursor-pointer"
              onClick={onClick}
            >
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
