import ImageComponent from "../components/ImageComponent";
import ImageLogo from "../assets/react.svg";
import GoogleImg from "../assets/google.svg";

export default function Login() {
  return (
    <div className="flex">
      <ImageComponent />
      {/* Other Part */}
      <div className="flex flex-col items-center ml-[10%]">
        
        <div className="flex items-center justify-center gap-2 mt-10">
            <img src={ImageLogo} alt="BlahBlahLand Logo" />
            <span className="font-satoshi text-xl">BlahBlahLand</span>
        </div>
        
        <div className="flex flex-col gap-2 mt-[30%] items-center">
            <h1 className="text-4xl font-noto-serif font-thin leading-5">Welcome Back</h1>
            <p className="font-satoshi font-thin mt-2 text-gray-600">Sign in to continue chatting</p>
        </div>

        <form className="flex flex-col justify-start mr-50 mt-10 leading-relaxed">
            <label htmlFor="email" className="font-satoshi font-thin mb-2">Email</label>
            <input type="email" id="email" placeholder="Enter your email" className="border-gray-100 rounded-md p-2 bg-gray-100 w-[203%] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400 " />
        </form>
        
        <form className="flex flex-col justify-start mr-50 mt-6 leading-relaxed">
            <label htmlFor="password" className="font-satoshi font-thin mb-2">Password</label>
            <input type="password" id="password" placeholder="Enter your password" className="border-gray-100 rounded-md p-2 bg-gray-100 w-[203%] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400 " />
        </form>
        <div className="flex justify-between font-satoshi text-sm gap-40 mt-2">
            <div className="flex gap-2">
                <input type="checkbox" id="agree" name="terms" />
                <span>Remember me</span>
                
            </div>
            <span>Forgot password?</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-satoshi font-bold p-2 w-full mt-8 rounded-md transition-colors">Sign In</button>
        <div className="flex justify-center items-center border border-gray-200 text-black font-satoshi p-2 mt-4 rounded-md w-full hover:bg-gray-50 transition-colors">
            <img src={GoogleImg} alt="Google" width={30} height={30}/>
            <button className="ml-2">Continue with Google</button>
        </div>
        
        <p className="mt-6 text-sm text-gray-600 mt-[30%]">
          New to BlahBlahLand? <a href="/signup" className="text-blue-600 hover:underline">Create an account</a>
        </p>
      </div>
      
    </div>
  );
}
