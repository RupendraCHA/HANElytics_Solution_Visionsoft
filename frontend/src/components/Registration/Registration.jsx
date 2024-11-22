import React from 'react'
import "./Registration.css"

const Registration = () => {
  return (
    <div className='register-form'>
        <h1>Register</h1>
        <form>
            <div className='input-container'>
                <div>
                    <label for='firstname'>Firstname</label><br/>
                    <input type='text' placeholder='Enter Firstname' id='firstname'/>
                </div>
                <div>
                    <label for='lastname'>Lastname</label><br/>
                    <input type='text' placeholder='Enter Lastname' id='Lastname'/>
                </div>
            </div>
            <div className='input-container'>
                <div>
                    <label for='bussiness'>Bussiness Name</label><br/>
                    <input type='text' placeholder='Enter Your Bussiness Name' id='bussiness'/>
                </div>
                <div>
                    <label for='contact'>Contact</label><br/>
                    <input type='text' placeholder='Number' id='contact'/>
                </div>
            </div>
            <div className='email'>
                <label for='email'>Email</label><br/>
                <input type='text' placeholder='Email' id='email'/>
            </div>
            <div className='address'>
                <p>Address</p>
                <div className='input-container'>
                    <div>
                        <label for='street'>Street</label><br/>
                        <input type='text' placeholder='Street' id='street'/>
                    </div>
                    <div>
                        <label for='city'>City</label><br/>
                        <input type='text' placeholder='City' id='city'/>
                    </div>
                </div>
                <div className='input-container'>
                    <div>
                        <label for='state'>State</label><br/>
                        <input type='text' placeholder='State' id='state'/>
                    </div>
                    <div>
                        <label for='country'>Country</label><br/>
                        <input type='text' placeholder='Country' id='country'/>
                    </div>
                </div>
                <div>
                    <label for='zipcode'>Zipcode</label><br/>
                    <input type='text' placeholder='zipcode' id='zipcode'/>
                </div>
            </div>
            <button className='register'>Register</button>
        </form>
    </div>
  )
}

export default Registration