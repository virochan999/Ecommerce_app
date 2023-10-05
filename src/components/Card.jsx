import React, { useState } from 'react'
import Ratings from './Ratings'
import EditIcon from '@mui/icons-material/Edit';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import useApi from '../hooks/useApiCall';
import { toast } from 'react-toastify';
import { deleteProductById, setLoading, updateProductById } from '../Store/productSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Card = ( {productData, fetchProductData} ) => {
  const [isEdited, setIsEdited] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [editedData, setEditedData] = useState({...productData})
  const { fetchData } = useApi()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onEditClick = (e) => {
    setIsEdited(!isEdited)
  }

  const onDeleteClick = async () => {
    const url = `https://my-json-server.typicode.com/virochan999/JSON/products/${productData.id}`
    const method = 'DELETE'
    dispatch(setLoading(true))

    try {
      const data = await fetchData(url, method);
      dispatch(deleteProductById(productData.id));
      dispatch(setLoading(false))
      toast.success("Successfully deleted the data")
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error);
    }
  }

  const saveProductData = async () => {
      const url = `https://my-json-server.typicode.com/virochan999/JSON/products/${productData.id}`
      const method = 'PUT'
      dispatch(setLoading(true))

      try {
        const data = await fetchData(url, method, editedData);
        dispatch(updateProductById(data));
        setIsEdited(!isEdited)
        dispatch(setLoading(false))
        toast.success("Successfully updated the data")
      } catch (error) {
        toast.error("Something went wrong")
        console.error(error);
      }
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setEditedData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLoad = () => {
    setImageLoaded(!imageLoaded)
  }

  const navigateToDetails = () => {
    navigate(`/details/${productData.id}`)
  }

  return (
    <div className='flex bg-sky-100 p-8 text-black justify-between relative rounded-2xl'>
      <div className='flex'>
        <div className={`flex justify-center items-center h-40 w-40 ${imageLoaded ? 'hidden' : 'block'}`}>
          Image
        </div>
        <img src={productData.thumbnail} onClick={navigateToDetails} onLoad={handleLoad} alt="product image" className={`h-40 w-40 mix-blend-multiply  cursor-pointer ${imageLoaded ? 'block' : 'hidden'}`} />
        <div className='flex justify-between ml-4 flex-col'>
          <div className='flex flex-col font-bold'>
            {
              isEdited ? 
              <input className='bg-white px-2 outline-1 outline-black border border-black' type='text' value={editedData.title} name='title' onChange={handleChange} /> :
              <h2>{productData.title}</h2>
            }
            {
              isEdited ? 
              <input className='bg-white px-2 outline-1 outline-black border border-black mt-4' type='number' value={editedData.price} name='price' onChange={handleChange} /> :
              <p>Rs. {productData.price}</p>
            }
          </div>
          {
            isEdited ? 
            <>
              <input className='bg-white px-2 outline-1 outline-black border border-black' type="number" value={editedData.rating} name='rating' onChange={handleChange} />
            </> :
            <Ratings productRating={productData.rating}/>
          }
          
        </div>
      </div>
      <div className='w-1/3'>
        <h2 className='text-blue-900 font-bold'>Description:</h2>
        {
          isEdited ?
          <>
            <textarea rows={3} cols={50} className='bg-white resize-none px-2 outline-1 outline-black border border-black' type="text" name='description' value={editedData.description} onChange={handleChange}></textarea>
          </> :
          <p className='from-neutral-500'>
            {productData.description}
          </p>
        }
      </div>
      <div className='absolute right-20 bottom-8 flex gap-4 z-10'>
        {
          isEdited ? 
          <>
            <button className='border border-black p-1 h-fit rounded-lg hover:bg-slate-600 hover:text-white' onClick={() => setIsEdited(!isEdited)}>Cancel</button>
            <button className='border border-black p-1 h-fit rounded-lg hover:bg-slate-600 hover:text-white' onClick={saveProductData}>Save</button>
          </> : 
          <>
            <EditIcon onClick={onEditClick} className='text-orange-500 cursor-pointer z-10'/>
            <AutoDeleteIcon onClick={onDeleteClick} className='text-red-500 cursor-pointer z-10'/>
          </>
        }
      </div>
    </div>
  )
}

export default Card