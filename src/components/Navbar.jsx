import React, { useState, useContext } from 'react';
import Image from 'next/image';
import NameDark from '../assets/images/NameDark.svg';
import NameLight from '../assets/images/NameLight.svg';
import { BsMoon } from 'react-icons/bs';
import { BsFillMoonFill } from 'react-icons/bs';
import { ModeContext } from '../context/ModeContext';

export default function Navbar(props) {
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);

  return (
    <div className='z-50 w-full top-0'>
      <div
        className={`flex justify-between py-6 ${
          dark ? 'bg-gradient-to-b from-black  to-transparent' : 'bg-gradient-to-b from-white  via-white to-transparent'
        }  xl:px-44 px-5`}
      >
        <div className=''>
          <a href='/'>
            <Image src={dark ? NameDark : NameLight} className='xl:w-3/4 w-2/5' />
          </a>
        </div>
        <div className='flex xl:gap-12 gap-5 mt-0.5'>
          <a href='#faq' className='font-primary text-sm xl:text-3xl'>
            FAQs
          </a>
          {dark ? (
            <BsMoon onClick={toggleDarkMode} className={`text-white text-xl xl:mt-2 hover:cursor-pointer`} />
          ) : (
            <BsFillMoonFill
              onClick={toggleDarkMode}
              className={`text-[#000022] xl:text-xl xl:mt-2 hover:cursor-pointer`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
