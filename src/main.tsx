import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
// import { AuthProvider} from './utils/context/AuthContext.tsx'
import store from "./redux/store"
import { Provider } from "react-redux"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Provider store={store} >
      {/* <AuthProvider> */}
        < BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </AuthProvider> */}
    </Provider>
  </React.StrictMode>,
)
