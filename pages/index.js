import React from "react";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";
import FeaturedCategories from "@/components/FeaturedCategories";
const index = ({ products }) => {
  return (
<> 
<Script src="https://checkout.razorpay.com/v1/checkout.js" />
<div className="hero-banner">
        <div className="hero-content">
            <h1 className="hero-title">Welcome to Our Store</h1>
            <p className="hero-description">Discover a world of amazing products.</p>
            <Link href="#" className="hero-button">Shop Now</Link>
        </div>
    </div>
   
    <div>
    <div className="container mx-auto py-4 text-center">
      <h1 className="text-2xl sm:text-2xl md:text-2xl font-bold text-orange-300 transition duration-300 hover:text-red-200">
      Categories
      </h1>
    </div>
      <FeaturedCategories />
    </div>


    <title> Shri_Ganesh_Fabrics</title>
     <meta name="description" content="Badsheet-Hub For Your Family" />
     <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <h1 className="text-3xl text-center font-semibold mb-8 text-indigo-600 hover:text-indigo-900 transition duration-300 ease-in-out">
      Best Selling Products
    </h1>
    <div className="flex flex-wrap -m-4">
      {Object.keys(products).map((item, index) => {
        const isEvenIndex = index % 2 === 0;
        return (
          <div
            key={products[item]._id}
            className={`p-4 lg:w-1/4 md:w-1/2 sm:w-1/2 ${
              isEvenIndex ? "lg:pr-2" : "lg:pl-2"
            }`}
          >
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <Link passHref={true} href={`/product/${products[item].slug}`} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                <img
                  className="lg:h-72 md:h-60 md:mx-20 w-full lg:mx-20  h-auto object-cover object-center transition-transform hover:scale-105"
                  src={products[item].img}
                  alt="ecommerce"
                />
              </Link>
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-900 hover:text-indigo-600 transition duration-300 ease-in-out mb-2">
                  {products[item].title}
                </h2>

                <div className="flex items-center flex-wrap">
                  <Link passHref={true} href={`/product/${products[item].slug}`} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 hover:text-indigo-900 transition duration-300 ease-in-out">
                    More..
                    <svg
                      className="w-4 h-4 ml-2 text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      className="w-4 h-4 mr-1 text-indigo-500"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    1.2K
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg
                      className="w-4 h-4 mr-1 text-indigo-500"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                    6
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>


<section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Bedsheets for your happy family
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            The bedsheet designs come in different sizes, such as single, double, and so on.
            Ensure that the bed sheets you choose are the right size and fit for your specific bed type. Standard bed sheet sizes include twin, full, queen, and king.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                1. Introduction:
                </h2>
                <p className="leading-relaxed text-base">
                Welcome to Shri_Ganesh_Fabrics, your ultimate destination for luxurious and comfortable bedsheets and fabrics. We specialize in providing top-notch quality products that transform your sleeping experience into a realm of pure bliss. 
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                2. Unmatched Comfort:
                </h2>
                <p className="leading-relaxed text-base">
                Indulge in the epitome of comfort with our exclusive range of bedsheets and fabrics. Crafted from the finest cotton, our products are renowned for their softness, breathability, and durability.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                3. Elegance and Design:
                </h2>
                <p className="leading-relaxed text-base">
                Discover a world of elegance and design as you explore our curated selection of exquisite bedsheets. From timeless classics to contemporary patterns, our designs reflect your unique personality and enhance the aesthetic appeal of your living space.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                4. Ethical Craftsmanship:
                </h2>
                <p className="leading-relaxed text-base">
                At Shri_Ganesh_Fabrics, we prioritize ethical craftsmanship and sustainability. Our fabrics are sourced responsibly, ensuring a minimal impact on the environment while supporting local artisans. We take pride in offering you products that align with your values, allowing you to make conscious choices without compromising on quality or style.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                5. Personalized Comfort:
                </h2>
                <p className="leading-relaxed text-base">
                Your comfort is our priority, and we offer a wide range of sizes, colors, and designs to cater to your individual preferences. Whether you're seeking a cozy haven for yourself or outfitting an entire family's sleep sanctuary, we have the perfect bedding solution for you. Elevate your space with our personalized offerings, and transform your bedroom into a haven of relaxation and style.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                6. Endless Possibilities:
                </h2>
                <p className="leading-relaxed text-base">
                Step into a world of endless possibilities with Shri_Ganesh_Fabrics' versatile collection of bedsheets and fabrics. Our range caters to various tastes, from minimalist designs that exude sophistication to vibrant prints that add a pop of color to your bedroom. Whether you're seeking a serene sanctuary or a lively atmosphere, our products empower you to create the ambiance that resonates with your lifestyle.
                </p>
              </div>
            </div>
          </div>
         
        </div>
      </section>
</>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "index" });
  let index = {};
  for (let item of products) {
    if (item.title in index) {
      if (
        !index[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        index[item.title].color.push(item.color);
      }
      if (
        !index[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        index[item.title].size.push(item.size);
      }
    } else {
      index[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        index[item.title].color = [item.color];
        index[item.title].size = [item.size];
      } else {
        index[item.title].color = [];
        index[item.title].size = [];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(index)) }, // will be passed to the page component as props
  };
}

export default index;
