import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Navbar from '../Navbar/Navbar';
import Header from "../Header/Header"
import { toast } from 'react-toastify';
import "./Home.css"
import { StoreContext } from '../../context/StoreContext';

function Home() {

    const navigate = useNavigate()
    const {username, token} = useContext(StoreContext)

    // axios.defaults.withCredentials = true;
    // useEffect(() => {
    //     axios.get('http://localhost:3001/home')
    //         .then(result => {
    //             console.log(result)
    //             if (result.data !== "Successful") {
    //                 navigate("/login")
    //             } else {
    //                 navigate("/home")
    //             }

    //         })
    //         .catch(err => console.log(err))
    // }, [])

    // const handleLogout = () => {
    //     axios.get("http://localhost:3001/logout")
    //         .then(result => {
    //             if (result.data === "Logout Successful!") {
    //                 toast.success(result.data)
    //                 navigate("/login")
    //             }
    //         })
    // }

    return (
        <>
            <Header />
            <div className='home-bg'>
                <div className='right'>
                    <h1 className="simplify-heading">
                        Simplify AI/ML predictions effortlessly with Hanelytics.
                    </h1>
                    <Link to="/dataModeling" style={{textDecoration: "none"}}>
                        <button className='button'>
                            Start Working With Data Models
                        </button>
                    </Link>
                    <b>*Click here to start working with Data Models</b>
                    {/* <Link to="/login">
                        <button className='text-decoration-none text-danger bg-warning rounded-4 border-none p-3'
                            style={{ fontWeight: 700}}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </Link> */}
                </div>
            </div >
        </>
    )
}

export default Home
