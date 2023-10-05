import React, { useEffect } from 'react'
import useApi from '../hooks/useApiCall'
import { removeCartProduct, setCartProducts, setLoading } from '../Store/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loading from '../components/Loader'

const Cart = () => {
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
    dispatch(setLoading(true))

    try {
      const data = await fetchData(url, method);
      dispatch(setCartProducts(data));
      dispatch(setLoading(false))
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error);
    }
  }

  /* Function to remove item from the cart */
  const removeProductFromCart = (index) => {
    dispatch(removeCartProduct(index)) // Call the store action to remove item
    toast.success("Removed product from cart")
  }

  return (
    <div className='m-8 grid grid-cols-3 gap-12'>
      {
        !loading ? <>
        {
          !!cartProducts.length && cartProducts.map((item, index) => (
            <div className='flex w-full justify-center' key={index}>
              <div className='flex flex-col items-center bg-slate-500 p-4 w-3/4 rounded-lg' >
                { !item.thumbnail ? 
                  <>
                    <div className='w-1/4 h-3/4 flex justify-center items-center'>Image</div>
                  </> :
                  <img src={item.thumbnail} alt="image" className='w-1/4 h-3/4' />
                 }
                <h2 className='text-yellow-50 font-bold' >{item.title}</h2>
                <p className='text-yellow-50'>Price: <span className='text-white'>Rs. {item.price}</span></p>
                <button onClick={() => removeProductFromCart(index)} className='w-2/4 mt-4 py-1 rounded-md font-bold bg-blue-500 hover:bg-blue-700 hover:text-yellow-50'>Remove from cart</button>
              </div>
            </div>
          ))
        }
        </> : <Loading/>
      }
      
    </div>
  )
}

export default Cart