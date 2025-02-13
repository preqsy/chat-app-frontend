// import backgroundImage from "./assets/background_img.png";
import ImageLogo from "../assets/react.svg";
import GoogleImg from "../assets/google.svg";
import ImageComponent from "../components/ImageComponent";
import { useState } from "react";
import useCreateAuthUser from "../services/authService";
import {useNavigate} from "react-router-dom"

export default function Register() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const {createAuthUser, data, loading, error} = useCreateAuthUser();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAuthUser({
        variables: {
          input: {
            firstName,
            lastName,
            username,
            email,
            password
          }
        }
      })
      navigate("/login")
    }
    catch (error) {
      console.error("Error registering user:", error);
    }
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // let firstName;
  return (
    <div className="flex">
      <ImageComponent />
      {/* Other Part */}
      <div className="flex flex-col items-center w-[40vw] ml-20">
        <div className="flex items-center justify-center gap-2 mt-10">
          <img src={ImageLogo} alt="BlahBlahLand Logo" />
          <span className="font-satoshi text-xl">BlahBlahLand</span>
        </div>

        <div className="flex flex-col gap-2 mt-[10%] items-center">
          <h1 className="text-4xl font-noto-serif font-thin leading-5">
            Create Account
          </h1>
          <p className="font-satoshi font-thin mt-2 text-gray-600 w-full max-w-[600px] text-center">
            Join BlahBlahLand to start chatting
          </p>
        </div>

        <form className="grid grid-cols-2 gap-x-10" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-start mt-6 leading-relaxed">
            <label htmlFor="firstName" className="font-satoshi font-thin mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              className="border-gray-100 rounded-md p-2 bg-gray-100 w-[300px] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-start mt-6 leading-relaxed">
            <label htmlFor="lastName" className="font-satoshi font-thin mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              className="border-gray-100 rounded-md p-2 bg-gray-100 w-[300px] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-start mt-6 leading-relaxed">
            <label htmlFor="username" className="font-satoshi font-thin mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="border-gray-100 rounded-md p-2 bg-gray-100 w-[300px] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-start mt-6 leading-relaxed">
            <label htmlFor="register-email" className="font-satoshi font-thin mb-2">
              Email
            </label>
            <input
              type="email"
              id="register-email"
              placeholder="Enter your email"
              className="border-gray-100 rounded-md p-2 bg-gray-100 w-[300px] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-start mt-6 leading-relaxed">
            <label htmlFor="register-password" className="font-satoshi font-thin mb-2">
              Password
            </label>
            <input
              type="password"
              id="register-password"
              placeholder="Enter your password"
              className="border-gray-100 rounded-md p-2 bg-gray-100 w-[300px] placeholder:font-satoshi placeholder:font-thin placeholder:text-gray-400"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-satoshi font-bold p-2 w-full mt-8 rounded-md transition-colors col-span-2 cursor-pointer">
            Register
          </button>
          {/* <h1>{data?.createAuthUser.user.firstName}</h1> */}
          <h1>{data}</h1>
        </form>

        <div className="flex justify-center items-center border border-gray-200 text-black font-satoshi p-2 mt-4 rounded-md w-full hover:bg-gray-50 transition-colors">
          <img src={GoogleImg} alt="Google" width={30} height={30} />
          <button className="ml-2">Continue with Google</button>
        </div>

        <p className="mt-6 text-sm text-gray-600 mt-[10%]">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
