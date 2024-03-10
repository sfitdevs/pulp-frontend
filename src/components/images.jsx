import React, { useRef, useEffect, useState, useContext } from 'react';
import ImageContext from '../context/ImageContext';

function Images() {

  const {imageContainerRef } = useContext(ImageContext)
  const [value, setvalue] = useState(true);


  const handlePaste = (e) => {
    e.preventDefault();
    const item = Array.from(e.clipboardData.items).find((x) => /^image\//.test(x.type));

    if (item) {
      const blob = item.getAsFile();
      const img = new Image();

      img.onload = function () {
        const imageElement = this.cloneNode(true);
        imageContainerRef.current.appendChild(imageElement);
      };

      img.src = URL.createObjectURL(blob);
      setvalue(true);
    }
  };

  const handleUndo = (e) => {
    if ((e.key === 'z' && e.ctrlKey) || e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();

      const images = Array.from(imageContainerRef.current.children);
      if (images.length > 0) {
        const lastAddedImage = images.pop();
        lastAddedImage.remove();
      }
    } else if (e.key !== 'Backspace' && e.key !== 'Meta' && !e.ctrlKey) {
      setvalue(false);
    }
  };

  const handleclick = () => {
    setvalue(true);
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    container.addEventListener('paste', handlePaste);
    container.addEventListener('keydown', handleUndo);
    container.addEventListener('click', handleclick);

    return () => {
      container.removeEventListener('paste', handlePaste);
      container.removeEventListener('keydown', handleUndo);
      container.removeEventListener('click', handleclick);
    };
  }, []);

  const handleUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => handleFileUpload(e.target.files);
    fileInput.click();
  };

  const handleFileUpload = (files) => {
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
      <div className='image'>
        <h2>Images</h2>
        <div ref={imageContainerRef} className='image-box' contentEditable={value}></div>
        <button className='btn' onClick={handleUpload}>Upload Image</button>
      </div>
    </>
  );
}

export default Images;
