import React from 'react'
import './Auth.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loginThunk } from '../redux/authSlice.js';
import { regThunk } from '../redux/regSlice.js'

const Auth = ({active, setActive}) => {

    const handleSubmit = event => {
        event.preventDefault();
      }

      const [isLogin, setIsLogin] = useState()

      const setLogin = event => {
        setIsLogin(!isLogin)
      }

      const dispatch = useDispatch()

      const [email, setEmail] = useState("")
      const [fio, setFio] = useState("")
      const [password, setPassword] = useState("")

      const regState = useSelector((state) => state.reg)
      const authState = useSelector((state) => state.auth)

      const nav = useNavigate()

      useEffect(() => {
        if (regState.message) {
            nav('/')
        }
      }, [regState])

      useEffect(() => {
       
      }, [authState])


  return (
    <div onSubmit={handleSubmit} className={active ? "auth active" : "auth"} onClick={() => setActive(false)}>
        <div className={active ?"auth_content active":'auth_content'} onClick={e => e.stopPropagation()}>
            <h1> {!isLogin ? 'Вход' : 'Регистрация'}</h1>
            <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Введите e-mail...'></input>
            {!isLogin ? <></> : <input type='text' value={fio} onChange={(e) => {setFio(e.target.value)}} placeholder='Введите ФИО...'></input>}
            {!isLogin ? <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Введите пароль...'></input> : <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Придумайте пароль...'></input>}
            <p>{!isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'} <span onClick={setLogin}> {!isLogin ? ' Зарегистрируйтесь...' : 'Войдите...'}</span></p>
            {!isLogin ? 
            <button onClick={() => {
              dispatch(loginThunk({
                  email: email,
                  password: password
              }))
          }}>Войти</button>
            :
            <button onClick={() => {
              dispatch(regThunk({
                  email: email,
                  fio: fio,
                  password: password
              }))
          }}>Зарегистрироваться</button>}
        </div>
    </div>
  )
}

export default Auth