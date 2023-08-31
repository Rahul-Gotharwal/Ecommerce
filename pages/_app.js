import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Domine } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar'
import Layout from "@/components/Layout";
import Router from 'next/router';
const oswald = Domine({
  subsets:['latin'],weight:'500'
})
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user , setUser] = useState({value:null})
  const [ key , setKey] = useState()
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // This event will be triggered when the route changes (page navigation starts)
    const handleStart = () => {
      setIsLoading(true);
    };

    // This event will be triggered when the route changes (page navigation completes)
    const handleComplete = () => {
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []); // Only run this effect once, on component mount

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart',()=>{
      setProgress(40)
    }) 
      router.events.on('routeChangeComplete',()=>{
        setProgress(100)
      })
    
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
   const myuser = JSON.parse( localStorage.getItem('myuser'))
   if(myuser ){
   setUser ({value:myuser.token,email:myuser.email})
   }
   setKey(Math.random)
  }, [router.query]);
  const logout  =() =>{
    localStorage.removeItem('myuser')
    setUser({value:null})
    setKey(Math.random())
    router.push('/')
  }
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i<keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };
  const addToCart = (itemCode, qty, price,name, size, varient) => {
    if(Object.keys(cart).length==0){
      setKey(Math.random())
    }
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, varient };
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const buyNow=(itemCode, qty, price,name, size, varient)=>{
    let newCart = {}
    newCart [itemCode]={qty: 1, price, name, size, varient }
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
    }
  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const removeFromCart = (itemCode, qty, name, size, varient) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };
  return (
    <>
    <Layout isLoading={isLoading}>
    </Layout>
    <main className={oswald.className} >
       <LoadingBar 
        color='#5d198e'
        waitingTime={500}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {" "}
    { key && <Navbar logout={logout} user={user} key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />}{" "}
      <Component   buyNow ={buyNow} cart={cart} addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal} {...pageProps} /> <Footer />{" "}
    </main>
    </>
  );
}
