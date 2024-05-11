import React, { useEffect, useState } from 'react'
import './Lecturer.css'

const Lecturer = () => {

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

  return (
  <>
  {
          user.map((u) => {
            return u.role == "LECTURER" ? <div className='lecturer_style'>
                <div className='img-lecturer'>
                    <img src={`/uploads/${u.img}`}/>
                </div>
                <div>
                    <h1>{u.fio}</h1>
                    { 
                      course.map((c) =>{
                        return <>
                              {attach.map((a) => {
                                return (a.course_id == c.id && a.user_id == u.id)? <p>{c.name}</p> : <></>
                              })}
                              </>
                      })
                    }
                </div>
            </div>
            :
            <></>
              })
            }
  </>
  )
}

export default Lecturer