// import React from 'react'
import { useState } from "react"
import "./Table.css"
// import { revenueData } from './JsonData1'
import * as XLSX from "xlsx"
import {saveAs} from "file-saver"


const Table = (props) => {
    // eslint-disable-next-line react/prop-types

    const [showInventoryData, setInventoryData] = useState(false)
    const { data,newsPaperData, inventoryData, revenueData, equipmentData1, clinicalData } = props
    console.log(data)
    
    const convertToFixedDecimal = (number, roundedTo) => {
        let number1 = number.toFixed(roundedTo)
        return number1
    }

    const getDisCenter = (id) => {
        if (id === 0){
            return 1
        }else {
            return id
        }
    }
    // className={`tab ${activeTab === "tab1" ? "activeTab" : ""}`}

    const downloadDataIntoExcel = (Array) => {

        if (!Array || Array.length === 0) return;

        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(Array);
        XLSX.utils.book_append_sheet(wb, ws, "Data")

        const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"})
        const data = new Blob([excelBuffer], {type: "application/octet-stream"})
        saveAs(data, "NEWS_Paper_Data.xlsx")

    }

    return (
        <>
            {/* <div className="migrate-inventory-container">
                <div>
                    <button className={`${showInventoryData === true ? "data-btn" : ""}`} onClick={() => setInventoryData(true)}>View Data for Migration</button>
                </div>
                <div>
                    <button className={showInventoryData === false ? "data-btn" : ""} onClick={() => setInventoryData(false)}>View Data for Inventory</button>
                </div>
            </div> */}
            {!newsPaperData && (<>
                {/* <div className="excel-download">
                    <button onClick={() => downloadDataIntoExcel(data)} className="excel-download-btn">Download</button></div> */}
                <table className='table'>
                <thead >
                    <tr>
                        {/* <th className='column-name'>S.No</th>
                        <th className='column-name'>Product_ID</th>
                        <th className='column-name'>Distribution Center</th>
                        <th className='column-name'>Quantity</th> */}
                        
                        {/* // Updated Data */}
                        <td className='column-name'>S.No</td>
                        <td className='column-name'>Distribution_Center_ID</td>
                        {/* <td className='column-name'>Historical NEWS Paper Demand</td> */}
                        <td className='column-name'>Predicted NEWS Papers Demand</td>
                        <td className='column-name'>Predicted Reams of Paper</td>
                        <td className='column-name'>Predicted Ink in liters</td>

                        {/* // Updated Data End */}
                        
                        {/* <th className='column-name'>Product_Identifier</th>
                        <th className='column-name'>Product_Name</th>
                        <th className='column-name'>Distribution_Center_ID</th>
                        <th className='column-name'>Distribution_Center</th>
                        <th title="Time required to transport the product" className='column-name'>Order_Fulfillment_Time (in Days)</th>
                        <th className='column-name'>Historical_Monthly_Sales</th>
                        <th className='column-name'>Monthly_Sales_Prediction<br />(Without Live Data)</th>
                        <th className='column-name'>Monthly_Sales_Prediction<br />(With Live Data)</th>
                        <th className='column-name'>Daily_Sales_Prediction<br />(Without Live Data)</th>
                        <th className='column-name'>Daily_Sales_Prediction<br />(With Live Data)</th>
                        <th className='column-name'>Safety_Stock<br />(Without Live Data)</th>
                        <th className='column-name'>Safety_Stock<br />(With Live Data)</th>
                        <th className='column-name'>Reorder_Quantity_Prediction<br />(Without live Data)</th>
                        <th className='column-name'>Reorder_Quantity_Prediction<br />(With Live Data)</th> */}
                    </tr>
                </thead>
                <tbody>
                {/* 730414 12822 6667 */}
                {/* <tr>
                        <td>1</td>
                        <td>PUID1</td>
                        <td>IB01</td>
                        <td>29800</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>PUID2</td>
                        <td>IB01</td>
                        <td>46780</td>
                    </tr> */}
                    {/* <tr>
                        <td>1</td>
                        <td>IB01</td>
                        <td>730414</td>
                        <td>12822</td>
                        <td>6667</td>
                    </tr> */}
                    {
                        data.slice(0,data.length).map((eachRow, index) => {
                            // return (
                            //     <tr key={index}>
                            //         <td>{index + 3}</td>
                            //         <td>PUID{index + 3}</td>
                            //         <td>{eachRow.Product_Name}</td>
                            //         <td>{eachRow.Distribution_Center && "IB01"}</td>
                            //         <td>{eachRow.Reorder_Quantity_Prediction_with_live_data}</td>
                            //         <td>{eachRow.Product_ID}</td>
                            //         <td>{eachRow.Product_Name}</td>
                            //         <td>{eachRow.Distribution_Center}</td>
                            //         <td>{getDisCenter(eachRow.Distribution_Center_ID)}</td>
                                    
                            //         <td>{eachRow.Order_Fulfillment_Time_in_days}</td>
                            //         <td>{eachRow.Historical_Monthly_Sales}</td>
                            //         <td>{eachRow.Monthly_Sales_Prediction_without_live_data}</td>
                            //         <td>{eachRow.Monthly_Sales_Prediction_with_live_data}</td>
                            //         <td>{eachRow.Daily_Sales_Prediction_without_live_data}</td>
                            //         <td>{eachRow.Daily_Sales_Prediction_with_live_data}</td>
                            //         <td>{eachRow.Safety_Stock_without_live_data}</td>
                            //         <td>{eachRow.Safety_Stock_with_live_data}</td>
                            //         <td>{eachRow.Reorder_Quantity_Prediction_without_live_data}</td>
                            //         <td>{eachRow.Reorder_Quantity_Prediction_with_live_data}</td>
                            //     </tr>
                            // )

                            // Updated Data

                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{eachRow.Distribution_Center_ID.slice(0,2)+eachRow.Distribution_Center_ID.slice(3,5)}</td>
                                    {/* <td>IB01</td> */}
                                    {/* <td>{eachRow.Historical_News_Paper_Demand}</td> */}
                                    <td>{eachRow.Predicted_NEWS_Paper_Demand_Quantity}</td>
                                    <td>{eachRow.Predicted_Reams_Of_Paper}</td>
                                    <td>{eachRow.Ink_required_Predicted_liters}</td>
                                </tr>
                            )

                            // Updated Data End

                        })
                    }
                    
                </tbody>
                </table></>
            )

            }
            {inventoryData === false && (
                <table className='table'>
                <thead >
                    <tr>
                        <th className='column-name'>S.No</th>
                        <th className='column-name'>Product_Identifier</th>
                        <th className='column-name'>Product_Name</th>
                        <th className='column-name'>Distribution_Center_ID</th>
                        <th className='column-name'>Distribution_Center</th>
                        <th title="Time required to transport the product" className='column-name'>Order_Fulfillment_Time (in Days)</th>
                        <th className='column-name'>Historical_Monthly_Sales</th>
                        <th className='column-name'>Monthly_Sales_Prediction<br />(Without Live Data)</th>
                        <th className='column-name'>Monthly_Sales_Prediction<br />(With Live Data)</th>
                        <th className='column-name'>Daily_Sales_Prediction<br />(Without Live Data)</th>
                        <th className='column-name'>Daily_Sales_Prediction<br />(With Live Data)</th>
                        <th className='column-name'>Safety_Stock<br />(Without Live Data)</th>
                        <th className='column-name'>Safety_Stock<br />(With Live Data)</th>
                        <th className='column-name'>Reorder_Quantity_Prediction<br />(Without live Data)</th>
                        <th className='column-name'>Reorder_Quantity_Prediction<br />(With Live Data)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((eachRow, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {/* {eachRow.Product_ID} */}
                                    <td>{eachRow.Product_ID}</td>
                                    <td>{eachRow.Product_Name}</td>
                                    <td>{eachRow.Distribution_Center}</td>
                                    <td>{getDisCenter(eachRow.Distribution_Center_ID)}</td>
                                    {/* <td>0002</td>
                                    <td>EC02 Plant</td> */}
                                    <td>{eachRow.Order_Fulfillment_Time_in_days}</td>
                                    <td>{eachRow.Historical_Monthly_Sales}</td>
                                    <td>{eachRow.Monthly_Sales_Prediction_without_live_data}</td>
                                    <td>{eachRow.Monthly_Sales_Prediction_with_live_data}</td>
                                    <td>{eachRow.Daily_Sales_Prediction_without_live_data}</td>
                                    <td>{eachRow.Daily_Sales_Prediction_with_live_data}</td>
                                    <td>{eachRow.Safety_Stock_without_live_data}</td>
                                    <td>{eachRow.Safety_Stock_with_live_data}</td>
                                    <td>{eachRow.Reorder_Quantity_Prediction_without_live_data}</td>
                                    <td>{eachRow.Reorder_Quantity_Prediction_with_live_data}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
        ) 
        }
            {!revenueData && (
                <table className='table'>
                    <thead >
                        <tr>
                            <th className='column-name'>S.No</th>
                            <th className='column-name'>Product_Category</th>
                            <th className='column-name'>Item_SKU</th>
                            <th className='column-name'>Predicted_Revenue_for_Upcoming_90_Days</th>
                            <th className='column-name'>Revenue_Reporting_Week</th>
                            {/* <th className='column-name'>Transportation_Mode</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {
                            // eslint-disable-next-line react/prop-types
                            data.map((eachRow, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{eachRow.Product_Type}</td>
                                        <td>UMI{eachRow.Item_SKU}</td>
                                        <td>{convertToFixedDecimal(eachRow.Predicted_Revenue_for_Upcoming_90_Days, 2)}</td>
                                        <td>{eachRow.Revenue_Reporting_Week}</td>
                                        {/* <td>{eachRow.Transportation_Modes}</td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )}
            {!equipmentData1 && (
                <table className='table'>
                    <thead >
                        <tr>
                            <th className='column-name'>S.No</th>
                            <th className='column-name' title="Expresses, It's Life Cycle">Equipment_Serial_Number</th>
                            <th className='column-name' title='Loss of ability to function efficiently'>Historical_Breakdown_of_Equipment_Failure <br />(in Cycles)</th>
                            <th className='column-name' title='Time during which, a machine need maintenance to work efficiently.'>Predicted_Equipment_Breakdown_of_Failure <br /> (in Cycles)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // eslint-disable-next-line react/prop-types
                            data.map((eachRow, index) => {
                                {/* console.log(index) */ }
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>EUID{eachRow.Equipment_Serial_Number}</td>
                                        <td>{eachRow.Historical_Breakdown_of_Equipment_Failure}</td>
                                        <td>{convertToFixedDecimal(eachRow.Predicted_Equipment_Breakdown_of_Failure, 2)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )}
            {!clinicalData && (
                <table className='table'>
                    <thead >
                        <tr>
                            <th className='column-name'>S.No</th>
                            <th className='column-name'>Distribution_Center_ID</th>
                            <th className='column-name'>Distribution_Center_Name</th>
                            <th className='column-name'>Medication_ID</th>
                            <th className='column-name'>Medication_Name</th>
                            <th className='column-name'>Predicted_Sales</th>
                            <th className='column-name'>Historical_Sales</th>
                            <th className='column-name'>Safety_Stock</th>
                            <th className='column-name'>Reorder_Point_Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // eslint-disable-next-line react/prop-types
                            data.map((eachRow, index) => {
                                {/* console.log(index) */ }
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{eachRow.Distribution_Center_ID}</td>
                                        <td>{eachRow.Distribution_Center_Name}</td>
                                        <td>{eachRow.Medication_ID}</td>
                                        <td>{eachRow.Medication_Name}</td>
                                        <td>{eachRow.Predicted_Sales}</td>
                                        <td>{eachRow.Historical_Sales}</td>
                                        <td>{eachRow.Safety_Stock_For_15_Days}</td>
                                        <td>{eachRow.Reorder_Point_Quantity}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Table
