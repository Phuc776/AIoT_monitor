import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRoutes from "./auth";
import AdminRoutes from "./admin";
import NotFound from "../pages/errors/NotFound";
import OperatorRoutes from "./operator";
import SupervisorRoutes from "./supervisor";
import TeamLeadRoutes from "./team-lead";

const AppRoutes = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="/login" replace />,
  },
  ...AuthRoutes,
  ...AdminRoutes,
  ...OperatorRoutes,
  ...SupervisorRoutes,
  ...TeamLeadRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default AppRoutes;
