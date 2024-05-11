import React, { useContext, useEffect, useState } from 'react'
import './Lectorer.css'
import { Filecontext } from '../../Filecontext'

const Lectorer = () => {

  const {dir} = useContext(Filecontext)

  const [user, setUser] = useState([])

  const host = window.location.hostname;

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
          course.map((c) => {
            return <>
                {attach.map((a) => {
                  return <>{
                    user.map((u) => {
                      return c.id == a.course_id && dir == c.id && u.role == "LECTURER" ? <div className='mini-card_lectorer'>
                      <div>
                          <img src={`/uploads/${u.img}`}></img>
                      </div>
                      <h1>{u.fio}</h1>
                  </div>
                  :
                  <></>
                    })
                  }</>
                })}
                </>
          })
        }
        </>
      )
}

export default Lectorer