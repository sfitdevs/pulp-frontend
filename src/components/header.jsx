'use client'
import React from 'react'
import { useContext } from "react";
import ThemeContext from '../context/ThemeContext';



function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggletheme = () => {
    theme === 'light_mode' ? setTheme('dark_mode') : setTheme('light_mode')
    document.body.className = theme
  }
  return (
    <>

      <header className='header'>
        <div className='alt-brand'>
          <h1>Pulp</h1>
        </div>
        <div className='social-links'>
          <ul>
            <li><span className='material-symbols-outlined'>share</span></li>
          </ul>
          <span className='material-symbols-outlined theme-icon' onClick={toggletheme}>{theme}</span>
        </div>
      </header>
    </>
  )
}

export default Header