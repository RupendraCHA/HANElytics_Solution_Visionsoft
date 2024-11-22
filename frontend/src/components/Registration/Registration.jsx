import React, { useState } from 'react'
import "./Registration.css"
import { MdPassword } from 'react-icons/md'

const Registration = () => {

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        bussinessName: "",
        contact: "",
        email: "",
        password: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: ""
    })

    const handleRegistrationForm = (e) => {
        e.preventDefault()
        console.log(data)

    }

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setData(data => ({
            ...data, [name]: value
        }))
    }
    


  return (
    <div className='register-form'>
        <form onSubmit={handleRegistrationForm}>
            <h1>Sign Up Now to Access AI/ML Insights</h1>
            <div className='input-container'>
                <div>
                    <label for='firstname'>Firstname</label><br/>
                    <input type='text' required placeholder='Enter Firstname' name='firstname' onClick={handleInputChange} id='firstname'/>
                </div>
                <div>
                    <label for='lastname'>Lastname</label><br/>
                    <input type='text' required placeholder='Enter Lastname' onClick={handleInputChange} name='lastname' id='Lastname'/>
                </div>
            </div>
            <div className='input-container'>
                <div>
                    <label for='bussiness'>Bussiness Name</label><br/>
                    <input type='text' required placeholder='Enter Your Bussiness Name' onClick={handleInputChange} name='bussinessName' id='bussiness'/>
                </div>
                <div>
                    <label for='contact'>Contact</label><br/>
                    <input type='text' required placeholder='Contact Number' onClick={handleInputChange} name='contact' id='contact'/>
                </div>
            </div>
            <div className='email'>
                <label for='email'>Email</label><br/>
                <input type='text' required placeholder='Email' onClick={handleInputChange} name='email' id='email'/>
            </div>
            <div className='email'>
                <label for='password'>Password</label><br/>
                <input type='password' placeholder='Password' onClick={handleInputChange} name='password' id='password'/>
            </div>
            <div className='address'>
                <h1>Address Info</h1>
                <div className='input-container'>
                    <div>
                        <label for='street'>Street</label><br/>
                        <input type='text' required name='street' onClick={handleInputChange} placeholder='Street' id='street'/>
                    </div>
                    <div>
                        <label for='city'>City</label><br/>
                        <input type='text' required name='city' onClick={handleInputChange} placeholder='City' id='city'/>
                    </div>
                </div>
                <div className='input-container'>
                    <div>
                        <label for='state'>State</label><br/>
                        <input type='text' required name='state' onClick={handleInputChange} placeholder='State' id='state'/>
                    </div>
                    <div>
                        <label for='country'>Country</label><br/>
                        <input type='text' required name='country' onClick={handleInputChange} placeholder='Country' id='country'/>
                    </div>
                </div>
                <div>
                    <label for='zipcode'>Zipcode</label><br/>
                    <input type='text' required name='zipcode' onClick={handleInputChange} placeholder='zipcode' id='zipcode'/>
                </div>
            </div>
            <button type='submit' className='register'>Register</button>
        </form>
    </div>
  )
}

export default Registration