import React from 'react'
import './index.css'

const ImageOption = (props) => {
  const { option } = props
  const { id, text, is_correct, image_url } = option

  return <img className='option-images' src={image_url} alt={text} />

}

export default ImageOption