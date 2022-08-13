import React, { useContext, useState } from "react";
import { Context } from "../../components/context/Context";
import SideBar from "../../components/sidebar/SideBar";
import "./Settings.css";
import axios from "axios";


const Settings = () => {
  const { user,dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF= "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDTAE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profielPic = filename;
      try {
       const res= await axios.post("/users/upload", data);
       console.log(res.data)
      } catch (error) {}
    }
    try {
      const res=await axios.put(`/users/users/${user._id}`, updatedUser);
      setSuccess(true);
    dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    } catch (error) {
     dispatch({
      type:"UPDATE_FAILURE"
     })
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt="" />
            <br />
            <label htmlFor="fileInput">
              <i className="settingPPIcon fa-solid fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">update</button>
          {success && <span style={{color:"green",textAlign:"center",margin:"20px"}}>Profile has been updated</span>}
        </form>
      </div>
      <SideBar />
    </div>
  );
};

export default Settings;