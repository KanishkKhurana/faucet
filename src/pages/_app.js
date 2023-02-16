import '@/styles/globals.css'
import ModeProvider from '../context/ModeContext'


export default function App({ Component, pageProps }) {
  return (
    <>
    <ModeProvider>
    <Component {...pageProps} />
    </ModeProvider>
    </>
    ) 
    
}
