import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import {useLocation} from "react-router-dom"
import {Filecontext} from './Filecontext'
import MainElements from './MainElements'

const MainPage = () => {
  const location = useLocation()

  const [dir, setDir] = useState(5)

  const host = window.location.hostname;

  const [bg, setBg] = useState('/uploads/Автоматизация.jpg')

  const [isHomework, setIsHomework] = useState()

  return (
    <Filecontext.Provider value={{dir, setDir, bg, setBg, isHomework, setIsHomework}}>
      <MainElements />
    </Filecontext.Provider>
  )
}

export default MainPage