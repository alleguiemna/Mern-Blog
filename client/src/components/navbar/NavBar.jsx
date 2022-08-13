import React, { useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const NavBar = () => {
  const {user,dispatch}= useContext(Context);
  const PF="http://localhost:5000/images/"
  const handleLogout = () =>{
  dispatch({type:"LOGOUT"})
  }
  return (
    <div className="nav">
      <div className="navLeft">
        <i className="navIcon fa-brands fa-facebook-square"></i>
        <i className="navIcon fa-brands fa-twitter-square"></i>
        <i className="navIcon fa-brands fa-pinterest-square"></i>
        <i className="navIcon fa-brands fa-instagram-square"></i>
      </div>
      <div className="navCenter">
        <ul className="navList">
          <li className="navListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="navListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="navListItem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="navListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="navListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
        </ul>
      </div>
      <div className="navRight">
        {user ? (
          <Link to="/settings">
          <img
            className="navImg"
            src={PF+user.profilePic }
            alt=""
            />
            </Link>
        ) : (
          <ul className="navList">
            <li className="navListItem">
              <Link className="link" to="/login">
                LOGIN{" "}
              </Link>
            </li>
            <li className="navListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="navSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default NavBar;

