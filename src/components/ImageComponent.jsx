import backgroundImage from "../assets/background_img.png";

export default function ImageComponent() {
    return (
        <div>
            <div className="flex items-center justify-center relative">
                <img
                    src={backgroundImage}
                    alt="Image"
                    className="h-[99vh] w-full md:w-[50vw] ml-0 md:ml-2 mt-1 rounded-none md:rounded-3xl object-cover"
                />
                <div className="absolute justify-start flex flex-col text-white gap-[30vh] md:gap-[50vh] p-4 md:p-0">
                    <div className="font-satoshi font-thin flex justify-center items-center w-full md:w-[50%] gap-4 md:gap-10">
                        <span className="text-sm md:text-base">
                            Connect • Chat • Create
                        </span>
                        <span className="border-t border-white w-[60px] md:w-[100px]"></span>
                    </div>
                    <div className="flex flex-col mt-4 md:mt-6">
                        <div className="text-4xl md:text-6xl font-noto-serif font-thin">
                            <p>Join the</p>
                            <p>Conversation</p>
                            <p>Today</p>
                        </div>
                        <p className="font-satoshi font-thin w-full md:w-[55%] text-sm md:text-base mt-2">
                            Connect with friends, family, and communities in BlahBlahLand - where every chat tells a story
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}