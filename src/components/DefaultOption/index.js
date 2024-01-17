import React from 'react'
import './index.css'


const DefaultOption = props => {
  const { option, checkDefaultOptionAnswer } = props
  const { id, text, is_correct } = option


  const handdleCorrectAnswer = () => {
    checkDefaultOptionAnswer(id, is_correct)
  }

  return (
    <div className='option-item' onClick={handdleCorrectAnswer}>
      <span>{text}</span>
    </div>
  )
}

export default DefaultOption