'use client'
import React, { useContext, useRef, useState } from 'react'
import AceEditor from "react-ace";

import ThemeContext from '../context/ThemeContext';
import ImageContext from '../context/ImageContext';
import Buttons from '../components/buttons'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"

function Editor() {

    const { theme } = useContext(ThemeContext)
    const { setEditorValue, content, setContent, setTitle, setPassword } = useContext(ImageContext)


    const handleonChange = (e) => {
        setContent(e.valueOf())
    }

    const handleLable = (e) => {
        setTitle(e.target.value)
    }

    const handlepassword = (e) => {
        setPassword(e.target.value)
    }

    document.body.ondragover = (event) => { event.preventDefault(); };
    document.body.ondrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.items && event.dataTransfer.items[0].kind === "file") {
            setEditorValue(event.dataTransfer.items[0].getAsFile());
        } else {
            setEditorValue(event.dataTransfer.files[0]);
        }
    };

    return (
        <>
            <h3 id='hero'>Enter your text below:</h3>
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
                    value={content} />

                <div className='label-box'>
                    <h3>Title Below: </h3>
                    <input type="text" className='input-label' placeholder='Enter title...' onChange={handleLable} />
                    <h3>Enter password: </h3>
                    <input type="text" className='input-label' placeholder='Enter title...' onChange={handlepassword} />
                    <Buttons />
                </div>

            </div>
        </>
    )
}

export default Editor