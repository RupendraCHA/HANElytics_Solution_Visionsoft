import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./logIn.css"
import Navbar from '../Navbar/Navbar'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const {url, setToken, setUsername, token, username} = useContext(StoreContext)

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setData(data => ({
            ...data, [name]: value
        }))
    }

    const [isExist, setExist] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        setExist(false)
        const response = await axios.post(url + "/api/user/login", data)

        if (response.data.success) {
            setExist(false)
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", response.data.name)
            setUsername(response.data.name)
            toast.success(response.data.name + " " + response.data.message)
            navigate("/home")
        }
        else {
            setErrorMsg(response.data.message)
            setExist(true)
        }
    }

    return (
        <>
            <Navbar />
            <div className='bg-container-login d-flex justify-content-center align-items-center bg-secondary vh-100'>
                <div className='bg-secondary p-4 text-white rounded-4 login-card' style={{ opacity: "0.9" }}>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            {/* <img src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1724411202/free-images_klxje8.jpg" className="w-100" /> */}
                            <input type='text'
                                placeholder='Enter login address'
                                autoComplete='off'
                                name='email'
                                required
                                className='rounded-0 form-control login-user-input'
                                // onChange={(e) => setEmail(e.target.value)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password">
                                <strong>Password</strong>
                            </label>
                            <input type='password'
                                placeholder='Enter Password'
                                autoComplete='off'
                                required
                                name='password'
                                className='rounded-0 form-control login-user-input'
                                // onChange={(e) => setPassword(e.target.value)}
                                onChange={handleInputChange}

                            />
                        </div>
                        {isExist === true ? 
                            <p className='error-msg'>
                            {errorMsg}</p> : ""
                        }
                        <button type='submit' className='btn btn-primary bg-primary w-100 rounded-0' style={{ fontWeight: "600" }}>
                            Login
                        </button>

                    </form>
                    {/* <p>{failed}</p> */}
                    <p>Don't have an account?</p>
                    <Link to="/register" className='btn btn-default border w-100 bg-warning rounded-0 text-decoration-none' style={{ fontWeight: "600" }}>
                        Register
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Login
