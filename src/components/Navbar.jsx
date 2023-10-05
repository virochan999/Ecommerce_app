import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ProfileImg from '../assets/profile.svg'

const Navbar = () => {
  return (
    <>
      <div className='p-4 bg-nav-color'>
        <div className='flex justify-between pr-12'>
          <div className='flex gap-12 items-center'>
            <Link to='/' className='cursor-pointer font-extrabold text-xl'>ECOMMERCE</Link>
            <div className='flex justify-center items-center'>
              <Link to='/'>Products</Link>
            </div>
            <div className='flex justify-center items-center'>
              <Link to='/createProduct'>Add a Product <span className='font-extrabold text-green-400 text-xl'>+</span> 
              </Link>
            </div>
            <div className='flex justify-center items-center'>
              <Link to='/cart'>Cart</Link>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='mr-2'> 
              John Doe
            </div>
            <div className='h-10 w-10 rounded-full bg-white'> 
              <img src={ProfileImg} alt="profile image" />
            </div>
          </div>
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default Navbar