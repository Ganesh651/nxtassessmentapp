import React from 'react'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Home = () => {
  const navigate = useNavigate()

  const onStartAssessment = () => {
    navigate("/assessment")
  }

  return (
    <>
      <Header />
      <div className='home-container'>
        <div className='instructions-container'>
          <h3 className='instructions-heading'>Instructions</h3>
          <ol className='list-of-instructions'>
            <li><span style={{ fontWeight: "600" }}>Total Questions:</span> 10</li>
            <li><span style={{ fontWeight: "600" }}>Types of Questions:</span> MCQs</li>
            <li><span style={{ fontWeight: "600" }}>Duration:</span> 10 Mins</li>
            <li><span style={{ fontWeight: "600" }}>Marking Scheme:</span> Every Correct response, get 1 mark</li>
            <li>All the progress will be lost, if you reload during the assessment</li>
          </ol>
          <button type="button"
            className='asseement-button'
            onClick={onStartAssessment}
          >
            Start Assessment
          </button>
        </div>
        <img src="https://res.cloudinary.com/dky69roxl/image/upload/v1705321532/Group_yda6nz.png"
          alt="assessment"
          className='asseement-image'
        />
      </div>
    </>
  )
}

export default Home