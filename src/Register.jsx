import backgroundImage from "./assets/background_img.png";
import ImageLogo from "./assets/react.svg";
import GoogleImg from "./assets/google.svg";

export default function Register() {
  return (
    <div className="flex">
      <div className="flex items-center justify-center relative">
        <img
          src={backgroundImage}
          alt="Image"
          className="h-[99vh] ml-2 mt-1 rounded-3xl w-[50vw]"
        />
        <div className="absolute justify-start flex flex-col text-white gap-100">
            <div className="font-satoshi font-thin flex justify-center items-center w-[50%] gap-10">
                <span>
                    Connect • Chat • Create
                </span>
                <span className="border-t border-white w-[100px] text-white"></span>
            </div>
            <div className="flex flex-col mt-6">
                <div className="text-6xl font-noto-serif font-thin">
                    <p>Start Your</p>
                    <p>Journey</p>
                    <p>Today</p>
                </div>
                <p className="font-satoshi font-thin w-[55%]">
                    Join BlahBlahLand and become part of a growing community where every connection matters
                </p>
            </div>
        </div>
      </div>

      <div className="flex flex-col items-center ml-[10%]">
        <div className="flex items-center justify-center gap-2 mt-10">
            <img src={ImageLogo} alt="BlahBlahLand Logo" />
            <span className="font-satoshi text-xl">BlahBlahLand</span>
        </div>
        
        <div className="flex flex-col gap-2 mt-[10%] items-center">
            <h1 className="text-4xl font-noto-serif font-thin leading-5">Create Account</h1>
            <p className="font-satoshi font-thin mt-2 text-gray-600">Sign up to start your journey</p>
        </div>

        <form className="flex flex-col justify-start mr-50 mt-10 leading-relaxed">
            <div className="flex gap-4">
                <div>
                    <label htmlFor="firstName" className="font-satoshi font-thin mb-2">First Name</label>
                    <input type="text" id="firstName" placeholder="Enter first name" className="border-gray-100 rounded-md p-2 bg-gray-100 w-full placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400" />
                </div>
                <div>
                    <label htmlFor="lastName" className="font-satoshi font-thin mb-2">Last Name</label>
                    <input type="text" id="lastName" placeholder="Enter last name" className="border-gray-100 rounded-md p-2 bg-gray-100 w-full placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400" />
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="username" className="font-satoshi font-thin mb-2">Username</label>
                <input type="text" id="username" placeholder="Choose a username" className="border-gray-100 rounded-md p-2 bg-gray-100 w-[203%] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400" />
            </div>

            <div className="mt-4">
                <label htmlFor="email" className="font-satoshi font-thin mb-2">Email</label>
                <input type="email" id="email" placeholder="Enter your email" className="border-gray-100 rounded-md p-2 bg-gray-100 w-[203%] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400" />
            </div>

            <div className="mt-4">
                <label htmlFor="password" className="font-satoshi font-thin mb-2">Password</label>
                <input type="password" id="password" placeholder="Create a password" className="border-gray-100 rounded-md p-2 bg-gray-100 w-[203%] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400" />
            </div>
        </form>

        <div className="flex gap-2 font-satoshi text-sm mt-4">
            <input type="checkbox" id="agree" name="terms" />
            <span className="text-gray-600">I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a></span>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-satoshi font-bold p-2 w-full mt-6 rounded-md transition-colors">Create Account</button>
        
        <div className="flex justify-center items-center border border-gray-200 text-black font-satoshi p-2 mt-4 rounded-md w-full hover:bg-gray-50 transition-colors">
            <img src={GoogleImg} alt="Google" width={30} height={30}/>
            <button className="ml-2">Continue with Google</button>
        </div>
        
        <p className="mt-6 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
} 