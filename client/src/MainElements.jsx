import React, { useContext } from 'react'
import Header from './components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import main from 'C:/Users/s_var/Desktop/Будущий ДИПЛОМ/Dop/client/src/assets/glavnay.svg'
import test from 'C:/Users/s_var/Desktop/Будущий ДИПЛОМ/Dop/client/src/assets/prof.png'
import { Filecontext } from './Filecontext'

const MainElements = () => {

    const {bg} = useContext(Filecontext)
    const location = useLocation()

  return (
    <div className='font-index' style={location.pathname === '/direction' ? {backgroundImage: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(217,217,217,0.3) 20%), url(/uploads/${bg})`} : location.pathname === '/prof' ||  location.pathname === '/prof/task' || location.pathname === '/prof/student-task' || location.pathname === '/answer'? {backgroundImage: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(217,217,217,0) 20%), url(${test})`, } : {backgroundImage: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(217,217,217,0) 20%), url(${main})`}}>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainElements