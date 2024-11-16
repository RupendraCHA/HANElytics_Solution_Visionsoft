
import { useState } from 'react'
import './InventoryBarChart.css'
import InventoryBarChartItem from './../InventoryBarChartItem/InventoryBarChartItem.jsx'
// import { usersData } from "./Data.jsx"

// Bluish green: #009E73
// Yellow: #F0E442
// Blue: #0072B2
// Vermilion: #D55E00
// Dark pink: #801650
// Orange: #F46A25
// Dark grey: #3D3D3D
// Light purple: #A285D1

function InventoryBarChart({ barChartText, barChartData, labelsData, data }) {

    const [userData1, setUserData1] = useState({
        labels: data.map((data) => data.Product_Name),
        datasets: [{
            label: "Historical Monthly Sales",
            data: data.map((data) => data.Historical_Monthly_Sales),
            backgroundColor: ["#009E73"],
        }, {
            label: "Monthly Sales Prediction Without Live Data",
            data: data.map((data) => data.Monthly_Sales_Prediction_without_live_data),
            backgroundColor: ["#F0E442"]
        }, {
            label: "Monthly Sales Prediction With Live Data",
            data: data.map((data) => data.Monthly_Sales_Prediction_with_live_data),
            backgroundColor: ["#D55E00"]
        }
        
        ]
    })

    const [userData2, setUserData2] = useState({
        labels: data.map((data) => data.Product_Name),
        datasets: [{
            label: "Safety Stock Prediction Without Live Data",
            data: data.map((data) => data.Safetry_Stock_Prediction_Without_Live_Data),
            backgroundColor: ["#0072B2"],
        }, {
            label: "Safety Stock Prediction With Live Data",
            data: data.map((data) => data.Safetry_Stock_Prediction_With_Live_Data),
            backgroundColor: ["#801650"]
        }, {
            label: "Reorder Quantity Prediction Without Live Data",
            data: data.map((data) => data.Reorder_Quantity_Prediction_without_live_data),
            backgroundColor: ["#F46A25"]
        }, {
            label: "Reorder Quantity Prediction With Live Data",
            data: data.map((data) => data.Reorder_Quantity_Prediction_with_live_data),
            backgroundColor: ["#3D3D3D"]
        }
        ]
    })

    const [userData3, setUserData3] = useState({
        labels: data.map((data) => data.Product_Name),
        datasets: [{
            label: "Daily Sales Without Live Data",
            data: data.map((data) => data.Daily_Sales_Prediction_without_live_data),
            backgroundColor: ["#A285D1"],
        }, {
            label: "Daily Sales With Live Data",
            data: data.map((data) => data.Daily_Sales_Prediction_with_live_data),
            backgroundColor: ["#F0E442"]
        }
        ]
    })

    // Daily_Sales_Prediction_without_live_data

    return (
        <div className='bar-chart-container'>
            <div className='b-chart'>
                <InventoryBarChartItem chartData={userData2} barChartText={"Safety Stock and Reorder Quantity Predictions - With, Without Live Data"} />
            </div>
            <div className='b-chart'>
                <InventoryBarChartItem chartData={userData1} barChartText={"Monthly Sales and their predictions for - With, Without Live Data"} />
            </div>
            <div className='b-chart'>
                <InventoryBarChartItem chartData={userData3} barChartText={"Daily Sales and their predictions for - With, Without Live Data"} />
            </div>
            
        </div>
    )
}

export default InventoryBarChart
