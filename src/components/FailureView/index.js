import './index.css'

const FailureView = props => {
  const { getAssessmentQuestions } = props

  return (
    <div className='failure-container'>
      <div className='failure'>
        <img src="https://res.cloudinary.com/dky69roxl/image/upload/v1705568386/Group_7519_xz601i.png"
          alt="failure"
          className='failure-image'
        />
        <h2 className='failure-heading'>Oops! Something went wrong</h2>
        <p className='failiure-description'>We are having some trouble</p>
        <button type='buton'
          className='retry-button'
          onClick={() => getAssessmentQuestions()}
        >
          Retry
        </button>
      </div>
    </div>
  )

}

export default FailureView