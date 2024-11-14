import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    let url = "http://localhost:3001"

    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")



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