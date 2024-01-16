import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMesssage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const inputType = showPassword ? "text" : "password"

  const renderSuccesView = jwtToken => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 })
    navigate("/")
  }

  const renderFailureView = errorMessage => {
    setShowErrorMessage(true)
    setErrorMessage(errorMessage)
  }

  const handdleLogin = async e => {
    e.preventDefault()
    const userDetails = { username, password }
    const url = `https://apis.ccbp.in/login`
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails)
    }
    setIsLoading(true)
    const response = await fetch(url, options)
    const data = await response.json()
    setIsLoading(false)
    if (response.ok === true) {
      renderSuccesView(data.jwt_token)
    } else {
      renderFailureView(data.error_msg)
    }
  }

  const token = Cookies.get("jwt_token")

  if (token) {
    return <Navigate to="/" />
  }

  return (
    <div className='login-section'>
      <form className='login-form' onSubmit={handdleLogin}>
        <div className='logo-container'>
          <img src="https://res.cloudinary.com/dky69roxl/image/upload/v1705316285/image_28_Traced_w9gttd.png" alt="website logo" />
          <h1 className='site-name'>NXT <span className='span-text'>Assess</span></h1>
        </div>
        <div className='login-input-container'>
          <label className='label-text' htmlFor='username'>USERNAME</label><br />
          <input type='text'
            id="username"
            className='login-input'
            placeholder='Username'
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className='login-passowrd-input-container'>
          <label className='label-text' htmlFor='password'>PASSWORD</label><br />
          <input type={inputType}
            id="password"
            className='login-input'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className='show-password-container'>
          <input onClick={() => setShowPassword(!showPassword)}
            className='checkbox'
            id="showPassword"
            type='checkbox' />
          <label className='show-password-text'
            htmlFor='showPassword'>Show Password</label>
        </div>
        <button type='submit' className='login-button'>
          {isLoading ? "Loading..." : "Login"}
        </button>
        {showErrorMessage && <p className='error-message'>{errorMesssage}</p>}
      </form>
    </div>
  )
}

export default Login