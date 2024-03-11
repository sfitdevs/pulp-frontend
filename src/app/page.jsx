'use client'
import React from "react";
import Navbar from "../components/navbar"
import Header from "../components/header";
import Editor from "../components/editor";
import Images from "../components/images";
import Modal from "../components/modal";
import './global.css'

export default function Home() {

  return (
    <>
      <Navbar />
      <Header />
      <Editor />
      <Modal />
      <Images />
    </>
  );
}
