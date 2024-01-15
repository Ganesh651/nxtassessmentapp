import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Wrapper = ({ children }) => {
  const token = Cookies.get("jwt_token")

  if (!token) {
    return <Navigate to="/login" />
  } return children

}

export default Wrapper