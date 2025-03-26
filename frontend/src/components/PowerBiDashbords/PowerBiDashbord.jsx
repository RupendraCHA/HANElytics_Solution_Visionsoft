import React, { useContext, useState } from "react";
import "./PowerBiDashbord.css";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { FaRegUserCircle } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets.js";
import { MdKeyboardArrowUp } from "react-icons/md";

const PowerBiDashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState("");
  const navigate = useNavigate();
  const { username, token, setToken, setUsername } = useContext(StoreContext);


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
      headerText: "Sales Order Processing",
      dataText: "order",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/12256cd6-0191-4734-b9e2-26fb5da6f018/519f2f1b088001690a92?experience=power-bi&clientSideAuth=0",
    },

    {
      headerText: "Outbound Delivery Processing",
      dataText: "delivery",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/aa6705bbc3b7ef0d4147?experience=power-bi&clientSideAuth=0",
    },

    {
      headerText: "Billing & Invoicing",
      dataText: "billing",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/39b627f4-0188-4651-890f-d03aa68c9ab3/ce8017ebff5ddce17665?experience=power-bi&clientSideAuth=0",
    },
  ];
  const procurement = [
    {
      headerText: "Supplier Order Overview",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/9399d3c37b14e9f48649?experience=power-bi&clientSideAuth=0",
    },
  ];

  const showDashboards = (activeTab) => {
    setActiveDashboard(activeTab);
  };

  const getDashboards = (activeDash) => {
    if (activeDash === "HANElytics") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.AiMl_pic}
              alt="AIMLImage"
              className="dashboard-data-model-image"
            />
            AI/ML Models:
          </h1>
          <div className="dashboard-section">
            {HANElyticsDashboards.map((type) => {
              return (
                <div key={type.dataText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}><img src={assets.OrderToCash_pic} alt="OTC" width={"100%"}/></div>
                  <button
                    className="dashboard-button"
                    onClick={() => login(`${type.dataText}, ${type.url}`)}
                  >
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (activeDash === "OrderToCash") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.OrderToCash_pic}
              alt="OrderToCashImage"
              className="dashboard-data-model-image"
            />
            Order to Cash:
          </h1>
          <div className="dashboard-section">
            {orderToCash.map((type) => {
              return (
                <div key={type.dataText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}><img src={assets.OrderToCash_pic} alt="OTC" width={"100%"}/></div>

                  <button className="dashboard-button">
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (activeDash === "Procurement") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.Procurement_pic}
              alt="OrderToCashImage"
              className="dashboard-data-model-image"
            />
            Procurement:
          </h1>
          <div className="dashboard-section">
            {procurement.map((type) => {
              return (
                <div key={type.dataText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}><img src={assets.OrderToCash_pic} alt="OTC" width={"100%"}/></div>
                  <button
                    className="dashboard-button"
                    onClick={() => login(`${type.dataText}, ${type.url}`)}
                  >
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (activeDash === "Manufacturing") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.Manufacturing_pic}
              alt="OrderToCashImage"
              className="dashboard-data-model-image"
            />
            Manufacturing:
          </h1>
          <div className="dashboard-section">
            {procurement.map((type) => {
              return (
                <div key={type.dataText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}><img src={assets.OrderToCash_pic} alt="OTC" width={"100%"}/></div>
                  <button
                    className="dashboard-button"
                    onClick={() => login(`${type.dataText}, ${type.url}`)}
                  >
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (activeDash === "Finance") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.Finance_pic}
              alt="OrderToCashImage"
              className="dashboard-data-model-image"
            />
            Finance:
          </h1>
          <div className="dashboard-section">
            {procurement.map((type) => {
              return (
                <div key={type.dataText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}><img src={assets.OrderToCash_pic} alt="OTC" width={"100%"}/></div>
                  <button
                    className="dashboard-button"
                    onClick={() => login(`${type.dataText}, ${type.url}`)}
                  >
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const handleModelLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="power-bi-dashboards">
      <div className="bi-home-container">
        <Link to="/home" className="bi-home-heading">
          <h1>HANELYTICS</h1>
        </Link>
        <div className="dashboard-tabs">
          <h1
            onClick={() => showDashboards("")}
            className={`powerbi-dashboard-tab-item ${
              activeDashboard === "" ? "active-dashboard-btn" : ""
            }`}
          >
            <img
              src={assets.ViewAll_pic}
              alt="vIEWaLLImage"
              className="dashboard-data-model-image-tab"
            />
            View All
            <MdKeyboardArrowUp
              className={`bi-arrow ${
                activeDashboard === "" ? "bi-arrow-down" : ""
              }`}
            />
          </h1>
          <h1
            onClick={() => showDashboards("HANElytics")}
            className={`powerbi-dashboard-tab-item ${
              activeDashboard === "HANElytics" ? "active-dashboard-btn" : ""
            }`}
          >
            <img
              src={assets.AiMl_pic}
              alt="AIMLImage"
              className="dashboard-data-model-image-tab"
            />
            AI/ML Models
            <MdKeyboardArrowUp
              className={`bi-arrow ${
                activeDashboard === "HANElytics" ? "bi-arrow-down" : ""
              }`}
            />
          </h1>
          <h1
            onClick={() => showDashboards("OrderToCash")}
            className={`powerbi-dashboard-tab-item ${
              activeDashboard === "OrderToCash" ? "active-dashboard-btn" : ""
            }`}
          >
            <img
              src={assets.OrderToCash_pic}
              alt="OrderToCashImage"
              className="dashboard-data-model-image-tab"
            />
            Order to Cash
            <MdKeyboardArrowUp
              className={`bi-arrow ${
                activeDashboard === "OrderToCash" ? "bi-arrow-down" : ""
              }`}
            />
          </h1>
          <h1
            onClick={() => showDashboards("Procurement")}
            className={`powerbi-dashboard-tab-item ${
              activeDashboard === "Procurement" ? "active-dashboard-btn" : ""
            }`}
          >
            <img
              src={assets.Procurement_pic}
              alt="ProcurementImage"
              className="dashboard-data-model-image-tab"
            />
            Procurement
            <MdKeyboardArrowUp
              className={`bi-arrow ${
                activeDashboard === "Procurement" ? "bi-arrow-down" : ""
              }`}
            />
          </h1>
          <h1
            onClick={() => showDashboards("Manufacturing")}
            className={`powerbi-dashboard-tab-item ${
              activeDashboard === "Manufacturing" ? "active-dashboard-btn" : ""
            }`}
          >
            <img
              src={assets.Manufacturing_pic}
              alt="ProcurementImage"
              className="dashboard-data-model-image-tab"
            />
            Manufacturing
            <MdKeyboardArrowUp
              className={`bi-arrow ${
                activeDashboard === "Manufacturing" ? "bi-arrow-down" : ""
              }`}
            />
          </h1>
          <h1
            onClick={() => showDashboards("Finance")}
            className={`powerbi-dashboard-tab-item ${
              activeDashboard === "Finance" ? "active-dashboard-btn" : ""
            }`}
          >
            <img
              src={assets.Finance_pic}
              alt="ProcurementImage"
              className="dashboard-data-model-image-tab"
            />
            Finance
            <MdKeyboardArrowUp
              className={`bi-arrow ${
                activeDashboard === "Finance" ? "bi-arrow-down" : ""
              }`}
            />
          </h1>
        </div>
        <div className="bi-drop-down">
            <div className="bi-icon-username">
              <FaRegUserCircle className="bi-user-icon" />
              <p className="bi-username-text">{username}</p>
            </div>
          <div>
            <button onClick={handleModelLogout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="bi-reporting-dashboards">
        <div className="container">
          <div>
            {activeDashboard === "" && (
              <>
                {getDashboards("HANElytics")}
                {getDashboards("OrderToCash")}
                {getDashboards("Procurement")}
                {getDashboards("Manufacturing")}
                {getDashboards("Finance")}
              </>
            )}
            {activeDashboard === "HANElytics" && (
              <>{getDashboards("HANElytics")}</>
            )}
            {activeDashboard === "OrderToCash" && (
              <>{getDashboards("OrderToCash")}</>
            )}
            {activeDashboard === "Procurement" && (
              <>{getDashboards("Procurement")}</>
            )}
            {activeDashboard === "Manufacturing" && (
              <>{getDashboards("Manufacturing")}</>
            )}
            {activeDashboard === "Finance" && <>{getDashboards("Finance")}</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBiDashboard;
