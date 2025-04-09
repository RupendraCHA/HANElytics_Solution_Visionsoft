import React, { useContext, useEffect, useState } from "react";
import "./PowerBiDashbord.css";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { FaRegUserCircle } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets.js";
import { MdKeyboardArrowUp } from "react-icons/md";
import { LuArrowUpRight } from "react-icons/lu";
import Footer from "../Footer/Footer.jsx";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdOutlineDownload } from "react-icons/md";
import { IoIosArrowDropup } from "react-icons/io";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const PowerBiDashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState("");
  const [isMsgOpened, setMsgOpened] = useState(false);
  const navigate = useNavigate();
  const { username, token, setToken, setUsername, url } =
    useContext(StoreContext);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isIconClicked, setIsIconClicked] = useState(false)
  const [selectedReport, setSelectedReport] = useState("Revenue Results")
  const [reportData, setReportData] = useState([])
  const [downloadDataLoad, setDownloadDataLoad] = useState(0)

  const startTheServer = async () => {
    const response = await axios.get(url);
    console.log(response.data.message);
  };

  useEffect(() => {
    startTheServer();
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      navigate("/dashboards");
    } else {
      navigate("/login");
    }
  }, []);

  const HANElyticsDashboards = [
    {
      id: 1,
      headerText: "Revenue, Clinical and Equipment Failure",
      dataText: "revenue",
      url: "https://app.powerbi.com/groups/me/reports/31dc0bfe-4eec-4dbd-b418-c7e969f7d2f4/3610dece708b751eba90?experience=power-bi&clientSideAuth=0",
      image: `${assets.Revenue_pic}`,
    },
    {
      id: 2,
      headerText: "Inventory Reorder Point & Safety Stock predictions",
      dataText: "inventory",
      url: "https://app.powerbi.com/groups/me/reports/629c6dc2-6b0d-4c68-9e54-c2a47600a03b/df6b1d7bb0643125b744?experience=power-bi&clientSideAuth=0",
      image: `${assets.Inventory_pic}`,
    },

    { id: 3,
      headerText: "Predicted Reams of Paper & Ink",
      dataText: "reports",
      url: "https://app.powerbi.com/groups/7235dce4-8159-49bc-ab3f-223406e7937b/reports/cdc28a63-1551-4b0c-8385-1150e1dd46ce/8c4854b8de780c3490e6?experience=power-bi&clientSideAuth=0",
      image: `${assets.Paper_ink_pic}`,
    },
  ];

  const orderToCash = [
    {
      id: 4,
      headerText: "Sales Order Processing",
      dataText: "order",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/12256cd6-0191-4734-b9e2-26fb5da6f018/519f2f1b088001690a92?experience=power-bi&clientSideAuth=0",
      image: `${assets.sales_pic}`,
    },

    {
      id: 5,
      headerText: "Outbound Delivery Processing",
      dataText: "delivery",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/aa6705bbc3b7ef0d4147?experience=power-bi&clientSideAuth=0",
      image: `${assets.Outbound_Delivery_pic}`,
    },

    {
      id: 6,
      headerText: "Billing & Invoicing",
      dataText: "billing",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/39b627f4-0188-4651-890f-d03aa68c9ab3/ce8017ebff5ddce17665?experience=power-bi&clientSideAuth=0",
      image: `${assets.Billing_pic}`,
    },
  ];
  const procurement = [
    {
      id: 7,
      headerText: "Supplier Order Overview",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/9399d3c37b14e9f48649?experience=power-bi&clientSideAuth=0",
      image: `${assets.Supplier_Order_pic}`,
    },
    {
      id: 8,
      headerText: "Goods Receipt",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/d88fd1c6-d635-4ead-864c-b4971b81e11b/153be76ec304a615ddb5?experience=power-bi&clientSideAuth=0",
      image: `${assets.Goods_Receipt_pic}`,
    },
    {
      id: 9,
      headerText: "Purchase Requisition",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/092a96f6-27cd-41fd-9d6c-798733cfd586/f3156d802d9e138dabba?experience=power-bi&clientSideAuth=0",
      image: `${assets.Purchase_Requisition_pic}`,
    },
  ];
  const manufacturing = [
    {
      id: 10,
      headerText: "Manufacturing Master Data",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/bad34a0b-01fa-4257-9e3f-9fec93098e18/96656c8ea0626564d181?experience=power-bi",
      image: `${assets.Controlling_pic}`,
    },
    {
      id: 11,
      headerText: "Manufacturing Orders",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/df3ab764-9488-4e8c-a116-15f45ddf85b4/e107815aa0ee97c749a3?experience=power-bi&clientSideAuth=0",
      image: `${assets.Material_management_pic}`,
    },
    {
      id: 12,
      headerText: "Production Planning",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/d88fd1c6-d635-4ead-864c-b4971b81e11b/153be76ec304a615ddb5?experience=power-bi&clientSideAuth=0",
      image: `${assets.Production_planning_pic}`,
    },
  ];
  const finance = [
    {
      id: 13,
      headerText: "General Ledger",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/00fc9305-da2e-48e8-b53e-16ec28203cb1/0409b2205d1103030976?experience=power-bi&clientSideAuth=0",
      image: `${assets.General_Ledger_pic}`,
    },
    {
      id: 14,
      headerText: "Account Receivables",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/61332e4f-41f9-45f2-bf2b-28f6508591ae/1f55804984a696482416?experience=power-bi&clientSideAuth=0",
      image: `${assets.Accounts_receivable_pic}`,
    },
    {
      id: 15,
      headerText: "Account Paybles",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/0ac0709f-27ee-42f9-93d8-069096fa3d39/7fccc7b61a81e7e7a21c?experience=power-bi&clientSideAuth=0",
      image: `${assets.Accounts_payable_pic}`,
    },
  ];

  // url: "https://app.powerbi.com/groups/me/reports/3219fe8c-78e4-479a-bcdf-b5c77866a05d/052aa96850be00c14191?experience=power-bi&clientSideAuth=0",
  //     image: `${assets.Production_planning_pic}`,
  const tabsList = [
    {
      activeText: "",
      imageUrl: `${assets.ViewAll_pic}`,
      altText: "ViewAllImage",
      tabName: "View All",
    },
    {
      activeText: "HANElytics",
      imageUrl: `${assets.AiMl_pic}`,
      altText: "AIMLImage",
      // tabName: "AI/ML Models"
      tabName: "Supply Chain Models",
    },

    {
      activeText: "OrderToCash",
      imageUrl: `${assets.OrderToCash_pic}`,
      altText: "OrderToCashImage",
      tabName: "Order to Cash",
    },
    {
      activeText: "Procurement",
      imageUrl: `${assets.Procurement_pic}`,
      altText: "ProcurementImage",
      tabName: "Procurement",
    },

    {
      activeText: "Finance",
      imageUrl: `${assets.Finance_pic}`,
      altText: "FinanceImageImage",
      tabName: "Finance",
    },
    {
      activeText: "Manufacturing",
      imageUrl: `${assets.Manufacturing_pic}`,
      altText: "ManufacturingImage",
      tabName: "Manufacturing",
    },
  ];

  const showDashboards = (activeTab) => {
    setActiveDashboard(activeTab);
    setMsgOpened(false);
    setIsMenuOpened(false);
  };

  const check = (file) => {
    console.log(file);
  };

  const setIconValue = () => {
    if (isIconClicked === false){
      setIsIconClicked(true)
    }else {
      setIsIconClicked(false)
    }

  }

  const selectDashboard = (report) => {
    setSelectedReport(report)
    // console.log(report)
  }


  const downloadDataIntoExcel = (Array, fileName, id) => {
    console.log(id)
      if (!Array || Array.length === 0) return;
  
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(Array);
      XLSX.utils.book_append_sheet(wb, ws, "Data");
  
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: "application/octet-stream" });
      
      saveAs(data, `${fileName}.xlsx`);
      setDownloadDataLoad(false)
    };

  const downloadReportData = async (dashType, dashName, id) => {
    console.log(dashType, dashName)
    if (dashName === "Revenue, Clinical and Equipment Failure" && dashType === "Revenue Results"){

      try {
        setDownloadDataLoad(id)
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/revenue", {
          headers: { token: jwtToken },
        });

        const result = response.data
        downloadDataIntoExcel(result, "Revenue Demand Sensing Predictions", id)
      } catch (error) {
        console.log("Error while fetching", error)
      }
    }else if (dashName === "Revenue, Clinical and Equipment Failure" && dashType === "Clinical Results"){

      try {
        setDownloadDataLoad(id)

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/clinical", {
          headers: { token: jwtToken },
        });

        const result = response.data
        downloadDataIntoExcel(result, "Inventory Predictions with Clinical Data", id)

      } catch (error) {
        console.log("Error while fetching", error)
      }
    }else if (dashName === "Revenue, Clinical and Equipment Failure" && dashType === "Equipment Results"){

      try {
        setDownloadDataLoad(id)

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/equipment", {
          headers: { token: jwtToken },
        });

        const result = response.data
        downloadDataIntoExcel(result, "Predictions of Equipment Risk Detection & Failure Prevention",id)

      } catch (error) {
        console.log("Error while fetching", error)
      }
    }else if (dashName === "Inventory Reorder Point & Safety Stock predictions"){

      try {
        setDownloadDataLoad(id)

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/inventory", {
          headers: { token: jwtToken },
        });

        const result = response.data
        downloadDataIntoExcel(result, "Inventory Reorder Point & Safety Stock predictions", id)

      } catch (error) {
        console.log("Error while fetching", error)
      }
    }
    else if (dashName === "Predicted Reams of Paper & Ink"){

      try {
        setDownloadDataLoad(id)

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/inventory1", {
          headers: { token: jwtToken },
        });

        const result = response.data
        downloadDataIntoExcel(result, "Predicted Reams of Paper & Ink", id)

      } catch (error) {
        console.log("Error while fetching", error)
      }
    }else if (dashName === "Sales Order Processing"){

      try {
        setDownloadDataLoad(id)

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/sales/vbak");

        const result = response.data.data
        // const resultData = result.map(({MANDT, VBELN}) => ({MANDT, VBELN}))

        // console.log(resultData)
        downloadDataIntoExcel(result, "Sales Order Processing", id)

      } catch (error) {
        console.log("Error while fetching", error)
      }
    }
  }

  const getResultsAndDownloadElement = (dataModelName, id) => {
    if (dataModelName === "Revenue, Clinical and Equipment Failure") {
      return (
        <div className="bi-excel-download">
          <div className="" onClick={setIconValue} style={{position:'relative'}}>
              <IoIosArrowDropup title="Select Dashboard" className={`select-model ${isIconClicked === true ? "bi-arrow-down" : "bi-arrow-down-1"}`} />
              {isIconClicked && <div style={{position: "absolute"}} className="report-icon-download-drop-down">
                <p onClick={() => selectDashboard("Revenue Results")}>Revenue Data</p>
                <p onClick={() => selectDashboard("Clinical Results")}>Clinical Data</p>
                <p onClick={() => selectDashboard("Equipment Results")}>Equipment Data</p>
              </div>}
          </div>
          {downloadDataLoad === id ? <div className="bi-spinner"></div> :  <button
            onClick={() => downloadReportData(selectedReport,dataModelName, id)}
            className="bi-excel-download-btn"
          >
            <MdOutlineDownload className="bi-excel-download-icon" />
            <RiFileExcel2Fill className="bi-excel-icon" />
          </button>}
            
        </div>
      );
    } else {
      return (
        <div className="bi-excel-download">
          {downloadDataLoad === id ? <div className="bi-spinner"></div> : <button
            onClick={() => downloadReportData("",dataModelName, id)}
            className="bi-excel-download-btn"
          >
            <MdOutlineDownload className="bi-excel-download-icon" />
            <RiFileExcel2Fill className="bi-excel-icon" />
          </button>}
        </div>
      );
    }
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
            Supply Chain Models
          </h1>
          <div className="dashboard-section">
            {HANElyticsDashboards.map((type) => {
              return (
                <div key={type.headerText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}>
                    <img
                      style={{ filter: "brightness(95%)" }}
                      src={type.image}
                      alt={type.headerText}
                      width={"100%"}
                    />
                  </div>
                  <button
                    className="bi-dashboard-button"
                    // onClick={() => login(`${type.dataText}, ${type.url}`)}
                    style={{ position: "relative" }}
                  >
                    
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                    <p
                      style={{ position: "absolute", top: "6px", right: "8px" }}
                    >
                      {getResultsAndDownloadElement(`${type.headerText}`, `${type.id}`)}
                    </p>
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
                <div key={type.headerText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}>
                    <img
                      style={{ filter: "brightness(95%)" }}
                      src={type.image}
                      alt={type.headerText}
                      width={"100%"}
                    />
                  </div>

                  <button
                    className="bi-dashboard-button"
                    // onClick={() => login(`${type.dataText}, ${type.url}`)}

                    style={{ position: "relative" }}
                  >
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                    <p
                      style={{ position: "absolute", top: "6px", right: "8px" }}
                    >
                      {getResultsAndDownloadElement(`${type.headerText}`, `${type.id}`)}
                    </p>
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
                <div key={type.headerText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}>
                    <img
                      style={{ filter: "brightness(95%)" }}
                      src={type.image}
                      alt={type.headerText}
                      width={"100%"}
                    />
                  </div>
                  <button
                    className="bi-dashboard-button"
                    // onClick={() => login(`${type.dataText}, ${type.url}`)}
                    style={{ position: "relative" }}
                  >
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                    <p
                      style={{ position: "absolute", top: "6px", right: "8px" }}
                    >
                      {getResultsAndDownloadElement(`${type.headerText}`)}
                    </p>
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
                <div key={type.headerText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}>
                    <img
                      style={{ filter: "brightness(95%)" }}
                      src={type.image}
                      alt={type.headerText}
                      width={"100%"}
                    />
                  </div>

                  <button
                    className="bi-dashboard-button"
                    // onClick={() => login(`${type.dataText}, ${type.url}`)}
                    style={{ position: "relative" }}
                  >
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                    <p
                      style={{ position: "absolute", top: "6px", right: "8px" }}
                    >
                      {getResultsAndDownloadElement(`${type.headerText}`)}
                    </p>
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
                <div key={type.headerText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}>
                    <img
                      style={{ filter: "brightness(95%)" }}
                      src={type.image}
                      alt={type.headerText}
                      width={"100%"}
                    />
                  </div>

                  <button
                    className="bi-dashboard-button"
                    // onClick={() => login(`${type.dataText}, ${type.url}`)}
                    style={{ position: "relative" }}
                  >
                    <a href={type.url} target="_blank">
                      View Dashboard
                    </a>
                    <p
                      style={{ position: "absolute", top: "6px", right: "8px" }}
                    >
                      {getResultsAndDownloadElement(`${type.headerText}`)}
                    </p>
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
    localStorage.removeItem("role");
    navigate("/login");
  };

  const openMsg = () => {
    if (isMsgOpened === false) {
      setMsgOpened(true);
    } else {
      setMsgOpened(false);
    }
  };
  const handleIsMenuOpened = () => {
    if (isMenuOpened === false) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  };

  return (
    <div className="power-bi-dashboards">
      <div className="bi-home-container">
        <Link to="/home" className="bi-home-heading">
          <h1>HANELYTICS</h1>
        </Link>

        <div className="dashboard-tabs">
          {tabsList.map((eachTab, index) => (
            <h1
              key={index}
              onClick={() => showDashboards(`${eachTab.activeText}`)}
              className={`powerbi-dashboard-tab-item ${
                activeDashboard === `${eachTab.activeText}`
                  ? "active-dashboard-btn"
                  : ""
              }`}
            >
              <img
                src={eachTab.imageUrl}
                alt={`${eachTab.altText}`}
                className="dashboard-data-model-image-tab"
              />
              {eachTab.tabName}
              <MdKeyboardArrowUp
                className={`bi-arrow ${
                  activeDashboard === `${eachTab.activeText}`
                    ? "bi-arrow-down"
                    : ""
                }`}
              />
            </h1>
          ))}
          <h1
            className="insights-btn"
            onClick={() => navigate("/dataModeling")}
            // onClick={() => navigate("/assignRoles")}
          >
            Data Modeling
            <LuArrowUpRight className="insights-icon" />
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
      <div
        className="bi-mobile-header-container"
        style={{ position: "relative" }}
      >
        <Link to="/home" className="bi-datamodels-website-heading">
          <h1>HANELYTICS</h1>
        </Link>
        <div className="bi-mobile-menu-container">
          {isMenuOpened ? (
            <RxCross1 className="bi-mobile-menu" onClick={handleIsMenuOpened} />
          ) : (
            <IoMdMenu className="bi-mobile-menu" onClick={handleIsMenuOpened} />
          )}
          {isMenuOpened && (
            <div className="mobile-menu-bi-home-container">
              <div className="mobile-dashboard-tabs">
                {tabsList.map((eachTab, index) => (
                  <h1
                    key={index}
                    onClick={() => showDashboards(`${eachTab.activeText}`)}
                    className={`powerbi-dashboard-tab-item ${
                      activeDashboard === `${eachTab.activeText}`
                        ? "active-dashboard-btn"
                        : ""
                    }`}
                  >
                    <img
                      src={eachTab.imageUrl}
                      alt={`${eachTab.altText}`}
                      className="dashboard-data-model-image-tab"
                    />
                    {eachTab.tabName}
                    <MdKeyboardArrowUp
                      className={`bi-arrow ${
                        activeDashboard === `${eachTab.activeText}`
                          ? "bi-arrow-down"
                          : ""
                      }`}
                    />
                  </h1>
                ))}
                <h1
                  className="insights-btn"
                  onClick={() => navigate("/dataModeling")}
                >
                  Data Modeling
                  <LuArrowUpRight className="insights-icon" />
                </h1>
              </div>
              <div className="bi-drop-down">
                {/* <div className="bi-icon-username">
                <FaRegUserCircle className="bi-user-icon" />
                <p className="bi-username-text">{username}</p>
              </div> */}
                <div>
                  <h2
                    style={{ padding: "8px 12px" }}
                    id="mobile-login-btn"
                    onClick={handleModelLogout}
                  >
                    Logout
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bi-reporting-dashboards">
        <div className="container bi-reporting-dashboards-sections">
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
      <Footer />
    </div>
  );
};

export default PowerBiDashboard;
