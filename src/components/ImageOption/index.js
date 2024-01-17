import React from 'react'
import './index.css'

const ImageOption = (props) => {
  const { option, checkIamgeOptionAnswer } = props
  const { id, text, is_correct, image_url } = option

  const handdleImageCorrectAnswer = () => {
    checkIamgeOptionAnswer(id, is_correct)
  }

  return <img
    className='option-images'
    src={image_url}
    alt={text}
    onClick={handdleImageCorrectAnswer}
  />

}

export default ImageOption