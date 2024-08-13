import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../../../assets/Black and Green Flat Illustrated Organic Cosmetics Logo.gif';
import useAuth from "../../../hooks/useAuth";
import avatarImg from '../../../assets/placeholder.jpg';
import { FaHome, FaSignInAlt, FaShoppingCart, FaShoppingBasket } from 'react-icons/fa';
import { PiCowFill } from "react-icons/pi";
import { GiBuffaloHead, GiCamel, GiGoat } from "react-icons/gi";
import { IoIosBookmarks } from "react-icons/io";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.dropdown')) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const navOptions = (
    <>
      <li>
        <Link
          to="/"
          className={`${
            activeLink === "/" ? "text-orange-600 text-xl font-bold" : "text-gray-700 text-lg"
          } hover:text-orange-600 transition-all duration-300 flex items-center`}
          onClick={() => handleLinkClick("/")}
        >
          <PiCowFill className="mr-2 text-orange-500 text-xl" />
          <FaHome className="mr-2" /> Home
        </Link>
      </li>
      <li>
        <Link
          to="/market"
          className={`${
            activeLink === "/market" ? "text-blue-700 text-xl font-bold" : "text-gray-700 text-lg"
          } hover:text-blue-700 transition-all duration-300 flex items-center`}
          onClick={() => handleLinkClick("/market")}
        >
          <GiGoat className="mr-2 text-blue-600 text-xl" />
          <FaShoppingCart className="mr-2" /> Market
        </Link>
      </li>
      <li>
        <Link
          to="/purchase"
          className={`${
            activeLink === "/purchase" ? "text-orange-600 text-xl font-bold" : "text-gray-700 text-lg"
          } hover:text-orange-600 transition-all duration-300 flex items-center`}
          onClick={() => handleLinkClick("/purchase")}
        >
          <GiCamel className="mr-2 text-orange-500 text-xl" />
          <FaShoppingBasket className="mr-2" /> My Purchase
        </Link>
      </li>
      <li>
        <Link
          to="/booking"
          className={`${
            activeLink === "/booking" ? "text-blue-700 text-xl font-bold" : "text-gray-700 text-lg"
          } hover:text-blue-700 transition-all duration-300 flex items-center`}
          onClick={() => handleLinkClick("/booking")}
        >
          <GiBuffaloHead className="mr-2 text-blue-600 text-xl" />
          <IoIosBookmarks className="mr-2" /> My Booking
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-300">
      <div className="navbar bg-gradient-to-r from-blue-200 to-blue-400 flex justify-between items-center px-4 py-2">
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Yusuf Agro Logo" className="w-20 h-auto rounded-full lg:w-24" />
          <span className="text-blue-800 text-xl lg:text-2xl font-bold">YUSUF AGRO</span>
        </Link>

        {/* Navigation links for medium and large devices */}
        <div className="hidden lg:flex space-x-4">
          <ul className="menu menu-horizontal">{navOptions}</ul>
        </div>

        {/* Menu for small devices */}
        <div className="dropdown lg:hidden relative">
          <button onClick={toggleMenu} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="bg-white absolute top-full  p-4 z-50 shadow-lg rounded-lg">
              <ul className="menu menu-sm">{navOptions}</ul>
            </div>
          )}
        </div>

        {/* User profile section */}
        <div className="flex items-center space-x-5 lg:space-x-7">
          {/* Authenticated user actions */}
          {user ? (
            <>
              <img
                className=" lg:block rounded-full cursor-pointer"
                referrerPolicy="no-referrer"
                src={user && user.photoURL ? user.photoURL : avatarImg}
                alt="profile"
                height="30"
                width="30"
              />
              <div
                onClick={logOut}
                className="px-3 py-2 bg-transparent border border-orange-600 font-bold text-orange-600 rounded-md hover:bg-orange-600 hover:text-white transition-all duration-300 flex items-center cursor-pointer"
              >
                <FaSignInAlt className="mr-2" /> Logout
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 bg-orange-600 text-white font-bold rounded-lg shadow hover:bg-orange-700 transition-transform transform hover:scale-105 flex items-center"
            >
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
