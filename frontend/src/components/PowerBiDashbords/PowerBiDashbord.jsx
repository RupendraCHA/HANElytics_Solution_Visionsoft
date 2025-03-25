import React, { useContext, useState } from "react";
import "./PowerBiDashbord.css";
import Header from "../Header/Header";
import { Link,useNavigate } from "react-router-dom";
import { Dropdown } from "antd"
import { FaRegUserCircle } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";



const PowerBiDashboard = () => {
 
    const [activeDashboard, setActiveDashboard] = useState("")
    const navigate = useNavigate()
        const {username, token, setToken, setUsername} = useContext(StoreContext)
    
        const handleLogout = () => {
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            setToken("")
            setUsername("")
            navigate("/login")
        }
        const items = [
            {
                key: 1,
                label: (
                    <a id='drop-option' href="" onClick={handleLogout}>
                        Logout
                    </a>
                )
            }
        ]

  const HANElyticsDashboards = [
    {
      headerText: "Inventory Reorder Point & Safety Stock predictions",
      dataText: "inventory",
      url: "https://app.powerbi.com/groups/me/reports/629c6dc2-6b0d-4c68-9e54-c2a47600a03b/df6b1d7bb0643125b744?experience=power-bi&clientSideAuth=0",
    },
    {
      headerText: "Revenue, Clinical and Equipment Failure",
      dataText: "revenue",
      url: "https://app.powerbi.com/groups/me/reports/31dc0bfe-4eec-4dbd-b418-c7e969f7d2f4/3610dece708b751eba90?experience=power-bi&clientSideAuth=0",
    },
    {
      headerText: "Predicted Reams of Paper & Ink",
      dataText: "reports",
      url: "https://app.powerbi.com/groups/7235dce4-8159-49bc-ab3f-223406e7937b/reports/cdc28a63-1551-4b0c-8385-1150e1dd46ce/8c4854b8de780c3490e6?experience=power-bi&clientSideAuth=0",
    },
    
  ];

  const orderToCash = [
    {
      headerText: "ORDERS",
      dataText: "order",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/12256cd6-0191-4734-b9e2-26fb5da6f018/519f2f1b088001690a92?experience=power-bi&clientSideAuth=0",
    },

    {
      headerText: "DELIVERY",
      dataText: "delivery",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/aa6705bbc3b7ef0d4147?experience=power-bi&clientSideAuth=0",
    },

    {
      headerText: "BILLING",
      dataText: "billing",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/39b627f4-0188-4651-890f-d03aa68c9ab3/ce8017ebff5ddce17665?experience=power-bi&clientSideAuth=0",
    },
  ];
  const procurement = [
    {
      headerText: "PO HEADER",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/9399d3c37b14e9f48649?experience=power-bi&clientSideAuth=0",
    },
  ];

  const showDashboards = (activeTab)=> {
    setActiveDashboard(activeTab)
  }

  return (
    <div className="power-bi-dashboards">
      <div className='home-container'>
            <Link to="/home" className='home-heading'>
                <h1 >
                    HANELYTICS
                </h1>
            </Link>
            <div className="dashboard-tabs">
              <h1 onClick={() => showDashboards("")} className={`powerbi-dashboard-tab-item ${activeDashboard === "" ? "active-dashboard-btn" : ""}`}>View All</h1>
              <h1 onClick={() => showDashboards("HANElytics")} className={`powerbi-dashboard-tab-item ${activeDashboard === "HANElytics" ? "active-dashboard-btn" : ""}`}>AI/ML Insights</h1>
              <h1 onClick={() => showDashboards("OrderToCash")} className={`powerbi-dashboard-tab-item ${activeDashboard === "OrderToCash" ? "active-dashboard-btn" : ""}`}>Order to Cash</h1>
              <h1 onClick={() => showDashboards("Procurement")} className={`powerbi-dashboard-tab-item ${activeDashboard === "Procurement" ? "active-dashboard-btn" : ""}`}>Procurement</h1>
          </div>
            <div className='user-container'>
                <Dropdown menu={{ items }} trigger={['hover']}>
                        <div className='user-symbol'>
                            <FaRegUserCircle className='user-icon' />
                            <p style={{color: "white"}}>{username}</p>
                        </div>
                </Dropdown>
            </div>
        </div>
        <div className="container reporting dashboards">
          <div>
            {activeDashboard === "" && <><div>
                <h1 className="dashboard-title">AI/ML Driven Insights:</h1>
                <div className="dashboard-section">
                  {HANElyticsDashboards.map((type) => {
                    return (
                      <div key={type.dataText} className="dashboard-card">
                        <h1 className="card-title">{type.headerText}</h1>
                        <button
                          className="dashboard-button"
                          onClick={() => login(`${type.dataText}, ${type.url}`)}
                        >
                          <a href={type.url} target="_blank">
                            Click to View
                          </a>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h1 className="dashboard-title">Order to Cash:</h1>
                <div className="dashboard-section">
                  {orderToCash.map((type) => {
                    return (
                      <div key={type.dataText} className="dashboard-card">
                        <h1 className="card-title">{type.headerText}</h1>
                        <button className="dashboard-button">
                          <a href={type.url} target="_blank">
                            Click to View
                          </a>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h1 className="dashboard-title">Procurement:</h1>
                <div className="dashboard-section">
                  {procurement.map((type) => {
                    return (
                      <div key={type.dataText} className="dashboard-card">
                        <h1 className="card-title">{type.headerText}</h1>
                        <button
                          className="dashboard-button"
                          onClick={() => login(`${type.dataText}, ${type.url}`)}
                        >
                          <a href={type.url} target="_blank">
                            Click to View
                          </a>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              </>}
              {activeDashboard === "HANElytics" && <div >
                <h1 className="dashboard-title">AI/ML Driven Insights:</h1>
                <div className="dashboard-section">
                  {HANElyticsDashboards.map((type) => {
                    return (
                      <div key={type.dataText} className="dashboard-card">
                        <h1 className="card-title">{type.headerText}</h1>
                        <button
                          className="dashboard-button"
                          onClick={() => login(`${type.dataText}, ${type.url}`)}
                        >
                          <a href={type.url} target="_blank">
                            Click to View
                          </a>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>}
              {activeDashboard === "OrderToCash" && <div>
                <h1 className="dashboard-title">Order to Cash:</h1>
                <div className="dashboard-section">
                  {orderToCash.map((type) => {
                    return (
                      <div key={type.dataText} className="dashboard-card">
                        <h1 className="card-title">{type.headerText}</h1>
                        <button className="dashboard-button">
                          <a href={type.url} target="_blank">
                            Click to View
                          </a>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>}
              {activeDashboard === "Procurement" &&<div>
                <h1 className="dashboard-title">Procurement:</h1>
                <div className="dashboard-section">
                  {procurement.map((type) => {
                    return (
                      <div key={type.dataText} className="dashboard-card">
                        <h1 className="card-title">{type.headerText}</h1>
                        <button
                          className="dashboard-button"
                          onClick={() => login(`${type.dataText}, ${type.url}`)}
                        >
                          <a href={type.url} target="_blank">
                            Click to View
                          </a>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>}
          </div>
        </div>
    </div>
  );
};

export default PowerBiDashboard;
