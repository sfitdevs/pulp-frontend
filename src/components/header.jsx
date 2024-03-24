'use client'
import React, { useState } from 'react'
import { useContext } from "react";
import ThemeContext from '../context/ThemeContext'
import ImageContext from '../context/ImageContext';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';


function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const router = useRouter();

  const toggletheme = () => {
    theme === 'light_mode' ? setTheme('dark_mode') : setTheme('light_mode')
    document.body.className = theme
  }

  const startLiveShare = () => {
    router.push('/liveshare')
  }

  return (
    <>
      <header className='header'>
        <div className='alt-brand'>
          <h1>Pulp</h1>
        </div>
        <div className='social-links'>
          <ul>
            <li>
              <span className='material-symbols-outlined'>share</span>
              <span className='material-symbols-outlined theme-icon' onClick={startLiveShare}>screen_share</span>
              <span className='material-symbols-outlined theme-icon' onClick={toggletheme}>{theme}</span>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header