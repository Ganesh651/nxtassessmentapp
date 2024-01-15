import { Routes, Route } from 'react-router-dom'
import Assessment from '../Assessment'
import Home from '../Home'
import Login from '../Login'
import Notfound from '../Notfound'
import Wrapper from '../Wrapper'
import Results from '../Results'


const AppRoutes = () => (
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
)

export default AppRoutes