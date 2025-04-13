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

  const CustomCloseIcon = ({ closeToast }) => (
    <span onClick={closeToast} style={{ color: 'red', cursor: 'pointer', fontWeight: 'bold', display: "flex", alignItems: "center" }}>
      ✖
    </span>
  );
  const getSuccessToast = (message) => {
      return (
        toast.error(message, {
          position: "top-center",
          closeButton: CustomCloseIcon,
          style: {
            fontSize: '16px',
            padding: '8px 12px',
            height: '30px',
            borderRadius: '8px',
            color: "#fff",
            backgroundColor: "#000",
            fontWeight: "600"
  
          },
        })
      )
    }

  useEffect(() => {
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')
    if (role === "CEO" || role === "CTO" || role === "COO" && token){
      navigate("/assignRoles")
    }else {
      navigate("/home")
      if (token){

        getSuccessToast("You are not authorized to grant access.")
      }else{
        getSuccessToast("Login before view.")
      }
    }
  },[])
  return (
    <div>
        <GrantAccess/>
    </div>
  )
}

export default AssignRoles