import { useGetCurrentUser } from "../hooks/useDashboard";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import SearchBox from "../components/Search";
import GroupPeople from "../components/GroupPeople";

export default function Dashboard() {
  const { data, loading, error } = useGetCurrentUser();
  if (error) return <Navigate to={"/login"} />;
  if (loading) return <p>Loading...</p>;

  localStorage.setItem("user", JSON.stringify(data.getCurrentUser));
  return (
    <main className="bg-[#E5E5E5]">
      <div className="flex justify-center gap-[10vw]">
        <div className="flex justify-between gap-8">
          <div className="mt-4 ml-8">
            <SideBar />
          </div>

          <div className="w-[22vw]">
            <div>
              <SearchBox />
            </div>

            <div> <GroupPeople title="Groups"/> </div>

            <div> <GroupPeople title="People"/> </div>
          </div>
        </div>

        <div className="border-4 border-red-600"></div>
      </div>
    </main>
  );
}
