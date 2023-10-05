import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Store/productSlice';
import { toast } from 'react-toastify';
import useApi from '../hooks/useApiCall';
import Loading from '../components/Loader';

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    rating: ''
  })
  const productState = useSelector((state) => state.product)
  const { fetchData } = useApi()
  const dispatch = useDispatch()
  const { loading } = productState

  /* To add a new product into the database */
  const addProduct = async (e) => {
    e.preventDefault();
    const url = 'https://my-json-server.typicode.com/virochan999/JSON/products';
    const method = 'POST';
    dispatch(setLoading(true))

    try {
      const data = await fetchData(url, method, newProduct);
      dispatch(setLoading(false))
      toast.success("Successfully added a new product")
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error);
    }
  }

  /* Set the input values into the state */
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      {
        !loading ? 
        <div className='w-full flex items-center justify-center mt-8'>
          <form className='w-2/4 p-6 bg-gray-100 rounded-lg shadow-md' onSubmit={addProduct}>
            <h2 className='text-2xl font-bold mb-4 text-black text-center'>Add a product</h2>
            <div className='mb-2'>
              <label className='block text-gray-600 font-semibold mb-2' htmlFor="title">Name</label>
              <input type="text" name='title' id='title' required onChange={handleChange} className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400'/>
            </div>
            <div className='mb-2'>
              <label htmlFor="description" className='block text-gray-600 font-semibold mb-2'>Description</label>
              <input type="text" name='description' id='description' required onChange={handleChange} className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400'/>
            </div>
            <div className='mb-2'>
              <label htmlFor="price" className='block text-gray-600 font-semibold mb-2'>Price</label>
              <input type="number" name='price' id='price' required onChange={handleChange} className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400'/>
            </div>
            <div className='mb-2'>
              <label htmlFor="rating" className='block text-gray-600 font-semibold mb-2'>Rating</label>
              <input type="number" name='rating' id='rating' min={0} max={5} required onChange={handleChange} className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400'/>
            </div>
            <div className='w-full text-right mt-4'>
              <button type='submit' className='text-xl font-semibold bg-violet-500 border border-violet-800 px-4 rounded-md hover:bg-violet-700'>Add</button>
            </div>
          </form>
        </div> : <Loading/>
      } 
    </>
  )
}

export default CreateProduct