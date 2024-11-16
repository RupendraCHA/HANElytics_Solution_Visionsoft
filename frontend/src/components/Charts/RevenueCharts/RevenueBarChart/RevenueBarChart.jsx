
import { useState } from 'react'
import './RevenueBarChart.css'
import RevenueBarChartItem from './../RevenueBarChartItem/RevenueBarChartItem.jsx'
// import { usersData } from "./Data.jsx"

// Bluish green: #009E73
// Yellow: #F0E442
// Blue: #0072B2
// Vermilion: #D55E00
// Dark pink: #801650
// Orange: #F46A25
// Dark grey: #3D3D3D
// Light purple: #A285D1

function RevenueBarChart({ data }) {

    const [userData1, setUserData1] = useState({
        labels: data.slice(0,21).map((data) => data.Item_SKU),
        datasets: [{
            label: "Revenue Prediction for 90 days",
            data: data.slice(0,21).map((data) => data.Predicted_Revenue_for_Upcoming_90_Days),
            backgroundColor: ["#009E73"],
        }
        
        ]
    })

    const [userData2, setUserData2] = useState({
        labels: data.slice(0,21).map((data) => data.Item_SKU),
        datasets: [{
            label: "Revenue Reporting Week",
            data: data.slice(0,21).map((data) => data.Revenue_Reporting_Week),
            backgroundColor: ["#A285D1"],
        }
        
        ]
    })

    // Daily_Sales_Prediction_without_live_data

    return (
        <div className='bar-chart-container'>
            <div className='b-chart'>
                <RevenueBarChartItem chartData={userData2} barChartText={"Product ID and its Revenue Reporting Week"} />
            </div>
            <div className='b-chart'>
                <RevenueBarChartItem chartData={userData1} barChartText={"Product ID and their Revenue Prediction amount"} />
            </div>
        </div>
    )
}

export default RevenueBarChart
