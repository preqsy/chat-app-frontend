import backgroundImage from "../assets/background_img.png";

export default function ImageComponent() {
    return (
        <div className="hidden md:block w-1/2 relative">
            <div className="h-screen sticky top-0">
                <img
                    src={backgroundImage}
                    alt="Background"
                    className="h-full w-full object-cover rounded-r-3xl"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-12 text-white bg-black/30 rounded-r-3xl">
                    <div className="font-satoshi font-thin flex items-center gap-4">
                        <span>Connect • Chat • Create</span>
                        <span className="border-t border-white w-20"></span>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="text-6xl font-noto-serif font-thin space-y-2">
                            <p>Join the</p>
                            <p>Conversation</p>
                            <p>Today</p>
                        </div>
                        <p className="font-satoshi font-thin max-w-md">
                            Connect with friends, family, and communities in BlahBlahLand - where every chat tells a story
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}