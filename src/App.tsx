import {Routes, Route} from 'react-router-dom'
import Template from './components/Template/Template.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template/>}> 
        {/* <Route path='/home' element={<PageHome />} />
        <Route path='/sign-up' element={<PageSignUp />} />
        <Route path='/dashboard' element={<PageDashboard />} /> */}
      </Route>
  </Routes>
  )
}

export default App;
