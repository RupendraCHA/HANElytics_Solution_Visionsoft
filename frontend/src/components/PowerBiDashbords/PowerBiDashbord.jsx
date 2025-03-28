import React, { useContext, useState } from "react";
import "./PowerBiDashbord.css";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { FaRegUserCircle } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets.js";
import { MdKeyboardArrowUp } from "react-icons/md";
import { LuArrowUpRight } from "react-icons/lu";
import Navbar from "../Navbar/Navbar.jsx";


const PowerBiDashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState("");
  const [isMsgOpened, setMsgOpened] = useState(false);
  const navigate = useNavigate();
  const { username, token, setToken, setUsername } = useContext(StoreContext);


  const HANElyticsDashboards = [
    {
      headerText: "Inventory Reorder Point & Safety Stock predictions",
      dataText: "inventory",
      url: "https://app.powerbi.com/groups/me/reports/629c6dc2-6b0d-4c68-9e54-c2a47600a03b/df6b1d7bb0643125b744?experience=power-bi&clientSideAuth=0",
      image: `${assets.Inventory_pic}`
    },
    {
      headerText: "Revenue, Clinical and Equipment Failure",
      dataText: "revenue",
      url: "https://app.powerbi.com/groups/me/reports/31dc0bfe-4eec-4dbd-b418-c7e969f7d2f4/3610dece708b751eba90?experience=power-bi&clientSideAuth=0",
      image: `${assets.Revenue_pic}`


    },
    {
      headerText: "Predicted Reams of Paper & Ink",
      dataText: "reports",
      url: "https://app.powerbi.com/groups/7235dce4-8159-49bc-ab3f-223406e7937b/reports/cdc28a63-1551-4b0c-8385-1150e1dd46ce/8c4854b8de780c3490e6?experience=power-bi&clientSideAuth=0",
      image: `${assets.Paper_ink_pic}`
    },
  ];

  const orderToCash = [
    {
      headerText: "Sales Order Processing",
      dataText: "order",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/12256cd6-0191-4734-b9e2-26fb5da6f018/519f2f1b088001690a92?experience=power-bi&clientSideAuth=0",
      image: `${assets.sales_pic}`
    },

    {
      headerText: "Outbound Delivery Processing",
      dataText: "delivery",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/aa6705bbc3b7ef0d4147?experience=power-bi&clientSideAuth=0",
      image: `${assets.Outbound_Delivery_pic}`
    },

    {
      headerText: "Billing & Invoicing",
      dataText: "billing",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/39b627f4-0188-4651-890f-d03aa68c9ab3/ce8017ebff5ddce17665?experience=power-bi&clientSideAuth=0",
      image: `${assets.Billing_pic}`
    },
  ];
  const procurement = [
    {
      headerText: "Supplier Order Overview",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/9399d3c37b14e9f48649?experience=power-bi&clientSideAuth=0",
      image: `${assets.Supplier_Order_pic}`
    },
    {
      headerText: "Goods Receipt",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/d88fd1c6-d635-4ead-864c-b4971b81e11b/153be76ec304a615ddb5?experience=power-bi&clientSideAuth=0",
      image: `${assets.Goods_Receipt_pic}`
    },
    {
      headerText: "Purchase Requisition",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/092a96f6-27cd-41fd-9d6c-798733cfd586/f3156d802d9e138dabba?experience=power-bi&clientSideAuth=0",
      image: `${assets.Purchase_Requisition_pic}`
    },
  ];
  const manufacturing = [
    {
      headerText: "Controlling",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/9399d3c37b14e9f48649?experience=power-bi&clientSideAuth=0",
      image: `${assets.Controlling_pic}`
    },
    {
      headerText: "Material Management",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/d88fd1c6-d635-4ead-864c-b4971b81e11b/153be76ec304a615ddb5?experience=power-bi&clientSideAuth=0",
      image: `${assets.Material_management_pic}`
    },
    {
      headerText: "Production Planning",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/d88fd1c6-d635-4ead-864c-b4971b81e11b/153be76ec304a615ddb5?experience=power-bi&clientSideAuth=0",
      image: `${assets.Production_planning_pic}`
    },

  ];
  const finance = [
    {
      headerText: "General Ledger",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/00fc9305-da2e-48e8-b53e-16ec28203cb1/0409b2205d1103030976?experience=power-bi&clientSideAuth=0",
      image: `${assets.General_Ledger_pic}`
    },
    {
      headerText: "Account Receivables",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/61332e4f-41f9-45f2-bf2b-28f6508591ae/1f55804984a696482416?experience=power-bi&clientSideAuth=0",
      image: `${assets.Accounts_receivable_pic}`
    },
    {
      headerText: "Account Paybles",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/0ac0709f-27ee-42f9-93d8-069096fa3d39/7fccc7b61a81e7e7a21c?experience=power-bi&clientSideAuth=0",
      image: `${assets.Accounts_payable_pic}`
    },
    
  ];

  const tabsList = [{
    activeText: "",
    imageUrl: `${assets.ViewAll_pic}`,
    altText: "ViewAllImage",
    tabName: "View All"

  },{
    activeText: "HANElytics",
    imageUrl: `${assets.AiMl_pic}`,
    altText: "AIMLImage",
    tabName: "AI/ML Models"
    
  },
  {
    activeText: "OrderToCash",
    imageUrl: `${assets.OrderToCash_pic}`,
    altText: "OrderToCashImage",
    tabName: "Order to Cash"
  },
  {
    activeText: "Procurement",
    imageUrl: `${assets.Procurement_pic}`,
    altText: "ProcurementImage",
    tabName: "Procurement"
  },
  
  {
    activeText: "Finance",
    imageUrl: `${assets.Finance_pic}`,
    altText: "FinanceImageImage",
    tabName: "Finance"

  },
  {
    activeText: "Manufacturing",
    imageUrl: `${assets.Manufacturing_pic}`,
    altText: "ManufacturingImage",
    tabName: "Manufacturing"

  },
]

  const showDashboards = (activeTab) => {
    setActiveDashboard(activeTab);
    setMsgOpened(false)

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
                  <div width={"100vw"}><img style={{ filter: "brightness(95%)" }} src={type.image} alt={type.headerText} width={"100%"} /></div>
                  <button
                    className="bi-dashboard-button"
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
                  <div width={"100vw"}><img style={{ filter: "brightness(95%)" }} src={type.image} alt={type.headerText} width={"100%"} /></div>

                  <button className="bi-dashboard-button">
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
                  <div width={"100vw"}><img style={{ filter: "brightness(95%)" }} src={type.image} alt={type.headerText} width={"100%"} /></div>
                  <button
                    className="bi-dashboard-button"
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
            {manufacturing.map((type) => {
              return (
                <div key={type.dataText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}><img style={{ filter: "brightness(95%)" }} src={type.image} alt={type.headerText} width={"100%"} /></div>

                  <button
                    className="bi-dashboard-button"
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
            {finance.map((type) => {
              return (
                <div key={type.dataText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}><img style={{ filter: "brightness(95%)" }} src={type.image} alt={type.headerText} width={"100%"} /></div>

                  <button
                    className="bi-dashboard-button"
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

  const openMsg = () => {
    if (isMsgOpened === false) {
      setMsgOpened(true)
    } else {
      setMsgOpened(false)
    }
  }

  return (
    <div className="power-bi-dashboards">
      <div className="bi-home-container">
        <Link to="/home" className="bi-home-heading">
          <h1>HANELYTICS</h1>
        </Link>
        {/* <div className="bi-tabs-list">
          <h1 onClick={openMsg} className={`bi-tab-list-heading`}>View Categories
          <MdKeyboardArrowUp
                className={`bi-arrow-1 ${isMsgOpened === true ? "bi-arrow-down" : ""
                  }`}
              />
          </h1>
          {isMsgOpened && <div className="bi-tab-list-view">
            {tabsList.map((eachTab) => (
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h1
              onClick={() => showDashboards(`${eachTab.activeText}`)}
              className={`powerbi-dashboard-tab-item ${activeDashboard === `${eachTab.activeText}` ? "active-dashboard-btn" : ""
                }`}
                        >
              <img
                src={eachTab.imageUrl}
                alt={`${eachTab.altText}`}
                className="dashboard-data-model-image-tab"
              />
              {eachTab.tabName}
              <MdKeyboardArrowUp
                className={`bi-arrow ${activeDashboard === `${eachTab.activeText}` ? "bi-arrow-down" : ""
                  }`}
              />
              </h1>
              
            </div>
          ))}
          </div>}
          <h1 className="insights-btn" onClick={() => navigate("/dataModeling")}>
            Go to Previous
            <LuArrowUpRight className="insights-icon"/>
            </h1>
        </div> */}
        
        <div className="dashboard-tabs">
          {tabsList.map((eachTab) => (
            <h1
            onClick={() => showDashboards(`${eachTab.activeText}`)}
            className={`powerbi-dashboard-tab-item ${activeDashboard === `${eachTab.activeText}` ? "active-dashboard-btn" : ""
              }`}
          >
            <img
              src={eachTab.imageUrl}
              alt={`${eachTab.altText}`}
              className="dashboard-data-model-image-tab"
            />
            {eachTab.tabName}
            <MdKeyboardArrowUp
              className={`bi-arrow ${activeDashboard === `${eachTab.activeText}` ? "bi-arrow-down" : ""
                }`}
            />
          </h1>
          ))}
          <h1 className="insights-btn" onClick={() => navigate("/dataModeling")}>
            Go to Previous
            <LuArrowUpRight className="insights-icon"/>
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
                {getDashboards("Finance")}
                {getDashboards("Manufacturing")}
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
            {activeDashboard === "Finance" && <>{getDashboards("Finance")}</>}

            {activeDashboard === "Manufacturing" && (
              <>{getDashboards("Manufacturing")}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBiDashboard;
