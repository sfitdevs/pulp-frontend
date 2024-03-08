'use client'
import Navbar from '../../components/navbar'
import Header from '../../components/header'
import { useEffect } from 'react'

async function getData(id) {
  const res = await fetch(`https://pulp.deta.dev/api/${id}`)
  return res.json()
}

async function page({ params }) {


  let data = await getData(params.pulpid)

  return (
    <>
      <Navbar />
      <Header />
      <div className='open'>
        <h2>Title:{data.title}</h2>
        <h3>Pulp ID: {data.key}</h3>
        <h4>Views: {data.views}</h4>
        <h4>Language: {data.language}</h4>

        <div className='content-box'>
          <pre><code>{data.content}</code></pre>
        </div>
      </div>
    </>
  )
}

export default page