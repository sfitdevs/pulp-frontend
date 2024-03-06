'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'

function Form() {
    const [pulpid, setpulpid] = useState('')

    const router = useRouter();

    const handlePulpid = (e) => {
        setpulpid(e.target.value)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (pulpid.length != 5) {
            alert("invalid pulp id");
            return;
        }
        else {
            router.push(`/${pulpid}`)
        }
    }

    return (
        <>
            <h1>This is pulp id page</h1>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <input type="text" value={pulpid} onChange={handlePulpid} />
                    <button type='submit' className='btn'>Submit</button>
                    <pre>
                        <code>
                           
                        </code>
                    </pre>
                </form>
            </div>
        </>
    )
}

export default Form