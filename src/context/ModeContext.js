import React, {useEffect, useState} from 'react'
export const ModeContext = React.createContext(null)

function ModeProvider({children}){
    const [dark, setIsDark] = useState(true)

    function toggleDarkMode() {
      setIsDark(!dark)
      
    }
    return (
        <ModeContext.Provider value={{dark, setIsDark, toggleDarkMode}}>
        {children}
        </ModeContext.Provider>
    )
}

export default ModeProvider;