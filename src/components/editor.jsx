'use client'
import React, { useContext, useRef, useState } from 'react'
import AceEditor from "react-ace";

import ThemeContext from '../context/ThemeContext';
import ImageContext from '../context/ImageContext';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"
import Images from './images';


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

    return (
        <>
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
                    value={content} />

                <div className='label-box'>
                    <h3>Title Below: </h3>
                    <input type="text" className='input-label' placeholder='Enter title...' onChange={handleLable} />
                    <h3 style={{
                        paddingTop: '1em'
                    }}>Enter password: </h3>
                    <input style={{
                        marginBottom: '1em'
                    }} type="text" className='input-label' placeholder='Enter title...' onChange={handlepassword} />
                    <Images />
                </div>
            </div>
        </>
    )
}

export default Editor