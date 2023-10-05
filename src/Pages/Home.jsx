import React, { useEffect, useState } from 'react'
import useApi from '../hooks/useApiCall'
import { toast } from 'react-toastify'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, setLoading } from '../Store/productSlice'
import Loading from '../components/Loader'

const Home = () => {
  const [isSorted, setIsSorted] = useState(false);
  const { fetchData } = useApi()
  const dispatch = useDispatch()
  const productState = useSelector((state) => state.product) // Fetch product data from the redux store
  const { products, loading, error } = productState

  useEffect(() => {
    if (!products.length) {
      fetchProductData()
    }
  },[])

  /* Fetch the products data from the database */
  const fetchProductData = async () => {

    const url = 'https://my-json-server.typicode.com/virochan999/JSON/products';
    const method = 'GET';
    dispatch(setLoading(true))

    try {
      const data = await fetchData(url, method);
      dispatch(setProducts(data));  // set the data to the store
      dispatch(setLoading(false))
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error);
    }
  }

  /* Sort products by Price */
  const sortByPrice = () => {
    let sortedData = [...products]
    if(!isSorted) {
      sortedData.sort((a,b) => a.price - b.price)
    } else {
      sortedData.sort((a,b) => a.id - b.id)
    }
    setIsSorted(!isSorted)
    dispatch(setProducts(sortedData));  // Set the sorted data to the store
  }

  return (
    <>
      <div className='w-full flex justify-end mt-6'>
        <div onClick={sortByPrice} className='relative w-40 mr-8 text-yellow-700 font-bold rounded-full flex justify-center items-center p-2 bg-amber-300 cursor-pointer hover:bg-amber-500 hover:text-yellow-900'>
          Sort By Price
          { isSorted &&  <span className='absolute right-2 ml-2 flex justify-center items-center p-2 rounded-full w-2 h-2 bg-slate-200 text-[0.5rem]'>X</span>}
        </div>
      </div>
      {
        products && products.map((products, index) => (
          <div className='my-8 mx-8 border-2 border-sky-700 rounded-2xl shadow-lg shadow-cyan-500/50' key={products.id}>
              <Card productData={products} fetchProductData={fetchProductData} />
          </div>
        ))
      }
      {loading && <Loading/>}
    </>
  )
}

export default Home