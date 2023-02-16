import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import React , { useState, useEffect, useContext } from 'react'
import Navbar from '@/components/Navbar'
import Cards from '@/components/Cards'
import Faq from '@/components/Faq'
import Footer from '@/components/Footer'
import { ModeContext } from '../context/ModeContext'
import ReCAPTCHA from "react-google-recaptcha";



export default function Home() {

  const { dark , setIsDark, toggleDarkMode} = useContext(ModeContext)
  var token;
  const recaptchaRef = React.useRef();

  const onRecaptchaClick = async () => {
    token = await recaptchaRef.current.execute();
    console.log("token", token);
    return token;
  }
  const resetCaptcha = () => {
    recaptchaRef.current.reset();
  }
  
  return (
    <>
      <Head>
        <title>Goerli Ethereum Faucet</title>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <meta name="description" content="Goerli Faucet by Delta Blockchain Fund" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/FooterDark.svg" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Days+One&family=Exo+2:wght@500;600&display=swap');
        </style>
      </Head>
      <main className={`subpixel-antialiased flex flex-col text-center justify-center ${dark ? "bg-[#000022] text-white" : "bg-[#CAF0F8] text-[#03045E]"} `}>
        <Navbar  />
        <Cards captchaCode={token} onRecaptchaClick={onRecaptchaClick} resetCaptcha={resetCaptcha} />
        <Faq  />
        <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey="6Le3-V0kAAAAAFY4G4gCawIs5EePPYBO_a425QM2"
      />
        <Footer />
      </main>
    </>
  )
}
