import React, { useState } from 'react'
import './Questions.css'
import more_questions from '../../assets/open.svg'

const Questions = () => {

    const [isOpen, setIsOpen] = useState(false)
    const setOpen = () => setIsOpen(!isOpen)

  return (
    <div className='questions-info'>
        <div onClick={setOpen}>
            <p>Я хочу записаться на дополнительные курсы. Мои действия?</p>
            <img src= {more_questions} className={!isOpen ? 'more_open-btn' : 'closed-btn'}></img>
        </div>
        <p className={isOpen ? 'open' : 'closed'}>Чтобы записаться на курс, необходимо зарегистрироваться и войти в свой аккаунт. Затем нужно выбрать интересующую вас специализацию и отправить заявку на зачисление на курс.</p>
        
    </div>
  )
}

export default Questions