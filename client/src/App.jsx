import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Website from './pages/website';
import { Suspense, useState } from 'react';
import Layout from './components/Layout/Layout';
import Properties from './pages/Properties/Properties';
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PropertyDesc from './pages/PropertyDesc/PropertyDesc';
import UserDetailContext from './context/UserDetailContext';
import Bookings from './pages/Bookings/Bookings';
import Favorites from './pages/Favourites/Favourites';
const App = () => {
  const queryClient=new QueryClient()
  const [userDetails,setUserDetails]=useState({
    favorites:[],
    bookings:[],
    token:null
  })
  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
    <Route element={<Layout/>}>
    <Route path="/" element={<Website/>}/>
    <Route path="/properties" >
    <Route index element={<Properties/>}/>
    <Route path=":propertyId" element={<PropertyDesc/>}/>
    </Route>
    <Route path='/bookings' element={<Bookings/>}></Route>
    <Route path='/favourites' element={<Favorites/>}></Route>
    </Route>
    </Routes>
    </Suspense>
   </BrowserRouter>
   <ToastContainer/>
   <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    </UserDetailContext.Provider>
    
  )
}

export default App