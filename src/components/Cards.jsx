import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import ETHDark from '../assets/images/EthDark.png';
import ETHLight from '../assets/images/EthLight.png';
import LogoDark from '../assets/images/LogoDark.svg';
import LogoLight from '../assets/images/LogoLight.svg';
import { ModeContext } from '../context/ModeContext';
import { BsTwitter } from 'react-icons/bs';
import axios from 'axios';
import countries from '../utils/Countries';
import Link from 'next/link';

const WalletDetails = (props) => {
  const [visibility, setVisibility] = useState(false);
  const Move = () => {
    setVisibility(true);
  };
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);
  // const validWalletExp = new RegExp(/^0x[a-fA-F0-9]{40}$/g);
  const [valid, setValid] = useState(false); //control program flow
  const [validWallet, setValidWallet] = useState(''); //local wallet store
  const [errorMsg, setErrorMsg] = useState(false); //if incorrect wallet, show error msg
  const [apiError, setApiError] = useState(false); //if api error, show error msg

  const handleSubmit = async (event) => {
    // console.log(props.country + props.phone);
    console.log(validWallet);
    const validWalletExp = new RegExp(/^0x[a-fA-F0-9]{40}$/g);
    const isValid = validWalletExp.test(validWallet);

    if (isValid) {
      await props.setWallet(validWallet);
      console.log(props.wallet);
      props.setStep('2');
      setTimeout(Move, 300);
    } else {
      setErrorMsg(true);
      setValid(false);
    }
  };

  return (
    <div className={`${visibility ? 'hidden' : ''}`}>
      <div
        className={` ${
          props.step === '1' ? 'scale-100 duration-300' : 'scale-0 duration-300 '
        } flex justify-center xl:justify-center w-full`}
      >
        <div
          className={`bg-gradient-to-b backdrop-blur-sm rounded-xl  w-11/12 xl:min-w-min  border-[0.03rem]  p-5 ${
            dark
              ? 'from-[#0000669c] to-[#000000a1] border-[#e8e6ebb0]'
              : 'from-[#0077B6] to-[#ffffff3f] border-[#03045E]'
          }`}
        >
          {/* <div className="flex font-primary xl:text-4xl"></div> */}
          <div className='text-left mt-4 xl:ml-16'>
            <h1 className='font-primary xl:text-4xl text-xl '>Enter Your Wallet Details</h1>
            <div
              className={`font-secondary  ${dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'}`}
            >
              <p className='xl:w-3/4 my-3 xl:my-5 xl:text-xl text-xs'>
                Provide your Ethereum wallet address where you wish to receive the Goerli ETH
              </p>
            </div>
          </div>
          <div className='flex mt-12 xl:ml-16'>
            <input
              type='text'
              className={`border-[0.05rem] bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 rounded-lg w-full xl:basis-2/3  text-black text-center font-primary py-3 ${
                dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
              }`}
              placeholder='0x3c04391.....sffe28'
              onChange={(e) => setValidWallet(e.target.value)}
            />
          </div>
          {errorMsg && (
            <div>
              {' '}
              <p
                className={`font-secondary xl:ml-16  ${
                  dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                } text-left mt-2 text-xs`}
              >
                {' '}
                Please enter correct wallet address{' '}
              </p>
            </div>
          )}
          <div className='mt-12 flex xl:ml-16 pb-12'>
            <button
              className={` ${
                dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
              } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PhoneNumber = (props) => {
  const [visibility, setVisibility] = useState('');
  const Move = () => {
    setVisibility('hidden');
  };

  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);
  const [validNum, setValidNum] = useState('');
  const [myCountry, setMyCountry] = useState('');
  const [apiError, setApiError] = useState('');
  const [numError, setNumError] = useState(false);

  const sendPhone = async (captcha) => {
    try {
      console.log('inside sendPhone');
      const { data } = await axios.post('https://testnetfaucet.io/api/requestTokens', {
        phone: myCountry + validNum,
        captchaCode: captcha,
        countryCode: myCountry,
      });
      console.log(data);
      const id = data.requestId;
      const myReqId = id.toString();
      await props.setReqId(myReqId);
      console.log(props.reqId);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async () => {
    setNumError(false);
    // setApiError(null);
    console.log(props.wallet);
    console.log(myCountry + validNum);
    const tempNum = Number(myCountry + validNum);
    const validPhone = new RegExp(/^\+?[1-9][0-9]{7,14}$/);
    const isValid = validPhone.test(tempNum);

    if (isValid) {
      await props.setPhone(tempNum);
      console.log(props.phone);
      console.log('Getting captcha token');
      const token = await props.onRecaptchaClick();
      // const token = '123';
      console.log(`Captcha token: ${token}`);
      if (token) {
        try {
          const data = await sendPhone(token);
          // props.resetCaptcha();
          //  console.log(apiError);
          //  if (apiError === '') {
          props.setStep('3');
          setTimeout(Move, 300);
          //  }
        } catch (error) {
          console.log(error);
          setApiError(error.response.data.error);
          console.log(error.response.data.error);
        }
        props.resetCaptcha();
      }
    } else {
      // alert("Please enter a valid phone number");
      setNumError(true);
    }
  };

  return (
    <div className={`${visibility}`}>
      <div
        className={` ${
          props.step === '2' ? ' scale-100 duration-300' : 'scale-0 duration-300 '
        } flex flex-col justify-center w-full`}
      >
        <div className='flex justify-center'>
          <div
            className={`bg-gradient-to-b backdrop-blur-sm rounded-xl w-11/12 xl:min-w-min  border-[0.03rem]  p-5 ${
              dark
                ? 'from-[#0000669c] to-[#000000a1] border-[#e8e6ebb0]'
                : 'from-[#0077B6] to-[#ffffff3f] border-[#03045E]'
            }`}
          >
            {/* <div className="flex font-primary xl:text-4xl">2.</div> */}
            <div className='text-left mt-4 xl:ml-16'>
              <h1 className='font-primary xl:text-4xl text-xl '>Enter Your Phone Number </h1>
              <div
                className={`font-secondary  ${
                  dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                }`}
              >
                <p className='xl:w-3/4 my-3 xl:my-5 xl:text-xl text-xs'>
                  In order to prevent spam we need to verify your number
                </p>
              </div>
            </div>
            <div className='flex flex-col xl:flex-row mt-12 xl:ml-16 gap-2'>
              <div className='xl:basis-1/6 basis-1/3'>
                <select
                  name='countrycode'
                  id=''
                  className={`border-[0.05rem] h-full bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 text-xs rounded-lg w-full xl:basis-2/3 text-black text-center font-primary py-3 ${
                    dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
                  }`}
                  onChange={(e) => setMyCountry(e.target.value)}
                >
                  <option>Select Country</option>
                  {countries.map((country) => {
                    return (
                      <option value={country.dial_code} key={country.code}>
                        {country.name}
                        {'   '}
                        {country.flag}
                      </option>
                    );
                  })}
                </select>
              </div>
              <input
                type='text'
                className={`border-[0.05rem] bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 rounded-lg w-full xl:basis-2/3 text-black text-center font-primary py-3 ${
                  dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
                }`}
                value={validNum}
                placeholder='XXXXXXXXXX'
                onChange={(e) => setValidNum(String(Number(e.target.value.replace(/^0+/, '')) || ''))}
              />
            </div>
            {numError && (
              <div>
                {' '}
                <p
                  className={`font-secondary xl:ml-16  ${
                    dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                  } text-left mt-2 text-xs`}
                >
                  {' '}
                  Please enter a valid phone number{' '}
                </p>
              </div>
            )}
            {apiError && (
              <div>
                {' '}
                <p
                  className={`font-secondary xl:ml-16  ${
                    dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                  } text-left mt-2 text-xs`}
                >
                  {' '}
                  {apiError}{' '}
                </p>
              </div>
            )}
            <div className='mt-12 flex xl:ml-16 pb-12'>
              <button
                className={` ${
                  dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
                } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
                onClick={() => onSubmit()}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        <div className={`${visibility} flex justify-center xl:justify-end xl:mr-20`}>
          <p
            className={`font-secondary text-base pt-2 mx-3 xl:mx-0 font-thin ${
              dark ? 'text-[#D2D2D2] ' : 'text-[#023E8A]'
            }`}
          >
            *You can only claim upto 5 Goerli Ethereum Testnet per month.
          </p>
        </div>
      </div>
    </div>
  );
};

const VerifyOTP = (props) => {
  const [visibility, setVisibility] = useState(false);
  const Move = () => {
    setVisibility(true);
  };
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);

  const [process, setProcess] = useState(false);

  const [otpIssue, setOtpIssue] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const verifyPhone = async (captcha) => {
    try {
      const { data } = await axios.post('https://testnetfaucet.io/api/verifyRequest', {
        requestId: props.reqId,
        code: props.otp,
        address: props.wallet,
        captchaCode: captcha,
      });
      await setOtpIssue(false);
      return true;
      // console.log(response);
    } catch (error) {
      throw error;
      // console.log(error);
      // setOtpIssue(true);
      // await setErrorMsg(error.response.data.message);
      // return false;
    }
  };
  const resendOTP = async (captcha) => {
    try {
      await axios.post('https://testnetfaucet.io/api/requestTokens/resend', {
        requestId: props.reqId,
        captchaCode: captcha,
      });
    } catch (error) {
      throw error;
    }
    // await axios
    //   .post('https://testnetfaucet.io/api/requestTokens/resend', {
    //     requestId: props.reqId,
    //     captchaCode: captcha,
    //   })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };

  const handleSubmit = async (event) => {
    setProcess(true);
    console.log('in handle submit');
    // Execute the reCAPTCHA when the form is submitted
    const token = await props.onRecaptchaClick();
    // const token
    console.log('here');
    console.log(token);
    if (token) {
      try {
        const forward = await verifyPhone(token);
        console.log('resetting token');
        setProcess(false);
        // recaptchaRef.current.reset();
        props.setStep('4');
        setTimeout(Move, 300);
      } catch (error) {
        // setProcess(false);
        // setOtpIssue(true);
        await setErrorMsg(error.response.data.error);
      }
      // if (forward) {

      // }
      props.resetCaptcha();
    }
  };

  const handleResendOTP = async (event) => {
    //   event.preventDefault();
    console.log('in handle submit');
    // Execute the reCAPTCHA when the form is submitted
    const token = await props.onRecaptchaClick();
    console.log('here');
    console.log(token);
    if (token) {
      try {
        await resendOTP(token);
        console.log('resetting token');
      } catch (error) {}

      props.resetCaptcha();
    }
  };

  return (
    <div className={`${visibility ? 'hidden' : ''}`}>
      <div
        className={` ${props.step === '3' ? 'scale-100 duration-300' : 'scale-0 duration-300 '} flex justify-center `}
      >
        <div
          className={`bg-gradient-to-b backdrop-blur-sm rounded-xl  w-11/12 xl:min-w-min  border-[0.03rem]  p-5 ${
            dark
              ? 'from-[#0000669c] to-[#000000a1] border-[#e8e6ebb0]'
              : 'from-[#0077B6] to-[#ffffff3f] border-[#03045E]'
          }`}
        >
          {/* <div className="flex font-primary xl:text-4xl">3.</div> */}
          <div className='text-left mt-4 xl:ml-16'>
            <h1 className='font-primary xl:text-4xl text-xl '>Verify Your OTP</h1>
            <div
              className={`font-secondary  ${dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'}`}
            >
              <p className='xl:w-3/4 my-3 xl:my-5 xl:text-xl text-xs'>
                Enter the OTP you received in order to receive the Goerli ETH
              </p>
            </div>
          </div>
          <div className='flex mt-12 xl:ml-16'>
            <input
              type='text'
              className={`border-[0.05rem] bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 rounded-lg w-full xl:basis-2/3 text-black text-center font-primary py-3 ${
                dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
              }`}
              placeholder='- - - - - -'
              onChange={(e) => props.setOtp(e.target.value)}
            />
          </div>
          {process && (
            <div>
              {' '}
              <p
                className={`font-secondary xl:ml-16  ${
                  dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                } text-left mt-2 text-xs`}
              >
                {' '}
                {errorMsg != null ? errorMsg : `Processing Request...`}{' '}
              </p>
            </div>
          )}

          <div className='mt-12 flex flex-col xl:flex-row gap-5 xl:ml-16 pb-12'>
            <button
              className={` ${
                dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
              } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
              onClick={() => handleSubmit()}
            >
              SUBMIT
            </button>
            <button
              className={` ${
                dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
              } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
              onClick={() => handleResendOTP()}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Done = (props) => {
  const [visibility, setVisibility] = useState(false);
  const Move = () => {
    setVisibility(true);
  };
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);
  const [process, setProcess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState(false);

  const sendRepo = async (captcha) => {
    console.log('sending repo');
    try {
      const { data } = await axios.post('https://testnetfaucet.io/api/submitGithub', {
        url: url,
        captchaCode: captcha,
      });

      return true;
      // console.log(response);
    } catch (error) {
      throw error;
      // console.log(error);
      // setOtpIssue(true);
      // await setErrorMsg(error.response.data.message);
      // return false;
    }
  };

  const handleSubmit = async (event) => {
    setProcess(true);
    console.log('in handle submit');
    // Execute the reCAPTCHA when the form is submitted
    const token = await props.onRecaptchaClick();
    // const token
    console.log('here');
    console.log(token);
    if (token) {
      try {
        const forward = await sendRepo(token);
        console.log('resetting token');
        setProcess(false);
        setSuccess(true);
        // recaptchaRef.current.reset();
      } catch (error) {
        // setProcess(false);
        // setOtpIssue(true);
        console.log(error);
        await setErrorMsg(error);
      }
      // if (forward) {

      // }
      props.resetCaptcha();
    }
  };

  return (
    <div className={`${visibility ? 'hidden' : ''}`}>
      <div
        className={`${props.step === '4' ? 'scale-100 duration-300' : 'scale-0 duration-300 '}  flex justify-center `}
      >
        <div
          className={`bg-gradient-to-b backdrop-blur-sm rounded-xl  w-11/12 xl:min-w-min  border-[0.03rem]  p-5 ${
            dark
              ? 'from-[#0000669c] to-[#000000a1] border-[#e8e6ebb0]'
              : 'from-[#0077B6] to-[#ffffff3f] border-[#03045E]'
          }`}
        >
          {/* <div className='flex font-primary xl:text-4xl'>4.</div> */}
          <div className='text-left mt-4 xl:ml-16'>
            <h1 className='font-primary xl:text-4xl text-xl '>All Done!</h1>
            <div
              className={`font-secondary  ${dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'}`}
            >
              <p className='xl:w-3/4 my-3 xl:my-5 xl:text-xl text-xs'>
                You'll automatically recieve funds within a few minutes.
              </p>
              <p className='xl:w-3/4 my-3 xl:my-5 xl:text-xl text-xs'>
                Please also share your Github repository for the project you are building.
              </p>
            </div>
          </div>
          <div className='flex mt-12 xl:ml-16'>
            <input
              type='text'
              className={`border-[0.05rem] bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 rounded-lg w-full xl:basis-2/3 text-black text-center font-primary py-3 ${
                dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
              }`}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='Enter Github Repo Link'
            />
          </div>
          {process && (
            <div>
              {' '}
              <p
                className={`font-secondary xl:ml-16  ${
                  dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                } text-left mt-2 text-xs`}
              >
                {' '}
                {errorMsg != null ? errorMsg : ``}{' '}
              </p>
            </div>
          )}
          {success && (
            <div>
              {' '}
              <p
                className={`font-secondary xl:ml-16  ${
                  dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                } text-left mt-2 text-xs`}
              >
                {' '}
                {'Thanks'}{' '}
              </p>
            </div>
          )}
          <div className='mt-12 flex xl:ml-16 pb-12'>
            <button
              className={` ${
                dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
              } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
              onClick={() => handleSubmit()}
            >
              SUBMIT
            </button>
          </div>
          <div
            className={`font-secondary mt-4 xl:ml-16  ${
              dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
            }`}
          >
            <p className='xl:w-3/4 my-3 xl:my-5 xl:mb-1 xl:text-sm text-xs text-left'>
              Enjoyed the experience? Let the world know!
            </p>
          </div>
          <div className='mt-1 flex xl:ml-16 pb-12'>
            <a
              href='https://twitter.com/intent/tweet?text=Hey%20Everyone!%20I%20just%20got%20Goerli%20ETH%20from%20the%20@Deltabc_fund%20faucet!%20Get%20Goerli%20ETH%20from%20%20www.testnetfaucet.io!%20'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button
                className={` flex gap-3 tracking-tighter ${
                  dark ? 'bg-[#1DA1F2]' : 'bg-[#1DA1F2] border border-[#000088]'
                } xl:w-fit xl:text-lg text-base font-primary px-10 tracking-wider py-3 rounded-lg border-[0.05rem]`}
              >
                <BsTwitter className='font-white mt-1' />
                Tweet Now
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Cards(props) {
  const [step, setStep] = useState('1');
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);
  const [logo, setLogo] = useState(LogoDark);
  useEffect(() => {
    if (dark) {
      setLogo(LogoDark);
    } else {
      setLogo(LogoLight);
    }
  }, [dark]);

  const [phone, setPhone] = useState('');
  const [wallet, setWallet] = useState('');
  const [otp, setOtp] = useState('');
  const [github, setGithub] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [reqId, setReqId] = useState('');

  return (
    <div className='py-4 xl:py-20 xl:px-52' id='home'>
      <div className='absolute -right-72 xl:-right-20 top-full overflow-hidden xl:w-10/12 w-5/12  -z-0'>
        {/* <Image src={ETHDark} className="xl:w-10/12 w-5/12" /> */}
      </div>
      <div className='flex flex-col justify-center z-20 select-none'>
        <h1 className='font-primary text-4xl xl:text-7xl text-center xl:text-center mx-2 xl:mx-0'>
          GOERLI ETHEREUM FAUCET
        </h1>
        <div className='flex justify-center'>
          {/* <p
            className={`font-secondary xl:text-xl text-sm  text-center xl:text-left xl:w-4/6 mt-3 ${
              dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-medium'
            }  mx-4 xl:mx-0 xl:ml-4`}
          >
            This website is created by builders for builders. Proceed with the following steps in order to receive testnet tokens to keep on building amazing products, features & more. At Delta we want to provide developers/ builders with every necessary tool & resource they need in order to grow, test and launch their project.
          </p> */}
        </div>
      </div>
      <div className='xl:mt-10 mt-5' />
      <div className='absolute xl:-left-96 -left-28 top-40 xl:top-32 z-0 select-none'>
        <Image src={LogoDark} alt='Delta blockchain fund goerli ethereum faucet' className='w-8/12 xl:w-10/12' />
      </div>
      <div className='relative xl:pb-[33rem] pb-96 '>
        <div className='absolute z-40 w-full'>
          <WalletDetails
            step={step}
            setStep={setStep}
            wallet={wallet}
            setWallet={setWallet}
            phone={phone}
            reqId={reqId}
            captcha={captcha}
            setReqId={setReqId}
            setCaptcha={setCaptcha}
          />
        </div>
        <div className='absolute z-30 w-full'>
          <PhoneNumber
            step={step}
            setStep={setStep}
            phone={phone}
            setPhone={setPhone}
            setReqId={setReqId}
            reqId={reqId}
            wallet={wallet}
            onRecaptchaClick={props.onRecaptchaClick}
            resetCaptcha={props.resetCaptcha}
          />
        </div>

        <div className='absolute z-20 w-full'>
          <VerifyOTP
            step={step}
            setStep={setStep}
            otp={otp}
            setOtp={setOtp}
            phone={phone}
            wallet={wallet}
            reqId={reqId}
            onRecaptchaClick={props.onRecaptchaClick}
            resetCaptcha={props.resetCaptcha}
          />
        </div>
        <div className='absolute z-10 w-full'>
          <Done
            step={step}
            setStep={setStep}
            github={github}
            setGithub={setGithub}
            onRecaptchaClick={props.onRecaptchaClick}
            resetCaptcha={props.resetCaptcha}
          />
        </div>
      </div>
    </div>
  );
}
