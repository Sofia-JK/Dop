import React, { useEffect, useState } from 'react'
import './Task.css'
import file from '../../assets/file.svg'
import { Link } from 'react-router-dom'

const MoreTask = () => {
    const [homework, setHomework] = useState([])

    const host = window.location.hostname;

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
          return (h.id == localStorage.getItem("task"))? <><div className='task-style'>
            <h2>{h.topic}</h2>
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

export default MoreTask