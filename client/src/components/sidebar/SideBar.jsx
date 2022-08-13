import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/users/categories");
      setCategories(res.data);
    };
    getCategory();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://i.pinimg.com/736x/de/3c/44/de3c4488982fceeb6b8ceab2d00dcf30.jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
          atque sint nesciunt nihil
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((categorie) => (
            <Link to={`/?cat=${categorie.name}`} className="link">
              <li className="sidebarListItem">{categorie.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          <i className="sidebarIcon fa-brands fa-twitter-square"></i>
          <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
          <i className="sidebarIcon fa-brands fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
