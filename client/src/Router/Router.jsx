import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/Signup";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login', element: <Login />
        },
        {
          path: '/signup', element: <SignUp />
        }
      ]
    },
  ]);