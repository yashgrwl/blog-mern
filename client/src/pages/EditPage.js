import { useContext, useEffect ,useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Navigate, useParams} from 'react-router-dom'
import { MyContext } from "../App";


const EditPage = () => {

  const {userInfo,setUserInfo}=useContext(MyContext)
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [text, setText] = useState();
  const [file, setFile] = useState();
  const [reDirect,setRedirect]=useState(false)
  const {id}=useParams();
  

  const inputData=async()=>{
    const res = await fetch(`http://localhost:4000/post/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setText(data.text);
      setTitle(data.title);
      setSummary(data.summary);
  }

  useEffect(()=>{
      inputData()  
  },[])

  async function submit(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("file", file);
    formData.append("text", text);
    

    const res = await fetch(`http://localhost:4000/editpost/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if(res.ok)
    {
        setRedirect(true);
    }
  }

  if(reDirect)
  return <Navigate to='/'/>
  if(!userInfo)
  return  <Navigate to='/'/>

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <ReactQuill theme="snow" value={text} onChange={setText} />
      <button style={{ marginTop: "10px" }}>Edit Post</button>
    </form>
  );
};


export default EditPage