import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../../../assets/Black and Green Flat Illustrated Organic Cosmetics Logo.gif';
import useAuth from "../../../hooks/useAuth";
import avatarImg from '../../../assets/placeholder.jpg';
import { FaHome,FaSignInAlt, FaUserPlus, FaShoppingCart } from 'react-icons/fa';
import { PiCowFill } from "react-icons/pi";
import { GiBuffaloHead, GiCamel, GiGoat } from "react-icons/gi";
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
            activeLink === "/" ? "text-teal-600 text-2xl font-extrabold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/")}
        >
          <FaHome className="" /> Home
        </Link>
      </li>
      <li>
        <Link
          to="/menu"
          className={`${
            activeLink === "/menu" ? "text-teal-600 text-xl font-extrabold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/menu")}
        >
          <FaShoppingCart className="" /> All Market
        </Link>
      </li>
      <li>
        <Link
          to="/order/salad"
          className={`${
            activeLink === "/order/salad" ? "text-teal-600 text-xl font-extrabold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/order/salad")}
        >
          <PiCowFill className="text-rose-700" /> Cow Market
        </Link>
      </li>
      <li>
        <Link
          to="/secret"
          className={`${
            activeLink === "/secret" ? "text-teal-600 text-xl font-extrabold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/secret")}
        >
          <GiGoat className="text-rose-700" /> Goat Market 
        </Link>
      </li>
      <li>
        <Link
          to="/secret"
          className={`${
            activeLink === "/secret" ? "text-teal-600 text-xl font-extrabold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/secret")}
        >
          <GiBuffaloHead className="text-rose-700" /> Buffalo Market 
        </Link>
      </li>
      <li>
        <Link
          to="/secret"
          className={`${
            activeLink === "/secret" ? "text-teal-600 text-2xl font-extrabold" : "text-blue-500 text-lg font-bold"
          } hover:text-teal-600 transition-all flex items-center`}
          onClick={() => handleLinkClick("/secret")}
        >
          <GiCamel className=" text-rose-700" /> Camel Market 
        </Link>
      </li>
    </>
  );

  return (
    <>
      <div className="bg-gradient-to-r from-sky-200 to-sky-300">
        <div className="navbar bg-gradient-to-r from-sky-200 to-sky-400">
          <div className="navbar-start">
            <div className="dropdown">
             
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gradient-to-r from-sky-100 to-sky-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navOptions}
              </ul>
            </div>
            <img
              src={logo}
              alt="Yusuf Agro Logo"
              className="w-24 h-auto rounded-full ml-2 mr-2 lg:ml-0"
            />
            <Link
              to="/"
              className="text-teal-700 text-2xl font-bold ml-2 lg:ml-0"
            >
              YUSUF AGRO
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navOptions}</ul>
          </div>
          <div className="navbar-end flex items-center">
            {user ? (
              <>
                <div
                  onClick={logOut}
                  className="px-4 py-2 bg-transparent border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all flex items-center cursor-pointer"
                >
                  <FaSignInAlt className="mr-2" /> Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 bg-blue-500 text-white  rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 bg-green-500 text-white  rounded-lg shadow hover:bg-green-700 transition-transform transform hover:scale-105  flex items-center ml-2"
                >
                  <FaUserPlus className="mr-2" /> Sign Up
                </Link>
              </>
            )}
            <div className="hidden md:block ml-4">
              <img
                className="rounded-full"
                referrerPolicy="no-referrer"
                src={user && user.photoURL ? user.photoURL : avatarImg}
                alt="profile"
                height="30"
                width="30"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
