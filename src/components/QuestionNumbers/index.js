import React from 'react'
import './index.css'

const QuestionNumbers = props => {
  const {
    number,
    changeQuestionNum,
    currentQuestion,
  } = props
  const { id, num, queIndex } = number

  const qustionNumButton = () => {
    changeQuestionNum(id, queIndex)
  }

  const activeQuestionClassName = currentQuestion ? "active-button" : "num-button"


  return <button
    className={activeQuestionClassName}
    type='button'
    onClick={qustionNumButton}
  >{num}</button>
}

export default QuestionNumbers