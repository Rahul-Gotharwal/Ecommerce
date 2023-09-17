import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
    
    <Link href ={"/"} className="flex title-font font-medium cursor-pointer items-center md:justify-start justify-center text-gray-900">
        <Image src="/logo.jpg" alt="" width={600} height={300} />
      </Link>
      <p className="mt-2 text-sm text-gray-500">Badsheets and other beautiful fabrics for your happy family</p>
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SHOP</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/badsheet'} className="text-indigo-300 hover:text-indigo-600">Bedsheet</Link>
          </li>
          
          <li>
            < Link href={'/pillowcover'} className="text-indigo-300 hover:text-indigo-600">Pillow_Cover</Link>
          </li>
          <li>
            <Link href={'/dohar'} className="text-indigo-300 hover:text-indigo-600">Jaipuri_Dohar</Link>
          </li>
          <li>
            <Link  href={'/suits'} className="text-indigo-300 hover:text-indigo-600">Kurties</Link>
          </li>

        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10">
          <li>
            <a className="text-indigo-300 hover:text-indigo-600">First Link</a>
          </li>
          <li>
            <a className="text-indigo-300 hover:text-indigo-600">Second Link</a>
          </li>
          <li>
            <a className="text-indigo-300 hover:text-indigo-600">Third Link</a>
          </li>
          <li>
            <a className="text-indigo-300 hover:text-indigo-600">Fourth Link</a>
          </li>
        </nav>
      </div>
      
    </div>
  </div>
  <div className="bg-white">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <div className="bg-white">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 Shri_Ganesh_Fabrics — All Rights Reserved</p>
        {/* Add the payment accepted image */}
        <img
  src="/payment.png"
  alt="Payment Accepted"
  className="w-full  lg:h-16  xl:h-16 ml-3"
/>

        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          {/* ... Social media icons ... */}
        </span>
      </div>
    </div>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a className="text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  </div>
</footer>
    </div>
  )
}
export default Footer
