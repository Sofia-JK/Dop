import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Img_user = ({active, setActive}) => {


    const handleSubmit = event => {
        event.preventDefault();
      }

    const [img, setImg] = useState('')
    const [mediaImg, setMediaImg] = useState()
    const id = useSelector((state) => state.auth.id)

    const host = window.location.hostname;

    async function addImg(img, id){
        const data = new FormData

        data.append('id', id)
        data.append('mediaImg', mediaImg[0])
        
        await fetch(`http://${host}:3000/addImg/`, {
          method: 'POST',
          mode: 'cors',
          body: data
        });
        setImg("")
        setMediaImg()
        window.location.reload();
      }


  return (
    <div onSubmit={handleSubmit} className={active ? "new_modal active" : "new_modal"} onClick={() => setActive(false)}>
        <form onSubmit={(e) => {e.preventDefault()
           addImg(img, id)
            }} encType='multipart/from-data' className={active ?"modal_content active":'modal_content'} onClick={e => e.stopPropagation()}>
                <input type='hidden' name='id' id='id' value={id} />
                <input type='file' id='img' name='img' value={img} onChange={(e) => {
              setImg(e.target.value)
              setMediaImg(e.target.files)
              }}></input>
                <button type='submit'>Добавить изображение</button>
        </form>
    </div>
  )
}

export default Img_user