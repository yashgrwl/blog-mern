import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Navigate} from 'react-router-dom'



const CreatePost = () => {


  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [text, setText] = useState();
  const [file, setFile] = useState();
  const [reDirect,setRedirect]=useState(false)

  async function submit(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("file", file);
    formData.append("text", text);

    const res = await fetch("http://localhost:4000/createpost", {
      method: "POST",
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
      <button style={{ marginTop: "10px" }}>Create Post</button>
    </form>
  );
};

export default CreatePost;
