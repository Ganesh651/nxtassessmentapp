import { Routes, Route } from 'react-router-dom'
import Assessment from '../Assessment'
import Home from '../Home'
import Login from '../Login'
import Notfound from '../Notfound'
import Wrapper from '../Wrapper'


const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/assessment" element={<Assessment />} />
    <Route path="*" element={<Notfound />} />
  </Routes>
)

export default AppRoutes