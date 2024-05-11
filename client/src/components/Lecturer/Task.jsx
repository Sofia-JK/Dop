import React, { useContext, useEffect, useState } from 'react'
import './Task.css'
import file from '../../assets/file.svg'
import { Link } from 'react-router-dom'
import { Filecontext } from '../../Filecontext'

const Task = () => {

  const {isHomework, setIsHomework} = useContext(Filecontext)

      const setHome_work = event => {
        setIsHomework(!isHomework)
    }

  const host = window.location.hostname;

  const [homework, setHomework] = useState([])

    useEffect(() => {
        fetch(`http://${host}:3000/homework/`)
        .then(homework => homework.json())
        .then(homework => {
        setHomework(homework)
        })
    }, []);

  return (
    <>
      {
        homework.map((h) => {
          return (h.course_id == localStorage.getItem("course"))? <><div className='task-style' onClick={() => {
            localStorage.setItem('task', h.id)}}>
            <h1 onClick={setHome_work}>{h.topic}</h1>
            <p>{h.about}</p>
            {
              h.video != null ?
              <video controls>
              <source src={`/uploads/${h.video}`} type="video/mp4"/>
            </video>
            :
            <></>
            }
            {
              h.file != null ?
            <div>
            
              <h1>Файл:</h1>
              <Link to={`/uploads/${h.file}`} download={`/uploads/${h.file}`} target="_blank" rel="noreferrer">
                <img src={file}/>
              </Link>
              
            </div>
            :
            <></>
          }   
            </div>
          </>
          :
          <></>
        })
      }
    </>
  )
}

export default Task