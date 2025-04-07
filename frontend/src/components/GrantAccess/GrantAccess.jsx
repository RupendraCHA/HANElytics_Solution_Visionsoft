import React, { useContext, useEffect, useState } from "react";
import "./GrantAccess.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

import { FaUserTie } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { LuSearchX } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";


import { assets } from "../../assets/assets";

const GrantAccess = () => {
  const {
    url,
    accessNameInput,
    setAccessNameInput,
    allDashboards,
    setAllDashboards,
    dashUpdateId,
    setDashUpdateId
  } = useContext(StoreContext);
  const [uploadData, setUploadData] = useState({
    dashboardName: "",
    uploadedBy: "",
  });
  const [usersDataList, setUsersDataList] = useState([]);
  const [getUsersData, setGetUsersData] = useState(false);
  const [getAllDashboardsData, setGetAllDashboardsData] = useState(false);
  const [upload, setUpload] = useState(false);
  const [searchBarOpened, setSearchBarOpened] = useState(false);
  // const [dashboardName, setDashboardName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false)

  const getAllUsersList = async () => {
    setGetUsersData(true);
    const users = await axios.get(url + "/api/user/getUsersList");
    // console.log(users)
    setGetUsersData(false);
    setUsersDataList(users.data.usersData);
    // console.log(users.data.usersData)
  };

  const getAllDashboards = async () => {
    setGetAllDashboardsData(true);
    const allDashboards = await axios.get(url + "/api/dashboard/getAll");
    setGetAllDashboardsData(false);
    setAllDashboards(allDashboards.data.allDashboards);
    // console.log(allDashboards.data.allDashboards)
  };

  useEffect(() => {
    getAllUsersList();
    getAllDashboards();
  }, []);

  const getUserNameInput = async (e) => {
    if (e.target.value === "") {
      setGetUsersData(true);
      setUsersDataList(usersDataList);
      const users = await axios.get(url + "/api/user/getUsersList");
      // console.log(users)
      setGetUsersData(false);

      setUsersDataList(users.data.usersData);
    } else {
      setAccessNameInput(e.target.value);

      console.log(e.target.value);
      console.log(usersDataList);
      const searchedUsersList = usersDataList.filter((user) =>
        user.firstname.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsersDataList(searchedUsersList);
      // console.log(searchedUsersList)
    }
  };

  const handleUploadDashboard = () => {
    if (upload === false) {
      setUpload(true);
      setIsUpdating(false)
    } else if (upload === true) {
      setUpload(false);
    }
  };

  const storeUploadData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUploadData((uploadData) => ({
      ...uploadData,
      [name]: value,
    }));
  };

  const uploadDashboard = async (e) => {
    e.preventDefault();

    if (uploadData.dashboardName !== "" && uploadData.uploadedBy !== "") {
      const data = {
        dashboardName: uploadData.dashboardName,
        uploadedBy: uploadData.uploadedBy,
      };

      const response = await axios.post(url + "/api/dashboard/upload", data);
      toast.success("Uploading Finished.");
      console.log(response.data);
      setUploadData({
        dashboardName: "",
        uploadedBy: "",
      });
      getAllDashboards();
    } else {
      toast.error("Provide required details!");
    }
  };

  const handleSearchBar = async () => {
    if (searchBarOpened === false) {
      setSearchBarOpened(true);
    } else {
      setSearchBarOpened(false);
    }
  };

  const handleCloseSearchBar = async () => {
    setSearchBarOpened(false);
    setGetUsersData(true);
    const users = await axios.get(url + "/api/user/getUsersList");
    // console.log(users)
    setGetUsersData(false);
    setAccessNameInput("");
    setUsersDataList(users.data.usersData);
  };

  const getPermittedDashboardName = (reportName, isPermitted, value) => {
    console.log(reportName);
    console.log(isPermitted);
    console.log(value);
  };

  const deleteTheDashboard = async (id) => {
    const response = await axios.delete(url + `/api/dashboard/delete/${id}`)

    if (response.data.success){
      toast.success(response.data.message)
    setGetAllDashboardsData(true);
      const allDashboards = await axios.get(url + "/api/dashboard/getAll");
    setGetAllDashboardsData(false);

    setAllDashboards(allDashboards.data.allDashboards);
    }
  }

  const updateTheDashboard = async (id) => {

    if (isUpdating === false){

      setIsUpdating(true)
    }else{
      setIsUpdating(false)
    }
    setDashUpdateId(id)
  }
  const updateTheDashboardDetails = async (e) => {
    e.preventDefault()
    try {
      const data = {
        dashboardName: uploadData.dashboardName,
        uploadedBy: uploadData.uploadedBy
      }
      const response = await axios.put(url + `/api/dashboard/update/${dashUpdateId}`, data)
      if (response.data.success){
        setIsUpdating(false)
        toast.success(response.data.message)
    setGetAllDashboardsData(true);
      const allDashboards = await axios.get(url + "/api/dashboard/getAll");
    setGetAllDashboardsData(false);

    setAllDashboards(allDashboards.data.allDashboards);
      }
    } catch (error) {
      console.log("Error while updating", error)
    }
  }

  return (
    <div className="grant-access-bg-container">
      <div className="grant-access-page-container">
        <h1 className="grant-access-page-heading">
          Assign Access to Dashboards
        </h1>
        <div className="grant-access-users-dashboards-container">
          <div className="users-section">
            {!getUsersData && <div className="user-section-header">
              <h1 className="users-list-heading">Users List</h1>
              <p className="no-of-users">
                {searchBarOpened ? (
                  <LuSearchX
                    className="user-search-icon"
                    style={{ fontBold: "800" }}
                    onClick={handleCloseSearchBar}
                  />
                ) : (
                  <FaSearch
                    className="user-search-icon"
                    onClick={handleSearchBar}
                  />
                )}
                Total:<span>{usersDataList.length}</span>
              </p>
            </div>}
            {searchBarOpened && (
              <div className="user-search-container">
                <input
                  htmlFor="userSearch"
                  onChange={getUserNameInput}
                  className="user-search"
                  type="search"
                  placeholder="Search with name"
                  // value={accessNameInput}
                />
              </div>
            )}
            {getUsersData ? (
              <div className="roles-spinner"></div>
            ) : (
              <div className="list-of-users">
                {usersDataList.length === 0 ? (
                  <>
                    <div className="empty-user-list">
                      No User with given name
                    </div>
                  </>
                ) : (
                  usersDataList.map((user, index) => (
                    <div
                      key={index}
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <div
                        className="users-card"
                        style={{ position: "relative" }}
                      >
                        <div>
                          <p className="users-card-name">
                            <FaUserTie className="user-search-icon" />
                            {user.firstname}
                          </p>
                        </div>
                        <p className="user-card-name-role">{user.role}</p>
                        {/* <div style={{position: "absolute", zIndex: "10", color: "red"}}>
                        <h1>Hello</h1>
                      </div> */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
           <div className="dashboards-models-section">
           {
              isUpdating && (
                    <form onSubmit={updateTheDashboardDetails}>
                    <div className="upload-dashboards-container">
                      <div
                        className="dashboards-search-container"
                        style={{ marginTop: "5px" }}
                      >
                        <input
                          htmlFor="userSearch"
                          onChange={storeUploadData}
                          className="user-search"
                          type="text"
                          placeholder="Updating Dashboard Name"
                          name="dashboardName"
                          required
                          value={uploadData.dashboardName}
                        />
                      </div>
                      <div
                        className="dashboards-search-container"
                        style={{ marginTop: "5px" }}
                      >
                        <input
                          htmlFor="userSearch"
                          onChange={storeUploadData}
                          className="user-search"
                          type="text"
                          required
                          placeholder="your name"
                          name="uploadedBy"
                          value={uploadData.uploadedBy}
                        />
                      </div>
                      <button className="upload-btn" type="submit">
                        Update
                      </button>
                      <button onClick={() => setIsUpdating(false)} className="upload-btn">X</button>
                    </div>
                  </form>
                  )
                }
            {!isUpdating && <div>
              <div>
                {allDashboards.length !== 0 && (
                  <div className="dashboards-section-header">
                    <h1 className="dashboards-list-heading">Dashboards</h1>
                    <div className="control-click">
                      <p className="no-of-users">
                        Total: <span>{allDashboards.length}</span>
                      </p>
                      {upload === false ? (
                        <p
                          className="upload-shortcut"
                          onClick={handleUploadDashboard}
                        >
                          New <FiUpload className="new-icon" />
                        </p>
                      ) : (
                        <p
                          className="upload-shortcut"
                          onClick={handleUploadDashboard}
                        >
                          close
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {upload && (
                  <form onSubmit={uploadDashboard}>
                    <div className="upload-dashboards-container">
                      <div
                        className="dashboards-search-container"
                        style={{ marginTop: "5px" }}
                      >
                        <input
                          htmlFor="userSearch"
                          onChange={storeUploadData}
                          className="user-search"
                          type="text"
                          placeholder="Enter Dashboard name to upload"
                          name="dashboardName"
                          required
                          value={uploadData.dashboardName}
                        />
                      </div>
                      <div
                        className="dashboards-search-container"
                        style={{ marginTop: "5px" }}
                      >
                        <input
                          htmlFor="userSearch"
                          onChange={storeUploadData}
                          className="user-search"
                          type="text"
                          required
                          placeholder="your name"
                          name="uploadedBy"
                          value={uploadData.uploadedBy}
                        />
                      </div>
                      <button className="upload-btn" type="submit">
                        <FiUpload className="icon" />
                      </button>
                    </div>
                  </form>
                )}
                {/* {
                  isUpdating && (
                    <form onSubmit={updateTheDashboardDetails}>
                    <div className="upload-dashboards-container">
                      <div
                        className="dashboards-search-container"
                        style={{ marginTop: "5px" }}
                      >
                        <input
                          htmlFor="userSearch"
                          onChange={storeUploadData}
                          className="user-search"
                          type="text"
                          placeholder="Updating Dashboard Name"
                          name="dashboardName"
                          required
                          value={uploadData.dashboardName}
                        />
                      </div>
                      <div
                        className="dashboards-search-container"
                        style={{ marginTop: "5px" }}
                      >
                        <input
                          htmlFor="userSearch"
                          onChange={storeUploadData}
                          className="user-search"
                          type="text"
                          required
                          placeholder="your name"
                          name="uploadedBy"
                          value={uploadData.uploadedBy}
                        />
                      </div>
                      <button className="upload-btn" type="submit">
                        Update
                      </button>
                    </div>
                  </form>
                  )
                } */}

                {/* <input type="text" placeholder="Enter Model or Dashboard name to add" style={{width: "50%"}}/>
                <button>Upload</button> */}
              </div>
              {getAllDashboardsData ? (
                <div className="roles-spinner"></div>
              ) : (
                <div className="view-all-dashboards-section">
                  {allDashboards.length === 0 ? (
                    <div className="no-dashboard-text">
                      <h1>There are no Dashboards to show</h1>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="dashboard-details-section">
                          <h3
                            className="table-header-icon"
                            style={{ fontSize: "16px" }}
                          >
                            S.No
                          </h3>
                          <h3
                            className="table-header-icon"
                            style={{ fontSize: "16px" }}
                          >
                            Allow
                          </h3>
                          <h3
                            className="table-header-icon"
                            style={{ marginLeft: "5px", fontSize: "16px" }}
                          >
                            {/* <img src={`${assets.DashboardImage}`} alt="DashboardImage" width={50}/> */}
                            Dashboard
                          </h3>
                          <h3
                            className="table-header-icon"
                            style={{ fontSize: "16px" }}
                          >
                            {/* <FaUserTie className="user-search-icon" /> */}
                            Uploaded By
                          </h3>
                          <h3
                            className="table-header-icon"
                            style={{ fontSize: "16px" }}
                          >
                            {/* className="align-icon-text" */}
                            {/* <img src={assets.CalenderClock} alt="CreatedTimeImage" className="time-icon" width={30}/> */}
                            Time of Upload
                          </h3>
                          <h3
                            className="table-header-icon"
                            style={{ fontSize: "16px" }}
                          >
                            Delete
                          </h3>
                          <h3
                            className="table-header-icon"
                            style={{ fontSize: "16px" }}
                          >
                            Edit
                          </h3>
                        </div>
                      </div>
                      <div>
                        {allDashboards.map((dashboard, index) => (
                          <div key={index}>
                            <div className="dashboard-details-section border-top">
                              <h3>{index + 1}</h3>
                              <div className="permission-buttons">
                                <div>
                                  <input
                                    onClick={(e) =>
                                      getPermittedDashboardName(
                                        dashboard.dashboardName,
                                        "Yes",
                                        e.target.checked
                                      )
                                    }
                                    id={`${dashboard._id}allow`}
                                    type="checkbox"
                                    className="allow-checkbox"
                                  />
                                  {/* <label htmlFor={`${dashboard._id}allow`}>Allow</label> */}
                                </div>
                                {/* <div>
                            <input onClick={(e) => getPermittedDashboardName(dashboard.dashboardName, "No", e.target.checked)} id={`${dashboard._id}deny`} type="checkbox" />
                            <label htmlFor={`${dashboard._id}deny`}>Deny</label>
                          </div> */}
                              </div>
                              <h3>
                                <img
                                  src={`${assets.DashboardImage}`}
                                  alt="DashboardImage"
                                  width={35}
                                />

                                {dashboard.dashboardName}
                              </h3>
                              <h3 className="align-icon-text">
                                <FaUserTie className="user-search-icon" />

                                {dashboard.uploadedBy}
                              </h3>
                              <h3 className="align-icon-text">
                                <img
                                  src={assets.CalenderClock}
                                  alt={`${dashboard.createdAt}Image`}
                                  className="time-icon"
                                  width={30}
                                />
                                {`${new Date(
                                  dashboard.createdAt
                                ).toLocaleString("en-IN", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}, ${new Date(
                                  dashboard.createdAt
                                ).toLocaleString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: true,
                                })} `}
                              </h3>

                              <h3 onClick={() => deleteTheDashboard(dashboard._id)}>
                                <RiDeleteBin5Line className="modify-icon delete-bg" />
                              </h3>
                              <h3 onClick={() => updateTheDashboard(dashboard._id)}>
                                <MdEditSquare className="modify-icon edit-bg" />
                              </h3>
                            </div>
                          </div>
                        ))}
                      </div>{" "}
                    </>
                  )}
                </div>
              )}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantAccess;
