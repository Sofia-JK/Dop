import React, { useEffect, useState } from 'react'
import './Request.css'
import { useDispatch } from 'react-redux'
import { noThunk, yesThunk } from '../../redux/addRequestsSlice'

const Request = () => {

  const [course, setCourse] = useState([])
  const [user, setUser] = useState([])
  const [requests, setRequests] = useState([])
  const dispatch = useDispatch()

  const host = window.location.hostname;

    useEffect(() => {
        fetch(`http://${host}:3000/curseID/`)
        .then(course => course.json())
        .then(course => {
        setCourse(course)
        })
    }, []);

    useEffect(() => {
        fetch(`http://${host}:3000/user/`)
        .then(user => user.json())
        .then(user => {
        setUser(user)
        })
    }, []);

    useEffect(() => {
      fetch(`http://${host}:3000/requests/`)
      .then(requests => requests.json())
      .then(requests => {
      setRequests(requests)
      })
  }, []);

  return (
    <>
    {
      requests.map ((r) =>{
        return (r.status == 'Ожидает') ? <div className='request_style'>
        <h1>Введение в ИТ-деятельность</h1>
        <div className='info-request'>
            <div className='bid-student'>
                {
                  user.map((u) => {
                    return (r.user_id == u.id) ? 
                    <>
                    <p>{u.fio}</p>
                    <p>{r.phone}</p>
                    <p>{u.email}</p>
                    </> 
                    : <></>
                  })
                }
            </div>

            <div className='btn-bid'>
                <button className='yes' onClick={() =>{
              dispatch(yesThunk({
                id: r.id
              }))
            }}>Принять</button>
                <button className='no' onClick={() =>{
              dispatch(noThunk({
                id: r.id
              }))
            }}>Отклонить</button>
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

export default Request