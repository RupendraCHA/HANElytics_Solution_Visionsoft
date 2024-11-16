import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./signIn.css"
import Navbar from '../Navbar/Navbar'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

function SignUp() {

    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const [isExist, setExist] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [existedEmail, accessEmail] = useState("")

    const {url, setToken, setUsername} = useContext(StoreContext)

    const handleInputChange = (e) => {
        setExist(false)
        const name = e.target.name
        const value = e.target.value

        setData(data => ({
            ...data, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setExist(false)

        const response = await axios.post(url + "/api/user/register", data)

        if (response.data.success) {
            setExist(false)
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", response.data.name)
            setUsername(response.data.name)
            toast.success(`${response.data.name} Registered Successfully!`)
            navigate("/login")
        }
        else {
            setErrorMsg(response.data.message)
            accessEmail(response.data.email)
            setExist(true)
        }

    }

    return (
        <>
            <Navbar />
            <div className='bg-container-signup d-flex justify-content-center align-items-center vh-100'>
                <div className='bg-black p-4 rounded-4 register-card' style={{ opacity: "0.8" }}>
                    <h2 className='text-white'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3 text-white'>
                            <label htmlFor="name">
                                <strong>Name</strong>
                            </label>
                            <input type='text'
                                placeholder='Enter Name'
                                autoComplete='off'
                                required
                                name='name'
                                className='rounded-0 form-control register-user-input'
                                // onChange={(e) => setName(e.target.value)}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className='mb-3 text-white'>
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input type='text'
                                placeholder='Enter email address'
                                autoComplete='off'
                                required
                                name='email'
                                className='rounded-0 form-control register-user-input'
                                // onChange={(e) => setEmail(e.target.value)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-3 text-white'>
                            <label htmlFor="password">
                                <strong>Password</strong>
                            </label>
                            <input type='password'
                                placeholder='Enter Password'
                                autoComplete='off'
                                required
                                name='password'
                                className='rounded-0 form-control register-user-input'
                                // onChange={(e) => setPassword(e.target.value)}
                                onChange={handleInputChange}

                            />
                        </div>
                        {isExist === true ? 
                            <p className='error-msg'>
                                <span>{existedEmail}</span>
                            {errorMsg}</p> : ""
                        }
                        <div className='checkbox-container'>
                            <input type='checkbox' required className='checkbox' />
                            <p>I accept terms & conditions.</p>
                        </div>
                        
                        <button type='submit' className='btn btn-warning w-100 rounded-0' style={{ fontWeight: "600" }}>
                            Register
                        </button>
                        
                    </form>

                    <p className='text-white'>Already have an account?</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-success rounded-0 text-decoration-none' style={{ fontWeight: "600" }}>
                        Login
                    </Link>

                </div>
            </div>
        </>
    )
}

export default SignUp
