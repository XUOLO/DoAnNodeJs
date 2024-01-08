import { lazy } from "react";
import { Navigate } from "react-router-dom";

 
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const Forms = lazy(() => import("../views/ui/Forms"));

const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

const Starter = lazy(() => import("../views/Starter.js"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Login = lazy(() => import("../views/ui/Login"));
// import Login from "../views/ui/Login";

 
const isAuthenticated = () => {
    const auth = localStorage.getItem('user');
   return !!auth;
 };
 const PrivateRoute = ({ element, path }) => {
   return isAuthenticated() ? element : <Navigate to="/logout" />;
 };
const ThemeRoutesLogout = [
  
    { path: "/logout", element: <Login /> },

    { path: "/", exact: true, element: <PrivateRoute element={<Starter />} path="/starter" /> },

      { path: "/starter", exact: true, element: <PrivateRoute element={<Starter />} path="/starter" /> },
      { path: "/table", exact: true, element: <PrivateRoute element={<Tables />} path="/table" /> },
      { path: "/forms", exact: true, element: <PrivateRoute element={<Forms />} path="/forms" /> },
      { path: "/breadcrumbs", exact: true, element: <PrivateRoute element={<Breadcrumbs />} path="/breadcrumbs" /> },
];

export default ThemeRoutesLogout;
