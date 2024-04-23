import {Routes, Route} from 'react-router-dom';
import PageSignUp from './pages/PageSignUp.tsx';
import Template from './components/Template/Template.tsx';
import PageHome from './pages/PageHome.tsx';
import PageDashboard from './pages/PageDashboard.tsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Template/>}>
        <Route index element={<PageHome />} />
        <Route path='/sign-up' element={<PageSignUp />} />
        <Route path='/dashboard' element={<PageDashboard />} />
      </Route>
  </Routes>
  )
}

export default App;
