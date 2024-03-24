"use client"
import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../components/navbar'
import Header from '../../components/header'
import { io } from 'socket.io-client';
import ThemeContext from '../../context/ThemeContext'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"


function page() {
    const [ content, setContent ] = useState(" ");
    const [socket, setsocket] = useState(undefined);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const socket = io("http://localhost:8000")
        setsocket(socket);
    }, [])

    const handleonChange = (e) => {
        setContent(e.valueOf())
        socket.emit("message", content)
    }
    return (
        <>
            <Navbar />
            <Header />
            <h3 id='hero'>Enter text below:</h3>
            <div className='editor'>
                <AceEditor className='ace'
                    style={{
                        fontFamily: 'var(--font-mono)',
                        width: '75%'
                    }}
                    fontSize={16}
                    theme={theme === 'light_mode' ? 'monokai' : 'github'}
                    mode="javascript"
                    onChange={handleonChange}
                    showPrintMargin={false}
                />
            </div>
        </>
    )
}

export default page