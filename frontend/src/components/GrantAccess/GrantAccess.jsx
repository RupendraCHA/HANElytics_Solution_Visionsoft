import React, { useContext, useEffect, useState } from 'react'
import "./GrantAccess.css"
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
import { FaUserTie } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const GrantAccess = () => {
  const usersList = [
    {name: "Rupendra"},
    {name: "Gopi"},
    {name: "Eleesha"},
    {name: "Dinesh"},
    {name: "Chiranjeevi"},
    {name: "Reyansh"},
    {name: "Chaitanya"},
    {name: "Brahmini"},
    {name: "Likitha"},
    {name: "Subhashini"},
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
                  {usersList.map((userName, index) => (
                    <div key={index} style={{marginTop: "10px"}}>
                      <div className='users-card'>
                        <div>
                          <p className='users-card-name'>
                          <FaUserTie className='user-search-icon'/>
                            {userName.name}</p>
                        </div>
                        <p className='user-card-name-role'>Role</p>
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