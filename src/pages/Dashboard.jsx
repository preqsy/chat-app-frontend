import { useGetCurrentUser } from "../hooks/useDashboard";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import SearchBox from "../components/Search";
import GroupPeople from "../components/GroupPeople";
import Ellipis_1 from "../assets/Ellipse_1.svg";


export default function Dashboard() {
  const { data, loading, error } = useGetCurrentUser();
  if (error) return <Navigate to={"/login"} />;
  if (loading) return <p>Loading...</p>;

  localStorage.setItem("user", JSON.stringify(data.getCurrentUser));
  
  const groupData = [
    {
      name: "Friends Forever",
      messagePreview: "Hahaha",
      messageTime: "Today, 9:52pm",
      messageAction: 4,
      picture: Ellipis_1
    },
    {
      name: "Sporty Group",
      messagePreview: "How far you play that game??",
      messageTime: "Today, 9:52pm",
      messageAction: 8,
      picture: Ellipis_1
    },
    {
      name: "Girls Groupy",
      messagePreview: "He's Cheating on me 😭",
      messageTime: "Today, 9:52pm",
      messageAction: 1,
      picture: Ellipis_1
    },
  ]
  const peopleData = [
    {
      name: "Obinna",
      messagePreview: "Hahaha",
      messageTime: "Today, 9:52pm",
      messageAction: 4,
      picture: Ellipis_1
    },
    {
      name: "Prehqsy",
      messagePreview: "How far you play that game??",
      messageTime: "Today, 9:52pm",
      messageAction: 8,
      picture: Ellipis_1
    },
    {
      name: "Young Wolf",
      messagePreview: "He's Cheating on me 😭",
      messageTime: "Today, 9:52pm",
      messageAction: 1,
      picture: Ellipis_1
    },
    {
      name: "Prehqsy",
      messagePreview: "How far you play that game??",
      messageTime: "Today, 9:52pm",
      messageAction: 8,
      picture: Ellipis_1
    },
    {
      name: "Young Wolf",
      messagePreview: "He's Cheating on me 😭",
      messageTime: "Today, 9:52pm",
      messageAction: 1,
      picture: Ellipis_1
    },
  ]
  return (
    <main className="bg-[#E5E5E5] h-[100vh]">
      <div className="flex justify-center gap-[10vw]">
        <div className="flex justify-center gap-4">
          <div className="mt-4 ml-8">
            <SideBar />
          </div>

          <div className="w-[26vw]">
            <div>
              <SearchBox />
            </div>

            <div className="border border-white rounded-2xl bg-white shadow-md shadow-blue-300 mt-10 ">
              <h2 className="font-poppins font-bold mt-2 ml-2">Groups</h2>
              {
              groupData.map((group) => (
                
                <GroupPeople
                key={group.name}
                // messagePreview={group.messagePreview.concat("....") ? group.messagePreview.length > 10 : group.messagePreview} 
                {...group}
              />
              ))}
              
            </div>

            <div className="border border-white rounded-2xl bg-white shadow-md shadow-blue-300 mt-6"> 
               <h2 className="font-poppins font-bold mt-2 ml-2">People</h2>
              {
                peopleData.map((people) => (
                  <GroupPeople
                  key={people.name}
                  {...people}
                  
                  />
                ))
              }
               </div>
          </div>
        </div>

        <div className=" w-[50vw] bg-white rounded-2xl"> <Chat /> </div>
      </div>
    </main>
  );
}
