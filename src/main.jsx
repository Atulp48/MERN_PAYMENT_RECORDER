import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./design/app.scss"

export const server = "https://notelist-1wbx.onrender.com/api/v1"


export const Context = createContext()

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({})
  const [refresh,setRefresh]=useState(true)
  
  return (
    <Context.Provider value={{
      isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser,refresh,setRefresh
    }}>
      <App />
    </Context.Provider>

  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
)
