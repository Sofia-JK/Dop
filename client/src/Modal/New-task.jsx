import React from 'react'
import './New-modal.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const New_task = ({ active, setActive }) => {
  const id = useSelector((state) => state.auth.id)

  const [topic, setTopic] = useState('')
  const [about, setAbout] = useState('')
  const course = localStorage.getItem("course")

  const [video, setVideo] = useState('')
  const [mediaVideo, setMediaVideo] = useState(undefined)

  const [file, setFile] = useState('')
  const [mediaFile, setMediaFile] = useState(undefined)

  const host = window.location.hostname;

  async function addHomework(topic, about, video, file, course, id) {
    const data = new FormData()

    data.append('topic', topic)
    data.append('about', about)
    if (mediaVideo) {
      data.append('mediaVideo', mediaVideo[0])
    }
    if (mediaFile) {
      data.append('mediaFile', mediaFile[0])
    }
    data.append('course', course)
    data.append('id', id)


    await fetch(`http://${host}:3000/addHomework`, {
      method: 'POST',
      mode: 'cors',
      body: data
    });
    setVideo('')
    setMediaVideo()
    setFile('')
    setMediaFile()
    window.location.reload();
  }

  const handleSubmit = event => {
    event.preventDefault();
  }

  return (
    <div onSubmit={handleSubmit} className={active ? "new_modal active" : "new_modal"} onClick={() => setActive(false)}>
      <form onSubmit={(e) => {
        e.preventDefault()
        addHomework(topic, about, video, file, course, id)
      }} encType='multipart/from-data' className={active ? "modal_content active" : 'modal_content'} onClick={e => e.stopPropagation()}>
        <input type='text' placeholder='Введите тему задания...' id='topic' name='topic' value={topic} onChange={(e) => { setTopic(e.target.value) }} required />
        <input type='text' placeholder='Введение описание задания...' id='about' name='about' value={about} onChange={(e) => { setAbout(e.target.value) }} required />
        <h1>Прикрепить видео:</h1>
        <input type='file' id='video' name='video' value={video} onChange={(e) => {
          setVideo(e.target.value)
          setMediaVideo(e.target.files)
        }}></input>
        <h1>Прикрепить документ:</h1>
        <input type='file' id='file' name='file' value={file} onChange={(e) => {
          setFile(e.target.value)
          setMediaFile(e.target.files)
        }}></input>
        <input type='hidden' id='course' name='course' value={course} />
        <input type='hidden' id='id' name='id' value={id} />
        <button type='submit'>Добавить задание</button>
      </form>
    </div>
  )
}

export default New_task