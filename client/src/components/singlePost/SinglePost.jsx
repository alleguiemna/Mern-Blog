import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SinglePost.css";
import {Context} from "../context/Context";
import axios from "axios";


const SinglePost = () => {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const {user} = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [updateMode,setUpdateMode]=useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/users/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc)
    };
    getPost();
  }, [path]);

  const handleDelete = async() =>{
   try {
    await axios.delete(`/users/posts/${post._id}` ,{data:{username:user.username}})
    window.location.replace("/")
   } catch (error) {
    console.log(error)
   }
  }

  const handleUpdate  = async() =>{
    try {
      await axios.put(`/users/posts/${post._id}` ,{username:user.username,title,desc})
      setUpdateMode(false);
     } catch (error) {
      console.log(error)
     }
    }
  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
      {
        post.photo && (
        <img
        src={PF + post.photo}
        alt=""
        className="singlePostImg"
      />
      )}
      {updateMode ? (<input  type="text" value={title}  className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/> ) :(
        <h1 className="singlePostTitle">
        {title}
      {
        post.username === user?.username && (
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() =>setUpdateMode(true)}></i>
            <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
          </div>
          )}
      </h1>
              )}
      <div className="singlePostInfo">
        <span className="singlePostAuthor">
          Author:
          <Link to={`/?user=${post.username}`} className="link">
          <b>{post.username}</b>
          </Link>
        </span>
        <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      {
        updateMode ? (<textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/>) :(
        <p className="singlePostDescription">
        {desc}
      </p>
      )}
      {
        updateMode && (
      <button className="singlePostButton" onClick={handleUpdate}>
        Edit
      </button>
      )}
    </div>
  </div>
  )
};


export default SinglePost;
