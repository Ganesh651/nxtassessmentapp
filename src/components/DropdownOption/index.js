import React from 'react'
import './index.css'
const DropdownOption = (props) => {
  const { option, checkDropdownOptionAnswer } = props
  const { id, text, is_correct, } = option

  const handdleDropDownOption = () => {
    checkDropdownOptionAnswer(id, is_correct)
  }

  return <option onChange={handdleDropDownOption} value={is_correct}>{text}</option>

}

export default DropdownOption