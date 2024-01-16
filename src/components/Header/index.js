import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const handdleLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  return (
    <nav className='navbar'>
      <div className='app-logo-container'>
        <img className='website-logo'
          src="https://res.cloudinary.com/dky69roxl/image/upload/v1705320659/image_28_Traced_1_br20po.png"
          alt="website logo" />
        <h1 className='website-name'>NXT <span className='website-name-span'>Assess</span></h1>
      </div>
      <button type='button'
        className='logout-button'
        onClick={handdleLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default Header