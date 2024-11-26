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
        setExist(false)
        const name = e.target.name
        const value = e.target.value

        setData(data => ({
            ...data, [name]: value
        }))
    }

    const [isExist, setExist] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [changePassword, setChangePassword] = useState(true)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(data)
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

    const handleForgotPassword = (boolValue) => {
        setChangePassword(boolValue)
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        const response = await axios.post(url + "/api/user/updatePassword", data)
        // navigate("/login")
        setChangePassword(true)
        toast.success(response.data.message)

    }

    return (
        <>
            <Navbar />
            {changePassword && <div className='bg-container-login d-flex justify-content-center align-items-center bg-secondary vh-100'>
                <div className='login-page'>
                    <h4>
                        Explore Our HANElytics AI/ML Solutions
                    </h4>
                </div>
                <div className='bg-success p-4 text-white login-card' style={{height: "60vh"}}>
                    <h2 style={{textAlign: "center"}}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input type='text'
                                placeholder='Enter login address'
                                autoComplete='off'
                                name='email'
                                required
                                className='rounded-0 form-control login-user-input'
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
                        <div className='forgot-password'>
                            <span onClick={() => handleForgotPassword(false)}>Forgot Password</span>
                        </div>
                        <p style={{fontWeight: "bold"}}>Don't have an account?</p>
                    <Link to="/register" className='btn btn-default border w-100 bg-warning rounded-0 text-decoration-none' style={{ fontWeight: "600" }}>
                        Register
                    </Link>
                    </form>
                    {/* <p>{failed}</p> */}
                    

                </div>
            </div>}
            {!changePassword && <div className='change-password-container'>
                <form onSubmit={handleUpdatePassword} className='change-password-card'>
                    <div>
                        <label htmlFor='email'>
                            Your Email
                        </label>
                        <input type='text' name='email' 
                        placeholder='Enter your email'
                        required
                        className='change-password'
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='newPassword'>
                            New Password
                        </label>
                        <input 
                        type='password' 
                        name='newPassword' 
                        placeholder='Enter new password'
                        required
                        className='change-password'
                        onChange={handleInputChange}
                        
                        />
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>
                            Confirm Password
                        </label>
                        <input 
                        type='password' 
                        name='confirmPassword' 
                        placeholder='Confirm new password'
                        required
                        className='change-password'
                        onChange={handleInputChange}
                        
                        />
                    </div>
                    <button type="submit" className='update-password-button'>Update Password</button>
                    <div className='go-to-login'>
                        <span onClick={() => handleForgotPassword(true)}>Go to Login</span>
                    </div>
                </form>
            </div>}
        </>
    )
}

export default Login
