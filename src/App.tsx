import { Routes, Route, Navigate } from "react-router-dom";
import PageSignUp from "./pages/PageSignUp.tsx";
import PageHome from "./pages/PageHome.tsx";
import PageDashboard from "./pages/PageDashboard.tsx";
import TemplateLogged from "./components/Template/TemplateLogged.tsx";
import TemplateNotLogged from "./components/Template/TemplateNotLogged.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/dashboard" element={<TemplateLogged />}>
            <Route index element={<PageDashboard />} />
          </Route>

          <Route element={<TemplateNotLogged />}>
            <Route index element={<PageHome />} />
            <Route path="sign-up" element={<PageSignUp />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </>
  );
}

export default App;
