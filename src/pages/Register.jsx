// import backgroundImage from "./assets/background_img.png";
import ImageLogo from "../assets/react.svg";
import GoogleImg from "../assets/google.svg";
import ImageComponent from "../components/ImageComponent";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { useState } from "react";
import { useCreateAuthUser } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();
  const { createAuthUser, loading, error } = useCreateAuthUser();

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const response = await createAuthUser({
        variables: {
          input: formData,
        },
      });
      const token = response.data.createAuthUser.token;
      localStorage.setItem("token", token);
      setNotification({
        message: "Registration successful!",
        type: "success"
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setNotification({
        message: error.message || "Registration failed",
        type: "error"
      });
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner size="lg" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <ImageComponent />
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-8">
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

        <form 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8" 
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              className={`w-full px-4 py-2 rounded-lg border ${
                formErrors.firstName ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-indigo-500`}
              onChange={handleInputChange}
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm">{formErrors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              className={`w-full px-4 py-2 rounded-lg border ${
                formErrors.lastName ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-indigo-500`}
              onChange={handleInputChange}
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm">{formErrors.lastName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              className={`w-full px-4 py-2 rounded-lg border ${
                formErrors.username ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-indigo-500`}
              onChange={handleInputChange}
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className={`w-full px-4 py-2 rounded-lg border ${
                formErrors.email ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-indigo-500`}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              className={`w-full px-4 py-2 rounded-lg border ${
                formErrors.password ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-indigo-500`}
              onChange={handleInputChange}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>

          <Button 
            className="col-span-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="sm" /> : "Create Account"}
          </Button>
        </form>

        <div className="flex justify-center items-center border border-gray-200 text-black font-satoshi p-2 mt-4 rounded-md w-full hover:bg-gray-50 transition-colors">
          <img src={GoogleImg} alt="Google" width={30} height={30} />
          <Button className="ml-2">Continue with Google</Button>
        </div>

        <p className="mt-6 text-sm text-gray-600 mt-[10%]">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>

      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
