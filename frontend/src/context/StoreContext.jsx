import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    // let url = "http://localhost:3001"
    let url = "https://hanelytics-solution-visionsoft.onrender.com"

    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")

    useEffect(() => {
        const jwtToken = localStorage.getItem("token")

        if (jwtToken) {
            setToken(jwtToken)
            setUsername(localStorage.getItem("username"))
            
        }
    }, [])


    const contextValue = {
        token,
        setToken,
        url,
        username,
        setUsername
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider