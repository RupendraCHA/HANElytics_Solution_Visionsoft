import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from "../../components/Header/Header"
import { toast } from 'react-toastify';
import "./Home.css"
import { StoreContext } from '../../context/StoreContext';

function Home() {

    const {token, username} = useContext(StoreContext)
    const navigate = useNavigate()


    useEffect(() => {
        const jwtToken = localStorage.getItem("token")

        if (jwtToken) {
            navigate("/home")
        }else {
            navigate("/login")
        }
    },[])


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
                </div>
            </div >
        </>
    )
}

export default Home
