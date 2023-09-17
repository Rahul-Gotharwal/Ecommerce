import React from 'react';
import Link from 'next/link';

const FeaturedCategories = () => {
  return (
    
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="flex flex-col gap-4  ">
          <div className="relative overflow-hidden rounded-lg">
            <img
              className="w-full object-cover "
              src="https://images.pexels.com/photos/4050430/pexels-photo-4050430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Sale"
            />
            <button className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-opacity-10 bg-black hover:bg-opacity-50 transition duration-100 ease-in-out">
              <Link href="/badsheet" className="link">
                Bedsheet
              </Link>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 ">
          <div className="relative overflow-hidden rounded-lg">
            <img
              className="w-full object-cover"
              src="https://images.pexels.com/photos/4070924/pexels-photo-4070924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Women"
            />
            <button className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-opacity-10 bg-black hover:bg-opacity-50 transition duration-100 ease-in-out">
              <Link href="/pillowcover" className="link">
                Pillow
              </Link>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 ">
          <div className="relative overflow-hidden rounded-lg  ">
            <img
              className="w-full object-cover"
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="New Season"
            />
            <button className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-opacity-10 bg-black hover:bg-opacity-50 transition duration-100 ease-in-out">
              <Link href="/badsheet" className="link">
                New Season
              </Link>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-4   ">
          <div className="relative overflow-hidden rounded-lg  ">
            <img
              className="w-full  object-cover"
              src="https://images.pexels.com/photos/2828584/pexels-photo-2828584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Men"
            />
            <button className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-opacity-10 bg-black hover:bg-opacity-50 transition duration-100 ease-in-out">
              <Link href="/dohar" className="link">
               Blanket
              </Link>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="relative overflow-hidden rounded-lg  ">
            <img
              className="w-full object-cover"
              src="https://images.pexels.com/photos/18241247/pexels-photo-18241247/free-photo-of-kathak.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Accessories"
            />
            <button className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-opacity-10 bg-black hover:bg-opacity-50 transition duration-100 ease-in-out">
              <Link href="/suits" className="link">
                Kurties
              </Link>
            </button>
          </div>
        </div>
        {/* Repeat similar code for other categories */}
      </div>
    </div>
  );
};

export default FeaturedCategories;
