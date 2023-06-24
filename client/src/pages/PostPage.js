import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../App";
import { Link,Navigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


const PostPage = () => {
  const { id } = useParams();
  const [postdata, setPostdata] = useState();
  const helper = async () => {
    const res = await fetch(`http://localhost:4000/post/${id}`, {
      credentials: "include",
    });
    const data = await res.json();

    setPostdata(data);
  };
  useEffect(() => {
    helper();
  }, []);

  const { userInfo, setUserInfo } = useContext(MyContext);

  if (!postdata) return "";
  if(!userInfo)
  return <Navigate to='/'/>
  return (
    <>
      {postdata && (
        <>
          <div className="post-page">
            <h1>{postdata.title}</h1>
            <div className="author">by @{postdata.author.username}</div>

            {userInfo.id === postdata.author.id && (
              <div className="edit-row">
                <Link className="edit-btn" to={`/edit/${postdata._id}`}>
                 <EditIcon/>
                  Edit this post
                </Link>
              </div>
            )}

            <div className="image">
              <img src={`http://localhost:4000/${postdata.cover}`} alt=""></img>
            </div>

            <div dangerouslySetInnerHTML={{ __html: postdata.text }} />
          </div>
        </>
      )}
    </>
  );
};

export default PostPage;
