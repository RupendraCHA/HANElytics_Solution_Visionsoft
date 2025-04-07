import { useContext, useEffect, useState } from "react";
import "./DataModeling.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { MdKeyboardArrowUp } from "react-icons/md";
import { VscGraphScatter } from "react-icons/vsc";
import { LuArrowUpRight } from "react-icons/lu";
import { FaDatabase } from "react-icons/fa6";
import { MdInsertChartOutlined } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { SiSap } from "react-icons/si";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdOutlineDownload } from "react-icons/md";

import {
  news_paper_model_datasets,
  inventory_model_datasets,
  revenue_model_datasets,
  equipment_model_datasets,
  clinical_model_datasets,
  dataOfNEWS,
} from "./DatasetsInfo.jsx";

import { StoreContext } from "../../context/StoreContext.jsx";
import Table from "../../components/DataTable/Table.jsx";
import InventoryPieChart from "../../components/Charts/InventoryCharts/InventoryPieChart/InventoryPieChart.jsx";
import InventoryBarChart from "../../components/Charts/InventoryCharts/InventoryBarChart/InventoryBarChart.jsx";
import RevenuePieChart from "../../components/Charts/RevenueCharts/RevenuePieChart/RevenuePieChart.jsx";
import RevenueBarChart from "../../components/Charts/RevenueCharts/RevenueBarChart/RevenueBarChart.jsx";
import EquipmentPieChart from "../../components/Charts/EquipmentCharts/EquipmentPieChart/EquipmentPieChart.jsx";
import EquipmentBarChart from "../../components/Charts/EquipmentCharts/EquipmentBarChart/EquipmentBarChart.jsx";
import ClinicalPieChart from "../../components/Charts/ClinicalCharts/ClinicalPieChart/ClinicalPieChart.jsx";
import ClinicalBarChart from "../../components/Charts/ClinicalCharts/ClinicalBarChart/ClinicalBarChart.jsx";
import NewsPieChart from "../../components/Charts/NewsPaperCharts/NewsPieChart/NewsPieChart.jsx";
import NewsBarChart from "../../components/Charts/NewsPaperCharts/NewsBarChart/NewswBarChart.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const DataModeling = () => {
  const navigate = useNavigate();
  const { url, username } = useContext(StoreContext);

  const startTheServer = async () => {
    const response = await axios.get(url);
    console.log(response.data.message);
  };
  useEffect(() => {
    startTheServer();
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      navigate("/dataModeling");
    } else {
      navigate("/login");
    }
  }, []);

  // Hello

  const [data, setData] = useState([]);
  const [hideShow, setHideShow] = useState(true);
  const [inventoryData, setInventoryData] = useState(true);
  const [revenueData, setRevenueData] = useState(true);
  const [equipmentData1, setEquipmentData] = useState(true);
  const [clinicalData, setClinicalData] = useState(true);
  const [newsPaperData, setNewsPaperData] = useState(true);
  const [sendData, setSendData] = useState(true);
  const [sendData1, setSendData1] = useState(true);
  const [sendData2, setSendData2] = useState(true);
  const [activeTab, setActiveTab] = useState("tab1");
  // const [activeChartTab, setActiveChartTab] = useState('');
  const [showPieChart, setShowPieChart] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [odataPayload, setOdataPayload] = useState({});
  const [odataPayload1, setOdataPayload1] = useState({});
  const [sapText, setSapText] = useState("Sending Data...");
  // const [process, setProcess] = useState("")

  const [dataModelOpen, setDataModelOpen] = useState("");
  const [migrateModelOpen, setMigrateModelOpen] = useState("");
  const [isLoadingTrue, setIsLoadingTrue] = useState(false);
  const [loadModelData, setLoadModelData] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [procureData, setProcureData] = useState([]);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isModelDataDownloading, setIsModelDataDownloading] = useState(false);

  // useEffect(() => {
  //   getInventoryDataFromMongoDB1()
  // }, [])

  const getDataAndInsightsButtons = () => {
    return (
      <div className="tab-buttons">
        <button
          className={`tab ${activeTab === "tab1" ? "activeTab" : ""}`}
          onClick={() => handleTabClick("tab1")}
        >
          <FaDatabase className="model-sources" />
          Data Resources <span>(utilized)</span>
        </button>
        <button
          className={`tab ${activeTab === "tab2" ? "activeTab" : ""}`}
          onClick={() => handleTabClick("tab2")}
        >
          <MdInsertChartOutlined className="model-insights" />
          View Model Results
        </button>
      </div>
    );
  };

  // <div className="data-model-spinner"></div>

  const getResultsAndDownloadElement = (dataModelName) => {
    return (
      <div className="excel-download">
        <h1 className="results-heading">Results:</h1>
        <button
          onClick={() => downloadDataIntoExcel(data, dataModelName)}
          className="excel-download-btn"
        >
          {isModelDataDownloading ? (
            <div className="data-model-spinner"></div>
          ) : (
            <>
              {" "}
              <MdOutlineDownload className="excel-download-icon" />
              <RiFileExcel2Fill className="excel-icon" />
            </>
          )}
        </button>
      </div>
    );
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowPieChart(false);
    setShowResults(true);
  };

  axios.defaults.withCredentials = true;

  const handleModelLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const sendDataToSAP = async () => {
    // await getInventoryDataFromMongoDB1();
    setIsLoadingTrue(true);
    setLoadModelData(false);
    setDataModelOpen("");
    setMigrateModelOpen("");

    console.log("Data Formatted");
    // New
    const jwtToken = localStorage.getItem("token");
    setSapText(
      "Migrating data from HANElytics to SAP for Inter Company Sales..."
    );

    setSendData(false);
    setSendData1(true);
    setSendData2(true);

    setNewsPaperData(true);

    setInventoryData(true);
    setRevenueData(true);
    setHideShow(false);
    setEquipmentData(true);
    setClinicalData(true);

    const result = await axios.post(
      url + "/api/model/dataToSap",
      { odataPayload },
      { headers: { token: jwtToken } }
    );
    // console.log(result.data)
    if (result.data.success === true) {
      setIsLoadingTrue(false);
      setSapText(result.data.message);
    } else {
      setSapText("Kindly ensure all required systems are running!!");
    }
    console.log(odataPayload);
  };

  const sendDataToSAP1 = async () => {
    setIsLoadingTrue(true);
    setLoadModelData(false);
    setDataModelOpen("");
    setMigrateModelOpen("");

    console.log(odataPayload1, "111");
    console.log("Data Formatted");
    // New
    const jwtToken = localStorage.getItem("token");
    setSapText(
      "Migrating data from HANElytics to SAP for Procurement to Vendor..."
    );

    setSendData(true);
    setSendData1(true);
    setSendData2(false);
    setNewsPaperData(true);
    setInventoryData(true);
    setRevenueData(true);
    setHideShow(false); //
    setEquipmentData(true);
    setClinicalData(true);

    const result = await axios.post(
      url + "/api/model/dataToSap1",
      { odataPayload1 },
      { headers: { token: jwtToken } }
    );
    console.log(result.data);
    if (result.data.success === true) {
      setIsLoadingTrue(false);
      setSapText(result.data.message);
      console.log(result.data.data);
      setProcureData(result.data.data);
    } else {
      setSapText(result.data.message);
      setIsLoadingTrue(false);

      // setSapText("Kindly ensure all required systems are running!!");
    }
    console.log(odataPayload);
  };

  const getNewsPaperDataFromMongoDB = async () => {
    try {
      console.log("News Paper Data");
      if (!newsPaperData) {
        setNewsPaperData(true);
      }
      setDataModelOpen("");
      setMigrateModelOpen("");
      setIsLoadingTrue(true);
      setLoadModelData(true);
      setHideShow(false);
      setInventoryData(true);
      setRevenueData(true);
      setEquipmentData(true);
      setClinicalData(true);
      setSendData(true);
      setSendData1(true);
      setSendData2(true);

      const jwtToken = localStorage.getItem("token");

      const response = await axios.get(url + "/api/model/inventory1", {
        headers: { token: jwtToken },
      });

      const Array = response.data;

      if (Array) {
        setNewsPaperData(false);
        setLoadModelData(false);
      }

      setData(Array);
      console.log(Array);

      handleTabClick("tab1");
    } catch (error) {
      console.log(error);
    }
  };

  const getInventoryDataFromMongoDB = async () => {
    if (!inventoryData) {
      setInventoryData(true);
    }
    setDataModelOpen("");
    setMigrateModelOpen("");
    setIsLoadingTrue(true);
    setLoadModelData(true);
    setHideShow(false);
    setNewsPaperData(true);

    setRevenueData(true);
    setEquipmentData(true);
    setClinicalData(true);
    setSendData(true);
    setSendData1(true);
    setSendData2(true);

    const jwtToken = localStorage.getItem("token");
    // setHideShow(false)

    try {
      const response = await axios.get(url + "/api/model/inventory", {
        headers: { token: jwtToken },
      });
      const Array = response.data;

      if (Array) {
        setIsLoadingTrue(false);
        setLoadModelData(false);

        // toast.success("Request Processed successfully!");
      }

      setData(Array);
      // setInventoryData(false)
      setInventoryData(false);
      handleTabClick("tab1");
    } catch (error) {
      console.log(error);
    }
  };

  const getInventoryDataFromMongoDB1 = async () => {
    setIsLoadingTrue(true);
    setDataModelOpen("");
    setMigrateModelOpen("");
    setNewsPaperData(true);

    const jwtToken = localStorage.getItem("token");
    setHideShow(false);

    setSendData1(false); // New
    setSendData(true); // New
    setSendData2(true); // New
    setInventoryData(true); // New
    setRevenueData(true);
    setEquipmentData(true);
    setClinicalData(true);
    setSapText("One moment, Destructuring the Data..."); // New

    // const SAP_API_URL = 'http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/HANELYTICS_SRV/AutomationSet'
    // const username1 = "Hanelytics"
    // const password1 = "Hanelytics@24"

    const sapFields = [];
    // const sapFields1 = [{
    //   Material: 'PUID1',
    //   Supplier: '',
    //   Distribution_Center: 'IB01',
    //   Quantity: '29800'
    // },
    // {
    //   Material: 'PUID2',
    //   Supplier: '',
    //   Distribution_Center: 'IB01',
    //   Quantity: '46780'
    // }];
    let sapFields1 = [];

    const addObjectsData = (data) => {
      for (let i = 0; i < data.length; i++) {
        const record = data[i];
        sapFields.push({
          Product_ID: record.Product_ID,
          Product_name: record.Product_Name,
          Distribution_Center: record.Distribution_Center,
          Quantity:
            record.Reorder_Quantity_Prediction_with_live_data.toString(),
        });
      }
      return sapFields.slice(0, 4);
    };
    // const addObjectsData1 = (data) => {
    //   let material;
    //   for (let i = 0; i < data.length; i++) {
    //     // if (i === 0) {
    //     //   material = "Paper";
    //     // } else if (i === 1) {
    //     //   material = "Ink";
    //     // }
    //     const record = data[i];

    //     sapFields1.push({
    //       Material: `PUID${i+3}`,
    //       // Material: record.Product_Name,
    //       // Material: "Paper",
    //       Supplier: "",
    //       Distribution_Center: `${record.Distribution_Center_ID === 0 ? "IB01" : "IB01"}`,
    //       Quantity:
    //         record.Reorder_Quantity_Prediction_with_live_data.toString(),
    //     });
    //   }
    //   // console.log(sapFields1.slice(1, 10))
    //   return sapFields1;
    // };

    const addObjectsData1 = (data) => {
      for (let i = 0; i < data.length; i++) {
        const record = data[i];

        sapFields1.push(
          {
            Material: "Paper",
            Supplier: "",
            Distribution_Center: `IB01`,
            Quantity: record.Predicted_Reams_Of_Paper.toString(),
          },
          {
            Material: "Ink",
            Supplier: "",
            Distribution_Center: `IB01`,
            Quantity: record.Ink_required_Predicted_liters.toString(),
          }
          // sapFields1.push(
          //   {
          //       Material: "Paper",
          //       Supplier: "",
          //       Distribution_Center: `IB01`,
          //       // Quantity: record.Predicted_Reams_Of_Paper.toString()
          //       Quantity: "12822"
          // },
          // {
          //       Material: "Ink",
          //       Supplier: "",
          //       Distribution_Center: `IB01`,
          //       // Quantity: record.Ink_required_Predicted_liters.toString()
          //       Quantity: "6667"
          // }
        );
      }

      return sapFields1.slice(0, 2);
    };
    let objectDataForSAP;
    let objectDataForSAP1;

    try {
      const response = await axios.get(url + "/api/model/inventory", {
        headers: { token: jwtToken },
      });
      const Array = response.data;
      setData(Array);
      console.log(Array);

      const response1 = await axios.get(url + "/api/model/inventory1", {
        headers: { token: jwtToken },
      });

      // console.log(response1.data)

      // const sapFields1 = addObjectsData()
      // "Direct_process" : "",
      objectDataForSAP = {
        Process: "Create",
        Automation_to_Hanlytic_np: addObjectsData(Array),
      };
      objectDataForSAP1 = {
        Process: "Create",
        Automation_to_Hanlytic_np: addObjectsData1(response1.data),
      };
      // objectDataForSAP = {
      //   Process: "Create",
      //   Hanelytics_to_SAP_np: addObjectsData(Array),
      // };
      setOdataPayload(objectDataForSAP);
      setOdataPayload1(objectDataForSAP1);
      // const result1 = await axios.post(url + "/api/model/odata", objectDataForSAP, {headers: {token: jwtToken}})
      // console.log(result1.data)
      //    console.log(result)
      // console.log(objectDataForSAP)
      console.log(`Data:`, objectDataForSAP);
      console.log(`Data1:`, objectDataForSAP1);
      if (Array) {
        setIsLoadingTrue(false);

        setSapText("✔ Destructuring of data completed successfully ✔"); // New
      } else {
        setSapText("Enable backend Conncetions correctly!!");
      }

      // setSendData(true)

      // setHideShow(false);
      handleTabClick("tab1");
    } catch (error) {
      console.log(error);
    }
  };

  const getRevenueDataFromMongoDB = async () => {
    if (!revenueData) {
      setRevenueData(true);
    }
    const jwtToken = localStorage.getItem("token");
    setIsLoadingTrue(true);
    setDataModelOpen("");
    setMigrateModelOpen("");
    setHideShow(false);
    setLoadModelData(true);
    setNewsPaperData(true);
    setInventoryData(true);
    setEquipmentData(true);
    setClinicalData(true);
    setSendData(true);
    setSendData1(true);
    setSendData2(true);

    try {
      const response = await axios.get(url + "/api/model/revenue", {
        headers: { token: jwtToken },
      });
      const Array = response.data;
      if (Array) {
        setIsLoadingTrue(false);
        setLoadModelData(false);

        // toast.success("Request Processed successfully!");
      }

      setData(Array);

      console.log(Array);
      setRevenueData(false);

      handleTabClick("tab1");
    } catch (error) {
      console.log(error);
    }
  };

  const getEquipmentDataFromMongoDB = async () => {
    if (!equipmentData1) {
      setEquipmentData(true);
    }
    setDataModelOpen("");
    setMigrateModelOpen("");
    setIsLoadingTrue(true);
    setHideShow(false);
    setLoadModelData(true);
    setNewsPaperData(true);
    setRevenueData(true);
    setInventoryData(true);
    setClinicalData(true);
    setSendData(true);
    setSendData1(true);
    setSendData2(true);

    const jwtToken = localStorage.getItem("token");

    try {
      const response = await axios.get(url + "/api/model/equipment", {
        headers: { token: jwtToken },
      });
      const Array = response.data;
      if (Array) {
        setIsLoadingTrue(false);
        setLoadModelData(false);
        // toast.success("Request Processed successfully!");
      }
      setData(Array);
      console.log(Array);

      setEquipmentData(false);
      handleTabClick("tab1");
    } catch (error) {
      console.log(error);
    }
  };

  const getClinicalDataFromMongoDB = async () => {
    if (!clinicalData) {
      setClinicalData(true);
    }
    setDataModelOpen("");
    setMigrateModelOpen("");
    setIsLoadingTrue(true);
    setHideShow(false);
    setLoadModelData(true);
    setNewsPaperData(true);

    setRevenueData(true);
    setInventoryData(true);
    setEquipmentData(true);
    setSendData(true);
    setSendData1(true);
    setSendData2(true);

    const jwtToken = localStorage.getItem("token");

    try {
      const response = await axios.get(url + "/api/model/clinical", {
        headers: { token: jwtToken },
      });
      const Array = response.data;
      if (Array) {
        setIsLoadingTrue(false);
        setLoadModelData(false);

        // toast.success("Request Processed successfully!");
      }
      setData(Array);
      // console.log(Array)

      setClinicalData(false);
      handleTabClick("tab1");
    } catch (error) {
      console.log(error);
    }
  };

  const handleResultsData = () => {
    setNewsPaperData(true);

    setInventoryData(true);
    setRevenueData(true);
    setHideShow(true);
    setEquipmentData(true);
    setClinicalData(true);
    setSendData(true);
    setSendData1(true);
    setSendData2(true);
  };

  const handlePieChart = (tab) => {
    setActiveTab(tab);
    setShowPieChart(true);
    setShowResults(false);
  };

  const handleIsOpened = (tabContent) => {
    //
    if (dataModelOpen === "") {
      setDataModelOpen(tabContent);
      setMigrateModelOpen("");
      setInventoryData(true);
      setRevenueData(true);
      setHideShow(true);
      setEquipmentData(true);
      setNewsPaperData(true);

      setClinicalData(true);
      setSendData(true);
      setSendData1(true);
    } else {
      setDataModelOpen("");
    }
  };
  const handleMigrateData = (tabContent) => {
    //
    if (migrateModelOpen === "") {
      setMigrateModelOpen(tabContent);
      setInventoryData(true);
      setRevenueData(true);
      setHideShow(true);
      setEquipmentData(true);
      setNewsPaperData(true);

      setClinicalData(true);
      setSendData(true);
      setSendData1(true);

      setDataModelOpen("");
    } else {
      setMigrateModelOpen("");
    }
  };

  const closeAllPopups = () => {
    setMigrateModelOpen("");
    setDataModelOpen("");
  };

  const getLoadingModelText = () => {
    if (!newsPaperData) {
      return "News Paper Model";
    }
  };

  const handleIsMenuOpened = () => {
    if (isMenuOpened === false) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  };

  const downloadDataIntoExcel = (Array, fileName) => {
    setIsModelDataDownloading(true);
    if (!Array || Array.length === 0) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(Array);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    setIsModelDataDownloading(false);

    saveAs(data, `${fileName}.xlsx`);
  };

  return (
    <>
      <div className="data-modeling-container">
        <header className="website-header1">
          {/* container */}
          <div className="header-container">
            <Link to="/home" className="datamodels-website-heading">
              <h1>HANELYTICS</h1>
            </Link>
            <div className="model-migrate-tabs">
              <div style={{ position: "relative" }}>
                <h4
                  onClick={() => handleIsOpened("data-models")}
                  style={{ color: "#000", fontSize: "13px" }}
                  className={`tabHeading ${
                    dataModelOpen === "data-models" && "tab-heading"
                  }`}
                >
                  Data Models
                  <MdKeyboardArrowUp
                    style={{ fontSize: "28px" }}
                    className={`"arrow" ${
                      dataModelOpen === "data-models" ? "arrow-down" : ""
                    }`}
                  />
                </h4>
                {dataModelOpen === "data-models" && (
                  <div className="open-tab">
                    <p onClick={getNewsPaperDataFromMongoDB}>
                      <LuArrowUpRight className="process-arrow" />
                      Predicting Quantity of Demand for Distribution Center
                    </p>
                    <p onClick={getInventoryDataFromMongoDB}>
                      <LuArrowUpRight className="process-arrow" />
                      Reorder Point Quantity & Safety Stock Predictions for
                      Inventory with & without Live-Data
                    </p>
                    <p onClick={getRevenueDataFromMongoDB}>
                      <LuArrowUpRight className="process-arrow" />
                      Predictive Analytics for Revenue Demand Sensing Trends
                    </p>
                    <p onClick={getEquipmentDataFromMongoDB}>
                      <LuArrowUpRight className="process-arrow" />
                      Equipment Risk Detection and Failure Prevention With
                      Predictive Analytics
                    </p>
                    <p onClick={getClinicalDataFromMongoDB}>
                      <LuArrowUpRight className="process-arrow" />
                      Prediction of Reorder Point & Buffer Stock with Clinical
                      Information
                    </p>
                  </div>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <h4
                  onClick={() => handleMigrateData("migrate-data")}
                  style={{ color: "#000", fontSize: "13px" }}
                  className={`tabHeading ${
                    migrateModelOpen === "migrate-data" && "tab-heading"
                  }`}
                >
                  Migrate Data
                  <MdKeyboardArrowUp
                    style={{ fontSize: "28px" }}
                    className={`${
                      migrateModelOpen === "migrate-data" ? "arrow-down" : ""
                    }`}
                  />
                </h4>
                {migrateModelOpen === "migrate-data" && (
                  <div className="open-tab">
                    <p onClick={getInventoryDataFromMongoDB1}>
                      <LuArrowUpRight className="process-arrow" />
                      Destructure the Data
                    </p>
                    <p onClick={sendDataToSAP1}>
                      <LuArrowUpRight className="process-arrow" />
                      Procurement to Vendor
                    </p>
                    <p onClick={sendDataToSAP}>
                      <LuArrowUpRight className="process-arrow" />
                      Inter Company Sales
                    </p>
                  </div>
                )}
              </div>
              <h4
                onClick={() => navigate("/dashboards")}
                className="tabHeading tab-heding"
                style={{
                  color: "#000",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Power BI Dashboards
                <LuArrowUpRight className="roles-insights-icon" />
              </h4>
            </div>
            <div className="drop-down">
              <div>
                <div className="icon-username">
                  <FaRegCircleUser className="user-icon" />
                  <p className="username-text">{username}</p>
                </div>
              </div>
              <div>
                <button onClick={handleModelLogout}>Logout</button>
              </div>
            </div>
          </div>
          <div
            className="mobile-header-container"
            style={{ position: "relative" }}
          >
            <Link to="/home" className="datamodels-website-heading">
              <h1>HANELYTICS</h1>
            </Link>
            <div className="mobile-menu-container">
              {isMenuOpened ? (
                <RxCross1
                  className="mobile-menu"
                  onClick={handleIsMenuOpened}
                />
              ) : (
                <IoMdMenu
                  className="mobile-menu"
                  onClick={handleIsMenuOpened}
                />
              )}
              {isMenuOpened && (
                <div className="model-data-mobile-menu-tabs">
                  <div className="mobile-model-migrate-tabs">
                    <div style={{ position: "relative" }}>
                      <h4
                        onClick={() => handleIsOpened("data-models")}
                        style={{ color: "#000", fontSize: "13px" }}
                        className={`tabHeading ${
                          dataModelOpen === "data-models" && "tab-heading"
                        }`}
                      >
                        Data Models
                        <MdKeyboardArrowUp
                          style={{ fontSize: "28px" }}
                          className={`"arrow" ${
                            dataModelOpen === "data-models" ? "arrow-down" : ""
                          }`}
                        />
                      </h4>
                      {dataModelOpen === "data-models" && (
                        <div className="mobile-open-tab">
                          <p onClick={getNewsPaperDataFromMongoDB}>
                            <LuArrowUpRight className="process-arrow" />
                            Predicting Quantity of Demand for Distribution
                            Center
                          </p>
                          <p onClick={getInventoryDataFromMongoDB}>
                            <LuArrowUpRight className="process-arrow" />
                            Reorder Point Quantity & Safety Stock Predictions
                            for Inventory with & without Live-Data
                          </p>
                          <p onClick={getRevenueDataFromMongoDB}>
                            <LuArrowUpRight className="process-arrow" />
                            Predictive Analytics for Revenue Demand Sensing
                            Trends
                          </p>
                          <p onClick={getEquipmentDataFromMongoDB}>
                            <LuArrowUpRight className="process-arrow" />
                            Equipment Risk Detection and Failure Prevention With
                            Predictive Analytics
                          </p>
                          <p onClick={getClinicalDataFromMongoDB}>
                            <LuArrowUpRight className="process-arrow" />
                            Prediction of Reorder Point & Buffer Stock with
                            Clinical Information
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{ position: "relative" }}>
                      <h4
                        onClick={() => handleMigrateData("migrate-data")}
                        style={{ color: "#000", fontSize: "13px" }}
                        className={`tabHeading ${
                          migrateModelOpen === "migrate-data" && "tab-heading"
                        }`}
                      >
                        Migrate Data
                        <MdKeyboardArrowUp
                          style={{ fontSize: "28px" }}
                          className={`${
                            migrateModelOpen === "migrate-data"
                              ? "arrow-down"
                              : ""
                          }`}
                        />
                      </h4>
                      {migrateModelOpen === "migrate-data" && (
                        <div className="mobile-open-tab">
                          <p onClick={getInventoryDataFromMongoDB1}>
                            <LuArrowUpRight className="process-arrow" />
                            Destructure the Data
                          </p>
                          <p onClick={sendDataToSAP1}>
                            <LuArrowUpRight className="process-arrow" />
                            Procurement to Vendor
                          </p>
                          <p onClick={sendDataToSAP}>
                            <LuArrowUpRight className="process-arrow" />
                            Inter Company Sales
                          </p>
                        </div>
                      )}
                    </div>
                    <h4
                      onClick={() => navigate("/dashboards")}
                      className="tabHeading tab-heding"
                      style={{
                        color: "#000",
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Power BI Dashboards
                      <LuArrowUpRight className="roles-insights-icon" />
                    </h4>
                  </div>
                  <div className="mobile-drop-down">
                    {/* <div className="mobile-icon-username">
                      <FaRegCircleUser className="mobile-user-icon" />
                      <p className="mobile-username-text">{username}</p>
                    </div> */}
                    <div>
                      <button onClick={handleModelLogout}>Logout</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        {/* container */}
        <div className="data-models-section-container" onClick={closeAllPopups}>
          <section className="workflows-section">
            <h1 className="use-case-heading" onClick={handleResultsData}>
              Data Migration
            </h1>
            <div className="data-model-types">
              <h2
                className={sendData1 === true ? "model-name" : "active"}
                onClick={getInventoryDataFromMongoDB1}
              >
                <LuArrowUpRight className="process-arrow" />
                Destructure the Data
              </h2>
              <h2
                className={sendData2 === true ? "model-name" : "active"}
                onClick={sendDataToSAP1}
              >
                <LuArrowUpRight className="process-arrow" />
                Procurement to Vendor
              </h2>
              <h2
                className={sendData === true ? "model-name" : "active"}
                onClick={sendDataToSAP}
              >
                <LuArrowUpRight className="process-arrow" />
                Inter Company Sales
              </h2>
              {/* Migrate Data From HANElytics System to SAP S/4 HANA:  */}
            </div>
            <h1 className="use-case-heading" onClick={handleResultsData}>
              Data Models
            </h1>
            <div className="data-model-types">
              <h2
                className={newsPaperData === true ? "model-name" : "active"}
                onClick={getNewsPaperDataFromMongoDB}
              >
                <LuArrowUpRight className="process-arrow" />
                Predicting Reams of Paper & Ink for Demanded Quantity of NEWS
                Paper to each Distribution Center
              </h2>
              <h2
                className={inventoryData === true ? "model-name" : "active"}
                onClick={getInventoryDataFromMongoDB}
              >
                <LuArrowUpRight className="process-arrow" />
                Reorder Point Quantity & Safety Stock Predictions for Inventory
                with & without Live-Data
              </h2>
              <h2
                className={revenueData === true ? "model-name" : "active"}
                onClick={getRevenueDataFromMongoDB}
              >
                <LuArrowUpRight className="process-arrow" />
                Predictive Analytics for Revenue Demand Sensing Trends
              </h2>
              <h2
                className={equipmentData1 === true ? "model-name" : "active"}
                onClick={getEquipmentDataFromMongoDB}
              >
                <LuArrowUpRight className="process-arrow" />
                Equipment Risk Detection and Failure Prevention With Predictive
                Analytics
              </h2>
              <h2
                className={clinicalData === true ? "model-name" : "active"}
                onClick={getClinicalDataFromMongoDB}
              >
                <LuArrowUpRight className="process-arrow" />
                Prediction of Reorder Point & Buffer Stock with Clinical
                Information
              </h2>
            </div>
          </section>
          {hideShow && (
            // <div className='charts-section select-model-name empty-bg-image'>
            //     <h2 className='select-text'>Select the Data Model to view the results</h2>
            // </div>
            <div className="charts-section select-model-name empty-bg-image">
              <h2 className="select-text">
                Select a Tab, to view Data Model Insights or for Data Migration
              </h2>
            </div>
          )}
          {loadModelData && (
            <div
              className="charts-section select-model-name empty-bg-image"
              style={{ backgroundImage: "none", backgroundColor: "#fff" }}
            >
              <div>
                {isLoadingTrue && <div className="spinner"></div>}
                <h2 className="select-text">
                  One moment, Loading AI / ML Predicted data...
                </h2>
              </div>
            </div>
          )}
          {!sendData1 && (
            <div
              className="charts-section select-model-name empty-bg-image"
              style={{ backgroundImage: "none", backgroundColor: "#fff" }}
            >
              <div>
                {isLoadingTrue && <div className="spinner"></div>}
                <h2 className="select-text">{sapText}</h2>
              </div>
            </div>
          )}
          {!sendData && (
            <div
              className="charts-section select-model-name empty-bg-image"
              style={{ backgroundImage: "none", backgroundColor: "#fff" }}
            >
              <div>
                {isLoadingTrue && <div className="spinner"></div>}
                <h2 className="select-text">{sapText}</h2>
              </div>
            </div>
          )}
          {!sendData2 && (
            <div
              className="charts-section select-model-name empty-bg-image"
              style={{ backgroundImage: "none", backgroundColor: "#fff" }}
            >
              <div>
                {isLoadingTrue && <div className="spinner"></div>}
                <h2 className="select-text">
                  {sapText}{" "}
                  {sapText === "✓✓ Data Transferred Successfully" && (
                    <>
                      from <span className="stp">HANElytics</span> to{" "}
                      <SiSap className="sap" />
                    </>
                  )}
                </h2>
              </div>
            </div>
          )}
          {!newsPaperData && (
            <div className="charts-section">
              {getDataAndInsightsButtons()}
              <div className="tab-content">
                {activeTab === "tab1" && (
                  <>
                    <div id="tab1" className="content model-datasets-active">
                      {news_paper_model_datasets.map((eachDataset, index) => {
                        return (
                          <li key={index} className="model-dataset">
                            {eachDataset}
                          </li>
                        );
                      })}
                    </div>
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab2")}
                        className="btn btn-success results"
                      >
                        View Model Insights
                      </button>
                    </div>
                  </>
                )}
                {activeTab === "tab2" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showResults && (
                      <>
                        {getResultsAndDownloadElement(
                          "News Paper Prediction Results"
                        )}
                        <div className="table-container">
                          <Table
                            data={data}
                            newsPaperData={newsPaperData}
                            inventoryData={inventoryData}
                            revenueData={revenueData}
                            equipmentData1={equipmentData1}
                            clinicalData={clinicalData}
                          />
                        </div>
                      </>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab3" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="pie-chart">
                          <NewsPieChart data={data} />
                          {/* <NewChart data={data} chartText={"Product with Lead Times"} pieChartData={inventoryPieData} /> */}
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab4" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="bar-chart">
                          <NewsBarChart data={data} />
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {!inventoryData && (
            <div className="charts-section">
              {getDataAndInsightsButtons()}

              <div className="tab-content">
                {activeTab === "tab1" && (
                  <>
                    <div id="tab1" className="content model-datasets-active">
                      {inventory_model_datasets.map((eachDataset, index) => {
                        return (
                          <li key={index} className="model-dataset">
                            {eachDataset}
                          </li>
                        );
                      })}
                    </div>
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab2")}
                        className="btn btn-success results"
                      >
                        View Model Insights
                      </button>
                    </div>
                  </>
                )}
                {activeTab === "tab2" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showResults && (
                      <>
                        {/* <h1 className="results-heading">Results:</h1> */}
                        {getResultsAndDownloadElement(
                          "Inventory Reorder Point & Safety Stock results"
                        )}

                        <div className="table-container">
                          <Table
                            data={data}
                            newsPaperData={newsPaperData}
                            inventoryData={inventoryData}
                            revenueData={revenueData}
                            equipmentData1={equipmentData1}
                            clinicalData={clinicalData}
                          />
                        </div>
                      </>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab3" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="pie-chart">
                          <InventoryPieChart data={data} />
                          {/* <NewChart data={data} chartText={"Product with Lead Times"} pieChartData={inventoryPieData} /> */}
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab4" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="bar-chart">
                          <InventoryBarChart data={data} />
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {!revenueData && (
            <div className="charts-section">
              {getDataAndInsightsButtons()}
              <div className="tab-content">
                {activeTab === "tab1" && (
                  <>
                    <div id="tab1" className="content model-datasets-active">
                      {revenue_model_datasets.map((eachDataset, index) => {
                        return (
                          <li key={index} className="model-dataset">
                            {eachDataset}
                          </li>
                        );
                      })}
                    </div>
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab2")}
                        className="btn btn-success results"
                      >
                        View Model Insights
                      </button>
                    </div>
                  </>
                )}
                {activeTab === "tab2" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showResults && (
                      <>
                        {getResultsAndDownloadElement(
                          "Revenue Demand Predictions"
                        )}
                        <div className="table-container">
                          <Table
                            data={data}
                            newsPaperData={newsPaperData}
                            inventoryData={inventoryData}
                            revenueData={revenueData}
                            equipmentData1={equipmentData1}
                            clinicalData={clinicalData}
                          />
                        </div>
                      </>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab3" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="pie-chart">
                          <RevenuePieChart data={data} />
                          {/* <PieChart data={data} chartText={"Revenue Share of each Category"} pieChartData={revenuePieData} /> */}
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab4" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="bar-chart">
                          {/* <BarChart
                                                data={data}
                                                barChartText={"Generation Of Revenue in Future"}
                                                barChartData={revenueBarData}
                                                labelsData={["Sales", "Inventory Levels", "Quantity for each Order"]}
                                            /> */}
                          <RevenueBarChart data={data} />
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {!equipmentData1 && (
            <div className="charts-section">
              {getDataAndInsightsButtons()}

              <div className="tab-content">
                {activeTab === "tab1" && (
                  <>
                    <div id="tab1" className="content model-datasets-active">
                      {equipment_model_datasets.map((eachDataset, index) => {
                        return (
                          <li key={index} className="model-dataset">
                            {eachDataset}
                          </li>
                        );
                      })}
                    </div>
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab2")}
                        className="btn btn-success results"
                      >
                        View Model Insights
                      </button>
                    </div>
                  </>
                )}
                {activeTab === "tab2" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showResults && (
                      <>
                        {getResultsAndDownloadElement(
                          "Equipment Risk Detection and Failure Prevention"
                        )}

                        <div className="table-container">
                          <Table
                            data={data}
                            newsPaperData={newsPaperData}
                            inventoryData={inventoryData}
                            revenueData={revenueData}
                            equipmentData1={equipmentData1}
                            clinicalData={clinicalData}
                          />
                        </div>
                      </>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab3" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="pie-chart">
                          <EquipmentPieChart data={data} />
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab4" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="bar-chart">
                          <EquipmentBarChart data={data} />
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {!clinicalData && (
            <div className="charts-section">
              {/* Tab buttons */}

              {getDataAndInsightsButtons()}

              {/* Tab content */}
              <div className="tab-content">
                {activeTab === "tab1" && (
                  <>
                    <div id="tab1" className="content model-datasets-active">
                      {clinical_model_datasets.map((eachDataset, index) => {
                        return (
                          <li key={index} className="model-dataset">
                            {eachDataset}
                          </li>
                        );
                      })}
                    </div>
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab2")}
                        className="btn btn-success results"
                      >
                        View Model Insights
                      </button>
                    </div>
                  </>
                )}
                {activeTab === "tab2" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showResults && (
                      <>
                        {getResultsAndDownloadElement(
                          "Reorder Point and Buffer Stock for Clinical Data"
                        )}

                        <div className="table-container">
                          <Table
                            data={data}
                            newsPaperData={newsPaperData}
                            inventoryData={inventoryData}
                            revenueData={revenueData}
                            equipmentData1={equipmentData1}
                            clinicalData={clinicalData}
                          />
                        </div>
                      </>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab3" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="pie-chart">
                          <ClinicalPieChart data={data} />
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "tab4" && (
                  <div id="tab2" className="content">
                    <div className="charts-buttons">
                      <button
                        className={`chart-tab ${
                          activeTab === "tab3" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab3")}
                      >
                        Pie Chart
                      </button>
                      <button
                        className={`chart-tab ${
                          activeTab === "tab4" ? "chart-tab-active" : ""
                        }`}
                        onClick={() => handlePieChart("tab4")}
                      >
                        Bar Chart
                      </button>
                    </div>
                    {showPieChart && (
                      <div className="charts-container">
                        <div className="bar-chart">
                          <ClinicalBarChart data={data} />
                        </div>
                      </div>
                    )}
                    <div className="button">
                      <button
                        className="text-right btn btn-primary"
                        onClick={handleResultsData}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleTabClick("tab1")}
                        className="btn btn-dark results"
                      >
                        Data Resources <span>(utilized)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DataModeling;
