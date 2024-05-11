import React, { useEffect, useState } from 'react'
import './All-answer.css'
import file from '../../assets/file.svg'
import { Link } from 'react-router-dom'

const All_answer = () => {

  const host = window.location.hostname;

  const [user, setUser] = useState([])

  useEffect(() => {
      fetch(`http://${host}:3000/user/`)
      .then(user => user.json())
      .then(user => {
      setUser(user)
      })
  }, []);

  const [homework, setHomework] = useState([])

  useEffect(() => {
      fetch(`http://${host}:3000/homework/`)
      .then(homework => homework.json())
      .then(homework => {
      setHomework(homework)
      })
  }, []);

  const [answer, setAnswer] = useState([])

  useEffect(() => {
      fetch(`http://${host}:3000/answer/`)
      .then(answer => answer.json())
      .then(answer => {
      setAnswer(answer)
      })
  }, []);

  return (
    <>
    {
      answer.map((w) => {
      return <>
        {
          homework.map((h) =>{
            return (w.homework_id == h.id && h.id == localStorage.getItem("task"))? <div className='all_answer-style'>
                    {
                      user.map((u) => {
                        return (w.user_id == u.id)? <h1>{u.fio}</h1> : <></>
                      })
                    }
                <div>
                    <h1>Комментарий:</h1>
                    {
                      w.comment != null ?
                        <p>{w.comment}</p>
                      :
                        <p>отсутствует</p>
                    }
                </div>
                <div>
                    <h1>Файл:</h1>
                    {
                      w.file != null?
                        <Link to={`/uploads/${w.file}`} download={`/uploads/${w.file}`} target="_blank" rel="noreferrer">
                          <img src={file}/>
                        </Link>
                      :
                        <p>отсутствует</p>
                    }
                    
                </div>
            </div>
            : <></>
          })
        }     
      </>
    })
  }
  </>
  )
}

export default All_answer