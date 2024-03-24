'use client'
import React from "react";
import Navbar from "../components/navbar"
import Header from "../components/header";
import Editor from "../components/editor";
import Images from "../components/images";
import Modal from "../components/modal";
import Buttons from "../components/buttons";
import './global.css'

export default function Home() {

  return (
    <>
      <Navbar />
      <Header />
      <Editor />
      <Buttons/>
      <Modal />
    </>
  );
}
