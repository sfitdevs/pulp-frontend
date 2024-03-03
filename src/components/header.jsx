'use client'
import React, { useState, useEffect } from 'react'

function Header(props) {

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
          <span className='material-symbols-outlined theme-icon' onClick={props.toggleTheme}>{props.theme == 'light_mode'?'dark_mode':'light_mode'}</span>
        </div>
      </header>
    </>
  )
}

export default Header