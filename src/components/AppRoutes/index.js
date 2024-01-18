import { Routes, Route } from 'react-router-dom'
import Assessment from '../Assessment'
import Home from '../Home'
import Login from '../Login'
import Notfound from '../Notfound'
import Wrapper from '../Wrapper'
import Results from '../Results'
import TimerContext from '../../context/TimerContext'
import { useContext, useState } from 'react'


const AppRoutes = () => {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(59);
  const [correctAnswer, setCorrectAnswer] = useState(0)
  let { timerId } = useContext(TimerContext)

  const changeMinutes = mins => {
    setMinutes(mins)
  }

  const changeSeconds = secs => {
    setSeconds(secs)
  }

  const countCorrectAnswers = count => {
    setCorrectAnswer(count)
  }

  const timerStart = () => {
    timerId = setInterval(() => {
      changeSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          changeMinutes((prevMinutes) => {
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
  }

  return (
    <TimerContext.Provider value={{
      minutes, seconds,
      correctAnswer, changeMinutes,
      changeSeconds, countCorrectAnswers,
      timerStart, timerId
    }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <Wrapper>
            <Home />
          </Wrapper>
        } />
        <Route path="/assessment" element={
          <Wrapper>
            <Assessment />
          </Wrapper>
        } />
        <Route path="/results" element={
          <Wrapper>
            <Results />
          </Wrapper>
        } />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </TimerContext.Provider>
  )
}

export default AppRoutes