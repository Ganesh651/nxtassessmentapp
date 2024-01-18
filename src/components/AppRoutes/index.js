import { Routes, Route } from 'react-router-dom'
import Assessment from '../Assessment'
import Home from '../Home'
import Login from '../Login'
import Notfound from '../Notfound'
import Wrapper from '../Wrapper'
import Results from '../Results'
import TimerContext from '../../context/TimerContext'
import { useState } from 'react'


const AppRoutes = () => {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(59);
  const [correctAnswer, setCorrectAnswer] = useState(0)

  const changeMinutes = mins => {
    setMinutes(mins)
  }

  const changeSeconds = secs => {
    setSeconds(secs)
  }

  const countCorrectAnswers = count => {
    setCorrectAnswer(count)
  }
  return (
    <TimerContext.Provider value={{
      minutes, seconds,
      correctAnswer, changeMinutes,
      changeSeconds, countCorrectAnswers
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