import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="headerTitles">
            <span className="headerTitleSm">React & Node</span>
            <span className="headerTitleLg">Blog</span>
        </div>
        <img className="headerImg" src="https://img.freepik.com/photos-premium/cascade-magique-seljalandsfoss-islande_31965-3248.jpg?w=2000" alt="" />
    </div>
  )
}

export default Header