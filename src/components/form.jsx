import React from 'react'
import { useState } from 'react'

function Form() {
    const [pulpid, setpulpid] = useState('')

    const handlePulpid = (e) => {
        setpulpid(e.target.value)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (pulpid.length < 5) {
            alert("invalid pulp id");
            return;
        }
        else {
            let response = await fetch(`https://pulp.deta.dev/api/${pulpid}`);
            let data = await response.json();
            console.log(data.content)
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