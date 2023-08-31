import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const myaccount = () => {
  const [name, setname] = useState(" ");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState(" ");
  const [address, setaddress] = useState(" ");
  const [pincode, setpincode] = useState("");
  const [user, setuser] = useState({ value: null });
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
      setemail(myuser.email);
    }
    if (myuser && myuser.token) {
      setuser(myuser);
      setemail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);
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
    setpincode(res.pincode);
    setphone(res.phone);
  };
 
  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, pincode, phone };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success){

    
    toast.success( "Details are updated successfully!", {
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
  };
  const handlePasswordSubmit = async () => {
    let res;
    if(npassword==cpassword){
    let data = { token: user.token, password,cpassword ,npassword};
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
     res = await a.json();
  }
  else{
    res = {success:false}
  }
    if (res.success){
    toast.success( "Password updated successfully!", {
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
    else{
      toast.error( "Error updating password!", {
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
    setPassword('')
    setCpassword('')
    setNpassword('')
  };
  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    } else if (e.target.name === "address") {
      setaddress(e.target.value);
    } else if (e.target.name === "phone") {
      setphone(e.target.value);
    } else if (e.target.name === "pincode") {
      setpincode(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    }
    else if (e.target.name === "npassword") {
      setNpassword(e.target.value);
    }
  };

  return (
    <>
      <div className="container mx-auto my-9 ">
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
        <h1 className="text-xl text-center font-bold mb-4">Update your account!</h1>
        <h2 className="text-xl font-bold  "> 1.Delivery Details</h2>
        <div className="mx-auto flex flex-wrap my-4">
  <div className="px-2 w-full md:w-1/2">
    <div className="mb-4">
      <label htmlFor="name" className="leading-7 text-sm text-gray-600">
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
  <div className="px-2 w-full md:w-1/2">
    <div className="mb-4">
      <label htmlFor="email" className="leading-7 text-sm text-gray-600">
        Email (Cannot be Updated!)
      </label>
      {user && user.token ? (
        <input
          value={user.email}
          type="email"
          id="email"
          name="email"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
        <button
          onClick={handleUserSubmit}
          className="disabled:bg-indigo-300 flex mb-5 mx-auto text-white bg-indigo-600 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Submit
        </button>
        <h2 className=" flex text-xl font-bold  "> 2.Change Password</h2>
        <div className="mx-auto flex flex-wrap my-4">
  <div className="px-2 w-full md:w-1/2">
    <div className="mb-4">
      <label htmlFor="password" className="leading-7 text-sm text-gray-600">
        Password
      </label>
      <input
        onChange={handleChange}
        value={password}
        type="password"
        id="password"
        name="password"
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
  </div>
  <div className="px-2 w-full md:w-1/2">
    <div className="mb-4">
      <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">
        New Password
      </label>
      <input
        onChange={handleChange}
        value={npassword}
        type="password"
        id="npassword"
        name="npassword"
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
  </div>
  <div className="px-2 w-full md:w-1/2">
    <div className="mb-6">
      <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">
        Confirm Password!
      </label>
      <input
        onChange={handleChange}
        value={cpassword}
        type="password"
        id="cpassword"
        name="cpassword"
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
  </div>
</div>

        <button onClick={handlePasswordSubmit} className="disabled:bg-indigo-300 flex mb-5 mx-auto text-white bg-indigo-600 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Submit
        </button>
      </div>
    </>
  );
};

export default myaccount;
