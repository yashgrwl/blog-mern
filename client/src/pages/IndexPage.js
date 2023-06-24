import React, { useEffect, useState } from 'react'
import Post from '../Post'


const IndexPage = () => {
  const [data,setdata]=useState([])

  const helper=async()=>{
    const res=await fetch('http://localhost:4000/postdata')
    const postdata=await res.json(res);
    setdata(postdata);
   
  }
  //<Post title={data[0].title} summary={data[0].summary}/>
  useEffect(()=>{
    helper()
  },[])
  return (
    <>
         
       
      {data.length > 0 ? (
        <>
         {
          data.map((val)=>{
            console.log(val.author)
            return <Post {...val}/>
          })
         }
         </>

      ) : (
        <p>Loading...</p>
      )}
  
         
         
    </>
  )
}

export default IndexPage