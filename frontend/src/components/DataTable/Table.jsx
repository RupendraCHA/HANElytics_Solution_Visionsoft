// import React from 'react'
import "./Table.css"
// import { revenueData } from './JsonData1'

const Table = (props) => {
    // eslint-disable-next-line react/prop-types
    const { data, inventoryData, revenueData, equipmentData1, clinicalData } = props

    const convertToFixedDecimal = (number, roundedTo) => {
        let number1 = number.toFixed(roundedTo)
        return number1
    }
    return (
        <>
            {!inventoryData && (<table className='table'>
                <thead >
                    <tr>
                        <th className='column-name'>S.No</th>
                        <th className='column-name'>Product_Identifier</th>
                        <th className='column-name'>Product_Name</th>
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
                        // eslint-disable-next-line react/prop-types
                        data.map((eachRow, index) => {
                            {/* console.log(index) */ }
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {/* {eachRow.Product_ID} */}
                                    <td>PUID00{index+1}</td>
                                    <td>{eachRow.Product_Name}</td>
                                    <td>{eachRow.Order_Fulfillment_Time_in_days}</td>
                                    <td>{eachRow.Historical_Monthly_Sales}</td>
                                    <td>{eachRow.Monthly_Sales_Prediction_without_live_data}</td>
                                    <td>{eachRow.Monthly_Sales_Prediction_with_live_data}</td>
                                    <td>{eachRow.Daily_Sales_Prediction_without_live_data}</td>
                                    <td>{eachRow.Daily_Sales_Prediction_with_live_data}</td>
                                    <td>{eachRow.fifteen_Days_Buffer_Stock_Estimates_without_live_data}</td>
                                    <td>{eachRow.fifteen_Days_Buffer_Stock_Estimates_with_live_data}</td>
                                    <td>{eachRow.Reorder_Quantity_Prediction_without_live_data}</td>
                                    <td>{eachRow.Reorder_Quantity_Prediction_with_live_data}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>)}
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
