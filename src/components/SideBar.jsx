import bx_bell from "../assets/bx_bell.svg"
import ci_settings from "../assets/ci_settings.svg"
import codicon_home from "../assets/codicon_home.svg"
import Ellipse from "../assets/Ellipse.svg"
import logout from "../assets/logout.svg"
import Vector from "../assets/Vector.svg"


export default function SideBar() {
    return (
        <div className="flex flex-col items-center h-[95vh] bg-[#6E00FF] rounded-2xl pb-4">
          <ul className="flex flex-col items-center gap-7 ">
          <div className="mb-[6vh] pt-4">
            <li >
            <img src={Ellipse} alt="Profile" width={78} height={78} />
          </li>
          </div>
          <div className="flex flex-col items-center gap-6">
            <li>
            <img src={codicon_home} alt="Home" width={58} height={58}  />
          </li>
          <li>
            <img src={Vector} alt="Chats" width={47} height={58}/>
          </li>
          <li>
            <img src={bx_bell} alt="Notifications" width={58} height={58}/>
          </li>
          <li>
            <img src={ci_settings} alt="Settings" width={53} height={53}/>
          </li>
          </div>
          <div className="mt-[10vh]">
            <li>
            <img src={logout} alt="Logout" width={54} height={54}/>
          </li>
          </div>
          
        </ul>
        </div>
    )
}