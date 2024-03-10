'use client'
import React, { useState, useRef } from "react";

import ImageContext from "./ImageContext";

const ImageContextProvider = ({ children }) => {
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState([])

    const modalref = useRef()
    const inputRefs = useRef([])
    const imageContainerRef = useRef(null);

    const setEditorValue = (file) => {
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function (e) { setContent(e.target.result); };
        reader.readAsText(file);
    }

    async function submitImage(files) {
        const formData = new FormData();

        for (const file of files) {
            formData.append('file', file);
        }

        let res = await fetch('https://pulp.deta.eu.org/image/', {
            method: 'POST',
            body: formData,
        });
        let data = await res.json();
        console.log(data)
        return data.id
    }

    return (
        <ImageContext.Provider value={{ image, setImage, title, setTitle, modalref, setEditorValue, inputRefs, content, setContent, submitImage, imageContainerRef }}>
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContextProvider