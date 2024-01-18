import { createContext } from "react";


const TimerContext = createContext({
  minutes: 10,
  seconds: 59,
  correctAnswer: 0,
  changeMinutes: () => { },
  changeSeconds: () => { },
  countCorrectAnswers: () => { },
  timerStart: () => { },
  timerId: null
})



export default TimerContext