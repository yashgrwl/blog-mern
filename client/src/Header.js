import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from './App';

const Header = () => {
 
  /*useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);*/

  const {userInfo,setUserInfo}=useContext(MyContext)
  async function helper(){
    const res=await fetch('http://localhost:4000/profile', {
      credentials: 'include',
    });
    const info=await res.json();
    setUserInfo(info)
  }
  
 useEffect(()=>{
    helper()
  },[])

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

 const username=userInfo?.username;

  return (
    <main>
      <header>
         <Link to='/' className='logo'>My Blog</Link>
         <nav>
         {username && (<>
          <Link to='/createpost'>Create New Post</Link>
          <a onClick={logout}>Logout</a>
         </>)}
         {!username && (<>
         <Link to='/login'>Login</Link>
         <Link to='/register'>Register</Link>
         </>
         )

         }

         </nav>
      </header>
    </main>
  )
}

export default Header