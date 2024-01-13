import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from "./comp/Home"
import Header from "./comp/Header"
import Profile from "./comp/Profile"
import Login from "./comp/Login"
import Register from "./comp/Register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"

function App() {

  const { setUser, setIsAuthenticated, setLoading} = useContext(Context);

  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/users/me`, { withCredentials: true }).then((res) => {
      setUser(res.data.user);
      setIsAuthenticated(true)
      setLoading(false)
    }).catch((e) => {
      e.response.data.message;
      setLoading(false)
      setUser({});
      setIsAuthenticated(false)
    })
  }, [])


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
