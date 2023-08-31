import Product from "@/models/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import mongoose from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
// if the categeoruy is matches then only the varinets are shows or also size
const Post = ({ addToCart, buyNow, product, variants }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setcolor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setcolor(product.color);
    setSize(product.size);
  }, [router.query]);
  const checkServiceAbility = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("Your Pincode Is Serviceable!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setService(false);
      toast.error("Your Pincode Is Not Servicable", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const refreshVariants = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`;
    router.push(url);
  };
  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + product.img.length) % product.img.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.img.length);
  };

  return (
    <>
      {" "}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-4 sm:px-2 sm:my-2 lg:px-8 py-16 mx-auto min-h-screen">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 relative group">
            <div className=" relative rounded-lg overflow-hidden transition-transform hover:scale-105">
              <div
                style={{
                  position: "relative",
                  paddingTop: "100%", // 1:1 aspect ratio
                }}
              >
                <img
                  alt={`Image ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition duration-300 transform"
                  src={product.img[currentImageIndex]}
                />
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-between items-center">
                <button
                  className="p-2 text-white rounded-full cursor-pointer focus:outline-none bg-black bg-opacity-50"
                  onClick={handlePrevImage}
                >
                  <BsChevronBarLeft size={20} />
                </button>
                <button
                  className="p-2 text-white rounded-full cursor-pointer focus:outline-none bg-black bg-opacity-50"
                  onClick={handleNextImage}
                >
                  <BsChevronBarRight size={20} />
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              {product.img.map((_, index) => (
                <div
                  key={index}
                  className={`mx-1 cursor-pointer ${
                    index === currentImageIndex
                      ? "text-indigo-500 text-3xl" // Increased font size for active dot
                      : "text-gray-300 text-2xl" // Smaller font size for inactive dots
                  } transition-transform hover:scale-125`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-indigo-600 tracking-widest">
              Shri_Ganesh_Fabrics
            </h2>

            <h1 className="text-gray-900 text-3xl title-font font-medium mb-2 mt-2">
              {product.title} ({product.size}/{product.color})
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">10 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed text-gray-600 mt-4">{product.desc}</p>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes("red") &&
                  Object.keys(variants["red"]).includes(size) && (
                    <button
                      onClick={(e) => {
                        refreshVariants(size, "red");
                      }}
                      className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "red" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("blue") &&
                  Object.keys(variants["blue"]).includes(size) && (
                    <button
                      onClick={(e) => {
                        refreshVariants(size, "blue");
                      }}
                      className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "blue" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("yellow") &&
                  Object.keys(variants["yellow"]).includes(size) && (
                    <button
                      onClick={(e) => {
                        refreshVariants(size, "yellow");
                      }}
                      className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "yellow" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("gray") &&
                  Object.keys(variants["gray"]).includes(size) && (
                    <button
                      onClick={(e) => {
                        refreshVariants(size, "gray");
                      }}
                      className={`border-2 ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "gray" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("pink") &&
                  Object.keys(variants["pink"]).includes(size) && (
                    <button
                      onClick={(e) => {
                        refreshVariants(size, "pink");
                      }}
                      className={`border-2 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "pink" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("green") &&
                  Object.keys(variants["green"]).includes(size) && (
                    <button
                      onClick={(e) => {
                        refreshVariants(size, "green");
                      }}
                      className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "green" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    value={size}
                    onChange={(e) => {
                      refreshVariants(e.target.value, color);
                    }}
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    {Object.keys(variants[color]).includes("single") && (
                      <option value={"single"}> Single </option>
                    )}
                    {Object.keys(variants[color]).includes("double") && (
                      <option value={"double"}> Double </option>
                    )}
                    {Object.keys(variants[color]).includes("queen") && (
                      <option value={"queen"}> Queen </option>
                    )}
                    {Object.keys(variants[color]).includes("king") && (
                      <option value={"king"}> King </option>
                    )}
                    {Object.keys(variants[color]).includes("s") && (
                      <option value={"s"}>S</option>
                    )}

                    {Object.keys(variants[color]).includes("m") && (
                      <option value={"m"}>M</option>
                    )}

                    {Object.keys(variants[color]).includes("l") && (
                      <option value={"l"}>L</option>
                    )}

                    {Object.keys(variants[color]).includes("xl") && (
                      <option value={"xl"}>XL</option>
                    )}

                    {Object.keys(variants[color]).includes("xxl") && (
                      <option value={"xxl"}>XXL</option>
                    )}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex  flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              {product.availableQty > 0 && (
                <span className="title-font font-medium text-2xl text-indigo-900">
                  ₹{product.price}
                </span>
              )}
              {product.availableQty <= 0 && (
                <span className="title-font font-medium text-2xl text-red-900">
                  Currenty Unavailable!
                </span>
              )}

              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color,
                      "Cotton"
                    );
                  }}
                  className="disabled:bg-indigo-300 transition ease-in-out delay-150 bg-indigo-600 hover:-translate-y-1 hover:scale-1 duration-100 flex justify-center items-center text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 rounded"
                >
                  Add to Cart
                </button>
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color,
                      "Cotton"
                    );
                  }}
                  className="disabled:bg-indigo-300 transition ease-in-out delay-150 bg-indigo-600 hover:-translate-y-1 hover:scale-1 duration-100 flex justify-center items-center text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 rounded"
                >
                  Buy Now
                </button>
                <button className="rounded-full bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="pin mt-6 flex space-x-2 text-sm">
              <input
                onChange={onChangePin}
                className=" px-2 border-2 border-indigo-500 rounded-lg "
                placeholder="Enter Your PinCode"
                type="text"
              />
              <button
                onClick={checkServiceAbility}
                className=" transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-1 duration-100 flex ml-auto text-white border-0 py-2 px-6 focus:outline-none  hover:bg-indigo-600 rounded"
              >
                Check
              </button>
            </div>
          </div>
          {!service && service != null && (
            <div className="text-red-700 text-sm mt-3">
              Sorry!We can't deliver to this pincode yet
            </div>
          )}
          {service && service != null && (
            <div className="text-indigo-700 text-sm mt-3">
              Yes !This pincode is Serviceable
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}
export default Post;
