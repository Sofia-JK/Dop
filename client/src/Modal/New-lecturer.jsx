import React from 'react'
import './New-modal.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { attachThunk } from '../redux/attachLecturer';

const New_lecturer = ({active, setActive}) => {

      const handleSubmit = event => {
        event.preventDefault();
      }

      const [newLecturer, setnewLecturer] = useState()

      const setLecturer = event => {
        setnewLecturer(!newLecturer)
      }

      const [fio, setFio] = useState("")
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [courseID, setCourseID] = useState("")
      const [lecturerID, setLecturerID] = useState("")

      const [img, setImg] = useState("")
      const [mediaImg, setMediaImg] = useState()

      const host = window.location.hostname;

      const [course, setCourse] = useState([])

      useEffect(() => {
        fetch(`http://${host}:3000/curseID/`)
        .then(course => course.json())
        .then(course => {
          setCourse(course)
        })
      }, []);

      const [user, setUser] = useState([])

      useEffect(() => {
        fetch(`http://${host}:3000/user/`)
        .then(user => user.json())
        .then(user => {
          setUser(user)
        })
      }, []);

      async function addLecturer(fio, email, password, courseID, img){
        const data = new FormData

        data.append('fio', fio)
        data.append('email', email)
        data.append('password', password)
        data.append('courseID', courseID)
        data.append('mediaImg', mediaImg[0])

        await fetch(`http://${host}:3000/addLecturer/`, {
          method: 'POST',
          mode: 'cors',
          body: data
        });
        setImg("")
        setMediaImg()
        window.location.reload();
      }

      const dispatch = useDispatch()

  return (
    <div onSubmit={handleSubmit} className={active ? "new_modal active" : "new_modal"} onClick={() => setActive(false)}>
        <form onSubmit={(e) => {e.preventDefault()
           addLecturer(fio, email, password, courseID, img)
            }} encType='multipart/from-data' className={active ?"modal_content active":'modal_content'} onClick={e => e.stopPropagation()}>
            {!newLecturer ? <input  id='fio' name='fio' value={fio} onChange={(e) => {setFio(e.target.value)}}placeholder='Введите ФИО преподавателя...' type='text'></input> : <></>}
            {!newLecturer ? <input  id='email' name='email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Введите email преподавателя...' type='text'></input> : <></>}
            <select  id='courseID' name='courseID' value={courseID} onChange={(e) => {setCourseID(e.target.value)}}>
              <option>Выберите направление...</option>
              {
                course.map((c) =>{
                  return <option key={c.id} value={c.id}>{c.name}</option>
                })
              }
            </select>
            {!newLecturer ? <></> : <select  id='lecturerID' name='lecturerID' value={lecturerID} onChange={(e) => {setLecturerID(e.target.value)}}>
              <option>Выберите преподавателя...</option>
              {
                user.map((u) =>{
                  return u.role == "LECTURER" ? <option key={u.id} value={u.id}>{u.fio}</option> : <></>
                })
              }
            </select>}
            {!newLecturer ? <input  id='password1' name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Придумайте пароль...' type='password'></input> : <></>}
            {!newLecturer ? <h1>Фото преподавателя:</h1> : <></>}
            {!newLecturer ? <input type='file' id='img' name='img' value={img} onChange={(e) => {
              setImg(e.target.value)
              setMediaImg(e.target.files)
              }}></input> : <></>}
            <p> {!newLecturer ? 'Ходите добавить уже существующего преподавателя на курс?' : 'Хотите добавить нового преподавателя?'} <span  onClick={setLecturer}>Добавить...</span></p>
            {!newLecturer ? <button type='submit'>Добавить преподавателя</button> : <></>}
            {!newLecturer ? <></> : <button onClick={() =>{
                                      dispatch(attachThunk({
                                        id: lecturerID,
                                        course_id: courseID
                                      }))
                                    }}>Добавить преподавателя</button>}
        </form>
    </div>
  )
}

export default New_lecturer