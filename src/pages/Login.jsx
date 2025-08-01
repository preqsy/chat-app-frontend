import ImageLogo from "../assets/logo.svg";
import GoogleImg from "../assets/google.svg";
import ImageComponent from "../components/ImageComponent";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { useState } from "react";
import { useLoginUser } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const { loginUser, loading } = useLoginUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await loginUser({ variables: { input: formData } });
      localStorage.setItem("token", response.data.loginAuthUser.token);
      setNotification({ message: "Login successful!", type: "success" });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setNotification({
        message: error.message || "Login failed",
        type: "error",
      });
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 lg:flex">
      {/* Background Image Component - hidden on mobile */}
      <div className="hidden lg:block lg:w-1/2">
        <ImageComponent />
      </div>

      {/* Login Form */}
      <div className="flex flex-col justify-center px-6 py-8 lg:px-8 lg:w-1/2 min-h-screen lg:min-h-0">
        <div className="mx-auto w-full max-w-md lg:max-w-lg">
          {/* Logo and Title */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src={ImageLogo}
                alt="Whisper Link Logo"
                className="w-16 h-16 lg:w-20 lg:h-20"
              />
              <span className="font-satoshi text-2xl lg:text-3xl font-bold text-white">
                Whisper Link
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-light text-white">
                Welcome Back
              </h1>
              <p className="text-gray-300 lg:text-gray-400 text-sm lg:text-base">
                Sign in to continue chatting with your friends
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 lg:py-4 rounded-xl border bg-gray-800 text-white placeholder-gray-400 transition-all duration-200 ${
                  formErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                } focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900`}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 lg:py-4 rounded-xl border bg-gray-800 text-white placeholder-gray-400 transition-all duration-200 ${
                  formErrors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                } focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900`}
                onChange={handleInputChange}
              />
              {formErrors.password && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 lg:py-4 rounded-xl transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 lg:py-4 rounded-xl transition-all duration-200 border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl"
          >
            <img src={GoogleImg} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Sign up for free
            </a>
          </p>
        </div>
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
