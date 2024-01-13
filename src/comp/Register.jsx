import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Context, server } from '../main'
import { Link, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const submithndl = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/users/new`, {
                name, email, password
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
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your Name' required></input>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter the Email' required></input>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter the password' required></input>
                    <button disabled={loading} type='submit'>sign Up</button>
                    <h4>or</h4>
                    <Link to="/login">login</Link>
                </form>
            </section>
        </div>
    )
}

export default Register