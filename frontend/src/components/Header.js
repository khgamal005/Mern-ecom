/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import logo from "../assest/khaled.png";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify'


import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  let {userDetails,setUserDetails}=context
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)


  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
     setUserDetails(null); //

      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }}
  
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
                <Link to={"/"}>
                <img src={logo} alt="" className="h-12" />
                </Link>
            </div>

            <div className=' w-[75px] md:w-[250px] lg:w-[350px] lg:flex items-center justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} />
                <div className=' hidden  lg:flex  text-lg min-w-[50px] h-8 bg-red-600 items-center justify-center rounded-r-full text-white'>
                  <GrSearch />
                </div>
            </div>


            <div className='flex items-center gap-7'>
                
                <div className='relative flex justify-center'>

                {
                     userDetails?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                           userDetails?.profilePic ? (
                            <img src={ context.userDetails?.profilePic} className='w-10 h-10 rounded-full' 
                            alt={userDetails?.name} />
                          ) : (
                            <FaRegCircleUser/>
                          )
                        }
                      </div>
                    )
                  }
                  
                  
                  {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                        <nav>
                          {
                            userDetails?.role === ROLE.ADMIN && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap  md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                            )
                          }
                          <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' 
                          onClick={()=>setMenuDisplay(preve => !preve)}>Order</Link>
                         
                        </nav>
                      </div>
                    )
                  }
                 
                </div>

                  {
                    
                      <Link to={"/cart"} className='text-2xl relative'>
                          <span><FaShoppingCart/></span>
      
                          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 
                          flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>
                              <p className='text-sm'>{context.cartProductCount}</p>

                              </p>
                          </div>
                      </Link>
                      
                  }
              


                <div>
         
                {
                    userDetails?._id? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                    )
                  }
                    
                </div>

            </div>

      </div>
    </header>
  )
}

export default Header