import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    // let url = "http://localhost:3001" // Local
    // let url = "https://hanelytics-solution-visionsoft.onrender.com" // RCHA
    let url = "https://hanelytics-ai-ml-solutions-backend.onrender.com" // Vsoft//

    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")
    const [userRole, setUserRole] = useState("")
    const [usersList, setUsersList] = useState([])
    const [accessNameInput, setAccessNameInput] = useState("")
    const [allDashboards, setAllDashboards] = useState([])
    const [dashUpdateId, setDashUpdateId] = useState("")
    const [storeUserDashboardData, setStoreUserDashboardData] = useState([])
    const [loggedUserEmail, setLoggedUserEmail] = useState("")

    const [sapSalesModuleText, setSapSalesModuleText] = useState(false);
    const [sapMaterialsModuleText, setSapMaterialsModuleText] = useState(false);
    const [sapIntroText, setSapIntroText] = useState(true);
    const [menu, setMenu] = useState("home");
    const [isLoading1, setLoading1] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [salesTable, setSalesTable] = useState("");
    const [homeText, setHomeText] = useState(true);
    const [homeText1, setHomeText1] = useState(true);
    const [loadProcurementData, setLoadProcurementData] = useState(false);
    const [loadSalesData, setLoadSalesData] = useState(false);
    const [loadOTC, setLoadOTC] = useState(false);
    const [loadProcurement, setLoadProcurement] = useState(false);

    const fromDate = "2023-08-19";
    const lastDate = "2025-01-13";


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

        sapSalesModuleText,
        setSapSalesModuleText,
        fromDate,
        lastDate,
        sapMaterialsModuleText,
        setSapMaterialsModuleText,
        sapIntroText,
        setSapIntroText,
        menu,
        setMenu,
        isLoading1,
        setLoading1,
        isLoading,
        setLoading,
        salesTable,
        setSalesTable,
        homeText,
        setHomeText,
        homeText1,
        setHomeText1,
        loadProcurementData,
        setLoadProcurementData,
        loadSalesData,
        setLoadSalesData,
        loadOTC,
        setLoadOTC,
        loadProcurement,
        setLoadProcurement,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider