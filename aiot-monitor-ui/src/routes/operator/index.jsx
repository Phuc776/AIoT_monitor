import { ProtectedRoute } from "../../components";
import OperatorLayout from "../../layouts/OperatorLayout";
import OperatorDashboard from "../../pages/operator/OperatorDashboard";

const OperatorRoutes = [
  {
    path: "/operator",
    element: <ProtectedRoute allowedRoles={["ROLE_OPERATOR"]} />,
    children: [
      {
        path: "",
        element: <OperatorLayout />,
        children: [{ path: "dashboard", element: <OperatorDashboard /> }],
      },
    ],
  },
];

export default OperatorRoutes;
