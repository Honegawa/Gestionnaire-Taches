import {Routes, Route} from 'react-router-dom'
import Template from './components/Template/Template.jsx'
import PageSignUp from './pages/PageSignUp.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template/>}>
      <Route path='/sign-up' element={<PageSignUp />} />
        {/* <Route path='/home' element={<PageHome />} />
        <Route path='/dashboard' element={<PageDashboard />} /> */}
      </Route>
  </Routes>
  )
}

export default App;
