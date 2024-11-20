import React, { useContext, useEffect } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Context from '../context';


import ROLE from '../common/role';

const AdminPanel = () => {
    const context = useContext(Context)
    let {userDetails}=context
    const navigate = useNavigate()


    useEffect(()=>{
        if(userDetails?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[navigate, userDetails])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex'>

        <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                        userDetails?.profilePic ? (
                            <img src={userDetails?.profilePic} className='w-20 h-20 rounded-full' alt={userDetails?.name} />
                        ) : (
                            <FaRegCircleUser/>
                        )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{userDetails?.name}</p>
                    <p className='text-sm'>{userDetails?.role}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                        <Link to={"all-orders"} className='px-2 py-1 hover:bg-slate-100'>All Orders</Link>
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel