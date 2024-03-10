import React, { useContext, useRef } from 'react'
import { useRouter } from 'next/navigation';
import ImageContext from '../context/ImageContext';

function Buttons() {
    const { imageID, inputRefs, modalref, setEditorValue, submitImage, blobURL, setBlobURL, imageContainerRef, content, title } = useContext(ImageContext)
    const router = useRouter();
    const btnref = useRef();

    const createPulp = async () => {
        const images = Array.from(imageContainerRef.current.children);
        for (let index = 0; index < images.length; index++) {
            const lastAddedImage = images[index];
            setBlobURL(lastAddedImage.src);
            submitImage(blobURL);
        }

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

    return (
        <>
            <div className='buttons'>
                <button ref={btnref} className='btn' onClick={openPulp}>Open pulp</button>
                <button className='btn' onClick={createPulp} >Create pulp</button>
                <button className='btn' onClick={handleFiles}>Upload File</button>
            </div>
        </>
    )
}

export default Buttons