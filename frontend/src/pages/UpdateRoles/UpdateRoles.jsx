import React, { useContext, useEffect, useState } from "react";
import "./UpdateRoles.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { MdEditSquare } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { GrMail } from "react-icons/gr";
import { assets } from "../../assets/assets.js";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

const UpdateRoles = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const { url } = useContext(StoreContext);

  const getUsersList = async () => {
    const users = await axios.get(url + "/api/user/getUsersList");
    console.log(users.data.usersData);
    setRegisteredUsers(users.data.usersData);
  };

  useEffect(() => {
    getUsersList();
  }, []);
  const users = [
    {
      id: 1,
      name: "ABC1",
    },
    {
      id: 2,
      name: "ABC2",
    },
    {
      id: 3,
      name: "ABC3",
    },
    {
      id: 4,
      name: "ABC4",
    },
    {
      id: 5,
      name: "ABC5",
    },
    {
      id: 6,
      name: "ABC6",
    },
    {
      id: 7,
      name: "ABC7",
    },
    {
      id: 8,
      name: "ABC8",
    },
    {
      id: 9,
      name: "ABC9",
    },
    {
      id: 10,
      name: "ABC10",
    },
  ];

  const getUserPermissionImages = (role) => {
    if (role === "COO" || role === "CTO" || role === "CEO"){
      return (
        // <img title="Can assign roles" src={assets.User_Role_unlock} alt="" width="25"/>
        <FaUnlock title="Can assign roles & access" className="role-icon unlock"/>

      )
    }else{
      return (
        // <img title="Can't assign roles"  src={assets.User_Role_lock} alt="" width="25"/>
        <FaLock className="role-icon lock" title="Can't assign roles & access"/>
      )
    }
  }

  return (
    <div className="update-roles-bg-container">
      <div className="container update-roles-section-container">
        {/* <div style={{padding: "10px", textAlign: "center"}}>
                <input type='search'/>
            </div> */}
        {/* <div className="update-roles-section-container">
          {registeredUsers.map((eachUser, index) => (
            <div key={index} className="user-role-card">
              <div className="user-role-data">
                <h2 className="user-card-name">
                  {eachUser.firstname} {eachUser.lastname} : <span className="user-role-info1">{eachUser.role}</span>
                </h2>
                <p title="Modify">
                  <MdEditSquare className="update-roles-icon" />
                </p>
              </div>
              <div className="user-additional-info">
                <h4 className="user-role-card-email">
                  Email: <span className="user-role-info">{eachUser.email}</span>
                </h4>
                <h4 className="user-role-card-email">
                  Phone: <span className="user-role-info">{eachUser.countryPhoneCode} {eachUser.contact}</span>
                </h4>
                <h4 className="user-role-card-email">
                  Position: <span className="user-role-info">{eachUser.position}</span>
                </h4>
              </div>
            </div>
          ))}
        </div> */}
            <div>
              <div className="update-roles-table">
                <h3 className="update-table-header">S.No</h3>
                <h3 className="update-table-header">Name</h3>
                <h3 className="update-table-header">Role</h3>
                <h3 className="update-table-header">Email</h3>
              </div>
              
                        {registeredUsers.map((eachUser, index) => (
              <div className="update-roles-table">
              <h3 className="update-table-header">{index+1}</h3>
              <h3 className="update-table-header">
                  <FaUserTie className="update-roles-icon user-name-icon" />
                {eachUser.firstname} {eachUser.lastname}
                </h3>
              <h3 className="update-table-header">
                {/* {eachUser.role === "CEO" || eachUser.role === "COO" || eachUser.role === "CTO" ? assets.User_Role_unlock : assets.User_Role_lock} */}
                {getUserPermissionImages(eachUser.role)}
                {eachUser.role}
                </h3>
              <h3 className="update-table-header">
                <GrMail className="update-roles-icon user-email-icon"/>
                {eachUser.email}</h3>
                        </div>
                        ))}
            </div>
      </div>
    </div>
  );
};

export default UpdateRoles;
