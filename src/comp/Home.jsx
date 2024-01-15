import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Context, server } from '../main';
import Event from './event';
import { Navigate } from 'react-router-dom';

function Home() {

  const [tit, setTitle] = useState("");
  const [disc, setDesc] = useState("");
  const [load, setLoad] = useState(false)
  const [tsk, setTsk] = useState([])
 
  const { isAuthenticated,refresh,setRefresh } = useContext(Context)


  const submithndl = async (e) => {
    e.preventDefault();
    try {
      setLoad(true)
      const { data } = await axios.post(`${server}/task/new`,
        {
          title: tit,
          description: disc,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        })
      toast.success(data.message)
      setLoad(false)
      setDesc("")
      setTitle("")
      setRefresh((opp) => !opp)
    }
    catch (error) {
      toast.error("please try agian")
      setLoad(false)
    }
  }

  useEffect(() => {
    axios.get(`${server}/task/my`, { withCredentials: true, }).then((res) => { setTsk(res.data.tsk) }).catch((e) => { toast.error(e.response.data.message) })
  }, [refresh])


  if (!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <div className='container'>
      <div className='login'>
        <section>
          <form onSubmit={submithndl}>
            <input type='text' value={tit} onChange={(e) => setTitle(e.target.value)} placeholder='Write Payment Title Here' required></input>
            <input type='text' value={disc} onChange={(e) => setDesc(e.target.value)} placeholder='Write Payment details Here' required></input>
            <button disabled={load} type='submit'>Add Payment</button>
          </form>
        </section>
      </div>

      <section className='todosContainer'>
        {tsk.map((items) => (
          <Event items={items} key={items._id} />
        ))}


      </section>

    </div>
  )
}

export default Home