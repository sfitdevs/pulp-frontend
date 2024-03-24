import React, { useRef, useEffect, useState, useContext } from 'react';
import ImageContext from '../context/ImageContext';

function Images() {

  const { imageContainerRef} = useContext(ImageContext)
  const [value, setvalue] = useState(true);

  const handleclick = () => {
    setvalue(true);
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    container.addEventListener('click', handleclick);

    return () => {
      container.removeEventListener('click', handleclick);
    };
  }, []);
  
  return (
    <>
      <div className='image'>
    <h2>Images</h2>
        <div ref={imageContainerRef} className='image-box' contentEditable={value}></div>
      </div>
    </>
  );
}

export default Images;
