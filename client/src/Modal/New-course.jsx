import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './New-modal.css'


const New_course = ({active, setActive}) => {

    const handleSubmit = event => {
        event.preventDefault();
      }

      const navigation = useNavigate()

    const [name, setName] = useState("")
    const [info, setInfo] = useState("")
    const [name_video, setName_video] = useState("")
    const [details, setDetails] = useState("")
    const [time, setTime] = useState("")
    const [info_diplom, setInfo_diplom] = useState("")
    const [price, setPrice] = useState("")
    const [info_price, setInfo_price] = useState("")

    const [video, setVideo] = useState("")
    const [mediaVideo, setMediaVideo] = useState()

    const [img_diplom, setImg_diplom] = useState("")
    const [mediaImg_diplom, setMediaImg_diplom] = useState()

    const [img_index, setImg_index] = useState("")
    const [mediaImg_index, setMediaImg_index] = useState()

    const [img_index2, setImg_index2] = useState("")
    const [mediaImg_index2, setMediaImg_index2] = useState()

    const host = window.location.hostname;

    async function addCourses(name, info, name_video, details, time, info_diplom, video, img_diplom, img_index, img_index2, price, info_price) {
        const data = new FormData()

        data.append('name', name)
        data.append('info', info)
        data.append('name_video', name_video)
        data.append('details', details)
        data.append('time', time)
        data.append('info_diplom', info_diplom)
        data.append('mediaVideo', mediaVideo[0])
        data.append('mediaImg_diplom', mediaImg_diplom[0])
        data.append('mediaImg_index', mediaImg_index[0])
        data.append('mediaImg_index2', mediaImg_index2[0])
        data.append('price', price)
        data.append('info_price', info_price)

        await fetch(`http://${host}:3000/addCourses/`, {
          method: 'POST',
          mode: 'cors',
          body: data
        });
        setVideo('')
        setMediaVideo()
        setImg_diplom('')
        setMediaImg_diplom()
        setImg_index('')
        setMediaImg_index()
        setImg_index2('')
        setMediaImg_index2()
        window.location.reload();
    }

  return (
    <div onSubmit={handleSubmit} className={active ? "new_modal active" : "new_modal"} onClick={() => setActive(false)}>
        <form onSubmit={(e) => {e.preventDefault()
           addCourses(name, info, name_video, details, time, info_diplom, video, img_diplom, img_index, img_index2, price, info_price)
            }} encType='multipart/from-data' className={active ?"modal_content active":'modal_content'} onClick={e => e.stopPropagation()}>
            <input placeholder='Введите название направления...' type='text'id='name' name='name' value={name} onChange={(e) => {setName(e.target.value)}}></input>
            <input placeholder='Введите краткую информацию о курсе...' type='text' id='info' name='info' value={info} onChange={(e) => {setInfo(e.target.value)}}></input>
            <h1>Видео:</h1>
            <input type='file' id='video' name='video' value={video} onChange={(e) => {
              setVideo(e.target.value)
              setMediaVideo(e.target.files)
              }}></input>
            <input placeholder='Введите название видео...' type='text' id='name_video' name='name_video' value={name_video} onChange={(e) => {setName_video(e.target.value)}}></input>
            <input placeholder='Введите инф о том, что входит в курс...' type='text' id='details' name='details' value={details} onChange={(e) => {setDetails(e.target.value)}}></input>
            <input placeholder='Введите срок обучения...' type='text' id='time' name='time' value={time} onChange={(e) => {setTime(e.target.value)}}></input>
            <input placeholder='Введите информацию о дипломе...' type='text' id='info_diplom' name='info_diplom' value={info_diplom} onChange={(e) => {setInfo_diplom(e.target.value)}}></input>
            <h1>Фото диплома:</h1>
            <input type='file' id='img_diplom' name='img_diplom' value={img_diplom} onChange={(e) => {
              setImg_diplom(e.target.value)
              setMediaImg_diplom(e.target.files)
              }}></input>
            <h1>Фото главной страницы:</h1>
            <input type='file'  id='img_index' name='img_index' value={img_index} onChange={(e) => {
              setImg_index(e.target.value)
              setMediaImg_index(e.target.files)
              }}></input>
            <h1>Фото страницы программы обучения:</h1>
            <input type='file' id='img_index2' name='img_index2' value={img_index2} onChange={(e) => {
              setImg_index2(e.target.value)
              setMediaImg_index2(e.target.files)
              }}></input>
            <input placeholder='Введите стоимость курса...' type='text' id='price' name='price' value={price} onChange={(e) => {setPrice(e.target.value)}}/>
            <input placeholder='Введите информацию об оплате...' type='text' id='info_price' name='info_price' value={info_price} onChange={(e) => {setInfo_price(e.target.value)}}/>
            <button type='submit'>Добавить направление</button>
        </form>
    </div>
  )
}

export default New_course