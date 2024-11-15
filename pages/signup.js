 import React, { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { set } from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const signup = () => {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(()=>{
    if(localStorage.getItem('myuser')){
      router.push('/')
    }
  },[])

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {  name, email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    setEmail("");
    setName("");
    setPassword("");
    toast.success('your account has been created', {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      setTimeout(() => {
        router.push("/login")
       }, 2000);
       
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://static.vecteezy.com/system/resources/thumbnails/047/656/219/small_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
   <form onSubmit={handleSubmit} method="POST">
   <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
          <input  onChange={handleChange} value={name} id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input  onChange={handleChange} value={email} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          
        </div>
        <div className="mt-2">
          <input  onChange={handleChange} value={password} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button  onClick={handleSubmit} type="submit" className="flex mt-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
     login
      <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">login  account</Link>
    </p>
  </div>
</div>
  );
};

export default signup;
