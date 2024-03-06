'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

function Form() {
    const [pulpid, setpulpid] = useState('')
    const [id, setId] = useState(new Array(5).fill(""))
    const inputRefs = useRef([]);
    const router = useRouter();

    useEffect(() => {
      if(inputRefs.current[0]){
        inputRefs.current[0].focus();
      }
    }, [])
    

    const handlePulpid = (index, e) => {
        const value = e.target.value

         const newID = [...id];
         newID[index] = value.substring((value.length) - 1);
         setId(newID);

         const newPulpid = newID.join("");
         if(newPulpid.length === 5) setpulpid(newPulpid);

         if(value && index < 4 && inputRefs.current[index + 1]){
            inputRefs.current[index + 1].focus()
         }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (pulpid.length != 5) {
            alert("Invalid pulp id!!!");
            return;
        }
        else {
            router.push(`/${pulpid}`)
        }
    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1,1);

        if(index>0 && !id[index -1]){
            inputRefs.current[id.indexof("")]
        }
    }

    const handleKeyDown = (index, e) => {
        if(e.key==="Backspace"  && !id[index] && index > 0 && inputRefs.current[index-1]){
            inputRefs.current[index - 1].focus()
        }

    }

    return (
        <>  
            <div className='form-input'>
            <h1>Enter your Pulp ID</h1>
                <form onSubmit={handleOnSubmit}>
                    {
                        id.map((value, index) => {
                            return <input
                                type="text"
                                ref={(input)=> inputRefs.current[index]= input}
                                value={value}
                                onChange={(e) => handlePulpid(index, e)}
                                onClick={() => handleClick(index)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='id-input' />
                        })
                    }
                    <button type='submit' className='btn'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Form