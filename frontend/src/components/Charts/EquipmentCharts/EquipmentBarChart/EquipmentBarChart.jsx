
import { useState } from 'react'
import './EquipmentBarChart.css'
import EquipmentBarChartItem from './../EquipmentBarChartItem/EquipmentBarChartItem.jsx'
// import { usersData } from "./Data.jsx"

// Bluish green: #009E73
// Yellow: #F0E442
// Blue: #0072B2
// Vermilion: #D55E00
// Dark pink: #801650
// Orange: #F46A25
// Dark grey: #3D3D3D
// Light purple: #A285D1

function EquipmentBarChart({ data }) {

    const [userData1, setUserData1] = useState({
        labels: data.slice(0,21).map((data) => data.Equipment_Serial_Number),
        datasets: [{
            label: "Historical Breakdown of Equipment Failure (in cycles)",
            data: data.slice(0,21).map((data) => data.Historical_Breakdown_of_Equipment_Failure),
            backgroundColor: ["#D55E00"],
        },
        {
            label: "Predicted Equipment Breakdown of Failure (in cycles)",
            data: data.slice(0,21).map((data) => data.Predicted_Equipment_Breakdown_of_Failure),
            backgroundColor: ["#A285D1"],
        }
        ]
    })


    // Daily_Sales_Prediction_without_live_data

    return (
        <div className='bar-chart-container'>
            <div className='b-chart'>
                <EquipmentBarChartItem chartData={userData1} barChartText={"Product ID and their Revenue Prediction amount"} />
            </div>
        </div>
    )
}

export default EquipmentBarChart
