/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'
import Header from '../Header'
// import { ThreeDots } from 'react-loader-spinner'
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
    num: 1,
    queIndex: 0
  },
  {
    id: uuidv4(),
    num: 2,
    queIndex: 1
  },
  {
    id: uuidv4(),
    num: 3,
    queIndex: 2
  },
  {
    id: uuidv4(),
    num: 4,
    queIndex: 3
  },
  {
    id: uuidv4(),
    num: 5,
    queIndex: 4
  },
  {
    id: uuidv4(),
    num: 6,
    queIndex: 5
  },
  {
    id: uuidv4(),
    num: 7,
    queIndex: 6
  },
  {
    id: uuidv4(),
    num: 8,
    queIndex: 7
  },
  {
    id: uuidv4(),
    num: 9,
    queIndex: 8
  },
  {
    id: uuidv4(),
    num: 10,
    queIndex: 9
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
  const [answeredCount, setAnsweredCount] = useState(0)
  const [activeQuestion, setActiveQuestion] = useState(questionNumsList[0].id)
  const navigate = useNavigate()
  const token = Cookies.get("jwt_token")
  console.log(index)
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
      {/* <ThreeDots color="#164687" height={50} width={50} /> */}
      <p>Loading...</p>
    </div>
  )

  const changeQuestionNum = (id, queIndex) => {
    setActiveQuestion(id)
    setIndex(queIndex)
  }

  const checkDefaultOptionAnswer = (id, isCorrect) => {
    asseementQuetions.forEach(eachItem => eachItem.options.forEach(each => {
      if (each.id === id) {
        if (each.is_correct === isCorrect) {
          setAnsweredCount(answeredCount => answeredCount + 1)
        }
      }
    }))
    // handdleNextQuestion()
  }

  const checkIamgeOptionAnswer = (id, isCorrect) => {
    asseementQuetions.forEach(eachItem => eachItem.options.forEach(each => {
      if (each.id === id) {
        if (each.is_correct === isCorrect) {
          setAnsweredCount(answeredCount => answeredCount + 1)
        }
      }
    }))
    // handdleNextQuestion()
  }

  const checkDropdownOptionAnswer = (id, isCorrect) => {
    console.log(id, isCorrect)
    asseementQuetions.forEach(eachItem => eachItem.options.forEach(each => {
      if (each.id === id) {
        if (each.is_correct === isCorrect) {
          setAnsweredCount(answeredCount => answeredCount + 1)
        }
      }
    }))
    // handdleNextQuestion()
  }

  const displayOptions = () => {
    switch (asseementQuetions[index].options_type) {
      case "DEFAULT":
        return (
          <>
            {
              asseementQuetions[index].options.map(option => (
                <DefaultOption
                  option={option}
                  key={option.id}
                  checkDefaultOptionAnswer={checkDefaultOptionAnswer}
                />
              ))
            }
          </>)
      case "IMAGE":
        return (
          <>
            {
              asseementQuetions[index].options.map(option => (
                <ImageOption
                  option={option}
                  key={option.id}
                  checkIamgeOptionAnswer={checkIamgeOptionAnswer}
                />
              ))
            }
          </>)
      case "SINGLE_SELECT":
        return (
          <>
            <select className='dropdown'>
              {
                asseementQuetions[index].options.map(option => (
                  <DropdownOption
                    option={option}
                    key={option.id}
                    checkDropdownOptionAnswer={checkDropdownOptionAnswer}
                  />
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

  // const NextQuestion = (index, numIndex) => {
  //   // setActiveQuestion(index)
  //   // setIndex(numIndex)
  //   console.log(index, numIndex)
  // }

  const handdleNextQuestion = () => {

    if (index < asseementQuetions.length - 1) {
      setIndex(index + 1)
    }
  }

  const handdleAssessmentSubmition = () => {
    clearInterval(timerId)
    navigate("/results")
  }

  if (minutes === 0 && seconds === 0) {
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
        {index < asseementQuetions.length - 1 &&
          <button type='button'
            className='text-question-button'
            onClick={handdleNextQuestion}
          >
            Next Question
          </button>}
      </div>
      <div className='timer-and-next-question-container'>
        <div className='timer-container'>
          <span>Time Left</span>
          <span>00:{minutes < 10 ? `0${minutes} ` : minutes}:{seconds < 10 ? `0${seconds} ` : seconds}</span>
        </div>
        <div className='timer-bottom-section'>
          <div className='answered-unanswered-container'>
            <div className='answered-container'>
              <div className='answered-count-container'>
                <span className='answered-count'>{answeredCount}</span>
              </div>
              <span className='answered-text'>Answered Questions</span>
            </div>
            <div className='answered-container'>
              <div className='unanswered-count-container'>
                <span className='unanswered-count'>{asseementQuetions.length - answeredCount}</span>
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
                <QuestionNumbers
                  number={number}
                  key={number.id}
                  changeQuestionNum={changeQuestionNum}
                  currentQuestion={number.id === activeQuestion}
                  handdleNextQuestion={handdleNextQuestion}
                />
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