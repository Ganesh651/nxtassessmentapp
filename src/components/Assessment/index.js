/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'
import Header from '../Header'
// import { ThreeDots } from 'react-loader-spinner'
import DefaultOption from '../DefaultOption'
import { useNavigate } from 'react-router-dom'
import ImageOption from '../ImageOption'
// import DropdownOption from '../DropdownOption'
import QuestionNumbers from '../QuestionNumbers'
import { ToastContainer } from 'react-toastify'
import TimerContext from '../../context/TimerContext'
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
  const [answeredCount, setAnsweredCount] = useState(0)
  const [activeQuestion, setActiveQuestion] = useState(questionNumsList[0].id)
  const navigate = useNavigate()
  const { minutes, seconds, correctAnswer, countCorrectAnswers, timerId, timerStart } = useContext(TimerContext)

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
      timerStart()

    } catch (error) {
      console.log(error)
    }
  }, [token])


  const renderLoadingView = () => (
    <div className='loading-container'>
      <p style={{ fontWeight: "600" }}>Loading...</p>
    </div>
  )

  const changeQuestionNum = (id, queIndex) => {
    setActiveQuestion(id)
    setIndex(queIndex)
  }

  const checkDefaultOptionAnswer = (id, isCorrect) => {
    const currentQuestion = asseementQuetions[index];

    if (!currentQuestion.answered) {
      currentQuestion.options.forEach((each) => {
        if (each.id === id) {
          setAnsweredCount((prevCount) => prevCount + 1);
        } else if ("true" === isCorrect) {
          countCorrectAnswers(correctAnswer + 1)
        }
      });
      setAsseementQuetions((prevQuestions) =>
        prevQuestions.map((q, i) =>
          i === index ? { ...q, answered: true } : q
        )
      );
    }
  };

  const checkIamgeOptionAnswer = (id, isCorrect) => {
    const currentQuestion = asseementQuetions[index];

    if (!currentQuestion.answered) {
      currentQuestion.options.forEach((each) => {
        if (each.id === id) {
          setAnsweredCount((prevCount) => prevCount + 1);
        } else if ("true" === isCorrect) {
          countCorrectAnswers(correctAnswer + 1)
        }
      });
      setAsseementQuetions((prevQuestions) =>
        prevQuestions.map((q, i) =>
          i === index ? { ...q, answered: true } : q
        )
      );
    }
  };

  const checkDropdownOptionAnswer = (id) => {
    const currentQuestion = asseementQuetions[index];

    if (!currentQuestion.answered) {
      currentQuestion.options.forEach((each) => {
        if (each.id === id) {
          setAnsweredCount((prevCount) => prevCount + 1);
        } else if ("true" === each.is_correct) {
          countCorrectAnswers(correctAnswer + 1)
        }
      });
      setAsseementQuetions((prevQuestions) =>
        prevQuestions.map((q, i) =>
          i === index ? { ...q, answered: true } : q
        )
      );
    }
  };

  const handdleNextQuestion = () => {
    setAsseementQuetions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, answered: false } : q))
    );

    if (index < asseementQuetions.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setActiveQuestion(questionNumsList[index + 1].id);
    }
  };

  const handdleAssessmentSubmition = () => {
    if (answeredCount < asseementQuetions.length) {
      alert("Complete the assessment before submission")
    } else {
      console.log(timerId)
      clearInterval(timerId)
      navigate("/results")
    }
  }

  if (minutes === 0 && seconds === 0) {
    clearInterval(timerId)
    navigate("/results")
  }

  const rednerDefaultOptionView = () => (
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
    </>
  )


  const rednerImageOptionView = () => (
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
    </>
  )

  const handleDropDownChange = (e) => {
    checkDropdownOptionAnswer(e.target.value)
  };


  const rednerDropdownOptionView = () => (
    <>
      <select className='dropdown' onChange={handleDropDownChange}>
        {asseementQuetions[index].options.map(option => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.text}
          </option>
        ))}
      </select>
      <ToastContainer />
    </>
  );


  const displayOptions = () => {
    switch (asseementQuetions[index].options_type) {
      case "DEFAULT":
        return rednerDefaultOptionView()
      case "IMAGE":
        return rednerImageOptionView()
      case "SINGLE_SELECT":
        return rednerDropdownOptionView()
      default:
        return null
    }
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