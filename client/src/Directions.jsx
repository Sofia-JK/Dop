import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Directions.css'
import Lectorer from './components/Directions/Lectorer'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/all'
import { Filecontext } from './Filecontext'
import { reqThunk } from './redux/addRequestsSlice'


const Directions = () => {

    const dispatch = useDispatch()

    const {dir} = useContext(Filecontext)

    console.log(dir)

    gsap.registerPlugin(ScrollToPlugin)
    const link1 = useRef (null)
    const link2 = useRef (null)
    const link3 = useRef (null)
    const scrollTo = (target) =>
        gsap.to(window, {duration: 1, scrollTo: target})

    const [phone, setPhone] = useState("")

    const host = window.location.hostname;

    const [course, setCourse] = useState([])

    useEffect(() => {
        fetch(`http://${host}:3000/curseID/`)
        .then(course => course.json())
        .then(course => {
        setCourse(course)
        })
    }, []);

    const id = useSelector((state) => state.auth.id)

    const [user, setUser] = useState([])

    useEffect(() => {
        fetch(`http://${host}:3000/user/`)
        .then(user => user.json())
        .then(user => {
        setUser(user)
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


  return (
    <>
    {
         course.map((c) => {
            return dir == c.id ? <div className='directions-style'>
        <div className='block1'>
            <div className='info-dir'>
                <h1>{c.name}</h1>
                <p>{c.info}</p>
            </div>
            <div className='menu-info_dir'>
                <div className='menu-info1_dir'>
                    <button onClick={() => scrollTo(link1.current)}>Преподаватели</button>
                    <button onClick={() => scrollTo(link1.current)}>Программа обучения</button>
                </div>
                <div className='menu-info1_dir'>
                    <button onClick={() => scrollTo(link2.current)}>Диплом</button>
                    <button onClick={() => scrollTo(link3.current)}>Записаться</button>
                </div>
            </div>
            {
                media.map((m) => {
                    return m.name == c.name ?
                    <div className='mp4'>
                        <video controls >
                        <source src={`/uploads/${m.video}`} type="video/mp4"/>
                    </video>
                    <h1>{c.name_video}</h1>
                    </div>
                    :
                    <></>
                })
            }
        </div>
        {
            media.map((m) => {
                return m.name == c.name ?
                <div className='block2' ref={link1} style={{backgroundImage: `url(/uploads/${m.img_index2})`}}>
            <div className='lecturer'>
                <h1>Преподаватели:</h1>
                <div>
                    <Lectorer/>
                </div>
            </div>
            <div className='direction'>
                <h1>Программма обучения:</h1>
                <p>{c.name}</p>
                <div>
                    <h1>Здесь вы:</h1>
                    <p>{c.details}</p>
                </div>
                <div>
                    <h1>Срок обучения:</h1>
                    <p>{c.time}</p>
                </div>
            </div>
        </div>
        :
        <></>
            })
        }
        <div className='block1'>
            <div className='diplom' ref={link2}>
                <div className='info-diplom'>
                    <h1>В конце обучения выдаем:</h1>
                    <p>{c.info_diplom}</p>
                </div>
                {
                media.map((m) => {
                    return m.name == c.name ?
                    <img src={`/uploads/${m.img_diplom}`}></img>
                    :
                    <></>
                })}
            </div>
            <div className='cash' ref={link3}>
                <div className='info-cash'>
                    <h1>Стоимость курса:</h1>
                    <h2>{c.price}</h2>
                    <p>{c.info_price}</p>
                </div>
                <form className='request'>
                {
                    user.map((u) => {
                        return u.id == id ?  <> 
                    <input placeholder='Введите имя...' type='text' id='fio' name='fio' value={u.fio}></input>
                    <input placeholder='Введите номер телефона...' type='tel' id='phone' name='phone' value={phone} onChange={(e) => {setPhone(e.target.value)}}></input>
                    <input placeholder='Введите email...' type='text' id='email' name='email' value={u.email}></input>
                    <input type='hidden' id='id' name='id' value={id}></input>
                    <input type='hidden' id='dir' name='dir' value={dir}></input>
                    <button onClick={() => {
                        dispatch(reqThunk({
                            phone: phone,
                            id: id,
                            dir: dir
                        }))
                    }}>Записаться на курс</button>
                    </>
                    :
                    <></>
                   })
                }
                {
                    !id ?
                    <>
                    <input placeholder='Введите имя...' type='text'></input>
                    <input placeholder='Введите номер телефона...' type='number'></input>
                    <input placeholder='Введите email...' type='text'></input>
                    <button onClick={() => {alert('Войдите в аккаунт или зарегистрируйтесь')}}>Записаться на курс</button>
                    </>
                    :
                    <></>
                }
                    
                </form>
            </div>

        </div>
    </div>
    :
    <></>
    })
}
    </>
  )
}

export default Directions