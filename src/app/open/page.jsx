import React from 'react'
import Form from '../../components/form'
import Navbar from '../../components/navbar'
import Header from '../../components/header'


function Open() {
  return (
    <>
      <Navbar/>
      <Header/>
      <div className='form'>
        <Form />
      </div>
    </>
  )
}

export default Open