import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ProfileImg from '../assets/profile.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setCartProducts } from '../Store/productSlice'
import useApi from '../hooks/useApiCall'

const Navbar = () => {
  const cartProductState = useSelector((state) => state.product)
  const { cartProducts, loading, error } = cartProductState
  const { fetchData } = useApi()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!cartProducts.length) {
      fetchCartData()
    }
  },[])


  const fetchCartData = async () => {

    const url = 'https://my-json-server.typicode.com/virochan999/JSON/cart';
    const method = 'GET';

    try {
      const data = await fetchData(url, method);
      dispatch(setCartProducts(data));
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error);
    }
  }
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
              <Link className='relative' to='/cart'>Cart 
                <span className='absolute bottom-3 -right-5 flex justify-center items-center h-5 w-5 rounded-full bg-sky-500 text-xs text-white'>{!loading && cartProducts.length}</span> 
              </Link>
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