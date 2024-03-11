import React, { useContext, useRef } from 'react'
import { useRouter } from 'next/navigation';
import ImageContext from '../context/ImageContext';

function Buttons() {
    const { image, setImage, inputRefs, modalref, setEditorValue, submitImage, imageContainerRef, content, title } = useContext(ImageContext)
    const router = useRouter();
    const btnref = useRef();

    const createPulp = async () => {
        const images = Array.from(imageContainerRef.current.children);
        const imagesArray = []
        for (let index = 0; index < images.length; index++) {
            let imageid = await submitImage(image);
            imagesArray.push(imageid)
        }

        let response = await fetch("https://pulp.deta.eu.org/pulp", {
            method: "POST",
            body: JSON.stringify({ content, images: imagesArray, title }),
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
        fileInput.onchange = (e) => handleFileUpload(e.target.files);
        fileInput.click();
    };

    const handleFileUpload = (files) => {
        for (let i = 0; i < files.length; i++) {
            setImage(prevarray => [...prevarray, files[i]])
        }
        for (const file of files) {
            const img = new Image();

            img.onload = function () {
                const imageElement = this.cloneNode(true);
                imageContainerRef.current.appendChild(imageElement);
            };
            img.src = URL.createObjectURL(file);
        }
    };

    return (
        <>
            <div>
                <button ref={btnref} className='btn' onClick={openPulp}>Open pulp</button>
                <button className='btn' onClick={createPulp} >Create pulp</button>
                <button className='btn' onClick={handleFiles}>Upload File</button>
                <button className='btn' onClick={handleUpload}>Upload Image</button>

            </div>
        </>
    )
}

export default Buttons