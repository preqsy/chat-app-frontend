import backgroundImage from "../assets/background_img.png";

export default function ImageComponent() {
    return (
        <div>
            <div className="flex items-center justify-center relative">
        
        <img
          src={backgroundImage}
          alt="Image"
          className="h-[99vh] ml-2 mt-1 rounded-3xl w-[50vw]"
        />
        <div className="absolute justify-start flex flex-col text-white gap-[50vh]">
            <div className="font-satoshi font-thin flex justify-center items-center w-[50%] gap-10">
                <span>
                    Connect • Chat • Create
                </span>
                <span className="border-t border-white w-[100px] text-white"></span>
            </div>
            <div className="flex flex-col mt-6">
                <div className="text-6xl font-noto-serif font-thin">
                    <p>Join the</p>
                    <p>Conversation</p>
                    <p>Today</p>
                </div>
                <p className="font-satoshi font-thin w-[55%]">
                    Connect with friends, family, and communities in BlahBlahLand - where every chat tells a story
                </p>
            </div>
        </div>
      </div>
        </div>
    )
}