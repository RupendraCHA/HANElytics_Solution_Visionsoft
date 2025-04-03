import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./initialPage.css"
import Footer from '../../components/Footer/Footer'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

function InitialPage() {
    const navigate = useNavigate()
      const { url} = useContext(StoreContext);
    
      const startTheServer = async () => {
        const response = await axios.get( "https://hanelytics-solution-visionsoft.onrender.com/");
        console.log(response.data.message)

    }
    useEffect(() => {
        startTheServer()
        const jwtToken = localStorage.getItem("token")
        if (jwtToken) {
            navigate("/home")
        }else {
            navigate("/login")
        }
    },[])

    return (
        <>
        <div className='bg-image-container' style={{height: "100vh"}}>
            <div className='bg-container-initial'>
                <div className='container responsive-container'>
                    <div>
                        <img src='https://res.cloudinary.com/dvxkeeeqs/image/upload/v1724952055/logo-removebg-preview_prabm4.png' className='image-size' />
                        {/* <img src='https://res.cloudinary.com/dvxkeeeqs/image/upload/v1726505185/istockphoto-1407983911-612x612_hi0th1.jpg' className='image-size' /> */}
                    </div>
                    <div className='d-flex flex-row'>
                        <div className='button-size'>
                            <Link to="/register" className='bg-warning rounded-2 p-2 text-white'
                                style={{ fontWeight: 500, textDecoration: "none", }}>Sign Up</Link>
                        </div>
                        <div>
                            <Link to="/login" className='bg-success rounded-2 p-2 text-white' style={{ fontWeight: 500, textDecoration: "none" }}>
                                Login
                            </Link>
                        </div>
                        {/* <h1>Data Modeling</h1> */}
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center header-text-container'>
                    <h1 className='initial-page-text'>Artificial
                        Intelligence & Machine Learning Solutions in Supply Chain, Injecting Data
                        From Diverse ERP & Non-ERP Sources.</h1>
                    <div className='text-center '>
                        {/* <h2 className='text-white'>Don't have an account, Create it by clicking register...</h2> */}
                        <Link to="/register">
                            <button className='bg-warning rounded-2 p-2 text-white m-2' style={{ fontWeight: 700, border:"none" }}>
                                Register
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className='bg-success rounded-2 p-2 text-white' style={{ fontWeight: 700, border:"none" }}>
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
        <Footer/>
        </>

    )
}

export default InitialPage
