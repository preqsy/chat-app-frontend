import {createBrowserRouter} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
    {
        path:"/register",
        element: <Register />
    },
    {
        path:"/login",
        element: <Login />
    },
    {
        path: "/",
        element: <Dashboard />
    }
])

export default router;