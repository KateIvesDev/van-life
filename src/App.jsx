import React, {useEffect} from 'react'
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
//import  { data, db } from './api/firebase'
//import { writeBatch, doc } from 'firebase/firestore'


import './App.css'

//import './server' //SINCE I WANT TO USE FIREBASE, I DONT WANT TO KEEP USING MIRAGE.JS SINCE IT WONT LET FIREBASE RUN

function App() {

{/* ONE TIME WRITE TO DATABASE WITH DUMMY DATA; DONT WANT TO KEEP COMMITING THE DATA TO THE DB
  useEffect(() => {
    async function writeDoc() {
      const batch = writeBatch(db)

      const van2Ref = doc(db, 'vans', '2')
      batch.set(van2Ref, data[1])

      const van3Ref = doc(db, 'vans', '3')
      batch.set(van3Ref, data[2])

      const van4Ref = doc(db, 'vans', '4')
      batch.set(van4Ref, data[3])
      
      const van5Ref = doc(db, 'vans', '5')
      batch.set(van5Ref, data[4])

      const van6Ref = doc(db, 'vans', '6')
      batch.set(van6Ref, data[5])

      try {
        await batch.commit()
        console.log('batch commit')
       }
       catch(err){
         console.log(err)  
       }
    } 
    writeDoc() 
  },[])
 */} 


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
