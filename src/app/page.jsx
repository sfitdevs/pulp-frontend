'use client'
import React, { useState } from "react";
import Navbar from "../components/navbar"
import Header from "../components/header";
import Editor from "../components/editor";
import Form from "../components/form"
import './global.css'

export default function Home() {
  const [theme, setTheme] = useState('light_mode')
  document.body.className = theme;

  const toggleTheme = () => {
    if (theme === 'light_mode') {
      setTheme('dark_mode');
    } else {
      setTheme('light_mode');
    }
    document.body.className = theme;
  }

  return (
    <>
      <Navbar />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Editor theme={theme === 'light_mode' ? 'github' : 'monokai'} />
    </>
  );
}
