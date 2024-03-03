'use client'
import React, { useState } from 'react'
import AceEditor from "react-ace";
import { useRouter } from "next/navigation";


import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"

function Editor(props) {
    const [content, setContent] = useState('')
    const router = useRouter();
    const handleonChange = (e) => {
        setContent(e.valueOf())
    }

    const createPulp = async () => {
        let response = await fetch("https://pulp.deta.eu.org/pulp", {
            method: "POST",
            body: JSON.stringify({ content, images: [] }),
            headers: { "Content-Type": "application/json" }
        });
        let { key, accessKey } = await response.json();
        await navigator.clipboard.writeText(`https://pulp.deta.dev/${key}`);
        localStorage.setItem(key, accessKey);
        router.push(`/${key}`)
    }
    return (
        <>
            <div className='editor'>
                <h3>Enter your text below:</h3>
                <AceEditor className='ace' style={{
                    fontFamily: 'var(--font-mono)',
                    width: '75%'
                }} fontSize={16} theme={props.theme} mode="javascript" onChange={handleonChange}
                    showPrintMargin={false} />
            </div>
            <div className='buttons'>
                <button className='btn'>Open pulp</button>
                <button className='btn' onClick={createPulp} >Create pulp</button>
            </div>
        </>
    )
}

export default Editor