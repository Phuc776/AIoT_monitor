import { Outlet } from "react-router-dom";
import { Header, TeamLeadSidebar } from "../components";

const TeamLeadLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <TeamLeadSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <Header /> */}
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeamLeadLayout;
