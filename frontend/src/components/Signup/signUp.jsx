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


    const [data, setData] = useState({
        firstname: "",
        lastname:'',
        bussinessName: '',
        contact: '',
        email: "",
        password: "",
        city: '',
        street: '',
        state: '',
        country: '',
        zipcode: ''
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

        console.log(data)
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
            navigate("/home")
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
            <div className='bg-container-signup'>
                <div className='register-card-container'>
                    <div className='register-card'>
                        <h2 className='register-heading'>Sign Up here to get Instant access to AI/ML Insights</h2>
                        <form onSubmit={handleSubmit} >
                            <div className='register-input-container'>
                                <div className='register-input-label'>
                                    <label htmlFor="firstname">
                                        <strong>Firstame</strong>
                                    </label>
                                    <input type='text'
                                        placeholder='Firstname: Sachin'
                                        autoComplete='off'
                                        required
                                        name='firstname'
                                        className='firstname'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='register-input-label'>
                                    <label htmlFor="lastname">
                                        <strong>Lastname</strong>
                                    </label>
                                    <input type='text'
                                        placeholder='Lastname: Tendulkar'
                                        autoComplete='off'
                                        required
                                        name='lastname'
                                        className=''
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="register-input-container">
                                <div className='register-input-label'>
                                    <label htmlFor="bussinessName">
                                        <strong>Bussiness Name</strong>
                                    </label>
                                    <input type='text'
                                        placeholder='Enter Bussiness Name'
                                        autoComplete='off'
                                        required
                                        name='bussinessName'
                                        className=''
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='register-input-label'>
                                    <label htmlFor="contact">
                                        <strong>Contact</strong>
                                    </label>
                                    <input type='tel'
                                        placeholder='Contact Number'
                                        autoComplete='off'
                                        required
                                        name='contact'
                                        className=''
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='register-input-label'>
                                <label htmlFor="email">
                                    <strong>Email</strong>
                                </label>
                                <input type='text'
                                    placeholder='email address: example@gmail.com'
                                    autoComplete='off'
                                    required
                                    name='email'
                                    onChange={handleInputChange}

                                />
                            </div>
                            <div className='register-input-label'>
                                <label htmlFor="password">
                                    <strong>Password</strong>
                                </label>
                                <input type='password'
                                    placeholder='Enter Password'
                                    autoComplete='off'
                                    required
                                    name='password'
                                    onChange={handleInputChange}

                                />
                            </div>
                            <h3>Address Info</h3>
                            <div className='register-input-container'>
                                <div className='register-input-label'>
                                    <label htmlFor="city">
                                        <strong>City</strong>
                                    </label>
                                    <input type='text'
                                        placeholder='Type city name'
                                        autoComplete='off'
                                        required
                                        name='city'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='register-input-label'>
                                    <label htmlFor="street">
                                        <strong>Street</strong>
                                    </label>
                                    <input type='text'
                                        placeholder='Type Street info'
                                        autoComplete='off'
                                        required
                                        name='street'
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='register-input-container'>
                                <div className='register-input-label'>
                                    <label htmlFor="state">
                                        <strong>State</strong>
                                    </label>
                                    <input type='text'
                                        placeholder='Enter state name'
                                        autoComplete='off'
                                        required
                                        name='state'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='register-input-label'>
                                    <label htmlFor="country">
                                        <strong>Country</strong>
                                    </label>
                                    <input type='text'
                                        placeholder='Enter country name'
                                        autoComplete='off'
                                        required
                                        name='country'
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='register-input-label'>
                                <label htmlFor="zipcode">
                                    <strong>Zipcode</strong>
                                </label>
                                <input type='text'
                                    placeholder='type zipcode'
                                    autoComplete='off'
                                    required
                                    name='zipcode'
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

                            <div>
                                <button type='submit' className='w-50'>
                                    Register
                                </button>
                            </div>
                            
                        </form>
                    </div>
                        <div>
                            <p className='text-white'>Already have an account?</p>
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                        </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
