import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../../../assets/Black and Green Flat Illustrated Organic Cosmetics Logo.gif';
import useAuth from "../../../hooks/useAuth";
import avatarImg from '../../../assets/placeholder.jpg';
import { FaHome, FaSignInAlt, FaUserPlus, FaShoppingCart, FaShoppingBasket } from 'react-icons/fa';
import { PiCowFill } from "react-icons/pi";
import { GiBuffaloHead, GiCamel, GiGoat } from "react-icons/gi";
import { IoIosBookmarks } from "react-icons/io";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const { user, logOut } = useAuth();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const navOptions = (
    <>
      <li>
        <Link
          to="/"
          className={`${
            activeLink === "/" ? "text-teal-600 text-lg font-bold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/")}
        >
          <PiCowFill className="mr-1 text-red-600 text-xl" /><FaHome className="mr-1" /> Home
        </Link>
      </li>
      <li>
        <Link
          to="/market"
          className={`${
            activeLink === "/market" ? "text-teal-600 text-lg font-bold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/market")}
        >
          <GiGoat className="mr-1 text-red-600 text-xl" /><FaShoppingCart className="mr-1" /> Market
        </Link>
      </li>
      <li>
        <Link
          to="/purchase"
          className={`${
            activeLink === "/buying" ? "text-teal-600 text-lg font-bold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/purchase")}
        >
          <GiCamel className="mr-1 text-red-600 text-xl" /><FaShoppingBasket className="mr-1" /> My Purchase
        </Link>
      </li>
      <li>
        <Link
          to="/booking"
          className={`${
            activeLink === "/booking" ? "text-teal-600 text-lg font-bold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/booking")}
        >
          <GiBuffaloHead className="mr-1 text-red-600 text-xl" /><IoIosBookmarks className="mr-1" /> My Booking
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-gradient-to-r from-sky-200 to-sky-300">
      <div className="navbar bg-gradient-to-r from-sky-200 to-sky-400 flex justify-between items-center px-4 py-2">
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Yusuf Agro Logo" className="w-24 h-auto rounded-full lg:ml-0" />
          <span className="text-teal-700 text-2xl font-bold ml-2 lg:ml-0">YUSUF AGRO</span>
        </Link>

        {/* Navigation links for medium and large devices */}
        <div className="hidden lg:flex space-x-4">
          <ul className="menu menu-horizontal">{navOptions}</ul>
        </div>
    {/* Menu for small devices */}
<div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navOptions}
          </ul>
        </div>
        {/* User profile section */}
        <div className="flex items-center space-x-5">
          
        <div className="dropdown ">
            <img
              className="rounded-full cursor-pointer"
              referrerPolicy="no-referrer"
              src={user && user.photoURL ? user.photoURL : avatarImg}
              alt="profile"
              height="30"
              width="30"
            />
          </div>
          {/* Authenticated user actions */}
          {user ? (
            <div
              onClick={logOut}
              className="px-4 py-2 bg-transparent border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all flex items-center cursor-pointer ml-4 md:ml-0"
            >
              <FaSignInAlt className="mr-2" /> Logout
            </div>
          ) : (
            <>
              {/* Authentication links */}
              <Link
                to="/login"
                className="px-4 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center"
              >
                <FaSignInAlt className="mr-2" /> Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center ml-2"
              >
                <FaUserPlus className="mr-2" /> Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
