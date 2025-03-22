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
    password: "",
  });
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { createAuthUser, loading } = useCreateAuthUser();
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await createAuthUser({ variables: { input: formData } });
      localStorage.setItem("token", response.data.createAuthUser.token);
      setNotification({ message: "Registration successful!", type: "success" });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setNotification({
        message: error.message || "Registration failed",
        type: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-indigo-700 text-white">
      <ImageComponent />
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-8">
        <div className="flex items-center justify-center gap-2 mt-10">
          <img src={ImageLogo} alt="BlahBlahLand Logo" />
          <span className="text-xl font-bold">BlahBlahLand</span>
        </div>

        <div className="flex flex-col gap-2 mt-10 text-center">
          <h1 className="text-4xl font-light">Create Account</h1>
          <p className="text-gray-300 max-w-lg">
            Join BlahBlahLand to start chatting
          </p>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8"
          onSubmit={handleSubmit}
        >
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Username", name: "username" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 text-gray-200 ${
                  formErrors[name] ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleInputChange}
              />
              {formErrors[name] && (
                <p className="text-red-500 text-sm">{formErrors[name]}</p>
              )}
            </div>
          ))}

          <Button
            className="col-span-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-all"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="sm" /> : "Create Account"}
          </Button>
        </form>

        <div className="flex items-center border justify-center border-gray-300 text-black bg-white p-3 mt-4 rounded-lg w-4/5 hover:bg-gray-100 transition-all">
          <img src={GoogleImg} alt="Google" width={30} height={30} />
          <Button className="ml-2 text-black">Continue with Google</Button>
        </div>

        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
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
