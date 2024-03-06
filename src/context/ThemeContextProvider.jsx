'use client'
import React, { useState } from "react";

import ThemeContext from "./ThemeContext";

const ThemeContextProvider = ({children}) =>{
const [theme, setTheme] = useState('dark_mode')
    
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider