/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'
import Header from '../Header'
import { ThreeDots } from 'react-loader-spinner'
import DefaultOption from '../DefaultOption'
import ImageOption from '../ImageOption'
import DropdownOption from '../DropdownOption'
import QuestionNumbers from '../QuestionNumbers'
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
  console.log(asseementQuetions)
  const token = Cookies.get("jwt_token")

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
      case "DEAFULT":
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
            {
              asseementQuetions[index].options.map(option => (
                <DropdownOption option={option} key={option.id} />
              ))
            }
          </>)
      default:
        return null
    }
  }

  const handdleNextQuestion = () => {
    if (index < asseementQuetions.length - 1) {
      setIndex(index + 1)
    }
  }

  const renderSuccessView = () => (
    <div className='assessment-container'>
      <div className='assessment-question-container'>
        <span>{index + 1}. {asseementQuetions[index].question_text}</span>
        <hr style={{ color: "#979797" }} />
        {displayOptions()}
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
          <span>00:10:00</span>
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
          <button type='button' className='submit-assessment-button'>
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