import React from 'react'
import './index.css'

const QuestionNumbers = props => {
  const { number, changeQuestionNum } = props
  const { num, queIndex } = number
  return <button
    className='num-button'
    type='button'
    onClick={() => changeQuestionNum(queIndex)}
  >{num}</button>
}

export default QuestionNumbers