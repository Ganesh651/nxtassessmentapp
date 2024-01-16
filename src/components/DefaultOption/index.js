import React from 'react'
import './index.css'


const DefaultOption = props => {
  const { option } = props
  const { id, text, is_correct } = option

  return (
    <div className='option-item'>
      <span>{text}</span>
    </div>
  )
}

export default DefaultOption