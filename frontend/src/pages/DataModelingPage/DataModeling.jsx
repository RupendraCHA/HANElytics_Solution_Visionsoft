import {useContext, useEffect, useState } from 'react'
import "./DataModeling.css"
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from "antd"
// import { toast } from 'react-toastify';
import axios from "axios"

import {
    inventory_model_datasets,
    revenue_model_datasets,
    equipment_model_datasets,
    clinical_model_datasets
} from './DatasetsInfo.jsx'


import { StoreContext } from '../../context/StoreContext.jsx';
import Table from "../../components/DataTable/Table.jsx"
import InventoryPieChart from '../../components/Charts/InventoryCharts/InventoryPieChart/InventoryPieChart.jsx';
import InventoryBarChart from '../../components/Charts/InventoryCharts/InventoryBarChart/InventoryBarChart.jsx';
import RevenuePieChart from '../../components/Charts/RevenueCharts/RevenuePieChart/RevenuePieChart.jsx';
import RevenueBarChart from '../../components/Charts/RevenueCharts/RevenueBarChart/RevenueBarChart.jsx';
import EquipmentPieChart from '../../components/Charts/EquipmentCharts/EquipmentPieChart/EquipmentPieChart.jsx';
import EquipmentBarChart from '../../components/Charts/EquipmentCharts/EquipmentBarChart/EquipmentBarChart.jsx';
import ClinicalPieChart from '../../components/Charts/ClinicalCharts/ClinicalPieChart/ClinicalPieChart.jsx';
import ClinicalBarChart from '../../components/Charts/ClinicalCharts/ClinicalBarChart/ClinicalBarChart.jsx';




const DataModeling = () => {

    const navigate = useNavigate()
    const {url, username} = useContext(StoreContext)

    useEffect(() => {
        const jwtToken = localStorage.getItem("token")

        if (jwtToken) {
            navigate("/dataModeling")
        }else {
            navigate("/login")
        }
    },[])

    // Hello

    const [data, setData] = useState([])
    const [hideShow, setHideShow] = useState(true)
    const [inventoryData, setInventoryData] = useState(true)
    const [revenueData, setRevenueData] = useState(true)
    const [equipmentData1, setEquipmentData] = useState(true)
    const [clinicalData, setClinicalData] = useState(true)
    const [sendData, setSendData] = useState(true)
    const [sendData1, setSendData1] = useState(true)
    const [activeTab, setActiveTab] = useState('tab1');
    // const [activeChartTab, setActiveChartTab] = useState('');
    const [showPieChart, setShowPieChart] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const [odataPayload, setOdataPayload] = useState({});
    const [sapText, setSapText] = useState("Sending Data...")

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setShowPieChart(false)
        setShowResults(true)
    };

    axios.defaults.withCredentials = true;
    

    const handleModelLogout = async () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        navigate("/login")
    }

    const sendDataToSAP = async () => { // New
        const jwtToken = localStorage.getItem("token")
        setSapText("Sending Data...")

        setSendData(false)
        setSendData1(true)
        setInventoryData(true)
        setRevenueData(true)
        setHideShow(false) 
        setEquipmentData(true)
        setClinicalData(true)
        const objectData = {
            Process: "Create",
            Direct_process: "",
            Automation_to_Hanlytic_np: [
              {
                Product_ID: "PUID46",
                Product_name: "Blood Pressure Monitor",
                Distribution_Center: "Mao",
                Quantity: "19872"
              },
              {
                Product_ID: "PUID323",
                Product_name: "ECG Machine",
                Distribution_Center: "Mao",
                Quantity: "44037"
              },
              {
                Product_ID: "PUID564",
                Product_name: "X-Ray Machine",
                Distribution_Center: "Xianju",
                Quantity: "60528"
              },
              {
                Product_ID: "PUID785",
                Product_name: "Ultrasound Device",
                Distribution_Center: "Mao",
                Quantity: "12420"
              },
              {
                Product_ID: "PUID165",
                Product_name: "X-Ray Machine",
                Distribution_Center: "Naklo nad Notecia",
                Quantity: "75096"
              },
              {
                Product_ID: "PUID480",
                Product_name: "MRI Machine",
                Distribution_Center: "Gustavia",
                Quantity: "19140"
              },
              {
                Product_ID: "PUID585",
                Product_name: "ECG Machine",
                Distribution_Center: "Kathmandu",
                Quantity: "17496"
              },
              {
                Product_ID: "PUID633",
                Product_name: "ECG Machine",
                Distribution_Center: "Istanbul",
                Quantity: "19620"
              },
              {
                Product_ID: "PUID711",
                Product_name: "ECG Machine",
                Distribution_Center: "Naklo nad Notecia",
                Quantity: "25524"
              },
              {
                Product_ID: "PUID762",
                Product_name: "Surgical Instruments",
                Distribution_Center: "Naklo nad Notecia",
                Quantity: "59217"
              },
              {
                Product_ID: "PUID995",
                Product_name: "Infusion Pump",
                Distribution_Center: "Naklo nad Notecia",
                Quantity: "45828"
              },
              {
                Product_ID: "PUID6",
                Product_name: "Stethoscope",
                Distribution_Center: "Gustavia",
                Quantity: "54390"
              },
              {
                Product_ID: "PUID103",
                Product_name: "Blood Pressure Monitor",
                Distribution_Center: "Istanbul",
                Quantity: "102974"
              },
              {
                Product_ID: "PUID127",
                Product_name: "Blood Pressure Monitor",
                Distribution_Center: "Gustavia",
                Quantity: "53208"
              },
              {
                Product_ID: "PUID145",
                Product_name: "Stethoscope",
                Distribution_Center: "Bankra",
                Quantity: "63360"
              },
              {
                Product_ID: "PUID518",
                Product_name: "Surgical Instruments",
                Distribution_Center: "Gustavia",
                Quantity: "50748"
              },
              {
                Product_ID: "PUID552",
                Product_name: "Infusion Pump",
                Distribution_Center: "Lisbon",
                Quantity: "28356"
              },
              {
                Product_ID: "PUID627",
                Product_name: "Ultrasound Device",
                Distribution_Center: "Gustavia",
                Quantity: "58284"
              },
              {
                Product_ID: "PUID734",
                Product_name: "X-Ray Machine",
                Distribution_Center: "Mao",
                Quantity: "83820"
              },
              {
                Product_ID: "PUID779",
                Product_name: "X-Ray Machine",
                Distribution_Center: "Walbrzych",
                Quantity: "124320"
              },
              {
                Product_ID: "PUID64",
                Product_name: "Blood Pressure Monitor",
                Distribution_Center: "Kathmandu",
                Quantity: "25692"
              },
              {
                Product_ID: "PUID111",
                Product_name: "Surgical Instruments",
                Distribution_Center: "Merida",
                Quantity: "65538"
              },
              {
                Product_ID: "PUID112",
                Product_name: "Defibrillator",
                Distribution_Center: "Nalchik",
                Quantity: "31920"
              },
              {
                Product_ID: "PUID179",
                Product_name: "Ventilator",
                Distribution_Center: "Zhengzhou",
                Quantity: "35350"
              },
              {
                Product_ID: "PUID195",
                Product_name: "X-Ray Machine",
                Distribution_Center: "Gustavia",
                Quantity: "60528"
              }
            ]
        }
        // const result =  await axios.post(url + "/api/model/dataToSap", {objectData})
        const result =  await axios.post(url + "/api/model/dataToSap", {odataPayload}, {headers: {token: jwtToken}})
        console.log(result.data)
        if (result.data.success === true){
            setSapText(result.data.message)
        }
        console.log(odataPayload)
    }

    const getInventoryDataFromMongoDB = async () => {
        const jwtToken = localStorage.getItem("token")
        // setHideShow(false)

        try {
            const response = await axios.get(url + "/api/model/inventory", {headers: {token: jwtToken}})
            const Array = response.data
            

                setData(Array)
                // setInventoryData(false)
                setInventoryData(false)
                setRevenueData(true)
                setEquipmentData(true)
                setClinicalData(true)
                setSendData(true)
                setSendData1(true)
                setHideShow(false)
                handleTabClick("tab1")
        } catch (error) {
            console.log(error)
        }

        
    }
    const getInventoryDataFromMongoDB1 = async () => {
        const jwtToken = localStorage.getItem("token")
        setHideShow(false)

        setSendData1(false) // New
        setSendData(true) // New
        // setInventoryData(false)
        setInventoryData(true) // New
        setRevenueData(true)
        setEquipmentData(true)
        setClinicalData(true)
        setSapText("Formatting the Data...") // New

        // const SAP_API_URL = 'http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/HANELYTICS_SRV/AutomationSet'
        // const username1 = "Hanelytics"
        // const password1 = "Hanelytics@24"

        const sapFields = []

        const addObjectsData = (data) => {
            for (let i = 0; i < data.length; i++) {
                const record = data[i]
                sapFields.push({
                    Product_ID: record.Product_ID, 
                    Product_name:  record.Product_Name, 
                    Distribution_Center: record.Distribution_Center,
                    Quantity: record.Reorder_Quantity_Prediction_with_live_data.toString()
                });
            }
            return sapFields.slice(0, 141)
        }

        let objectDataForSAP;

        try {
            const response = await axios.get(url + "/api/model/inventory", {headers: {token: jwtToken}})
            const Array = response.data
            setData(Array)

            // const sapFields1 = addObjectsData()
            // "Direct_process" : "",
            objectDataForSAP = {
                Process : "Create",
                Direct_process : "",
                Automation_to_Hanlytic_np: addObjectsData(Array)
            }
            setOdataPayload(objectDataForSAP)
            const result1 = await axios.post(url + "/api/model/odata", objectDataForSAP, {headers: {token: jwtToken}})
            console.log(result1.data)
        //    console.log(result)
            // console.log(objectDataForSAP)
            console.log(`Data:`, objectDataForSAP)
            // console.log(`Data:`, odataPayload)
            // console.log(sapFields1)
            // console.log(Array)
            if (Array){
                setSapText("✔ Data Formating Successfull ✔") // New
            }

                
                // setSendData(true)

                setHideShow(false)
                handleTabClick("tab1")
        } catch (error) {
            console.log(error)
        }

        // try {
        //     const response1 = await axios.post(SAP_API_URL, objectDataForSAP, {
        //         auth: {
        //             username: username1,
        //             password: password1
        //         },
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     })
        //     console.log(`Data pushed successfully`, response1.data);

        // } catch (error) {
        //     console.error(`Failed to push data into SAP`, error.message);
        // }
        
    }

    const getRevenueDataFromMongoDB = async () => {
        const jwtToken = localStorage.getItem("token")

            try {
                const response = await axios.get( url + "/api/model/revenue", {headers: {token: jwtToken}})
                const Array = response.data
                setData(Array)
                console.log(Array)
                setRevenueData(false)
                setHideShow(false)
                setInventoryData(true)
                setEquipmentData(true)
                setClinicalData(true)
                setSendData(true)
                setSendData1(true)
                handleTabClick("tab1")
            } catch (error) {
                console.log(error)
            }
    }

    const getEquipmentDataFromMongoDB = async () => {
        const jwtToken = localStorage.getItem("token")

            try {
                const response = await axios.get( url + "/api/model/equipment", {headers: {token: jwtToken}})
                const Array = response.data
                setData(Array)
                console.log(Array)
                setRevenueData(true)
                setHideShow(false)
                setInventoryData(true)
                setEquipmentData(false)
                setClinicalData(true)
                setSendData(true)
                setSendData1(true)
                handleTabClick("tab1")
            } catch (error) {
                console.log(error)
            }
    }

    const getClinicalDataFromMongoDB = async () => {
        const jwtToken = localStorage.getItem("token")

            try {
                const response = await axios.get( url + "/api/model/clinical", {headers: {token: jwtToken}})
                const Array = response.data
                setData(Array)
                // console.log(Array)
                setRevenueData(true)
                setHideShow(false)
                setInventoryData(true)
                setEquipmentData(true)
                setClinicalData(false)
                setSendData(true)
                setSendData1(true)

                handleTabClick("tab1")
            } catch (error) {
                console.log(error)
            }
    }

    const handleResultsData = () => {
        setInventoryData(true)
        setRevenueData(true)
        setHideShow(true)
        setEquipmentData(true)
        setClinicalData(true)
        setSendData(true)
        setSendData1(true)

    }

    const handlePieChart = (tab) => {
        setActiveTab(tab)
        setShowPieChart(true)
        setShowResults(false)
    }

    const items = [
        {
            key: 1,
            label: (
                <a id='home-item' href="/home">
                    Go to Home
                </a>
            )
        },
        {
            key: 2,
            label: (
                <a id='home-item' onClick={getInventoryDataFromMongoDB}>
                    1) Inventory Forecasting with live data
                </a>
            )
        },
        {
            key: 3,
            label: (
                <a id='home-item' onClick={getRevenueDataFromMongoDB}>
                    2) Predicting Revenue Demand/Sensing
                </a>
            )
        },
        {
            key: 4,
            label: (
                <a id='home-item' onClick={getEquipmentDataFromMongoDB}>
                    3) Equipment Failure Prediction
                </a>
            )
        },
        {
            key: 5,
            label: (
                <a id='home-item' onClick={getClinicalDataFromMongoDB}>
                    4) Inventory Prediction With Clinical Data
                </a>
            )
        }
        ,
        {
            key: 6,
            label: (
                <a id='home-item' onClick={handleModelLogout}>
                    Logout
                </a>
            )
        }
    ]

    return (<>
        <div className='data-modeling-container'>
            <header className='website-header1'>
                <div className='container header-container'>
                    <Link to="/home" className='website-heading'>
                        <h1 >
                            HANELYTICS
                        </h1>
                    </Link>
                    <div className='drop-down'>
                        <div>
                            <Dropdown menu={{ items }} trigger={['hover']} id='items-drop-menu'>
                                <div className='icon-username'>
                                    <FaRegCircleUser className='user-icon' />
                                    <p className='username-text'>{username}</p>
                                </div>
                            </Dropdown>
                        </div>
                        <div>
                            <button onClick={handleModelLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container data-models-section-container'>
                <section className='workflows-section'>
                    {/* <h1 className='use-case-heading' onClick={handleResultsData}>Data Models</h1> */}
                    <h1 className='use-case-heading' onClick={handleResultsData}>Migrate Data</h1>
                    <div className='data-model-types'>
                        
                        <h2 className={sendData1 === true ? 'model-name' : "active"} onClick={getInventoryDataFromMongoDB1}>
                            Format the Reorder Point Quantity data as per SAP Requirements
                        </h2>
                        <h2 className={sendData === true ? 'model-name' : "active"} onClick={sendDataToSAP}>
                            Migrate Data From HANElytics to SAP S/4 HANA: Inter Company Sales
                        </h2>
                        
                    </div>
                    <h1 className='use-case-heading' onClick={handleResultsData}>Data Models</h1>
                    <div className='data-model-types'>
                    <h2 className={inventoryData === true ? 'model-name' : "active"} onClick={getInventoryDataFromMongoDB}>
                            Reorder Point Quantity & Safety Stock Predictions for Inventory with & without Live-Data
                        </h2>
                        <h2 className={revenueData === true ? 'model-name' : "active"} onClick={getRevenueDataFromMongoDB}>
                            Predictive Analytics for Revenue Demand Sensing Trends
                        </h2>
                        <h2 className={equipmentData1 === true ? 'model-name' : "active"} onClick={getEquipmentDataFromMongoDB}>
                            Equipment Risk Detection and Failure Prevention With Predictive Analytics
                        </h2>
                        <h2 className={clinicalData === true ? 'model-name' : "active"} onClick={getClinicalDataFromMongoDB}>
                            Prediction of Reorder Point & Buffer Stock with Clinical Information
                        </h2>
                    </div>

                </section>
                {
                    hideShow && (
                        // <div className='charts-section select-model-name empty-bg-image'>
                        //     <h2 className='select-text'>Select the Data Model to view the results</h2>
                        // </div>
                        <div className='charts-section select-model-name empty-bg-image'>
                            <h2 className='select-text'>Transfer Data to SAP System from HANElytics System</h2>
                        </div>
                    )
                }
                {
                    !sendData1 && (
                        <div className='charts-section select-model-name empty-bg-image'>
                            <h2 className='select-text'>{sapText}</h2>
                        </div>
                    )
                }
                {
                    !sendData && (
                        <div className='charts-section select-model-name empty-bg-image'>
                            <h2 className='select-text'>{sapText}</h2>
                        </div>
                    )
                }
                {!inventoryData && (
                    <div className='charts-section'>
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Results
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {inventory_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showResults && 
                                        <><h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div></>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab3' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='pie-chart'>
                                            <InventoryPieChart data={data} />
                                            {/* <NewChart data={data} chartText={"Product with Lead Times"} pieChartData={inventoryPieData} /> */}
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab4' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='bar-chart'>
                                            <InventoryBarChart
                                                data={data}
                                            />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {!revenueData && (
                    <div className='charts-section'>
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {revenue_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showResults && 
                                        <><h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div></>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab3' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='pie-chart'>
                                        <RevenuePieChart data={data} />
                                        {/* <PieChart data={data} chartText={"Revenue Share of each Category"} pieChartData={revenuePieData} /> */}
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab4' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='bar-chart'>
                                            {/* <BarChart
                                                data={data}
                                                barChartText={"Generation Of Revenue in Future"}
                                                barChartData={revenueBarData}
                                                labelsData={["Sales", "Inventory Levels", "Quantity for each Order"]}
                                            /> */}
                                            <RevenueBarChart data={data}/>
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                )}
                {!equipmentData1 && (
                    <div className='charts-section'>
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {equipment_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showResults && 
                                        <><h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div></>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab3' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='pie-chart'>
                                        <EquipmentPieChart data={data} />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab4' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='bar-chart'>
                                        <EquipmentBarChart
                                                data={data}
                                            />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                )}
                {!clinicalData && (
                    <div className='charts-section'>
                        {/* Tab buttons */}
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>

                        {/* Tab content */}
                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {clinical_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showResults && 
                                        <><h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div></>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab3' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='pie-chart'>
                                            <ClinicalPieChart data={data}  />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab4' && (
                                <div id="tab2" className="content">
                                    <div className='charts-buttons'>
                                        <button className={`chart-tab ${activeTab === 'tab3' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab3')}>
                                            Pie Chart
                                        </button>
                                        <button className={`chart-tab ${activeTab === 'tab4' ? 'chart-tab-active' : ''}`} onClick={() => handlePieChart('tab4')}>
                                            Bar Chart
                                        </button>
                                    </div>
                                    {showPieChart && <div className='charts-container'>
                                        <div className='bar-chart'>
                                        <ClinicalBarChart
                                            data={data}
                                        />
                                        </div>
                                    </div>}
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                )}
            </div>
        </div>
    </>
    );
}

export default DataModeling