import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addProductToCart, setLoading } from '../Store/productSlice';
import { toast } from 'react-toastify';
import useApi from '../hooks/useApiCall';
import Loading from '../components/Loader';

const Detail = () => {
  const { productId } = useParams()  // Get product Id from params
  const productState = useSelector(state => state.product);
  const {loading} = productState;
  const { fetchData } = useApi()
  const dispatch = useDispatch()
  const [product, setProduct] = useState([])

  /* Fetch data for specific product */
  const fetchProductData = async () => {

    const url = `https://my-json-server.typicode.com/virochan999/JSON/products/${productId}`;
    const method = 'GET';
    dispatch(setLoading(true))

    try {
      const data = await fetchData(url, method);
      setProduct(data)
      dispatch(setLoading(false))
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error);
    }
  }

  /* Fetch data on the render of the component */
  useEffect(() => {
    fetchProductData()
  },[])

  /* If no details for requested product */
  if(!product) {
    return (
      <div>No Product Found</div>
    )
  }

  /* Functionality to add product to the cart */
  const addToCart = () => {
    dispatch(addProductToCart(product))
    toast.success("Added product to the cart")
  }

  return (
    <>
      {
        loading ? <Loading/> :
        <div className='flex flex-col items-center mt-8 w-full'>
            <div className=''>
              <img src={product.thumbnail} alt="image" />
            </div>
            <h2 className='font-extrabold text-2xl mt-4'>{product.title}</h2>
            <p className='font-extrabold mt-2'>{product.brand}</p>
            <div className='flex flex-col gap-4 w-1/4 mt-4 border border-cyan-300 p-2 rounded-2xl shadow-lg shadow-cyan-500/50'>
              <p>{product.description}</p>
              <p className='text-left w-full font-bold text-blue-400'>Rating: <span className='font-normal text-white'>{product.rating}</span></p>
              <p className='font-bold text-blue-400'>Price: <span className='font-normal text-white'>Rs. {product.price}</span></p>
              <p className='font-bold text-blue-400'>DiscountPercentage: <span className='font-normal text-white'>{product.discountPercentage}%</span></p>
              <p className='font-bold text-blue-400'>In stock: <span className='font-normal text-white'>{product.stock}</span></p>
            </div>
            <button onClick={addToCart} className='w-1/4 mt-8 py-1 rounded-md font-bold bg-blue-500 hover:bg-blue-700 hover:text-yellow-50'>Add to cart</button>
        </div>
      }
      
    </>
  )
}

export default Detail