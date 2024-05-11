import React from 'react'
import './index.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Index = () => {

  const navigation = useNavigate()
  const location = useLocation()

  return (
    <div className='glavnay'>
        <div className='info-dop'>
          <h1>Текст текст текст текст текст</h1>
          <p>Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</p>
          <button>Кнопка</button>
        </div>
        <div className='menu-info'>
          <div className='menu-info1'>
            <button onClick={() => {navigation('/')}}>О нас</button>
            <button onClick={() => {navigation('/lecturer')}}>Преподаватели</button>
          </div>
          <button onClick={() => {navigation('/questions')}}>Вопросы</button>
        </div>
        <div className={location.pathname==='/lecturer' ? 'content-2' : 'content'}>
          <Outlet/>
        </div>
    </div>
  )
}

export default Index