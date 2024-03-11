'use client'
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navbar'
import Header from '../../components/header'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"

import ThemeContext from '../../context/ThemeContext';

function page({ params }) {
const { theme } = useContext(ThemeContext)
const [data, setData] = useState({})

useEffect( ()=>{
  (async()=>{
    const res = await fetch(`https://pulp.deta.eu.org/pulp/${params.pulpid}`)
    setData(await res.json())
    console.log(data);
  })()
}, [])

const pulpContent = data.content == undefined ? "Pulp Not Found" : data.content;
const titleContent = data.title !== "" ? data.title : "No title specified";
const language = data.language !== "" ? data.language : "txt";

const imageArr = data.images == undefined ? [""] : data.images


  return (
    <>
      <Navbar />
      <Header />
      <div className='open'>
        <h2>Title: {titleContent}</h2>

        <AceEditor className='ace'
                    style={{
                        fontFamily: 'var(--font-mono)',
                        width: '75%'
                    }}
                    fontSize={16}
                    mode="javascript"
                    readOnly ={true}
                    theme={theme === 'light_mode' ? 'monokai' : 'github'}
                    showPrintMargin={false}
                    value={pulpContent} />
        <h3 style={{
          fontFamily: "var(--font-mono)",
          fontSize: "15px"
        }}>Pulp ID: {data.key} | Views: {data.views} | Language: {language}</h3>
        {imageArr.map((id) => {
          return (
            <>
              <div className='image-content' key={id}>
                <h3>Images: </h3>
                <img key={id} src={`https://pulp.deta.eu.org/image/${id}`} alt="No Images found" />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default page