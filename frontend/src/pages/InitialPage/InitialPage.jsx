import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./initialPage.css"
// import axios from 'axios'

function InitialPage() {
    const navigate = useNavigate()
    // axios.defaults.withCredentials = true;
    // useEffect(() => {
    //     axios.get('http://localhost:3001/home')
    //         .then(result => {
    //             console.log(result)
    //             if (result.data !== "Successful") {
    //                 navigate("/")
    //             } else {
    //                 navigate("/home")
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    return (
        <>
        <div className='bg-image-container'>
            <div className='bg-container-initial'>
                <div className='container responsive-container'>
                    <div>
                        <img src='https://res.cloudinary.com/dvxkeeeqs/image/upload/v1724952055/logo-removebg-preview_prabm4.png' className='image-size' />
                        {/* <img src='https://res.cloudinary.com/dvxkeeeqs/image/upload/v1726505185/istockphoto-1407983911-612x612_hi0th1.jpg' className='image-size' /> */}
                    </div>
                    <div className='d-flex flex-row'>
                        <div className='button-size'>
                            <Link to="/register" className='bg-warning rounded-4 p-2 text-white'
                                style={{ fontWeight: 500, textDecoration: "none" }}>Sign Up</Link>
                        </div>
                        <div>
                            <Link to="/login" className='bg-success rounded-4 p-2 text-white' style={{ fontWeight: 500, textDecoration: "none" }}>
                                Login
                            </Link>
                        </div>
                        {/* <h1>Data Modeling</h1> */}
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h1 className='text-center'>"Artificial
                        Intelligence" & "Machine Learning" Solutions in Supply Chain, Injecting Data
                        From Diverse ERP & Non-ERP Sources.</h1>
                    <div className='text-center'>
                        <h3 className='text-white'>Don't have an account, Create it by clicking register...</h3>
                        <Link to="/register">
                            <button className='bg-warning rounded-4 p-2 text-white' style={{ fontWeight: 700 }}>
                                Register Here
                            </button>
                        </Link>
                    </div>
                    <div className='text-center mt-4'>
                        <h3 className='text-white'>Already have an account, click to Login...</h3>
                        <Link to="/login">
                            <button className='bg-success rounded-4 p-2 text-white' style={{ fontWeight: 700 }}>
                                Login Here
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div> 
        </>

    )
}

export default InitialPage
