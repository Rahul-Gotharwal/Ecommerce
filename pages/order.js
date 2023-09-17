import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Order from "@/models/Order";
import mongoose from "mongoose";
const MyOrder = ({ newOrder, clearCart }) => {
  const router = useRouter();
  const products = newOrder.products;
  const [date, setdate] = useState();

  useEffect(() => {
    const d = new Date(newOrder.createdAt);
    setdate(d);
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm text-indigo-500 tracking-widest uppercase">
              Shri_Ganesh_Fabrics
            </h2>
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">
              Thank you, {newOrder.name}!
            </h1>
            <h1 className="text-gray-900 text-xl md:text-3xl font-semibold mb-2 md:mb-4">
              Order ID: {newOrder.orderId}
            </h1>

            <p className="leading-relaxed mb-4">
              {newOrder.status === "paid" ? (
                <>Hurry! Your order has been successfully placed!</>
              ) : newOrder.status === "Initiated" ? (
                <>
                  Hurry! Your order has been successfully placed! 
                </>
              ) : (
                <>Payment not received or choose Cash on Delivery (COD)</>
              )}
            </p>

            <p className="leading-relaxed mb-4 font-bold">
              Order Placed On:{" "}
              {date &&
                date.toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
            <p>
              Your Order Status Is:{" "}
              <span className="font-semibold text-indigo-500">
                {newOrder.status}
              </span>
            </p>
            <p>
              Your Payment Mode Is:{" "}
              <span className="font-semibold text-indigo-500">
                {newOrder.paymentMethod}
              </span>
            </p>
            <div className="flex items-center border-t border-gray-200 py-4">
              <div className="w-1/3 text-indigo-500">Item Description</div>
              <div className="w-1/3 text-center text-gray-600">Quantity</div>
              <div className="w-1/3 text-right text-gray-600">Total</div>
            </div>

            {Object.keys(products).map((key) => {
              const product = products[key];
              return (
                <div
                  key={key}
                  className="flex items-center border-t border-gray-200 py-4"
                >
                  <div className="w-1/3 text-gray-500">
                    {product.name} ({product.size}/{product.varient})
                  </div>
                  <div className="w-1/3 text-center text-gray-600 font-semibold">
                    {product.qty}
                  </div>
                  <div className="w-1/3 text-right text-gray-900 font-semibold">
                    ₹{product.price} X {product.qty} = ₹
                    {product.price * product.qty}
                  </div>
                </div>
              );
            })}
            <div className="flex my-8">
              <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
                <button className="flex items-center justify-center px-6 py-3 text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded-full w-full md:w-auto mb-2 md:mb-0 md:mr-2">
                  <span className="md:hidden">SubTotal:</span> ₹
                  {newOrder.amount}
                </button>
                <button className="flex items-center justify-center px-6 py-3 text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded-full w-full md:w-auto">
                  Track Your Order
                </button>
              </div>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded shadow-md"
            src="/logo1.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let newOrder = await Order.findById(context.query.id);

  return {
    props: {
      newOrder: JSON.parse(JSON.stringify(newOrder)),
    }, // will be passed to the page component as props
  };
}
export default MyOrder;
