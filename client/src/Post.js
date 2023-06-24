import React from 'react'
import { Link } from 'react-router-dom'
const Post = ({_id,title,summary,cover,author}) => {
  return (
    <main>
    <div className='post'>
        <div className='image'>
        <Link to={`/post/${_id}`}>
         <img src={'http://localhost:4000/'+cover} alt=""/>
         </Link>
        </div>
        <div className='texts'>
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className='info'>
            <Link className='author'>{author.username}</Link>
            
        </p>
        <p className='summary'>
        {summary}
        </p>

        </div>
    </div>
    </main>
  )
}

export default Post