
import React, { useState } from 'react'

const RegisterPage = () => {
  const [username,setUsername]=useState('');
  const [password,setpassword]=useState('');

  async function submit(ev) {
    ev.preventDefault();
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (res.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }



  return (
    <form className='register' onSubmit={submit}>
    <h1>Register</h1>
      <input type='text' placeholder='username' 
      value={username} 
      onChange={(e)=>{
        setUsername(e.target.value)
      }}/>
      <input type='password' placeholder='password' 
        value={password}
        onChange={(e)=>{
          setpassword(e.target.value)
        }}
      />
      <button>Register</button>
    </form>
  )
}

export default RegisterPage