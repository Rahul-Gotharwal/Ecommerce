import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import {
  AiFillCloseCircle,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { useRouter } from "next/router";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropDown, SetdropDown] = useState(false);
  const [sidebar, setsidebar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter;

  useEffect(() => {
    Object.keys(cart).length !== 0 && setsidebar(true);
    let exempted = ["/checkout", "/order", "/orders", "/myaccount"];
    if (exempted.includes(router.pathname)) {
      setsidebar(false);
    }
  }, []);

  const toggleCart = () => {
    setsidebar(!sidebar);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const ref = useRef();
  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm  ">
        <div className="container mx-auto px-2 py-2 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="md:hidden cursor-pointer" onClick={toggleMobileMenu}>
            <div
              className={`w-6 h-1 bg-black my-1 ${
                mobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-1 bg-black my-1 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-1 bg-black my-1 ${
                mobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </div>

          {/* Logo */}
          <Link href={"/"} className="logo mx-auto md:mx-0 flex items-center ">
            <Image
              className="rounded-xl"
              src="/shri.jpeg"
              alt=""
              width={70} // Adjust the width as needed
              height={4} // Adjust the height as needed
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Link>
          {!sidebar && !mobileMenuOpen && (
            <span
              onMouseOver={() => {
                SetdropDown(true);
              }}
              onMouseLeave={() => SetdropDown(false)}
              className="fixed right-14 top-2 z-30 cursor-pointer"
            >
              {/* Dropdown Menu */}
              {dropDown && (
                <div className="absolute top-2 right-4  rounded-md py-6 px-4 mx-4 w-32 z-30 bg-indigo-50">
                  <ul>
                    <Link href={"/myaccount"}>
                      <li className="py-1 hover:text-indigo-700 text-indigo-500 text-sm transition duration-300 ease-in-out transform hover:-translate-y-1">
                        My Account
                      </li>
                    </Link>
                    <Link href="/orders">
                      <li className="py-1 hover:text-indigo-700 text-sm transition  duration-300 ease-in-out  text-indigo-500 transform hover:-translate-y-1">
                        My Orders
                      </li>
                    </Link>
                    <li
                      onClick={logout}
                      className="py-1 hover:text-indigo-700 text-sm transition duration-300  text-indigo-500 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
              {user.value && (
                <MdAccountCircle
                  onClick={toggleCart}
                  className="text-2xl md:text-2xl text-black-600 hover:text-indigo-900 transition duration-100 ml-3 ease-in-out cursor-pointer md:mr-4 relative z-10 md:mt-6 hide-on-mobile"
                  style={{
                    position: "absolute",
                    right: "10px", // Adjust the right position as needed
                  }}
                />
              )}
            </span>
          )}

          <div
            className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-indigo-50 z-10 ${
              !sidebar && !mobileMenuOpen ? "overflow-hidden" : ""
            }`}
          ></div>
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6 font-semibold">
            <li className="hover:text-indigo-900 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-indigo-600">
              <Link href="/badsheet">Bedsheets</Link>
            </li>
            <li className="hover:text-indigo-900 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-indigo-600">
              <Link href="/pillowcover">Pillow Covers</Link>
            </li>
            <li className="hover:text-indigo-900 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-indigo-600">
              <Link href="/dohar">Jaipuri Dohars</Link>
            </li>
            <li className="hover:text-indigo-900 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-indigo-600">
              <Link href="/suits">Kurtis</Link>
            </li>
          </ul>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed top-0 left-0 h-screen w-screen bg-white transform transition-transform duration-300 ease-in-out filter drop-shadow-md">
  <div className="flex items-center justify-between filter drop-shadow-md bg-white h-20 px-4">
    <Link href="/">
      <Link href={"/"} className="logo mx-auto md:mx-0 flex items-center">
        <Image
          className="rounded-xl"
          src="/shri.jpeg"
          alt=""
          width={70} // Adjust the width as needed
          height={40} // Adjust the height as needed
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Link>
    </Link>
    <span
      onClick={toggleMobileMenu}
      className="text-2xl text-black-600 cursor-pointer hover:text-indigo-900 transition duration-300 ease-in-out mr-4"
    >
      <AiFillCloseCircle />
    </span>
  </div>
  <div className="flex flex-col ml-4">
    <Link href="/badsheet">
      <li className="menu-link">
        Bedsheets
      </li>
    </Link>
    <Link href="/pillowcover">
      <li className="menu-link">
        Pillow Covers
      </li>
    </Link>
    <Link href="/dohar">
      <li className="menu-link">
        Jaipuri Dohars
      </li>
    </Link>
    <Link href="/suits">
      <li className="menu-link">
        Kurtis
      </li>
    </Link>
    <ul>
      <Link href={"/myaccount"}>
        <li className="menu-link">
          My Account
        </li>
      </Link>
      <Link href="/orders">
        <li className="menu-link">
          Your Orders
        </li>
      </Link>
      <li onClick={logout} className="menu-link">
        Logout
      </li>
    </ul>
  </div>
</div>

    
          )}

          {/* Cart and Account Icons */}
          <div className="cursor-pointer items-center flex md:text-md md:text-xl text-4xl mr-3 ">
            {!user.value && (
              <Link href="/login">
                <button className="bg-indigo-600 px-1 py-1  mr-6  rounded-md text-white text-sm md:text-base hover:bg-indigo-700 transition duration-300 ease-in-out md:mx-2 right-6">
                  Login
                </button>
              </Link>
            )}
            <FaCartArrowDown
              onClick={toggleCart}
              className="text-2xl md:text-2xl text-black-600 hover:text-indigo-900 transition duration-100 ml-1 ease-in-out cursor-pointer md:mr-2 relative z-10"
              style={{
                position: "absolute",
                right: "10px", // Adjust the right position as needed
              }}
            />
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <div
        ref={ref}
        className={`h-[100vh] z-50 w-72 sideCart overflow-y-scroll fixed top-0 bg-indigo-50 px-8 py-10 overflow-auto transition-all ${
          sidebar ? "right-0" : "-right-96"
        }`}
      >
        <h2 className="font-bold text-2xl text-center mb-6">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-0 right-0 cursor-pointer text-2xl text-indigo-600 hover:text-indigo-600 transition duration-300 ease-in-out"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold text-center text-gray-600">
              Your Cart Is Empty!
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k} className="item flex my-5">
                <div className="w-2/3 font-semibold">
                  {cart[k].name} ({cart[k].size}/{cart[k].varient})
                </div>
                <div className="flex items-center justify-center w-1/3 text-lg">
                  <AiOutlineMinusSquare
                    onClick={() =>
                      removeFromCart(
                        k,
                        1,
                        cart[k].price,
                        cart[k].name,
                        cart[k].size,
                        cart[k].variant
                      )
                    }
                    className="cursor-pointer text-gray-500 hover:text-indigo-600 transition duration-300 ease-in-out"
                  />
                  <span className="mx-1">{cart[k].qty}</span>{" "}
                  <AiOutlinePlusSquare
                    onClick={() =>
                      addToCart(
                        k,
                        1,
                        cart[k].price,
                        cart[k].name,
                        cart[k].size,
                        cart[k].variant
                      )
                    }
                    className="cursor-pointer text-gray-500 hover:text-indigo-600 transition duration-300 ease-in-out"
                  />
                </div>
              </li>
            );
          })}
        </ol>
        <div className="total my-2 font-bold text-center">
          SubTotal: ₹{subTotal}
        </div>
        <Link href="/checkout">
          <button
            disabled={Object.keys(cart).length === 0}
            className="disabled:bg-indigo-400 flex mx-auto text-white bg-indigo-700 hover:bg-indigo-900 border-0 py-2 px-8 focus:outline-none rounded text-lg transition duration-300 ease-in-out"
          >
            <BsFillBagCheckFill className="mt-1" /> Checkout
          </button>
        </Link>
        <button
          disabled={Object.keys(cart).length === 0}
          onClick={clearCart}
          className="disabled:bg-indigo-400 flex mx-auto mt-2 text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg transition duration-300 ease-in-out"
        >
          Clear Cart
        </button>
      </div>
    </>
  );
};

export default Navbar;
