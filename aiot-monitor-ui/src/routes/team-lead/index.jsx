import { ProtectedRoute } from "../../components";
import TeamLeadLayout from "../../layouts/TeamLeadLayout";
import DeviceManager from "../../pages/team-lead/device/DeviceManager";
import DeviceGroupManager from "../../pages/team-lead/device-group/DeviceGroupManager";
import TeamLeadDashboard from "../../pages/team-lead/TeamLeadDashboard";
import CommandListManager from "../../pages/team-lead/command-list/CommandListManager";
import ProfileManager from "../../pages/team-lead/profile/ProfileManager";

const TeamLeadRoutes = [
  {
    path: "/team-lead",
    element: <ProtectedRoute allowedRoles={["ROLE_TEAM_LEAD"]} />,
    children: [
      {
        path: "",
        element: <TeamLeadLayout />,
        children: [
          { path: "dashboard", element: <TeamLeadDashboard /> },
          { path: "devices", element: <DeviceManager /> },
          { path: "device-groups", element: <DeviceGroupManager /> },
          { path: "commands", element: <CommandListManager /> },
          { path: "profiles", element: <ProfileManager /> },
        ],
      },
    ],
  },
];

export default TeamLeadRoutes;
