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
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };
  // if we want to fit the large image remove the block property
  const ref = useRef();
  return (
    <>
      {!sidebar && (
        <span
          onMouseOver={() => {
            SetdropDown(true);
          }}
          onMouseLeave={() => SetdropDown(false)}
          className="fixed right-14 top-10 z-30 cursor-pointer "
        >
          {dropDown && (
            <div className="absolute top-6 right-5 rounded-md py-6 px-4 mx-4 w-32 z-30  "style={{
                      background:
                        "linear-gradient(to left, #6574cd, #7886d1, #b2b0e1, #e0aaff)",
                    }}>
              <ul>
                <Link href={"/myaccount"}>
                  {" "}
                  <li className="py-1 hover:text-indigo-700 text-sm transition duration-300 ease-in-out transform hover:-translate-y-1 ">
                    My Account
                  </li>
                </Link>
                <Link href="/orders">
                  <li className="py-1 hover:text-indigo-700 text-sm transition duration-300 ease-in-out transform hover:-translate-y-1">
                    My Orders
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className="py-1 hover:text-indigo-700 text-sm transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && (
            <MdAccountCircle className="text-2xl md:text-2xl ml-2 mr-4 md:mr-8 text-black-900 hover:text-indigo-900 transition duration-100 ease-in-out cursor-pointer md:mx-2" />
          )}
        </span>
      )}
      <div
        className={`flex  flex-col md:flex-row md:justify-start  justify-center items-center py-2 shadow-md sticky top-0  bg-indigo-50 z-10 ${
          !sidebar && "overflow-hidden"
        } `}
      >
        <Link href={"/"} className="logo mr-auto md:mx-5 ">
          <Image
            className="rounded-3xl"
            src="/logo.jpg"
            alt=""
            width={150} // Adjust the width as needed
            height={15} // Adjust the height as needed
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Link>
        <div className=" flex nav mx-3">
          <ul className="flex items-center space-x-6 font-semibold">
            <Link href="/badsheet">
              <li className="hover:text-indigo-900 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-indigo-600">
                Bedsheets
              </li>
            </Link>
            <Link href="/pillowcover">
              <li className="hover:text-indigo-900 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-indigo-600">
                Pillow Covers
              </li>
            </Link>
            <Link href="/dohar">
              <li className="hover:text-indigo-900 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-indigo-600">
                Jaipuri Dohars
              </li>
            </Link>
            <Link href="/suits">
              <li className="hover:text-indigo-900 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-indigo-600">
                Kurtis
              </li>
            </Link>
          </ul>
        </div>
        <div className="cursor-pointer items-center cart absolute right-2 top-10 mx-5 flex md:text-md md:text-2xl text-4xl">
          {!user.value && (
            <Link href="/login">
              <button className="bg-indigo-600 px-2 py-2 ml-2 mr-2 rounded-md text-white text-sm md:text-base hover:bg-indigo-700 transition duration-300 ease-in-out">
                Login
              </button>
            </Link>
          )}

          <FaCartArrowDown
            onClick={toggleCart}
            className="text-2xl md:text-2xl text-black-600 hover:text-indigo-900 transition duration-100 ease-in-out cursor-pointer md:mr-4"
          />
        </div>

        <div
  ref={ref}
  className={`h-[100vh] z-50 w-72 sideCart overflow-y-scroll absolute top-0 hover:opacity-100 bg-indigo-50 px-8 py-10 overflow-auto transition-all ${
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
                removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)
              }
              className="cursor-pointer text-gray-500 hover:text-indigo-600 transition duration-300 ease-in-out"
            />
            <span className="mx-1">{cart[k].qty}</span>{" "}
            <AiOutlinePlusSquare
              onClick={() =>
                addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)
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
  <Link href={"/checkout"}>
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

      </div>
    </>
  );
};

export default Navbar;
