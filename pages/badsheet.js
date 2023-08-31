import React from "react";
import Image from "next/image";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";
const badsheet = ({ products }) => {
  return (
    <div>
   <section className="text-gray-600 body-font min-h-screen">
  <div className="container px-5 py-12 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      {Object.keys(products).map((item) => {
        return (
          <div
            key={products[item]._id}
            className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer"
          >
            <Link
              passHref={true}
              href={`/product/${products[item].slug}`}
              className="block relative rounded overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
            >
              <img
                alt="ecommerce"
                className="m-auto h-[30vh] md:h-[36vh] object-center object-cover block w-full transition duration-300 ease-in-out transform hover:scale-105"
                src={products[item].img}
              />
              
            </Link>
            <div className="mt-4 text-center md:text-left">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                Bedsheets
              </h3>
              <h2 className="text-gray-700 text-lg font-semibold title-font mb-1">
                {products[item].title}
              </h2>
              <p className="mt-1 text-indigo-600 font-semibold">
                ₹{products[item].price}
              </p>
              <div className="mt-1 flex flex-wrap items-center">
                {products[item].size.includes("single") && (
                  <span className="border border-gray-300 px-2 py-1 mx-1 text-gray-600 rounded-md">
                    Single
                  </span>
                )}
                {products[item].size.includes("double") && (
                  <span className="border border-gray-300 px-2 py-1 mx-1 text-gray-600 rounded-md">
                    Double
                  </span>
                )}
                {products[item].size.includes("queen") && (
                  <span className="border border-gray-300 px-2 py-1 mx-1 text-gray-600 rounded-md">
                    Queen
                  </span>
                )}
                {products[item].size.includes("king") && (
                  <span className="border border-gray-300 px-2 py-1 mx-1 text-gray-600 rounded-md">
                    King
                  </span>
                )}
              </div>
              <div className="mt-1">
                {products[item].color.includes("pink") && (
                  <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
                  {products[item].color.includes("pink") && (
                  <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
                {products[item].color.includes("green") && (
                  <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
                {products[item].color.includes("blue") && (
                  <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
                {products[item].color.includes("gray") && (
                  <button className="border-2 border-gray-300 ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
                {products[item].color.includes("yellow") && (
                  <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "badsheet" });
  let badsheet = {};
  for (let item of products) {
    if (item.title in badsheet) {
      if (
        !badsheet[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        badsheet[item.title].color.push(item.color);
      }
      if (
        !badsheet[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        badsheet[item.title].size.push(item.size);
      }
    } else {
      badsheet[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        badsheet[item.title].color = [item.color];
        badsheet[item.title].size = [item.size];
      } else {
        badsheet[item.title].color = [];
        badsheet[item.title].size = [];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(badsheet)) }, // will be passed to the page component as props
  };
}

export default badsheet;
