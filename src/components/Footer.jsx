import React ,{useContext, useEffect, useState} from 'react'
import CompanyLogo from '../assets/images/FooterDark.svg'
import LightCompanyLogo from '../assets/images/FooterLight.svg'
import Image from 'next/image'
import { ModeContext } from '../context/ModeContext'


export default function Footer(props) {
  const { dark , setIsDark, toggleDarkMode} = useContext(ModeContext)
  const [logo, setLogo] = useState(CompanyLogo)

  useEffect(() => {
    if(dark){
      setLogo(CompanyLogo)
    }else{
      setLogo(LightCompanyLogo)
    }
  }, [dark])
  

  return (
    <div className={`${dark ? "from-black to-transparent" : "from-white to-transparent"} bg-gradient-to-t  pb-3`}>
      <div>
        <div className='flex justify-center'>
          <Image src={logo} alt="Delta blockchain fund goerli ethereum faucet" />
        </div>
        <div className='font-primary pt-5'>
          <a href="mailto:smit@deltafund.io" target="_blank" rel="noopener noreferrer">Contact Us</a>
        </div>
      </div>
      <div className={` p-[0.005rem] mx-5 mt-8 xl:mx-40 px-5 ${dark ? "bg-white" : "bg-[#03045E]"}`} />
      <p className='mt-3 font-secondary text-center text-xs'>@2023 Delta Blockchain Fund</p>
    </div>
  )
}
