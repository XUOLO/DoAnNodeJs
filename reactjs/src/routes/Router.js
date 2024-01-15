import { lazy } from "react";
import { Navigate } from "react-router-dom";
  
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Login = lazy(() => import("../views/ui/Login"));
const Card = lazy(() => import("../views/ui/Cards"));

const Forms = lazy(() => import("../views/ui/Forms"));
const AddUser = lazy(() => import("../views/ui/AddUser"));
const AddClass = lazy(() => import("../views/ui/AddClass"));
const AddStudent = lazy(() => import("../views/ui/AddStudent"));

const UpdateUser = lazy(() => import("../views/ui/UpdateUser"));
const UpdateStudent = lazy(() => import("../views/ui/UpdateStudent"));
const UpdateClass = lazy(() => import("../views/ui/UpdateClass"));
const ClassDetail = lazy(() => import("../views/ui/DetailClass"));
const TeacherList = lazy(() => import("../views/ui/TeacherList"));
const ListClassUser = lazy(() => import("../views/ui/ListClassUser"));

const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

 const isAuthenticated = () => {
   const auth = localStorage.getItem('user');
  return !!auth;
};
const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/logout" />;
};
const Logout = ( ) => {
  localStorage.clear();
  return  <Navigate to="/login" />;
};
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/logout", element: <Logout /> },
      { path: "/login", element: <Login /> },
      { path: "/users/:id", element: <UpdateUser /> },
      { path: "/class/:id", element: <UpdateClass /> },
      { path: "/students/:id", element: <UpdateStudent /> },
      { path: "/class/detailClass/:id", element: <ClassDetail /> },
      { path: "/class/classUser/:id", element: <ListClassUser /> },

      { path: "/addUser", element: <AddUser /> },
      { path: "/addClass", element: <AddClass /> },
      { path: "/addStudent", element: <AddStudent /> },
      { path: "/teacherList", exact: true, element: <PrivateRoute element={<TeacherList />} path="/teacherList" /> },

      { path: "/starter", exact: true, element: <PrivateRoute element={<Starter />} path="/starter" /> },
      { path: "/table", exact: true, element: <PrivateRoute element={<Tables />} path="/table" /> },
      { path: "/forms", exact: true, element: <PrivateRoute element={<Forms />} path="/forms" /> },
      { path: "/breadcrumbs", exact: true, element: <PrivateRoute element={<Breadcrumbs />} path="/breadcrumbs" /> },
      { path: "/card", exact: true, element: <PrivateRoute element={<Card />} path="/card" /> },

    ],
  },
];

export default ThemeRoutes;
