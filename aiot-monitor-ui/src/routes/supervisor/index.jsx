import { ProtectedRoute } from "../../components";
import SupervisorLayout from "../../layouts/SupervisorLayout";
import SupervisorDashboard from "../../pages/supervisor/SupervisorDashboard";

const SupervisorRoutes = [
  {
    path: "/supervisor",
    element: <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR"]} />,
    children: [
      {
        path: "",
        element: <SupervisorLayout />,
        children: [{ path: "dashboard", element: <SupervisorDashboard /> }],
      },
    ],
  },
];

export default SupervisorRoutes;
