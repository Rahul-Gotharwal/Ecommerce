import React from "react";
import Image from "next/image";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";
const suits = ({ products }) => {
  return (
    //badsheets = suitcover
    //badsheet = suit =< categeory
    <div>
      <section className="mx-5 text-gray-600 body-font min-h-screen ">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap  -m-4 justify-center ">
          {Object.keys(products).length===0 && <p> Sorry!all the suits are currently out of stock coming soon . Stay tuned! </p>}
            {Object.keys(products).map((item) => {
              return (
                <div
                  key={products[item]._id}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg"
                >
                  <Link
                    passHref={true}
                    href={`/product/${products[item].slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="m-auto h-[30vh] md:-[36vh] object-center object-cover  block"
                      src={products[item].img}
                    />
                  </Link>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className=" text-gray-500 text-xs tracking-widest title-font mb-1">
                      Suits
                    </h3>
                    <h2 className=" text-gray-500 text-lg font-medium title-font mb-1">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes('xl') && 
                        <span className="border border-gray-300 px-1 mx-1">Xl</span>
                      }
                      {products[item].size.includes('s') && 
                        <span className="border border-gray-300 px-1 mx-1">S</span>
                      }
                      {products[item].size.includes('m') && 
                        <span className="border border-gray-300 px-1 mx-1">M</span>
                      }
                      {products[item].size.includes('l') && 
                        <span className="border border-gray-300 px-1 mx-1">L</span>
                      }
                       {products[item].size.includes('xl') && 
                        <span className="border border-gray-300 px-1 mx-1">Xl</span>
                      }
                       {products[item].size.includes('xxl') && 
                        <span className="border border-gray-300 px-1 mx-1">XXL</span>
                      }
                    </div>
                    <div className="mt-1">
                    {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('gray') && <button className="border-2 border-gray-300 ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
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

  let products = await Product.find({ category: "suit" });
  let suit = {};
  for (let item of products) {
    if (item.title in suit) {
      if (
        !suit[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        suit[item.title].color.push(item.color);
      }
      if (
        !suit[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        suit[item.title].size.push(item.size);
      }
    } else {
      suit[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        suit[item.title].color = [item.color];
        suit[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(suit)) }, // will be passed to the page component as props
  };
}

export default suits;
