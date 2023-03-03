// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Home from './pages/Home'
import About from './pages/About'
import Login, { action as loginAction } from './pages/Login'
import Register, { action as registerAction } from './pages/Register'
import Vans, { loader as vansLoader } from './pages/vans/Vans'
import VanDetail, {loader as vansDetailLoader} from './pages/vans/VanDetail'
import Dashboard, {loader as hostVansLoader1} from './pages/host/Dashboard'
import Income from './pages/host/Income'
import Reviews from './pages/host/Reviews'
import HostVans, {loader as hostVansLoader} from './pages/host/HostVans'
import HostVanDetail, {loader as hostDetailLoader} from './pages/host/HostVanDetail'
import HostVanInfo from './pages/host/HostVanInfo'
import HostVanPhotos from './pages/host/HostVanPhotos'
import HostVanPricing from './pages/host/HostVanPricing'
import NotFound from './pages/NotFound'
import Error from './components/Error'
import AuthRequired from './components/AuthRequired'
import { AuthProvider } from './api/AuthProvider'
//import  { db } from './api/firebase'

import './App.css'

//import './server' **DONT USE THIS BC IT INTERCEPTS FIREBASE

function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    
    <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='login' element={<Login/>} action={loginAction}/>
          <Route path='register' element={<Register/>} action={registerAction}/>
          <Route path='vans' element={<Vans/>} loader={vansLoader} errorElement={<Error/>}/>
          <Route path='vans/:id' element={<VanDetail/>} loader={vansDetailLoader} errorElement={<Error/>}/>

          <Route element={<AuthRequired/>}>
            <Route path='host' element={<HostLayout/>}>
                <Route index element={<Dashboard/>} loader={hostVansLoader1}/>
                <Route path='income' element={<Income/>}/>
                <Route path='vans' element={<HostVans/>} loader={hostVansLoader} errorElement={<Error/>}/>
                <Route path='vans/:id' element={<HostVanDetail/>} loader={hostDetailLoader} errorElement={<Error/>}>
                  <Route index element={<HostVanInfo/>}/>
                  <Route path='pricing' element={<HostVanPricing/>}/>
                  <Route path='photos' element={<HostVanPhotos/>}/>
                </Route>
                <Route path='reviews' element={<Reviews/>}/>
              </Route>
          </Route>
          
          <Route path='*' element={<NotFound/>}></Route>
    </Route>
    
  ))

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
