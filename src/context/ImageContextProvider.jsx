'use client'
import React, { useState } from "react";

import ImageContext from "./ImageContext";

const ImageContextProvider = ({children}) =>{
const [imageID, setimageID] = useState([])


    
    return (
        <ImageContext.Provider value={{imageID, setimageID}}>
        {children}
        </ImageContext.Provider>
    )
}

export default ImageContextProvider