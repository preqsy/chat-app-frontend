import Ellipis_1 from "../assets/Ellipse_1.svg";

export default function GroupPeople(props) {
  return (
    <div className="border border-white rounded-2xl bg-white shadow-2xl ">
      <h2 className="font-poppins font-bold mt-2 mb-2 ml-2">{props.title}</h2>
      
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center ml-2">
            <img src={Ellipis_1} alt="" width={50} height={50} />
            <div className="ml-2">
              <p className="font-poppins">Friends Forever</p>
              <p className="text-sm font-satoshi font-thin">Hahahahaha!</p>
            </div>
          </div>
          <div className="flex flex-col items-end text-sm font-satoshi mr-2 font-thin">
            <span>Today, 9:52pm</span>
            <span className="text-white border-4 bg-red-400 rounded-full w-6 h-6 flex items-center justify-center text-sm">
              4
            </span>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-2 w-[90%] ml-4"></div>
      </div>
      
    </div>
  );
}
