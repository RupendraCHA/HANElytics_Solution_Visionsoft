import React, { useContext, useEffect, useState } from 'react'

import { FaRegCircleUser } from "react-icons/fa6";

import "./Header.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { Dropdown } from "antd"


const Header = () => {

    const navigate = useNavigate()
    const {username, token, setToken, setUsername} = useContext(StoreContext)

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setToken("")
        setUsername("")
        navigate("/login")
    }
    const items = [
        {
            key: 1,
            label: (
                <a id='drop-option' href="" onClick={handleLogout}>
                    Logout
                </a>
            )
        }
    ]

    return (
        <div className='home-container'>
            <Link to="/home" className='header-home-heading'>
                <h1 >
                    HANELYTICS
                </h1>
            </Link>
            {/* <div className='user-container'>
                <Dropdown menu={{ items }} trigger={['hover']}>
                        <div className='user-symbol'>
                            <FaRegUserCircle className='user-icon' />
                            <p style={{color: "white"}}>{username}</p>
                        </div>
                </Dropdown>
            </div> */}
            <div className="drop-down">
                          <div>
                            
                            <div className="icon-username">
                              <FaRegCircleUser className="user-icon" />
                              <p className="username-text">{username}</p>
                            </div>
                          </div>
                          <div>
                            <button onClick={handleLogout}>Logout</button>
                          </div>
                        </div>
        </div>
    )
}

export default Header
