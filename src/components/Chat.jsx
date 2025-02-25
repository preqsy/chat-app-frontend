import Ellipis_1 from "../assets/Ellipse_1.svg";
import phone from "../assets/phone.svg"
import video from "../assets/video.svg"
import option from "../assets/option.svg"

export default function Chat() {
    return (
        <div>
            <div>
                <div className="flex items-center justify-between mt-4 w-[95%]">
                <div className="flex items-center justify-center ml-8">
                    <img src={Ellipis_1} alt=" Display Image" width={75} height={75}/>
                    <div className="ml-2">
                        <p className="font-poppins text-lg">Prehqsy</p>
                        <p className="font-noto-serif font-thin text-sm">Onlinr- last seen 2025</p>
                    </div>
                </div>
                
                <div className="flex justify-center items-center gap-4">
                    <img src={phone} alt="Phone Call" width={42} height={42}/>
                    <img src={video} alt="Video Call" width={48} height={48}/>
                    <img src={option} alt="More Options" width={40} height={40} />
                </div>
                
            </div>
            <div className="border-t border-gray-300 w-[90%] ml-8 mt-4"></div>
            </div>
        </div>
    )
}