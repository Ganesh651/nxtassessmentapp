import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TimerContext from '../../context/TimerContext'
import Header from '../Header'
import './index.css'

const Results = () => {
  const { correctAnswer, minutes, seconds } = useContext(TimerContext)
  const navigate = useNavigate()
  console.log(minutes, seconds)
  const takenMinutes = 10 - minutes
  const takenSeconds = 59 - seconds

  const handdleReassessment = () => {
    navigate("/assessment")
  }
  return (
    <>
      <Header />
      <div className='result-section'>
        <div className='result-container'>
          {
            minutes && seconds !== 0 ?
              <>
                <img src="https://res.cloudinary.com/dky69roxl/image/upload/v1705568371/Asset_2_1_h3jrip.png" alt="result" />
                <h2 className='congrats'>Congrats! You completed the assessment.</h2>
                <p className='time-taken'>Time Taken: <span className='time'>00:{takenMinutes < 10 ? `0${takenMinutes}` : `${takenMinutes}`}:{takenSeconds < 10 ? `0${takenSeconds}` : `${takenSeconds}`}</span></p>
                <p className='your-score'>Your Score: <span className='score'>{correctAnswer}</span></p>
                <button type='button'
                  className='reatempt-button'
                  onClick={handdleReassessment}
                >
                  Reattempt
                </button>
              </> :
              <>
                <img src="https://res.cloudinary.com/dky69roxl/image/upload/v1705568376/calender_1_1_ebt1h1.png" alt="result" />
                <h2 className='congrats'>Time is up</h2>
                <p className='no-time-description'>You did not complete the assessment within the time.</p>
                <p className='your-score'>Your Score: <span className='score'>{correctAnswer}</span></p>
                <button type='button'
                  className='reatempt-button'
                  onClick={handdleReassessment}
                >
                  Reattempt
                </button>
              </>
          }

        </div>
      </div >
    </>

  )
}

export default Results