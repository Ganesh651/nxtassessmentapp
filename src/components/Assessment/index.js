/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import { ThreeDots } from 'react-loader-spinner'
import './index.css'

const apiConstraints = {
  initial: "INITIAL",
  in_progress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE"
}

const Assessment = () => {
  const [asseementQuetions, setAsseementQuetions] = useState([])
  const [apiStatus, setApiStatus] = useState(apiConstraints.initial)
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
        console.log(data)
        if (data) {
          setAsseementQuetions(data)
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
      <ThreeDots color="#164687" height={30} width={30} />
    </div>
  )

  const renderSuccessView = () => { }

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
      {renderAssessmentView()}
    </>

  )
}

export default Assessment