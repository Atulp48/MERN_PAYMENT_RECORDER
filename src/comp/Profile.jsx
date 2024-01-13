import React, { useContext } from 'react'
import { Context } from '../main';
import Loader from './Loader';
import { Navigate } from 'react-router-dom';

function Profile() {

  const { isAuthenticated, loading, user } = useContext(Context);

  if (!isAuthenticated) return <Navigate to={"/login"} />

  return (
    (loading && user) ? <Loader /> : (
      <div>
        <h1>USER NAME ={user?.name}</h1>
        <p>USER_EMAIL={user?.email}</p>
      </div>
    )
  )
}

export default Profile