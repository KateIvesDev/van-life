import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Home from './pages/Home'
import About from './pages/About'
import Login, { action as loginAction } from './pages/Login'
import Vans, { loader as vansLoader } from './pages/vans/Vans'
import VanDetail, {loader as vansDetailLoader} from './pages/vans/VanDetail'
import Dashboard from './pages/host/Dashboard'
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

import './App.css'

import './server'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='login' element={<Login/>} action={loginAction}/>
          <Route path='vans' element={<Vans/>} loader={vansLoader} errorElement={<Error/>}/>
          <Route path='vans/:id' element={<VanDetail/>} loader={vansDetailLoader} errorElement={<Error/>}/>

          <Route element={<AuthRequired/>}>
            <Route path='host' element={<HostLayout/>}>
                <Route index element={<Dashboard/>}/>
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
    <RouterProvider router={router}/>
  )
}

export default App
