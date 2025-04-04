import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    // let url = "http://localhost:3001" // Local
    let url = "https://hanelytics-solution-visionsoft.onrender.com" // origin
    // let url = "https://han-elytics-solution-visionsoft-pej2.vercel.app" // origin

    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")
    const [userRole, setUserRole] = useState("")
    const [usersList, setUsersList] = useState({})


    const getAllUsersList = async () => {
        const users = await axios.get(url + "/api/user/getUsersList")
        setUsersList(users.data)
        console.log(users.data)
    }

   
    useEffect(() => {
        const jwtToken = localStorage.getItem("token")
        const role = localStorage.getItem("role")
        if (jwtToken) {
            setToken(jwtToken)
            setUserRole(role)
            setUsername(localStorage.getItem("username"))
        }
        getAllUsersList()
    }, [])

    const contextValue = {
        token,
        setToken,
        url,
        username,
        setUsername,
        userRole,
        setUserRole,
        usersList,
        setUsersList
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider