import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { MyContext } from '../App'




const LoginPage = () => {

  

  const [username,setUsername]=useState('')
  const [password,setpassword]=useState('')
  const[reDirect,setreDirect]=useState(false);

  const {userInfo,setUserInfo}=useContext(MyContext)

  async function login (ev){
    ev.preventDefault();
    const res=await fetch('http://localhost:4000/login',{
      method:'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
      credentials:'include'
    } )
    if(res.ok)
    {
      const data=await res.json();
      setUserInfo(data);
      setreDirect(true);
    }

  }
  if(reDirect)
    return <Navigate to='/'/>
  return (
    
    <form className='login' onSubmit={login}>
       <h1>Login</h1>
      <input type='text' placeholder='username' value={username} onChange={(e)=>{
         setUsername(e.target.value)
      }}/>
      <input type='password' placeholder='password' value={password} onChange={(e)=>{
        setpassword(e.target.value)
      }}/>
      <button>Login</button>
    </form>
  )
}

export default LoginPage