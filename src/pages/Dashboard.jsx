import { useGetCurrentUser } from "../hooks/useDashboard";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const {data, loading, error} = useGetCurrentUser()
  if (error) return <Navigate to={"/login"}/>
  if (loading) return <p>Loading...</p>

  localStorage.setItem("user", JSON.stringify(data.getCurrentUser))
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
