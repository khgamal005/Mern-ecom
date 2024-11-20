import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';

function App() {
  const [cartProductCount,setCartProductCount] = useState(0)
  const [userDetails,setUserDetails] = useState()


  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        setUserDetails(dataApi.data)
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    // /**user Details cart product */
    fetchUserAddToCart()
  },[])

  return (
    <>
    <Context.Provider value={{
        fetchUserDetails,
        userDetails,
        setUserDetails,
        cartProductCount, // current user add to cart product count,
        fetchUserAddToCart
    }}>
      <ToastContainer
        position='top-right'
      />
      
      <Header/>
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet/>
      </main>
      <Footer/>
    </Context.Provider>
  </>
  );
}

export default App;
