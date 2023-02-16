import React, { useState, useContext } from 'react';
import { ModeContext } from '../context/ModeContext';

export const accordionData = [
  {
    title: 'How does it work?',
    content: `Follow the processes below in order to receive testnet tokens directly into your wallet:`,
    p1: '1. Enter your Ethereum Wallet Address in order to receive the testnet tokens. ',
    p2: '2. Enter your phone number in order to verify that you want to claim testnet tokens from the Delta Blockchain Fund’s Ethereum faucet. ',
    p3: '3. Verify your OTP in order to be eligible to receive the testnet tokens. ',
  },
  {
    title: 'How many ETH can I claim?',
    content: `You can claim 5 ETH once a day`,
  },
  {
    title: 'When can I claim tokens next?',
    content: `Testnet ETH can be claimed once a month per phone number. `,
  },
  {
    title: 'Do you save any addresses? ',
    content: `No! Privacy is our No. 1 priority and therefore we do not store any wallet addresses. Please reach out to us if you have any questions or concerns. `,
  },
  {
    title: 'What is Delta Blockchain Fund?',
    content: `Delta Blockchain Fund is an early-stage strategic blockchain fund. We are a strategic, product-driven global fund partnering with extraordinary founders and communities in the Web 3.0 space to support an interoperable ecosystem. As a team we create open-source projects in order to support the community.`,
  },
];

const Accordion = ({ title, content, p1, p2, p3 }) => {
  const [isActive, setIsActive] = useState(false);
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);

  return (
    <div
      className={`accordion-item py-8 border-t ${dark ? 'border-t-[#9B9B9B]' : 'border-t-[#03045E]'}  cursor-pointer`}
    >
      <div className='flex flex-row gap-5 justify-between px-1 xl:mx-10 ' onClick={() => setIsActive(!isActive)}>
        <div className='font-primary text-left font-medium text-base xl:text-xl'>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && (
        <div
          className={`font-secondary  text-left xl:text-base text-xs px-3 xl:mx-16 py-5  ${
            dark ? 'text-gray-200 font-extralight' : 'text-[#023E8A] font-medium'
          } `}
        >
          {content}
          {p1 ? (
            <div>
              <br />
              {p1}
              <br />
              <br />
              {p2}
              <br />
              <br />
              {p3}{' '}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default function Faq(props) {
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);

  return (
    <div className=' p-5 xl:px-52 flex flex-col justify-center mb-10 py-6 xl:py-20 mt-44 xl:mt-0' id='faq'>
      <h1
        className={`font-primary text-center xl:text-left text-4xl xl:text-7xl  mb-5 ${
          dark ? 'text-white' : 'text-[#03045E]'
        }`}
      >
        FAQs
      </h1>
      <div className='max-w-full p-5 xl:mx-20'>
        {accordionData.map(({ title, content, p1, p2, p3 }, key) => (
          <Accordion key={key} title={title} content={content} p1={p1} p2={p2} p3={p3} />
        ))}
      </div>
    </div>
  );
}
