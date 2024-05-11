import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import Request from './components/Admin/Request'
import New_course from './Modal/New-course'
import New_lecturer from './Modal/New-lecturer'
import Img_user from './Modal/Img-user'
import New_task from './Modal/New-task.jsx'
import {useNavigate } from 'react-router-dom'
import Task from './components/Lecturer/Task.jsx'
import Student_task from './components/Student/Task.jsx'
import MoreTask from './components/Lecturer/MoreTask.jsx'
import { Filecontext } from './Filecontext.jsx'
import All_answer from './components/Lecturer/All-answer.jsx'
import New_password from './Modal/New-password.jsx'

const Profile = () => {

    const role = useSelector((state) => state.auth.role)
    const id = useSelector((state) => state.auth.id)

    const {isHomework, setIsHomework} = useContext(Filecontext)

    
    const setHome_work = event => {
        setIsHomework(!isHomework)
    }

    const [new_courseActive, setNew_courseActive] = useState(false)
    const [new_lecturerActive, setNew_lecturerActive] = useState(false)
    const [img_userActive, setImg_userActive] = useState(false)
    const [new_taskActive, setNew_taskActive] = useState(false)
    const [new_passwordkActive, setNew_passwordActive] = useState(false)

    const navigation = useNavigate()

    const host = window.location.hostname;

    const [user, setUser] = useState([])

    useEffect(() => {
        fetch(`http://${host}:3000/user/`)
        .then(user => user.json())
        .then(user => {
        setUser(user)
        })
    }, []);

    const [course, setCourse] = useState([])

    useEffect(() => {
      fetch(`http://${host}:3000/curseID/`)
      .then(course => course.json())
      .then(course => {
        setCourse(course)
      })
    }, []);

    const [attach, setAttach] = useState([])

    useEffect(() => {
      fetch(`http://${host}:3000/attach/`)
      .then(attach => attach.json())
      .then(attach => {
        setAttach(attach)
      })
    }, []);

    const [requests, setRequests] = useState([])

    useEffect(() => {
        fetch(`http://${host}:3000/requests/`)
        .then(requests => requests.json())
        .then(requests => {
        setRequests(requests)
        })
    }, []);


  return (
    <div className='profile_style'>
            <div className={role === 'ADMIN' ? 'profile_admin' : 'profile_student'}>
                <div className= {role === 'ADMIN' ? 'card_profile_admin' : 'card_profile'}>
                {
                    user.map((u) => {
                        return u.id == id ? <><div className='card_img'>
                                    <img src={`/uploads/${u.img}`} onClick={() => setImg_userActive(true)}/>
                                </div>
                                <div>
                                    <h1>{u.fio}</h1>
                                    {role === 'ADMIN' ? <></> 
                                    : role === 'STUDENT' ? <p>{u.email}</p> 
                                    : role === 'LECTURER' ?
                                    <>
                                    { 
                                        course.map((c) =>{
                                        return <>
                                        {attach.map((a) => {
                                            return (a.course_id == c.id && a.user_id == id)? <p>{c.name}</p> : <></>
                                        })}
                                        </>
                                    })
                                    }
                                    </>
                                    : <></>}
                                    
                                </div>
                            </>
                            :
                            <></>
                        })
                    }
                </div>
                {role === 'ADMIN' ? <div className='btn-add'>
                    <button className='add-admin' onClick={() => setNew_passwordActive(true)}>Изменить пароль</button>
                    <button className='add-admin'onClick={() => setNew_courseActive(true)}>Добавить направление</button>
                    <button className='add-admin' onClick={() => setNew_lecturerActive(true)}>Добавить преподавателя</button>
                </div> 
                : role === 'LECTURER' ? <div className='btn-add'>
                    {!isHomework ? <button className='add-homework' onClick={() => setNew_passwordActive(true)}>Изменить пароль</button> : <></>}
                    {!isHomework ? <button className='add-homework' onClick={() => setNew_taskActive(true)}>Добавить задание</button> : <button className='add-homework' onClick={setHome_work}>Вернуться</button> }
                    {!isHomework ? <></> : <MoreTask/>}
                </div> : role === 'STUDENT' ? <div className='btn-add'>
                    {!isHomework ? <button className='add-homework' onClick={() => setNew_passwordActive(true)}>Изменить пароль</button> : <></>}
                </div> : <></>}
            </div>
            {
                    user.map((u) => {
                        return u.id == id ? <>
            <div className= {role === 'ADMIN' ? 'admin_requet' : 'number_course'}>
            {role === 'ADMIN' ? <h1> Заявки:</h1> : role === 'LECTURER' && !isHomework ?
            <div className='attach-btn'>
                { 
                    course.map((c) =>{
                        return <>
                        {attach.map((a) => {
                             return (a.course_id == c.id && a.user_id == id)? <button onClick={() => {
                                a.course_id == c.id ? localStorage.setItem('course', c.id) : '';
                                {navigation('/prof/task')}}}>{c.name.substring(0,23)}...</button> : <></>
                        })}
                        </>
                    })
                }
            </div> : role === 'STUDENT' ?
            <div className='attach-btn'>
                { 
                    course.map((c) =>{
                        return <>
                        {requests.map((r) => {
                             return (r.course_id == c.id && r.user_id == id)? <button onClick={() => {
                                localStorage.setItem('course_student', r.course_id)
                                {navigation('/prof/student-task')}}}>{c.name.substring(0,23)}...</button> : <></>
                        })}
                        </>
                    })
                }
            </div> : <></>}
                {role === 'ADMIN' ?  <div className='admin_requet2'>
                    <Request/>
                 </div> : <></>}
                 {role === 'STUDENT' ? <Student_task/> : <></>}
                 {role === 'LECTURER' && !isHomework ?  <Task/> : role === 'LECTURER'? <All_answer/> : <></>}
            </div>
            </>
            :
            <></>
            })
        }
            <New_course active={new_courseActive} setActive={setNew_courseActive}/>
            <New_lecturer active={new_lecturerActive} setActive={setNew_lecturerActive}/>
            <Img_user active={img_userActive} setActive={setImg_userActive}/>
            <New_task active={new_taskActive} setActive={setNew_taskActive}/>
            <New_password active={new_passwordkActive} setActive={setNew_passwordActive}/>
    </div>
  )
}

export default Profile