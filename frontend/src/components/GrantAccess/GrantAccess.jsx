import React, { useContext, useEffect, useState } from 'react'
import "./GrantAccess.css"
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
import { FaUserTie } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const GrantAccess = () => {

    const { url } = useContext(StoreContext);
    const [usersDataList, setUsersDataList] = useState([])

    
    
    const getAllUsersList = async () => {
      const users = await axios.get(url + "/api/user/getUsersList")
      // console.log(users)
      setUsersDataList(users.data.usersData)
      // console.log(users.data.usersData)
    }

    useEffect(() => {
      getAllUsersList()
    }, [])
  
  const usersList1 = [
    {firstname: "Rupendra", role: "COO"},
    {firstname: "Gopi", role: "CTO"},
    {firstname: "Eleesha", role: "CIO"},
    {firstname: "Dinesh", role: "Employee"},
    {firstname: "Chiranjeevi", role: "COO"},
    {firstname: "Reyansh", role: "Trainee"},
    {firstname: "Chaitanya", role: "COO"},
    {firstname: "Brahmini", role: "COO"},
    {firstname: "Likitha", role: "COO"},
    {firstname: "Subhashini",role: "COO"},
  ]
    return (
      <div className='grant-access-bg-container'>
        <div className='grant-access-page-container'>
          <h1 className='grant-access-page-heading'>Assign Access to Models and Dashboards</h1>
          <div className='grant-access-users-dashboards-container'>
            <div className='users-section'>
              <div className='user-section-header'>
                <h1 className='users-list-heading'>Users List</h1>
                <p className='no-of-users'>No.Of.Users: <span>20</span></p>
              </div>
              <div className='user-search-container'>
                <input htmlFor="userSearch" className='user-search' type='text' placeholder='Search with name'/>
                <FaSearch className='user-search-icon'/>
              </div>
              <div className='list-of-users'>
                  {usersDataList.map((user, index) => (
                    <div key={index} style={{marginTop: "10px"}}>
                      <div className='users-card'>
                        <div>
                          <p className='users-card-name'>
                          <FaUserTie className='user-search-icon'/>
                            {user.firstname}</p>
                        </div>
                        <p className='user-card-name-role'>{user.role}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className='dashboards-models-section'>DASHBOARD BOX</div>
          </div>
        </div>
      </div>
    );
  };
  


export default GrantAccess