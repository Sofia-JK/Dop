import React, { useContext, useState } from 'react'
import './Header.css'
import logo from '../assets/logo.svg'
import more from '../assets/more.svg'
import mini_menu from '../assets/mini-menu.svg'
import Auth from '../Modal/Auth'
import more_questions from '../assets/open.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Filecontext } from '../Filecontext'


const Header = () => {
  const [authActive, setAuthActive] = useState(false)
  const [isOpen, setOpen] = useState(false);

  const [isMore, setIsMore] = useState(false)
  const setMore = () => setIsMore(!isMore)

  const [isDetails, setIsDetails] = useState(false)
  const setDetails = () => setIsDetails(!isDetails)

  const dispatch = useDispatch()

  const navigation = useNavigate()

  const token = useSelector((state) => state.auth.token)

  const {dir, setDir} = useContext(Filecontext)
  const {bg, setBg} = useContext(Filecontext)

  const host = window.location.hostname;

  const [course, setCourse] = useState([])

  useEffect(() => {
    fetch(`http://${host}:3000/curseID/`)
    .then(course => course.json())
    .then(course => {
      setCourse(course)
    })
  }, []);

  const [media, setMedia] = useState([])

  useEffect(() => {
      fetch(`http://${host}:3000/media/`)
      .then(media => media.json())
      .then(media => {
          setMedia(media)
      })
  }, []);

  console.log(bg)


  return (
    <>
      <div className='header-font'>
        <img src={logo} onClick={() => {navigation('/')}}/>
        <ul className='menu'>
          <li onClick={() => setOpen(!isOpen)}><img src={more}/> <p>Направления</p>
            <ul className={`menu-list ${isOpen ? "active":"" }`}>
              {
                course.map((c) =>{
                  return <>
                  {
                    media.map((m) => {
                      return c.name == m.name ? <>
                      <li key={c.id} value={dir} onClick={() => {
                        setDir(c.id);
                        setBg(m.img_index);
                        navigation('/direction');}}>{c.name}</li>
                        </>
                        :
                        <></>
                    })
                  }
                  </>
                })
              }
            </ul>
          </li>
          {token ? <li onClick={() => {navigation('/prof')}}>Профиль</li> : <li onClick={() => {alert('Войдите в аккаунт или зарегистрируйтесь')}}>Профиль</li>}
          {token ? <li onClick={() => {
              dispatch(logOut())
            }}>Выйти</li> : <li onClick={() => setAuthActive(true)}>Вход/Регистрация</li>}
        </ul>
        <div className='mini-menu'> <img src={mini_menu} onClick={setMore}/>
          <ul className={isMore ? '' : 'mini-menu-closed'}>
            <li onClick={setDetails}> 
              <p>Направления </p> 
              <img src= {more_questions} className={!isDetails ? 'open_det' : 'closed-det'}></img>
            </li>
            <ul className={isDetails ? 'mini-menu-list' : 'mini-menu-closed'}>
            {
                course.map((c) =>{
                  return <>
                  {
                    media.map((m) => {
                      return c.name == m.name ? <>
                      <li key={c.id} value={dir} onClick={() => {
                        setDir(c.id);
                        setBg(m.img_index);
                        navigation('/direction');}}>{c.name}</li>
                        </>
                        :
                        <></>
                    })
                  }
                  </>
                })
              }
              </ul>
              {token ? <li onClick={() => {
                navigation('/prof')}}>Профиль</li> : <li>Профиль</li>}
              {token ? <li onClick={() => {
                  dispatch(logOut())
                }}>Выйти</li> :
                <li onClick={() => setAuthActive(true)}>Вход/Регистрация</li>}
          </ul>
        </div>
        <p>+7 (000) 000 00-00</p>
      </div>
      <Auth active={authActive} setActive={setAuthActive} />
    </>
  )
}

export default Header