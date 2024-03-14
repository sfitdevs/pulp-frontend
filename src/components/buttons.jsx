import React, { useContext, useRef } from 'react'
import { useRouter } from 'next/navigation';
import ImageContext from '../context/ImageContext';

function Buttons() {
    const {data, setData, password, image, setImage, inputRefs, modalref, setEditorValue, submitImage, imageContainerRef, content, title } = useContext(ImageContext)
    const router = useRouter();
    const btnref = useRef();

    const createPulp = async () => {
        const images = Array.from(imageContainerRef.current.children);
        const imagesArray = []
        console.log(image)
        for (let index = 0; index < images.length; index++) {
            let imageid = await submitImage(image[index]);
            imagesArray.push(imageid)
        }

        let response = await fetch("https://pulp.deta.eu.org/pulp", {
            method: "POST",
            body: JSON.stringify({ content, images: imagesArray, title, password}),
            headers: { "Content-Type": "application/json" }
        });

        let { key, accessKey } = await response.json();
        localStorage.setItem(key, accessKey);
        router.push(`/${key}`)
        setImage([])
        setEditorValue("")
    }
    
    const openPulp = async () => {
        modalref.current.style.display = "block";
        inputRefs.current[0].focus();
    }

    const fileChanged = (e) => {
        console.log("file changed")
        let file = e.target.files[0];
        setEditorValue(file);
    }

    const handleFiles = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.onchange = (e) => { fileChanged(e) };
        fileInput.click();
    };

    const handleUpload = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => handleImagesUpload(e.target.files);
        fileInput.click();
    };

    const handleImagesUpload = (files) => {
        for (const file of files) {
            const img = new Image();

            img.onload = function () {
                const imageElement = this.cloneNode(true);
                imageContainerRef.current.appendChild(imageElement);
            };
            img.src = URL.createObjectURL(file);
        }
        setImage(prevarray => [...prevarray, files[0]])

    };

    return (
        <>
            <div className='buttons'>
                <button ref={btnref} className='btn' onClick={openPulp}>Open pulp</button>
                <button className='btn' onClick={createPulp} >Create pulp</button>
                <button className='btn' onClick={handleFiles}>Upload File</button>
                <button className='btn' onClick={handleUpload}>Upload Image</button>

            </div>
        </>
    )
}

export default Buttons