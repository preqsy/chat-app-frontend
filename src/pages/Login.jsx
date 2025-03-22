import ImageLogo from "../assets/react.svg";
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
    <div className="flex min-h-screen bg-gradient-to-br from-black to-indigo-700">
      <ImageComponent />
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-8">
        <div className="flex items-center justify-center gap-2 mt-10">
          <img src={ImageLogo} alt="BlahBlahLand Logo" />
          <span className="font-satoshi text-xl">BlahBlahLand</span>
        </div>

        <div className="flex flex-col gap-2 mt-10 items-center">
          <h1 className="text-4xl font-light">Welcome Back</h1>
          <p className="text-center max-w-lg mt-2">
            Sign in to continue chatting
          </p>
        </div>

        <form
          className="w-full max-w-md space-y-6 mt-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className={`w-full px-4 py-2 rounded-lg border text-gray-200 ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-indigo-500`}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Password</label>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              className={`w-full px-4 py-2 rounded-lg border text-gray-200 ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-indigo-500`}
              onChange={handleInputChange}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>

          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition ">
            {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
          </Button>
        </form>

        <div className="relative w-full max-w-md my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex items-center border justify-center border-gray-300 text-black bg-white p-3 mt-4 rounded-lg w-[53.5%] hover:bg-gray-100 transition-all">
          <img src={GoogleImg} alt="Google" width={30} height={30} />
          <Button className="ml-2">Continue with Google</Button>
        </div>

        <p className="mt-8 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-white hover:underline">
            Sign up
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
