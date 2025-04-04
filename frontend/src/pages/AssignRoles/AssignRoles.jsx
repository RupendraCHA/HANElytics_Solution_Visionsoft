import React, { useContext, useEffect } from 'react'
import "./AssignRoles.css"


import Header from '../../components/Header/Header'
import GrantAccess from '../../components/GrantAccess/GrantAccess'
import Footer from "../../components/Footer/Footer"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";


const AssignRoles = () => {

  const { userRole } = useContext(StoreContext);
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === "CEO" || role === "CTO" || role === "COO"){
      navigate("/assignRoles")
    }else {
      navigate("/home")
      toast.error("You are not authorized to grant access.")
    }
  },[])
  return (
    <div>
        <GrantAccess/>
    </div>
  )
}

export default AssignRoles