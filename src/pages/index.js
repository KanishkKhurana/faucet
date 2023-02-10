import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import { useState, useEffect, useContext } from 'react'
import Navbar from '@/components/Navbar'
import Cards from '@/components/Cards'
import Faq from '@/components/Faq'
import Footer from '@/components/Footer'
import { ModeContext } from '../context/ModeContext'


export default function Home() {

  const { dark , setIsDark, toggleDarkMode} = useContext(ModeContext)


  
  return (
    <>
      <Head>
        <title>Goerli Faucet</title>
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
        <Cards  />
        <Faq  />
        <Footer />
      </main>
    </>
  )
}
