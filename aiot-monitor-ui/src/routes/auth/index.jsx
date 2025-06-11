import AuthLayout from "../../layouts/AuthLayout";
import LoginPage from "../../pages/auth/LoginPage";

const AuthRoutes = [
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ path: "", element: <LoginPage /> }],
  },
];

export default AuthRoutes;
