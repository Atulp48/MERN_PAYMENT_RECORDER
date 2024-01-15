import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../main';

function Header() {

  const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(Context);


  const lgHndl = async () => {
    setLoading(true)

    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      })
      toast.success(data.message);
      setIsAuthenticated(false)
      setLoading(false)
    } catch (error) {
      toast.error("dff")
      setIsAuthenticated(true)
      setLoading(false)
      console.log(error);
    }
  };


  return (
    <nav className='header'>
      <div>
        <h2>PAYMENT</h2>
      </div>
      <article>
        <Link to={"/"}>
          Home
        </Link>
        <Link to={"/profile"}>
          Profile
        </Link>
        {isAuthenticated ?
          (<button disabled={loading} onClick={lgHndl} className="btn">Logout</button>)
          :
          (<Link to={"/login"}>Login</Link>)
        }

      </article>

    </nav>
  )
}

export default Header