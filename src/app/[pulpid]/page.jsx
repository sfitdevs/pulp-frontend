'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar'
import Header from '../../components/header'
import ThemeContext from '../../context/ThemeContext';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"


function page({ params }) {
  const { theme } = useContext(ThemeContext)
  const [data, setData] = useState({})
  const [password, setPassword] = useState('')
  const passwordref = useRef()


  useEffect(() => {
    (async () => {
      const res = await fetch(`https://pulp.deta.eu.org/pulp/${params.pulpid}`)
      setData({ ...await res.json(), status: res.status })
    })()
  }, [])

  let pulpContent = data.content == undefined ? "Pulp Not Found" : data.content;
  let titleContent = data.title !== "" ? data.title : "No title specified";
  let language = data.language !== "" ? data.language : "txt";

  let imageArr = data.images == undefined ? [""] : data.images

  const handlepassword = async (e) => {
    setPassword(e.target.value)

  }

  const handlepasswordSubmit = async () => {
    const response = await fetch(`https://pulp.deta.eu.org/pulp/${params.pulpid}/?password=${password}`)
    if (response.status === 200) {
      setData(await response.json())
      pulpContent = data.content == undefined ? "Pulp Not Found" : data.content;
      titleContent = data.title !== "" ? data.title : "No title specified";
      language = data.language !== "" ? data.language : "txt";
      imageArr = data.images == undefined ? [""] : data.images
    }
    else {
      alert("Invalid password")
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    window.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        passwordref.current.style.display = "none"
      };
    })

    return () => {
      window.removeEventListener('click', closeModal);
      window.removeEventListener('keydown', () => { })
    };
  }, [])

  const closeModal = (event) => {
    if (event.target === passwordref.current) {
      passwordref.current.style.display = "none";
    }
  };

  return (
    <>
      <Navbar />
      <Header />
      {
        (data.status != 401) ? <div className='open'>
          <h2>Title: {titleContent}</h2>

          <AceEditor className='ace'
            style={{
              fontFamily: 'var(--font-mono)',
              width: '75%'
            }}
            fontSize={16}
            mode="javascript"
            readOnly={true}
            theme={theme === 'light_mode' ? 'monokai' : 'github'}
            showPrintMargin={false}
            value={pulpContent} />
          <h3 style={{
            fontFamily: "var(--font-mono)",
            fontSize: "15px"
          }}>Pulp ID: {data.key} | Views: {data.views} | Language: {language}</h3>
          <h3>Images: </h3>
          {imageArr.map((id) => {
            return (
              <>
                <img className='image-content' key={id} src={`https://pulp.deta.eu.org/image/${id}`} alt="No Images found" />
              </>
            )
          })}
        </div> :
          <div ref={passwordref} className="password-box">
            <div >
              <div className='password-input'>
                <h1>Enter password</h1>
                <h6 style={{
                  fontFamily: "var(--font-mono)",
                  padding: "1em"
                }}>This pulp is password protected</h6>
                <form onSubmit={handleOnSubmit} action="none">
                  <input className='password-label' type="password" onChange={handlepassword} />
                  <button className='btn' onClick={handlepasswordSubmit} type='submit'> Submit</button>
                </form>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default page