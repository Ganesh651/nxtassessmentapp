/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'
import Header from '../Header'
import { ThreeDots } from 'react-loader-spinner'
import DefaultOption from '../DefaultOption'
import { useNavigate } from 'react-router-dom'
import ImageOption from '../ImageOption'
import DropdownOption from '../DropdownOption'
import QuestionNumbers from '../QuestionNumbers'
import { toast, ToastContainer } from 'react-toastify'
import './index.css'

const questionNumsList = [
  {
    id: uuidv4(),
    num: 1
  },
  {
    id: uuidv4(),
    num: 2
  },
  {
    id: uuidv4(),
    num: 3
  },
  {
    id: uuidv4(),
    num: 4
  },
  {
    id: uuidv4(),
    num: 5
  },
  {
    id: uuidv4(),
    num: 6
  },
  {
    id: uuidv4(),
    num: 7
  },
  {
    id: uuidv4(),
    num: 8
  },
  {
    id: uuidv4(),
    num: 9
  },
  {
    id: uuidv4(),
    num: 10
  }
]

const apiConstraints = {
  initial: "INITIAL",
  in_progress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE"
}

const Assessment = () => {
  const [asseementQuetions, setAsseementQuetions] = useState([])
  const [apiStatus, setApiStatus] = useState(apiConstraints.initial)
  const [index, setIndex] = useState(0)
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(59);
  const navigate = useNavigate()

  const token = Cookies.get("jwt_token")

  let timerId = null;

  useEffect(() => {
    try {
      const url = `https://apis.ccbp.in/assess/questions`
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      const getAssessmentQuestions = async () => {
        setApiStatus(apiConstraints.in_progress)
        const response = await fetch(url, options)
        const data = await response.json()
        setApiStatus(apiConstraints.success)
        if (data) {
          setAsseementQuetions(data.questions)
        } else {
          setApiStatus(apiConstraints.failure)
        }

      }
      getAssessmentQuestions()

      timerId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 0) {
                clearInterval(timerId);
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    } catch (error) {
      console.log(error)
    }
  }, [token])


  const renderLoadingView = () => (
    <div className='loading-container'>
      <ThreeDots color="#164687" height={50} width={50} />
    </div>
  )

  const displayOptions = () => {
    switch (asseementQuetions[index].options_type) {
      case "DEFAULT":
        return (
          <>
            {
              asseementQuetions[index].options.map(option => (
                <DefaultOption option={option} key={option.id} />
              ))
            }
          </>)
      case "IMAGE":
        return (
          <>
            {
              asseementQuetions[index].options.map(option => (
                <ImageOption option={option} key={option.id} />
              ))
            }
          </>)
      case "SINGLE_SELECT":
        return (
          <>
            <select className='dropdown'>
              {
                asseementQuetions[index].options.map(option => (
                  <DropdownOption option={option} key={option.id} />
                ))
              }
            </select>
            <ToastContainer />
          </>
        )
      default:
        return null
    }
  }

  const handdleNextQuestion = () => {
    if (index < asseementQuetions.length - 1) {
      setIndex(index + 1)
    }
    return toast("First option is selected by default")
  }

  const handdleAssessmentSubmition = () => {
    clearInterval(timerId)
    navigate("/results")
  }


  const renderSuccessView = () => (
    <div className='assessment-container'>
      <div className='assessment-question-container'>
        <span className='question'>{index + 1}. {asseementQuetions[index].question_text}</span>
        <hr style={{ color: "#979797" }} />
        <div className='options-container'>
          {displayOptions()}
        </div>
        <button type='button'
          className='text-question-button'
          onClick={handdleNextQuestion}
        >
          Next Question
        </button>
      </div>
      <div className='timer-and-next-question-container'>
        <div className='timer-container'>
          <span>Time Left</span>
          <span>00:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
        <div className='timer-bottom-section'>
          <div className='answered-unanswered-container'>
            <div className='answered-container'>
              <div className='answered-count-container'>
                <span className='answered-count'>{0}</span>
              </div>
              <span className='answered-text'>Answered Questions</span>
            </div>
            <div className='answered-container'>
              <div className='unanswered-count-container'>
                <span className='unanswered-count'>{0}</span>
              </div>
              <span className='answered-text'>Unanswered Questions</span>
            </div>
          </div>
        </div>
        <hr />
        <div className='question-numbers'>
          <div>
            <h3 className='questions-heading'>Questions{`(${asseementQuetions.length})`}</h3>
            <div className='num-buttons-list'>
              {questionNumsList.map(number => (
                <QuestionNumbers number={number} key={number.id} />
              ))}
            </div>
          </div>
          <button type='button'
            className='submit-assessment-button'
            onClick={handdleAssessmentSubmition}
          >
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  )

  const renderfailureView = () => { }


  const renderAssessmentView = () => {
    switch (apiStatus) {
      case apiConstraints.in_progress:
        return renderLoadingView()
      case apiConstraints.success:
        return renderSuccessView()
      case apiConstraints.failure:
        return renderfailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className='assessment-section'>
        {renderAssessmentView()}
      </div>
    </>

  )
}

export default Assessment