import React from 'react'
import './index.css'
const DropdownOption = (props) => {
  const { option } = props
  const { id, text, is_correct, } = option

  return <option>{text}</option>

}

export default DropdownOption