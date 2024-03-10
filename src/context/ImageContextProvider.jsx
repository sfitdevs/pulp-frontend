'use client'
import React, { useState, useRef } from "react";

import ImageContext from "./ImageContext";

const ImageContextProvider = ({ children }) => {
    const [imageID, setimageID] = useState([])
    const [content, setContent] = useState('')
    const [blobURL, setBlobURL] = useState('')
    const [title, setTitle] = useState('')

    const modalref = useRef()
    const inputRefs = useRef([])
    const imageContainerRef = useRef(null);

    const setEditorValue = (file) => {
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function (e) { setContent(e.target.result); };
        reader.readAsText(file);
    }

    async function submitImage(blobURL) {
        const bodyContent = new FormData();
    
        const response = await fetch(blobURL);
        const blob = await response.blob();
    
        bodyContent.append('file', blob);
    
          let res = await fetch('https://pulp.deta.eu.org/image/', {
            method: 'POST',
            body: bodyContent,
          });
          let data = await res.json();
          console.log(data)
          setimageID(prevArray => [...prevArray, data.id])
      }

    return (
        <ImageContext.Provider value={{ title, setTitle, imageID, setimageID, modalref, setEditorValue, inputRefs, content, setContent, blobURL, setBlobURL, submitImage, imageContainerRef }}>
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContextProvider