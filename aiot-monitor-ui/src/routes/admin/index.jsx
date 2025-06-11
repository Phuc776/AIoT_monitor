import { ProtectedRoute } from "../../components";
import AdminLayout from "../../layouts/AdminLayout";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import CreateUserPage from "../../pages/users/CreateUserPage";
import UpdatePasswordPage from "../../pages/auth/UpdatePasswordPage";
import ResetPasswordPage from "../../pages/auth/ResetPasswordPage";
import UserManagerPage from "../../pages/users/UserManagerPage";

const AdminRoutes = [
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "create-user", element: <CreateUserPage /> },
          { path: "users", element: <UserManagerPage /> },
          { path: "update-password", element: <UpdatePasswordPage /> },
          { path: "reset-password", element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
];

export default AdminRoutes;
