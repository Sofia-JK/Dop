import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newThunk } from '../redux/newPasswordSlice';

const New_password = ({active, setActive}) => {

    const handleSubmit = event => {
        event.preventDefault();
      }

    const id = useSelector((state) => state.auth.id)

    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const dispatch = useDispatch()

  return (
    <div onSubmit={handleSubmit} className={active ? "new_modal active" : "new_modal"} onClick={() => setActive(false)}>
        <form className={active ?"modal_content active":'modal_content'} onClick={e => e.stopPropagation()}>
                <input type='hidden' name='id' id='id' value={id} />
                <input type='password' id='password' name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Введите старый пароль...'/>
                <input type='password' id='newPassword' name='newPassword' value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} placeholder='Придумайте новый пароль...'/>
                <button onClick={() => dispatch(newThunk({
                    id: id,
                    password: password,
                    newPassword: newPassword
                }))}>Сменить пароль</button>
        </form>
    </div>
  )
}

export default New_password