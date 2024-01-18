import React from 'react'
import './index.css'

const Notfound = () => {
  return (
    <div className='notfound'>
      <div style={{ textAlign: "center" }}>
        <img src="https://res.cloudinary.com/dky69roxl/image/upload/v1687415338/erroring_1_pejmlx.png" alt="notfound" />
        <h2>Page Notfound</h2>
        <p style={{ color: "#64748B" }}>We are sorry, the page you requested could not be found</p>
      </div>
    </div>
  )
}

export default Notfound