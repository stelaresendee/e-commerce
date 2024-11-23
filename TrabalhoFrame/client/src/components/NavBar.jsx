import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../pages/AuthProvider";

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const role = localStorage.getItem("userRole");

  return (
    <nav className="bg-gray-800 shadow fixed z-20 w-full text-white flex justify-between px-8 2xl:px-32 py-6 items-center">
      {/* Menu Principal */}
      <ul className="flex md:gap-16 gap-8 items-center">
        {role === "admin" ? (
          <>
          <li>
              <Link
                to="/admin"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Gerenciar Pedidos
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/home"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/my-orders"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Meus Pedidos
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Ações de Login/Logout e Carrinho */}
      <ul className="flex gap-12 items-center">
        {role !== "admin" && (
          <li>
            <Link
              to="/shoppingCart"
              className="relative text-white hover:text-gray-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="21.75"
                viewBox="0 0 576 512"
              >
                <path
                  className="fill-green-500"
                  d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192 32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512L430 512c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32l-85.6 0L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192l-232.6 0L253.3 35.1zM192 304l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm128 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                />
              </svg>
            </Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/"
              className="flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 512 512"
                className="mr-2"
              >
                <path
                  className="fill-green-500"
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                />
              </svg>
              Login
            </Link>
          </li>
        )}
        <li
          className={`w-3 h-3 rounded-full ${
            isLoggedIn ? "bg-green-500" : "bg-red-500"
          }`}
        ></li>
      </ul>
    </nav>
  );
};

export default NavBar;
