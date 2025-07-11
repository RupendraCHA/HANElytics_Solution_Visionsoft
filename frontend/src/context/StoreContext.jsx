/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios"

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    //let url = "http://localhost:3001" // Local
      let url = "https://hanelytics-solution-visionsoft.onrender.com" // RCHA
    //   let url = "https://hanelytics-ai-ml-solutions-backend.onrender.com" // Vsoft//
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")
    const [userRole, setUserRole] = useState("")
    const [usersList, setUsersList] = useState([])
    const [accessNameInput, setAccessNameInput] = useState("")
    const [allDashboards, setAllDashboards] = useState([])
    const [dashUpdateId, setDashUpdateId] = useState("")
    const [storeUserDashboardData, setStoreUserDashboardData] = useState([])
    const [loggedUserEmail, setLoggedUserEmail] = useState("")
    const [loggedInUserDetails, setLoggedInUserDetails] = useState([]);


    const getAllUsersList = async () => {
        const users = await axios.get(url + "/api/user/getUsersList")
        setUsersList(users.data.usersData)
        // console.log(users.data)
    }

    
    useEffect(() => {
        const jwtToken = localStorage.getItem("token")
        const role = localStorage.getItem("role")
        if (jwtToken) {
            setToken(jwtToken)
            setUserRole(role)
            setUsername(localStorage.getItem("username"))
        }
        setLoggedUserEmail(localStorage.getItem("email"))
        getAllUsersList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(storeUserDashboardData)

    const contextValue = {
        token,
        setToken,
        url,
        username,
        setUsername,
        userRole,
        setUserRole,
        usersList,
        setUsersList,
        accessNameInput,
        setAccessNameInput,
        allDashboards,
        setAllDashboards,
        dashUpdateId,
        setDashUpdateId,
        storeUserDashboardData,
        setStoreUserDashboardData,
        loggedUserEmail,
        setLoggedUserEmail,
        loggedInUserDetails,
        setLoggedInUserDetails,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider