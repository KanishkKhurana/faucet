import '@/styles/globals.css'
import ModeProvider from '../context/ModeContext'
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }) {
  return (
    <>
    <ModeProvider>
    <Component {...pageProps} />
    </ModeProvider>
    </>
    ) 
    
}
