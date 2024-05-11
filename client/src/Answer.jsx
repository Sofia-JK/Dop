import React, { useEffect, useState } from 'react'
import './Answer.css'
import { Link } from 'react-router-dom';
import file1 from './assets/file.svg'
import { useSelector } from 'react-redux';

const Answer = () => {

    const id = useSelector((state) => state.auth.id)
    const homework_id = localStorage.getItem("homework")
    const [comment, setComment] = useState(undefined)

    const [file, setFile] = useState('')
    const [mediaFile, setMediaFile] = useState(undefined)

    const host = window.location.hostname;

    async function addAnswer(id, homework_id, comment, file) {
      const data = new FormData()
  
      data.append('id', id)
      data.append('homework_id', homework_id)
      if (comment) {
        data.append('comment', comment)
      }
      if (mediaFile) {
        data.append('mediaFile', mediaFile[0])
      }

  
  
      await fetch(`http://${host}:3000/addAnswer`, {
        method: 'POST',
        mode: 'cors',
        body: data
      });
      setFile('')
      setMediaFile()
      window.location.reload();
    }

    const [homework, setHomework] = useState([])

    useEffect(() => {
        fetch(`http://${host}:3000/homework/`)
        .then(homework => homework.json())
        .then(homework => {
        setHomework(homework)
        })
    }, []);

  return (
    <div className='answer-style'>
        {
        homework.map((h) => {
          return (h.id == localStorage.getItem('homework'))? <><div className='answer-task'>
            <h1>{h.topic}</h1>
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
                <img src={file1}/>
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
      <form onSubmit={(e) => {
        e.preventDefault()
        addAnswer(id, homework_id, comment, file)
      }} encType='multipart/from-data'>
        <input type='hidden' id='homework_id' name='homework_id' value={homework_id}/>
        <input type='hidden' id='id' name='id' value={id}/>
        <input placeholder='Введите комментарий...' type='text' id='comment' name='comment' value={comment} onChange={(e) => { setComment(e.target.value) }}/>
        <input placeholder='' type='file' id='file' name='file' value={file} onChange={(e) => {
          setFile(e.target.value)
          setMediaFile(e.target.files)
        }}/>
        <button type='submit'>Отправить</button>
      </form>
    </div>
  )
}

export default Answer