'use client'
import React from "react";
import Navbar from "../components/navbar"
import Header from "../components/header";
import Editor from "../components/editor";
import Form from "../components/form"
import './global.css'

export default function Home() {


  return (
    <>
      <Navbar />
      <Header/>
      <Editor/>
    </>
  );
}
