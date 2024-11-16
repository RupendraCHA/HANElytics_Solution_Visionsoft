import React, { useContext, useEffect, useState } from 'react'
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { FaGlobe } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { Dropdown } from "antd"


const Header = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const {username, token} = useContext(StoreContext)

    useEffect(() => {
        const jwtToken = localStorage.getItem("token")
        if (jwtToken) {
            setUser(localStorage.getItem("username"))
        }
    }, [token])

    const handleLogout = () => {
        axios.get("http://localhost:3001/logout")
            .then(result => {
                if (result.data === "Logout Successful!") {
                    localStorage.removeItem("token")
                    localStorage.removeItem("username")
                    toast.success(result.data)
                    navigate("/login")
                }
            })
    }

    const items = [
        {
            key: 1,
            label: (
                <a id='drop-option' href="/login">
                    Logout
                </a>
            )
        }
    ]

    const checkLoginOrNot = () => {
        const jwtToken = localStorage.getItem("token")
        if (jwtToken) {
            navigate("/home")
        }else {
            navigate("/login")
        }
    }

    return (
        <div className='home-container'>
            <Link to="/home" className='home-heading'>
                <h1 >
                    HANELYTICS
                </h1>
            </Link>
            <div className='user-container'>
                <Dropdown menu={{ items }} trigger={['hover']}>
                        <div className='user-symbol'>
                            <FaRegUserCircle className='user-icon' onClick={handleLogout}/>
                            <p style={{color: "white"}}>{user}</p>
                        </div>
                </Dropdown>
                
            </div>
        </div>
    )
}

export default Header
