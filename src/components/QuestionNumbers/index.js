import React from 'react'
import './index.css'

const QuestionNumbers = props => {
  const { number } = props
  const { num } = number
  return <><button className='num-button' type='button'>{num}</button></>
}

export default QuestionNumbers