import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/Signup";
import CategoryCard from "../pages/Home/Category/CategoryCard";
import AllMarket from "../componenets/allMarket/AllMarket";
import BuyNow from '../componenets/buy now/BuyNow'
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
            path: '/categoryCard/:category',
            element: <CategoryCard></CategoryCard>
        },
        {
            path: '/market',
            element: <AllMarket></AllMarket>
        },
        {
            path: '/buyNow/:id',
            element: <BuyNow></BuyNow>
        },
        {
            path: '/buying',
            element: <BuyNow></BuyNow>
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