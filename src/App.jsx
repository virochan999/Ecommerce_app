import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Cart from './Pages/Cart'
import Home from './Pages/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import CreateProduct from './Pages/CreateProduct'
import { Provider } from 'react-redux'
import store from './Store/store'
import Detail from './Pages/Detail'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        { path: '/', element: <Home />},
        { path: '/cart', element: <Cart /> },
        { path: '/createProduct', element: <CreateProduct /> },
        { path: '/cart', element: <Cart /> },
        { path: '/details/:productId', element: <Detail /> },
      ]
    },
  ])

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          autoClose={2000}
        />
      </Provider>
    </>
  )
}

export default App
