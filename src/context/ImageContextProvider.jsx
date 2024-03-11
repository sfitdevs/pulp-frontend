'use client'
import React, { useState, useRef } from "react";

import ImageContext from "./ImageContext";

const ImageContextProvider = ({ children }) => {
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [password, setPassword] = useState('')
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

    async function submitImage(file) {
        const formData = new FormData();

        formData.append('file', file);

        let res = await fetch('https://pulp.deta.eu.org/image/', {
            method: 'POST',
            body: formData,
        });
        let data = await res.json();
        return data.id
    }

    return (
        <ImageContext.Provider value={{ password, setPassword, image, setImage, title, setTitle, modalref, setEditorValue, inputRefs, content, setContent, submitImage, imageContainerRef }}>
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContextProvider