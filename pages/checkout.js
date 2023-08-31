import React, { useEffect, useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/router";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [name, setname] = useState(" ");
  const [email, setemail] = useState(" ");
  const [phone, setphone] = useState(" ");
  const [address, setaddress] = useState(" ");
  const [pincode, setpincode] = useState("");
  const [state, setstate] = useState(" ");
  const [city, setcity] = useState(" ");
  const [disabled, setDisabled] = useState(true);
  const [user, setuser] = useState({ value: null });
  const [paymentMethod, setPaymentMethod] = useState("online");
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.token) {
      setuser(myuser);
      setemail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);
  useEffect(() => {
    if (name && email && phone && address && pincode) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });
  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    console.log(res);
    setname(res.name);
    setaddress(res.address);
    getPincode(res.pincode);
    setphone(res.phone);
  };
  const getPincode = async (pincode) => {
    try {
      const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      const pinJson = await pins.json();
      if (Object.keys(pinJson).includes(pincode)) {
        setstate(pinJson[pincode][0]);
        setcity(pinJson[pincode][1]);
      } else {
        setstate("");
        setcity("");
      }
    } catch (error) {
      console.error("Error fetching pincode details:", error);
      setstate("");
      setcity("");
    }
  };
  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    } else if (e.target.name === "email") {
      setemail(e.target.value);
    } else if (e.target.name === "address") {
      setaddress(e.target.value);
    } else if (e.target.name === "phone") {
      setphone(e.target.value);
    } else if (e.target.name === "pincode") {
      const pincode = e.target.value.slice(0, 6);
      setpincode(pincode);
      if (pincode.length === 6) {
        getPincode(pincode);
      } else {
        setstate("");
        setcity("");
      }
    }
  };

  const initiatePayment = async () => {
    const data = {
      cart: cart,
      subTotal,
      email: email,
      name: name,
      address: address,
      pincode: pincode,
      phone: phone,
      state: state,
      city: city,
      paymentMethod: paymentMethod,
    };

    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/razorpay`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: data.subTotal,
          currency: "INR",
          email: data.email,
          name: data.name,
          address: data.address,
          phone: data.phone,
          pincode: data.pincode,
          cart: data.cart,
          state: data.state,
          city: data.city,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const orderDetails = await orderRes.json();
    if (!orderDetails.success) {
      clearCart();
      toast.error(orderDetails.error, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const options = {
      key: process.env.RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
      amount: orderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Shri_Ganesh_Fabrics",
      description: "premium seller",
      image: (
        <Image
          className="rounded-3xl"
          src="/logo.jpg"
          alt=""
          width={200}
          height={20}
        />
      ),
      order_id: orderDetails.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/postTranscation`,
      // on call back url push other information
      notes: {
        address: "Rajasthan, India",
      },
      theme: {
        color: "#7b68ee",
      },
    };
    var paymentObject = new Razorpay(options);
    paymentObject.open();
  };
  const initiateCodPayment = async () => {
    // Create an object with the necessary data for the order
    const data = {
      cart: cart,
      subTotal,
      email: email,
      name: name,
      address: address,
      pincode: pincode,
      phone: phone,
      state: state,
      city: city,
      amount: subTotal, // You can adjust this based on your logic
      paymentMethod: "cod", // Indicate the payment method
    };

    try {
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/razorpay`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const orderDetails = await orderRes.json();

      if (orderDetails.success) {
        // Handle success, show confirmation or redirect to a thank you page
        clearCart(); // redirection from here
        toast.success("Order placed successfully!", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          if (orderDetails.additionalInfo && orderDetails.additionalInfo._id) {
            const orderId = orderDetails.additionalInfo._id;
            window.location.href = `/order?clearCart=1&id=${orderId}`;
          } else {
            console.error("Order ID is missing in orderDetails:", orderDetails);
          }
        }, 3000);
           // Adjust the delay time as needed
      } else {
        // Handle error, show error message to the user
        toast.error(orderDetails.error, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error initiating COD payment:", error);
    }
  };
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = () => {
    if (paymentMethod === "online") {
      initiatePayment();
    } else if (paymentMethod === "cod") {
      initiateCodPayment();
    }
  };
  return (
    // you can set your cart by using container property
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div>
        <div className="container px-2 sm:m-auto">
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>

        <div>
          {" "}
          <title>checkout-Shri_ganesh_fabrics</title>
          <h1 className="  font-bold text-3xl my-8 text-center text-indigo-600 hover:text-indigo-900">
            CheckOut
          </h1>
          <h2 className="text-xl font-bold  "> 1.Delivery Details</h2>
          <div className="mx-auto flex my-4 ">
            <div className="px-2 w-1/2">
              <div className=" mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Enter Your Name
                </label>
                <input
                  onChange={handleChange}
                  value={name}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className=" mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                {user && user.token ? (
                  <input
                    value={user.email}
                    type="email"
                    id="email"
                    name="email"
                    className=" w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    readOnly
                  />
                ) : (
                  <input
                    onChange={handleChange}
                    value={email}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="px-2 w-full">
            <div className=" mb-4">
              <label
                htmlFor="Address"
                className="leading-7 text-sm text-gray-600"
              >
                Address
              </label>
              <textarea
                onChange={handleChange}
                value={address}
                name="address"
                id="address"
                cols="30"
                rows="2"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
          </div>
          <div className="mx-auto flex my-4 ">
            <div className="px-2 w-1/2">
              <div className=" mb-4">
                <label
                  htmlFor="Phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                  onChange={handleChange}
                  value={phone}
                  type="phone"
                  id="phone"
                  name="phone"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className=" mb-4">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  Pincode
                </label>
                <input
                  placeholder="Order recived pincode"
                  onChange={handleChange}
                  value={pincode}
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto flex my-4 ">
            <div className="px-2 w-1/2">
              <div className=" mb-4">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  State
                </label>
                <input
                  onChange={handleChange}
                  value={state}
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className=" mb-4">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  District
                </label>
                <input
                  onChange={handleChange}
                  value={city}
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold  "> 2.Review Cart Items & Pay</h2>
          <div className=" z-50  sideCart hover:opacity-100 bg-indigo-50 px-8 py-10 ">
            <ol className="list-decimal font-semibold">
              {Object.keys(cart).length == 0 && (
                <div className="my-4 font-semibold mx-auto ml-6 justify-center items-center">
                  Your Cart Is Empty!
                </div>
              )}
              {Object.keys(cart).map((k) => {
                return (
                  <li key={k}>
                    <div className="item flex my-5">
                      <div className="w-2/3 font-semibold">
                        {cart[k].name}({cart[k].size}/{cart[k].varient})
                      </div>
                      <div className=" flex font-semibold items-center justify-center w-1/3 text-lg ">
                        <AiOutlineMinusSquare
                          onClick={() => {
                            removeFromCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].varient
                            );
                          }}
                          className="cursor-pointer text-grey-50"
                        />
                        <span className="mx-2">{cart[k].qty}</span>{" "}
                        <AiOutlinePlusSquare
                          onClick={() => {
                            addToCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].varient
                            );
                          }}
                          className="cursor-pointer text-grey-50"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
              <span className="total font-bold">SubTotal:₹{subTotal}</span>
            </ol>
            <Link href={"/checkout"}>
              {" "}
              <button className="flex mx-auto text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg">
                <BsFillBagCheckFill className="mt-1" /> Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="flex mx-auto mt-2 text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg"
            >
              {" "}
              Clear Cart
            </button>
          </div>
          <div className="mx-auto flex my-4">
            <label className="px-2 flex items-center">
              <input
                type="radio"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => handlePaymentMethodChange("online")}
                className="mr-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-lg font-semibold text-gray-800">
                Online Payment
              </span>
            </label>
            <label className="px-2 flex items-center">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => handlePaymentMethodChange("cod")}
                className="mr-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-lg font-semibold text-gray-800">
                Cash on Delivery
              </span>
            </label>
          </div>
          <div className="mx-4">
            <Link href={"/checkout"}>
              {" "}
              <button
                onClick={handlePayment}
                disabled={disabled}
                className="disabled:bg-indigo-300 flex mx-auto text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                <BsFillBagCheckFill className="mt-1" /> Pay-Now ₹{subTotal}{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default checkout;
