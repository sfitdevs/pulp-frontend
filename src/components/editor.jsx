'use client'
import React, { useContext, useRef, useState, useEffect } from 'react'
import AceEditor from "react-ace";
import Images from "../components/images";

import { useRouter } from "next/navigation";
import ThemeContext from '../context/ThemeContext';
import ImageContext from '../context/ImageContext';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"

function Editor() {

    const { theme } = useContext(ThemeContext)
    const { imageID } = useContext(ImageContext)
    const [content, setContent] = useState('')
    const [pulpid, setpulpid] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState(new Array(5).fill(""))

    const router = useRouter();

    const btnref = useRef();
    const modalref = useRef();
    const inputRefs = useRef([]);

    const handleonChange = (e) => {
        setContent(e.valueOf())
    }
    const handleLable = (e) => {
        setTitle(e.target.value)
    }

    useEffect(() => {
        window.addEventListener('click', closeModal);
        window.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                modalref.current.style.display = "none"
            };
        })

        return () => {
            window.removeEventListener('click', closeModal);
            window.removeEventListener('keydown', () => { })
        };
    }, [])

    const closeModal = (event) => {
        if (event.target === modalref.current) {
            modalref.current.style.display = "none";
        }
    };

    const handlePulpid = (index, e) => {
        const value = e.target.value;

        const newID = [...id];
        newID[index] = value.substring((value.length) - 1);
        setId(newID);

        const newPulpid = newID.join("");
        if (newPulpid.length === 5) setpulpid(newPulpid);

        if (value && index < 4 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (pulpid.length != 5) {
            alert("Invalid pulp ID !!!");
            return;
        }
        else {
            router.push(`/${pulpid}`)
        }
    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        if (index > 0 && !id[index - 1]) {
            inputRefs.current[id.indexof("")]
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !id[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus()
        }
    }

    const createPulp = async () => {

        let response = await fetch("https://pulp.deta.eu.org/pulp", {
            method: "POST",
            body: JSON.stringify({ content, images: imageID, title }),
            headers: { "Content-Type": "application/json" }
        });
        let { key, accessKey } = await response.json();
        await navigator.clipboard.writeText(`https://pulp.deta.dev/${key}`);
        localStorage.setItem(key, accessKey);
        router.push(`/${key}`)
    }

    const openPulp = () => {
        modalref.current.style.display = "block";
        inputRefs.current[0].focus();
    }

    let setEditorValue = (file) => {
        console.log("set editor value")
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function (e) { setContent(e.target.result); };
        reader.readAsText(file);
    }

    let fileChanged = (e) => {
        console.log("file changed")
        let file = e.target.files[0];
        setEditorValue(file);
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
                <AceEditor className='ace' style={{
                    fontFamily: 'var(--font-mono)',
                    width: '75%'
                }} fontSize={16}
                    theme={theme === 'light_mode' ? 'monokai' : 'github'}
                    mode="c_cpp"
                    onChange={handleonChange}
                    showPrintMargin={false}
                    value={content} />

                <div className='label-box'>
                    <h3>Title Below: </h3>
                    <input type="text" className='input-label' placeholder='Enter title...' onChange={handleLable} />
                </div>
            </div>



            <div ref={modalref} className='modal'>
                <div className="modal-content">
                    <div className='form-input'>
                        <h1>Enter your Pulp ID</h1>
                        <form onSubmit={handleOnSubmit}>
                            {
                                id.map((value, index) => {
                                    return <input
                                        type="text"
                                        ref={(input) => inputRefs.current[index] = input}
                                        value={value}
                                        onChange={(e) => handlePulpid(index, e)}
                                        onClick={() => handleClick(index)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className='id-input' />
                                })
                            }
                            <button type='submit' className='btn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <Images />

            <div className='buttons'>
                <button ref={btnref} className='btn' onClick={openPulp}>Open pulp</button>
                <button className='btn' onClick={createPulp} >Create pulp</button>
                <label for="file-upload" class="btn-label">Upload File</label>
                <input id="file-upload" accept='' onChange={fileChanged} style={{
                    display: "none"
                }} type="file" />
            </div>
        </>
    )
}

export default Editor