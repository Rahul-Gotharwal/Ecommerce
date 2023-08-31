import Image from "next/image";
import { Inter } from "next/font/google";
import React ,{useState,useEffect} from "react";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import { BsChevronBarLeft,BsChevronBarRight } from "react-icons/bs";
import{RxDotFilled} from 'react-icons/rx'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { lib } from "crypto-js";
export default function Home() {
  const sliders = [
    {
      url:'https://img.freepik.com/free-psd/cozy-bedroom-hotel-room-with-double-bed-wooden-furniture_176382-1513.jpg?w=1380&t=st=1689263423~exp=1689264023~hmac=54070a97201898d294b2c2efce5c7c114dc96773206b34f0fecb109b1f6f6b0f'

    },
    {
      url:'https://images.pexels.com/photos/7018391/pexels-photo-7018391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    },
    {
      url:'https://images.pexels.com/photos/6438767/pexels-photo-6438767.jpeg?auto=compress&cs=tinysrgb&w=1600'

    },
    {
      url:'https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    },
    {
      url:'https://images.pexels.com/photos/7535008/pexels-photo-7535008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    },
    {
      url:'https://images.pexels.com/photos/7031735/pexels-photo-7031735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    },
    {
      url:'https://images.pexels.com/photos/763146/pexels-photo-763146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    },
    {
      url:'https://images.pexels.com/photos/763146/pexels-photo-763146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    },
    {
      url:'https://images.pexels.com/photos/2471188/pexels-photo-2471188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    },
  ]
  const [currentIndex ,setCurrentIndex] = useState(0)
  const prevSlide = ()=> {
    const isFirstSlide = currentIndex===0;
    const newIndex = isFirstSlide? sliders.length-1:currentIndex-1;
    setCurrentIndex(newIndex);
  }
  const nextSlide = ()=> {
    const isLastslide = currentIndex === sliders.length-1;
    const newIndex = isLastslide ? 0 :currentIndex+1;
    setCurrentIndex(newIndex);
  }
  const goToSlide = (slideIndex)=>{
    setCurrentIndex(slideIndex)
  }
  useEffect(() => {
    // Automatically switch to the next slide every 2 seconds
    const interval = setInterval(nextSlide, 3000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    <main>

      <title> Shri_Ganesh_Fabrics</title>
      <meta name="description" content="Badsheet-Hub For Your Family" />
    
      <div>
        <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group  ">
          <div style={{backgroundImage: `url(${sliders[currentIndex].url})`}} className="w-full h-full rounded-2xl bg-center bg-cover duration-500 "></div>
        <div className=" hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronBarLeft onClick={prevSlide} size={30}/>
        </div>
        <div className=" hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronBarRight onClick={nextSlide} size = {30}/>
        </div>
        <div className=" flex top-4 justify-center py-2">
        { sliders.map((slide,slideIndex)=>(
         <div key={slideIndex} onClick={()=>goToSlide(slideIndex)} className="text-2xl cursor-pointer">
          <RxDotFilled/>
         </div>
        ))}
        </div>
        </div>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Bedsheets for your happy Family
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
    
    </main>
    </>
  );
}
