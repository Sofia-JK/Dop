import React from 'react'
import './Footer.css'
import logo from '../assets/logo.svg'
import vk from '../assets/vk.svg'
import email from '../assets/email.svg'

const Footer = () => {
  return (
    <div className='footer-font'>
            <img src={logo} />
            <div className='footer-number'>
                <p>+7 (000) 000 00-00</p>
                <p>+7 (000) 000 00-00</p>
                <p>+7 (000) 000 00-00</p>
            </div>
            <div className='footer-svg'>
                <img src={vk} />
                <img src={email} />
            </div>
    </div>
  )
}

export default Footer