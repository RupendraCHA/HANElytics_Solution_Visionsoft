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
import { MdOutlineRefresh } from "react-icons/md";

const GrantAccess = () => {
  const {
    url,
    accessNameInput,
    setAccessNameInput,
    allDashboards,
    setAllDashboards,
    dashUpdateId,
    setDashUpdateId,
    username,
    storeUserDashboardData,
    setStoreUserDashboardData,
    loggedInUserDetails,
    setLoggedInUserDetails
  } = useContext(StoreContext);

  const [uploadData, setUploadData] = useState({
    dashboardName: "",
    uploadedBy: "",
    category: "",
  });
  const [usersDataList, setUsersDataList] = useState([]);
  const [getUsersData, setGetUsersData] = useState(false);
  const [getAllDashboardsData, setGetAllDashboardsData] = useState(false);
  const [upload, setUpload] = useState(false);
  const [searchBarOpened, setSearchBarOpened] = useState(false);
  // const [dashboardName, setDashboardName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [viewUserData, setViewUserdata] = useState(0);
  const [userSpecificData, setUserSpecificData] = useState([]);
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [activeAssigningUser, setActiveAssigningUser] = useState("");
  const [viewPermittedDash, setViewPermittedDash] = useState(false);
  const [checkedDashboards, setCheckedDashboards] = useState({});


  const [currentPage, setCurrentPage] = useState(1);
  const dashboardsPerPage = 10;

  const totalPages = Math.ceil(allDashboards.length / dashboardsPerPage);

  // Get current page dashboards
  const indexOfLastDashboard = currentPage * dashboardsPerPage;
  const indexOfFirstDashboard = indexOfLastDashboard - dashboardsPerPage;
  const currentDashboards = allDashboards.slice(
    indexOfFirstDashboard,
    indexOfLastDashboard
  );
  const currentDashboards1 = storeUserDashboardData.slice(
    indexOfFirstDashboard,
    indexOfLastDashboard
  );

  console.log("Store Data",storeUserDashboardData)

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getAllUsersList = async () => {
    setGetUsersData(true);
    const users = await axios.get(url + "/api/user/getUsersList");
    // console.log(users)
    setGetUsersData(false);
    const filteredUsers = users.data.usersData.filter(
      (user) => !["CEO", "COO", "CTO"].includes(user.role)
    );
    // setUsersDataList(users.data.usersData);
    // setUsersDataList(filteredUsers);
    // console.log("F",filteredUsers);
    const allDashboards = await axios.get(url + "/api/dashboard/getAll");
    const mergedArray = filteredUsers.map((obj) => ({
      ...obj,
      subItems: allDashboards.data.allDashboards,
    }));
    console.log("M", mergedArray);
    setUsersDataList(mergedArray);
  };

  const getAllDashboards = async () => {
    setGetAllDashboardsData(true);
    const allDashboards = await axios.get(url + "/api/dashboard/getAll");
    setGetAllDashboardsData(false);
    setAllDashboards(allDashboards.data.allDashboards);
    // getTotalPages(allDashboards.data.allDashboards);
    // console.log("A",allDashboards.data.allDashboards);
    // console.log(allDashboards.data.allDashboards)
  };

  const startTheServer = async () => {
    const response = await axios.get(url);
    console.log(response.data.message);
  };

  const getLoggedUserInfo = async () => {
      const email = localStorage.getItem("email");
      const data = {
        email: email,
      };
      const response = await axios.post(
        url + "/api/user/getLoggedUserDetails",
        data
      );
      console.log(response.data.userLoggedData);
  
      if (response.data.success) {
        setLoggedInUserDetails(response.data.userLoggedData);
      } else {
        toast.error(response.data.message);
      }
  
      // console.log("Logged User Details", response.data)
    };

  useEffect(() => {

    const initialState = {};
    storeUserDashboardData.forEach((dash) => {
      initialState[dash._id] = dash.isAllowed === "Yes";
    });
    setCheckedDashboards(initialState);
  }, [storeUserDashboardData]);

  useEffect(() => {
    startTheServer();
    getAllUsersList();
    getAllDashboards();
    getLoggedUserInfo()
  }, []);

  const getUserNameInput = async (e) => {
    if (e.target.value === "") {
      setGetUsersData(true);
      setUsersDataList(usersDataList);
      const users = await axios.get(url + "/api/user/getUsersList");
      // console.log(users)
      setGetUsersData(false);
      const filteredUsers = users.data.usersData.filter(
        (user) => !["CEO", "COO", "CTO"].includes(user.role)
      );

      setUsersDataList(filteredUsers);
    } else {
      setAccessNameInput(e.target.value);

      console.log(e.target.value);
      console.log(usersDataList);
      const searchedUsersList = usersDataList.filter((user) =>
        user.firstname.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filteredUsers = searchedUsersList.filter(
        (user) => !["CEO", "COO", "CTO"].includes(user.role)
      );
      setUsersDataList(filteredUsers);
      // console.log(searchedUsersList)
    }
  };

  const handleUploadDashboard = () => {
    if (upload === false) {
      setUpload(true);
      setIsUpdating(false);
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

    if (
      uploadData.dashboardName !== "" &&
      // uploadData.uploadedBy !== "" &&
      uploadData.category !== ""
    ) {
      const data = {
        dashboardName: uploadData.dashboardName,
        uploadedBy: username,
        category: uploadData.category,
      };

      const response = await axios.post(url + "/api/dashboard/upload", data);
      toast.success("Uploading Finished.");
      console.log(response.data);
      setUploadData({
        dashboardName: "",
        uploadedBy: "",
        category: "",
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
    const filteredUsers = users.data.usersData.filter(
      (user) => !["CEO", "COO", "CTO"].includes(user.role)
    );
    setUsersDataList(filteredUsers);
  };

  const deleteTheDashboard = async (id) => {
    const response = await axios.delete(url + `/api/dashboard/delete/${id}`);

    if (response.data.success) {
      toast.success(response.data.message);
      setGetAllDashboardsData(true);
      const allDashboards = await axios.get(url + "/api/dashboard/getAll");
      setGetAllDashboardsData(false);

      setAllDashboards(allDashboards.data.allDashboards);
    }
  };

  const updateTheDashboard = async (id) => {
    if (isUpdating === false) {
      setIsUpdating(true);
    } else {
      setIsUpdating(false);
    }
    setDashUpdateId(id);
  };
  const updateTheDashboardDetails = async (e) => {
    e.preventDefault();
    try {
      const data = {
        dashboardName: uploadData.dashboardName,
        uploadedBy: username,
        category: uploadData.category,
      };
      const response = await axios.put(
        url + `/api/dashboard/update/${dashUpdateId}`,
        data
      );
      if (response.data.success) {
        setIsUpdating(false);
        toast.success(response.data.message);
        setUploadData({
          dashboardName: "",
          uploadedBy: "",
          category: "",
        });
        setGetAllDashboardsData(true);
        const allDashboards = await axios.get(url + "/api/dashboard/getAll");
        setGetAllDashboardsData(false);

        setAllDashboards(allDashboards.data.allDashboards);
      }
    } catch (error) {
      console.log("Error while updating", error);
    }
  };

  const handleViewUserdata = (user) => {
    if (viewUserData === 0) {
      setViewUserdata(user._id);
    } else {
      setViewUserdata(0);
    }
  };

  const getUserItems = (user, index) => {
    return (
      <div
        key={index}
        style={{
          marginTop: "10px",
        }}
      >
        <div
          className="users-card"
          style={{ position: "relative" }}
          onClick={handleViewUserdata}
        >
          <div>
            <p className="users-card-name">
              <FaUserTie className="user-search-icon" />
              {user.firstname} {user.lastname}
            </p>
          </div>
          <p className="user-card-name-role">{user.role}</p>
        </div>
      </div>
    );
  };

  const setUserUniqueData = async (user) => {
    // setViewPermittedDash(false);
    setViewPermittedDash(true);

    // setIsUserClicked(true);
    setIsUserClicked(false);
    setGetAllDashboardsData(true);
    setActiveAssigningUser(user.firstname);

    const allDashboards = await axios.get(url + "/api/dashboard/getAll");

    const data3 = [
      {
        ...user,
      },
      ...allDashboards.data.allDashboards,
    ];

    setUserSpecificData(data3);
    setGetAllDashboardsData(false);

    const userData = {
      email: user.email,
    };

    const userDashboards = await axios.post(
      url + "/api/dashboard/getUserDashboard",
      userData
    );
    console.log("USER Button", userDashboards.data.userDashboards);

    setStoreUserDashboardData(userDashboards.data.userDashboards);
    console.log("Mixed Entry",userDashboards.data.mixedEntry);

    console.log(user);
    console.log(data3);
  };

  const getPermittedDashboardName = async (reportName, value) => {
    console.log(reportName, value);

    const selectedDashboard = userSpecificData
      .slice(1, userSpecificData.length)
      .filter((item) => item.dashboardName === reportName);
    console.log(selectedDashboard);

    const index = userSpecificData.findIndex(
      (item) => item.dashboardName === reportName
    );
    console.log(index);

    if (selectedDashboard) {
      const updateDash = selectedDashboard.map((item) => ({
        ...item,
        isAllowed: value ? "Yes" : "No",
        // createdTime: new Date()
      }));
      console.log(updateDash)
      userSpecificData[index] = updateDash[0];
    }

    console.log("userSpecificData111",userSpecificData)
  };


  const setAccessData = async () => {
    setGetAllDashboardsData(true);

    // console.log("Access",userSpecificData[0].email)

    const userDetails = userSpecificData.slice(0, 1).map((item) => ({
      ...item,
      subItems: null,
    }));
    // console.log(userDetails)
    // console.log(userSpecificData)

    userSpecificData[0] = userDetails[0];
    console.log(userSpecificData);
    const response = await axios.post(
      url + "/api/dashboard/permissions",
      userSpecificData
    );
    if (response.data.success) {
      toast.success("User Permissions are given & Updated successfully");

      const userData = {
        email: userSpecificData[0].email,
      };

      const userDashboards = await axios.post(
        url + "/api/dashboard/getUserDashboard",
        userData
      );
      console.log("Submit Button", userDashboards.data.userDashboards);
      setStoreUserDashboardData(userDashboards.data.userDashboards);
      setIsUserClicked(false);
      setViewPermittedDash(true);

      setGetAllDashboardsData(false);
    }
    console.log(response.data);
    console.log("Sent Permissions Data");
  };

  return (
    <div className="grant-access-bg-container">
      <div className="grant-access-page-container">
        <div className="grant-access-page-header">
          <h1 className="grant-access-page-heading">
            User Dashboard Management <br />
            <span className="grant-access-page-info">
              Efficiently manage accessing users to the dashboards. Select a
              user from users list and update the dashboards visibility to them
              accordingly to the requirements.
            </span>
          </h1>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="refresh-button"
          >
            <MdOutlineRefresh className="refresh-icon" />
            Refresh
          </button>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="mobile-refresh-button"
          >
            <MdOutlineRefresh className="refresh-icon" />
          </button>
        </div>
        <div className="grant-access-users-dashboards-container">
          <div className="users-section">
            {!getUsersData && (
              <div className="user-section-header">
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
              </div>
            )}
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
                        className={`users-card ${
                          activeAssigningUser === user.firstname
                            ? "highlight-user"
                            : ""
                        }`}
                        // style={{ position: "relative" }}
                        // onClick={() => handleViewUserdata(user)}
                        onClick={() => setUserUniqueData(user)}
                      >
                        <div>
                          <p className="users-card-name">
                            <FaUserTie className="userlist-search-icon" />
                            {user.firstname} {user.lastname}
                          </p>
                        </div>
                        <p className="user-card-name-role">{user.role}</p>
                      </div>
                      {/* {viewUserData === user._id && (
                          <div
                            style={{
                              // position: "absolute",
                              // zIndex: "10",
                              color: "red",
                              // top: "20px"
                            }}
                          >
                            <h1>Hello</h1>
                          </div>
                        )} */}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="dashboards-models-section">
            {isUpdating && (
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
                  {/* <div
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
                      </div> */}
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
                      placeholder="Enter Category"
                      name="category"
                      value={uploadData.category}
                    />
                  </div>
                  <button className="upload-btn" type="submit">
                    Update
                  </button>
                  <button
                    onClick={() => setIsUpdating(false)}
                    className="upload-btn"
                  >
                    X
                  </button>
                </div>
              </form>
            )}
            {!isUserClicked && !viewPermittedDash && (
              <div>
                {!isUpdating && (
                  <div>
                    <div>
                      {allDashboards.length !== 0 && (
                        <div className="dashboards-section-header">
                          {/* <h1 className="dashboards-list-heading">Dashboards</h1> */}
                          <div className="active-user-details">
                            <h1>
                              The following dashboards are currently available
                              on the platform:
                              <p style={{ fontSize: "12px" }}>
                                Upload new dashboard by clicking on publish
                                button
                              </p>
                            </h1>
                          </div>
                          <div className="control-click">
                            <p className="no-of-users">
                              Total: <span>{allDashboards.length}</span>
                            </p>
                            {upload === false ? (
                              <p
                                className="upload-shortcut"
                                onClick={handleUploadDashboard}
                                title="Insert New Dashboard"
                              >
                                Publish <FiUpload className="new-icon" />
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
                            {/* <div
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
                        </div> */}
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
                                placeholder="Enter Category"
                                name="category"
                                value={uploadData.category}
                              />
                            </div>
                            <button className="upload-btn" type="submit">
                              <FiUpload className="icon" />
                            </button>
                          </div>
                        </form>
                      )}
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
                            {/* <div className="active-user-details">
                        <h1>The following dashboards are currently available on the platform:
                        <p style={{fontSize: "12px"}}>Upload new dashboard by clicking on publish button</p>
                        </h1>
                      </div> */}
                            <div>
                              <div className="dashboard-details-section">
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  S.No
                                </h3>
                                {/* <h3
                              className="table-header-icon"
                              style={{ fontSize: "16px" }}
                            >
                              Allow
                            </h3> */}
                                <h3></h3>
                                <h3
                                  className="table-header-icon"
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  Dashboard
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Category
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Uploaded By
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Time of Upload
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Edit
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Delete
                                </h3>
                              </div>
                            </div>
                            <div>
                              {currentDashboards.map((dashboard, index) => (
                                <div key={indexOfFirstDashboard + index + 1}>
                                  <div className="dashboard-details-section border-top">
                                    <h3>{indexOfFirstDashboard + index + 1}</h3>
                                    {/* <div className="permission-buttons">
                                  <div>
                                    <input
                                      onClick={(e) =>
                                        getPermittedDashboardName(
                                          dashboard.dashboardName,
                                          "Yes",
                                          e.target.checked,
                                          dashboard.category
                                        )
                                      }
                                      id={`${dashboard._id}allow`}
                                      type="checkbox"
                                      className="allow-checkbox"
                                    />
                                  </div>
              
                                </div> */}
                                    <div></div>
                                    <h3>
                                      <img
                                        src={`${assets.DashboardImage}`}
                                        alt="DashboardImage"
                                        width={35}
                                      />
                                      {dashboard.dashboardName}
                                    </h3>
                                    <h3>{dashboard.category}</h3>
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
                                    <h3
                                      onClick={() =>
                                        updateTheDashboard(dashboard._id)
                                      }
                                    >
                                      <MdEditSquare className="modify-icon edit-bg" />
                                    </h3>
                                    <h3
                                      onClick={() =>
                                        deleteTheDashboard(dashboard._id)
                                      }
                                    >
                                      <RiDeleteBin5Line className="modify-icon delete-bg" />
                                    </h3>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="pages-container">
                              <button
                                className={`${
                                  currentPage === 1
                                    ? "page inactive-page"
                                    : "page active-page"
                                }`}
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                Prev
                              </button>

                              {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                  key={i}
                                  onClick={() => goToPage(i + 1)}
                                  style={{
                                    padding: "5px 10px",
                                    backgroundColor:
                                      currentPage === i + 1
                                        ? "#007bff"
                                        : "#e0e0e0",
                                    color:
                                      currentPage === i + 1 ? "#fff" : "#000",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    boxShadow: "2px 2px 2px #000"
                                  }}
                                >
                                  {i + 1}
                                </button>
                              ))}

                              <button
                                className={`${
                                  currentPage === totalPages
                                    ? "page inactive-page"
                                    : "page active-page"
                                }`}
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

{/* {!isUserClicked && !viewPermittedDash && (
              <div>
                {!isUpdating && (
                  <div>
                    <div>
                      {allDashboards.length !== 0 && (
                        <div className="dashboards-section-header">
                          <div className="active-user-details">
                            <h1>
                              The following dashboards are currently available
                              on the platform:
                              <p style={{ fontSize: "12px" }}>
                                Upload new dashboard by clicking on publish
                                button
                              </p>
                            </h1>
                          </div>
                          <div className="control-click">
                            <p className="no-of-users">
                              Total: <span>{allDashboards.length}</span>
                            </p>
                            {upload === false ? (
                              <p
                                className="upload-shortcut"
                                onClick={handleUploadDashboard}
                                title="Insert New Dashboard"
                              >
                                Publish <FiUpload className="new-icon" />
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
                                placeholder="Enter Category"
                                name="category"
                                value={uploadData.category}
                              />
                            </div>
                            <button className="upload-btn" type="submit">
                              <FiUpload className="icon" />
                            </button>
                          </div>
                        </form>
                      )}
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
                                
                                <h3></h3>
                                <h3
                                  className="table-header-icon"
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  Dashboard
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Category
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Uploaded By
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Time of Upload
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Edit
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Delete
                                </h3>
                              </div>
                            </div>
                            <div>
                              {allDashboards.map((dashboard, index) => (
                                <div key={indexOfFirstDashboard + index + 1}>
                                  <div className="dashboard-details-section border-top">
                                    <h3>{indexOfFirstDashboard + index + 1}</h3>
                                    
                                    <div></div>
                                    <h3>
                                      <img
                                        src={`${assets.DashboardImage}`}
                                        alt="DashboardImage"
                                        width={35}
                                      />
                                      {dashboard.dashboardName}
                                    </h3>
                                    <h3>{dashboard.category}</h3>
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
                                    <h3
                                      onClick={() =>
                                        updateTheDashboard(dashboard._id)
                                      }
                                    >
                                      <MdEditSquare className="modify-icon edit-bg" />
                                    </h3>
                                    <h3
                                      onClick={() =>
                                        deleteTheDashboard(dashboard._id)
                                      }
                                    >
                                      <RiDeleteBin5Line className="modify-icon delete-bg" />
                                    </h3>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )} */}

            {isUserClicked && (
              <div>
                {!isUpdating && (
                  <div>
                    <div>
                      {allDashboards.length !== 0 && (
                        <div className="dashboards-section-header">
                          <h1 className="dashboards-list-heading">
                            Dashboards
                          </h1>
                          <div className="control-click">
                            <p className="no-of-users">
                              Total: <span>{allDashboards.length}</span>
                            </p>
                            {upload === false ? (
                              <p
                                className="upload-shortcut"
                                onClick={handleUploadDashboard}
                                title="Insert New Dashboard"
                              >
                                Publish <FiUpload className="new-icon" />
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
                                placeholder="Enter Category"
                                name="category"
                                value={uploadData.category}
                              />
                            </div>
                            <button className="upload-btn" type="submit">
                              <FiUpload className="icon" />
                            </button>
                          </div>
                        </form>
                      )}
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
                            {userSpecificData.slice(0, 1).map((user, index) => (
                              <div key={index} className="active-user-details">
                                <h1>
                                  Manage Permissions to{" "}
                                  <span>
                                    {user.firstname} {user.lastname}
                                  </span>
                                  <p
                                    style={{
                                      fontSize: "13px",
                                      marginBottom: "2px",
                                    }}
                                  >
                                    To grant access, select the checkbox on the
                                    left side of each dashboard, then click the
                                    'Give Access' button at the right.
                                    <p style={{ fontSize: "13px" }}>
                                      To view which dashboards a user has access
                                      to, click on 'View Permissions
                                    </p>
                                  </p>
                                  {/* To view which dashboards a user has access to, click on 'View Permissions' */}
                                </h1>
                                <div>
                                  <button
                                    onClick={setAccessData}
                                    style={{ marginRight: "10px" }}
                                  >
                                    Give Access
                                  </button>

                                  <button
                                    onClick={() => {
                                      setGetAllDashboardsData(true);

                                      setTimeout(() => {
                                        setGetAllDashboardsData(false);

                                        setIsUserClicked(false);
                                        setViewPermittedDash(true);
                                      }, 1000);
                                    }}
                                  >
                                    View permissions
                                  </button>
                                </div>
                              </div>
                            ))}
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
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  Dashboard
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Category
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Uploaded By
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Time of Upload
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Edit
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Delete
                                </h3>
                              </div>
                            </div>
                            <div>
                              {currentDashboards.map((dashboard, index) => (
                                <div key={indexOfFirstDashboard + index + 1}>
                                  <div className="dashboard-details-section border-top">
                                    <h3>{indexOfFirstDashboard + index + 1}</h3>
                                    <div className="permission-buttons">
                                      <div>
                                        {/* <input
                                          onClick={(e) =>
                                            getPermittedDashboardName(
                                              dashboard.dashboardName,
                                              e.target.checked
                                            )
                                          }
                                          id={`${dashboard._id}allow`}
                                          type="checkbox"
                                          className="allow-checkbox"
                                          // checked={dashboard.isAllowed || false}
                                        /> */}
                                        <input
                                            type="checkbox"
                                            className="allow-checkbox"
                                            checked={checkedDashboards[dashboard._id] || false}
                                            onChange={(e) => {
                                              const isChecked = e.target.checked;

                                              // Store in local state
                                              setCheckedDashboards((prev) => ({
                                                ...prev,
                                                [dashboard._id]: isChecked,
                                              }));

                                              // Call your existing function (optional)
                                              getPermittedDashboardName(dashboard.dashboardName, isChecked);
                                            }}
                                          />

                                      </div>
                                    </div>
                                    <h3>
                                      <img
                                        src={`${assets.DashboardImage}`}
                                        alt="DashboardImage"
                                        width={35}
                                      />
                                      {dashboard.dashboardName}
                                    </h3>
                                    <h3>{dashboard.category}</h3>
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
                                    <h3
                                      onClick={() =>
                                        updateTheDashboard(dashboard._id)
                                      }
                                    >
                                      <MdEditSquare className="modify-icon edit-bg" />
                                    </h3>
                                    <h3
                                      onClick={() =>
                                        deleteTheDashboard(dashboard._id)
                                      }
                                    >
                                      <RiDeleteBin5Line className="modify-icon delete-bg" />
                                    </h3>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="pages-container">
                              <button
                                className={`${
                                  currentPage === 1
                                    ? "page inactive-page"
                                    : "page active-page"
                                }`}
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                Prev
                              </button>

                              {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                  key={i}
                                  onClick={() => goToPage(i + 1)}
                                  style={{
                                    padding: "5px 10px",
                                    backgroundColor:
                                      currentPage === i + 1
                                        ? "#007bff"
                                        : "#e0e0e0",
                                    color:
                                      currentPage === i + 1 ? "#fff" : "#000",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    boxShadow: "2px 2px 2px #000"
                                  }}
                                >
                                  {i + 1}
                                </button>
                              ))}

                              <button
                                className={`${
                                  currentPage === totalPages
                                    ? "page inactive-page"
                                    : "page active-page"
                                }`}
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

{/* {isUserClicked && (
              <div>
                {!isUpdating && (
                  <div>
                    <div>
                      {allDashboards.length !== 0 && (
                        <div className="dashboards-section-header">
                          <h1 className="dashboards-list-heading">
                            Dashboards
                          </h1>
                          <div className="control-click">
                            <p className="no-of-users">
                              Total: <span>{allDashboards.length}</span>
                            </p>
                            {upload === false ? (
                              <p
                                className="upload-shortcut"
                                onClick={handleUploadDashboard}
                                title="Insert New Dashboard"
                              >
                                Publish <FiUpload className="new-icon" />
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
                                placeholder="Enter Category"
                                name="category"
                                value={uploadData.category}
                              />
                            </div>
                            <button className="upload-btn" type="submit">
                              <FiUpload className="icon" />
                            </button>
                          </div>
                        </form>
                      )}
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
                            {userSpecificData.slice(0, 1).map((user, index) => (
                              <div key={index} className="active-user-details">
                                <h1>
                                  Manage Permissions to{" "}
                                  <span>
                                    {user.firstname} {user.lastname}
                                  </span>
                                  <p
                                    style={{
                                      fontSize: "13px",
                                      marginBottom: "2px",
                                    }}
                                  >
                                    To grant access, select the checkbox on the
                                    left side of each dashboard, then click the
                                    'Give Access' button at the right.
                                    <p style={{ fontSize: "13px" }}>
                                      To view which dashboards a user has access
                                      to, click on 'View Permissions
                                    </p>
                                  </p>
                                </h1>
                                <div>
                                  <button
                                    onClick={setAccessData}
                                    style={{ marginRight: "10px" }}
                                  >
                                    Give Access
                                  </button>

                                  <button
                                    onClick={() => {
                                      setGetAllDashboardsData(true);

                                      setTimeout(() => {
                                        setGetAllDashboardsData(false);

                                        setIsUserClicked(false);
                                        setViewPermittedDash(true);
                                      }, 1000);
                                    }}
                                  >
                                    View permissions
                                  </button>
                                </div>
                              </div>
                            ))}
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
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  Dashboard
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Category
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Uploaded By
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Time of Upload
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Edit
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Delete
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
                                              e.target.checked
                                            )
                                          }
                                          id={`${dashboard._id}allow`}
                                          type="checkbox"
                                          className="allow-checkbox"
                                        />
                                      </div>
                                    </div>
                                    <h3>
                                      <img
                                        src={`${assets.DashboardImage}`}
                                        alt="DashboardImage"
                                        width={35}
                                      />
                                      {dashboard.dashboardName}
                                    </h3>
                                    <h3>{dashboard.category}</h3>
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
                                    <h3
                                      onClick={() =>
                                        updateTheDashboard(dashboard._id)
                                      }
                                    >
                                      <MdEditSquare className="modify-icon edit-bg" />
                                    </h3>
                                    <h3
                                      onClick={() =>
                                        deleteTheDashboard(dashboard._id)
                                      }
                                    >
                                      <RiDeleteBin5Line className="modify-icon delete-bg" />
                                    </h3>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )} */}

            {viewPermittedDash && (
              <div>
                {!isUpdating && (
                  <div>
                    <div>
                      {allDashboards.length !== 0 && (
                        <div className="dashboards-section-header">
                          <h1 className="dashboards-list-heading">
                            Dashboards
                          </h1>
                          <div className="control-click">
                            <p className="no-of-users">
                              Total: <span>{allDashboards.length}</span>
                            </p>
                            {upload === false ? (
                              <p
                                className="upload-shortcut"
                                onClick={handleUploadDashboard}
                                title="Insert New Dashboard"
                              >
                                Publish <FiUpload className="new-icon" />
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
                                placeholder="Enter Category"
                                name="category"
                                value={uploadData.category}
                              />
                            </div>
                            <button className="upload-btn" type="submit">
                              <FiUpload className="icon" />
                            </button>
                          </div>
                        </form>
                      )}
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
                            {userSpecificData.slice(0, 1).map((user, index) => (
                              <div key={index} className="active-user-details" style={{width: '100%'}}>
                                <h1>
                                  Following Dashboards with Check mark are
                                  accessed by{" "}
                                  <span>
                                    {user.firstname} {user.lastname}
                                  </span>
                                  <p style={{fontSize: "12px"}}>To change permissions, click on "Go & Change Permissions"</p>
                                </h1>
                                <button
                                  // onClick={setAccessData}
                                  onClick={() => {
                                    setGetAllDashboardsData(true);

                                    setTimeout(() => {
                                      setGetAllDashboardsData(false);
                                    }, 1000);
                                    setIsUserClicked(true);
                                    setViewPermittedDash(false);
                                  }}
                                >
                                 Go & Change Access
                                </button>
                              </div>
                            ))}
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
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  Dashboard
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Category
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Uploaded By
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Time of Upload
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Edit
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Delete
                                </h3>
                              </div>
                            </div>
                            <div>
                            {/* storeUserDashboardData */}
                              {currentDashboards1.map(
                                (dashboard, index) => (
                                  <div key={indexOfFirstDashboard + index + 1}>
                                    <div className="dashboard-details-section border-top">
                                      <h3>{indexOfFirstDashboard + index + 1}</h3>
                                      <div className="permission-buttons">
                                        <div>
                                          <input
                                            onClick={(e) =>
                                              getPermittedDashboardName(
                                                dashboard.dashboardName,
                                                e.target.checked
                                              )
                                            }
                                            
                                            
                                            id={`${dashboard._id}allow`}
                                            type="checkbox"
                                            className="allow-checkbox"
                                            checked={`${
                                              dashboard.isAllowed === "Yes"
                                                ? "checked"
                                                : ""
                                            }`}
                                          />
                                        </div>
                                      </div>
                                      <h3>
                                        <img
                                          src={`${assets.DashboardImage}`}
                                          alt="DashboardImage"
                                          width={35}
                                        />
                                        {dashboard.dashboardName}
                                      </h3>
                                      <h3>{dashboard.category}</h3>
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
                                      <h3
                                        onClick={() =>
                                          updateTheDashboard(dashboard._id)
                                        }
                                      >
                                        <MdEditSquare className="modify-icon edit-bg" />
                                      </h3>
                                      <h3
                                        onClick={() =>
                                          deleteTheDashboard(dashboard._id)
                                        }
                                      >
                                        <RiDeleteBin5Line className="modify-icon delete-bg" />
                                      </h3>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="pages-container">
                              <button
                                className={`${
                                  currentPage === 1
                                    ? "page inactive-page"
                                    : "page active-page"
                                }`}
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                Prev
                              </button>

                              {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                  key={i}
                                  onClick={() => goToPage(i + 1)}
                                  style={{
                                    padding: "5px 10px",
                                    backgroundColor:
                                      currentPage === i + 1
                                        ? "#007bff"
                                        : "#e0e0e0",
                                    color:
                                      currentPage === i + 1 ? "#fff" : "#000",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    boxShadow: "2px 2px 2px #000"
                                  }}
                                >
                                  {i + 1}
                                </button>
                              ))}

                              <button
                                className={`${
                                  currentPage === totalPages
                                    ? "page inactive-page"
                                    : "page active-page"
                                }`}
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {/* {viewPermittedDash && (
              <div>
                {!isUpdating && (
                  <div>
                    <div>
                      {allDashboards.length !== 0 && (
                        <div className="dashboards-section-header">
                          <h1 className="dashboards-list-heading">
                            Dashboards
                          </h1>
                          <div className="control-click">
                            <p className="no-of-users">
                              Total: <span>{allDashboards.length}</span>
                            </p>
                            {upload === false ? (
                              <p
                                className="upload-shortcut"
                                onClick={handleUploadDashboard}
                                title="Insert New Dashboard"
                              >
                                Publish <FiUpload className="new-icon" />
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
                                placeholder="Enter Category"
                                name="category"
                                value={uploadData.category}
                              />
                            </div>
                            <button className="upload-btn" type="submit">
                              <FiUpload className="icon" />
                            </button>
                          </div>
                        </form>
                      )}
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
                            {userSpecificData.slice(0, 1).map((user, index) => (
                              <div key={index} className="active-user-details">
                                <h1>
                                  Following Dashboards with Check mark are
                                  accessed by{" "}
                                  <span>
                                    {user.firstname} {user.lastname}
                                  </span>
                                </h1>
                                <button
                                  // onClick={setAccessData}
                                  onClick={() => {
                                    setGetAllDashboardsData(true);

                                    setTimeout(() => {
                                      setGetAllDashboardsData(false);
                                    }, 1000);
                                    setIsUserClicked(true);
                                    setViewPermittedDash(false);
                                  }}
                                >
                                  Back
                                </button>
                              </div>
                            ))}
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
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  Dashboard
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Category
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Uploaded By
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Time of Upload
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Edit
                                </h3>
                                <h3
                                  className="table-header-icon"
                                  style={{ fontSize: "16px" }}
                                >
                                  Delete
                                </h3>
                              </div>
                            </div>
                            <div>
                              {storeUserDashboardData.map(
                                (dashboard, index) => (
                                  <div key={index}>
                                    <div className="dashboard-details-section border-top">
                                      <h3>{index + 1}</h3>
                                      <div className="permission-buttons">
                                        <div>
                                          <input
                                            onClick={(e) =>
                                              getPermittedDashboardName(
                                                dashboard.dashboardName,
                                                e.target.checked
                                              )
                                            }
                                            id={`${dashboard._id}allow`}
                                            type="checkbox"
                                            className="allow-checkbox"
                                            checked={`${
                                              dashboard.isAllowed === "Yes"
                                                ? "checked"
                                                : ""
                                            }`}
                                          />
                                        </div>
                                      </div>
                                      <h3>
                                        <img
                                          src={`${assets.DashboardImage}`}
                                          alt="DashboardImage"
                                          width={35}
                                        />
                                        {dashboard.dashboardName}
                                      </h3>
                                      <h3>{dashboard.category}</h3>
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
                                      <h3
                                        onClick={() =>
                                          updateTheDashboard(dashboard._id)
                                        }
                                      >
                                        <MdEditSquare className="modify-icon edit-bg" />
                                      </h3>
                                      <h3
                                        onClick={() =>
                                          deleteTheDashboard(dashboard._id)
                                        }
                                      >
                                        <RiDeleteBin5Line className="modify-icon delete-bg" />
                                      </h3>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                            
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantAccess;
