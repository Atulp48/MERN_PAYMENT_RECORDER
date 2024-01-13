import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../main'

function Login() {
    const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const submithndl = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/users/login`, {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            toast.success(data.message);
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(false)
            setLoading(false)
            console.log(error);
        }
    };


    if (isAuthenticated) return <Navigate to={"/"} />

    return (
        <div className='login'>
            <section>
                <form onSubmit={submithndl}>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter the Email' required></input>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter the password' required></input>
                    <button disabled={loading} type='submit'>Login</button>
                    <h4>or</h4>
                    <Link to="/register">sign up</Link>
                </form>
            </section>
        </div>
    )
}

export default Login