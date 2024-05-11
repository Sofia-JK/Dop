import React, { useEffect, useState } from 'react'
import './Task.css'
import { useNavigate } from 'react-router-dom';

const Student_task = () => {

  const host = window.location.hostname;

  const [homework, setHomework] = useState([])

    useEffect(() => {
        fetch(`http://${host}:3000/homework/`)
        .then(homework => homework.json())
        .then(homework => {
        setHomework(homework)
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

    const navigation = useNavigate()

  return (
    <>
      {
        homework.map((h) => {
          return (h.course_id == localStorage.getItem('course_student'))? <>
          <div className='student-task-style' onClick={() => {
            localStorage.setItem('homework', h.id) 
            {navigation('/answer')}}} value={h.id}>
              <div>
                {user.map((u) => {
                  return(h.user_id == u.id)? <h1>Задание от:  {u.fio}</h1> : <></>
                })}
                  <p>{h.topic}</p>
              </div>
              <input type="checkbox" />
          </div>
          </>
          :
          <></>
      })
      }
    </>
  )
}

export default Student_task