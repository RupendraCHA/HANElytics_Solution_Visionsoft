
import { useState } from 'react'
import './ClinicalBarChart.css'
import ClinicalBarChartItem from './../ClinicalBarChartItem/ClinicalBarChartItem.jsx'
// import { usersData } from "./Data.jsx"

// Bluish green: #009E73
// Yellow: #F0E442
// Blue: #0072B2
// Vermilion: #D55E00
// Dark pink: #801650
// Orange: #F46A25
// Dark grey: #3D3D3D
// Light purple: #A285D1

function ClinicalBarChart({ data }) {

    const [userData1, setUserData1] = useState({
        labels: data.slice(0,21).map((data) => data.Medication_Name),
        datasets: [
        {
            label: "Historical Sales",
            data: data.slice(0,21).map((data) => data.Historical_Sales),
            backgroundColor: ["#D55E00"],
        },
        {
            label: "Predicted Sales",
            data: data.slice(0,21).map((data) => data.Predicted_Sales),
            backgroundColor: ["#3D3D3D"],
        }
        ]
    })

    const [userData2, setUserData2] = useState({
        labels: data.slice(0,21).map((data) => data.Medication_Name),
        datasets: [
        {
            label: "Safety Stock",
            data: data.slice(0,21).map((data) => data.Safety_Stock),
            backgroundColor: ["#801650"],
        },
        {
            label: "Reorder Point Quantity",
            data: data.slice(0,21).map((data) => data.Reorder_Point_Quantity),
            backgroundColor: ["#A285D1"],
        }
        ]
    })


    // Daily_Sales_Prediction_without_live_data

    return (
        <div className='bar-chart-container'>
            
            <div className='b-chart'>
                <ClinicalBarChartItem chartData={userData2} barChartText={"Medication Name and their Safety Stocks with Reorder Point Quantity"} />
            </div>
            <div className='b-chart'>
                <ClinicalBarChartItem chartData={userData1} barChartText={"Medication Name and their Historical, Predicted Sales"} />
            </div>
        </div>
    )
}

export default ClinicalBarChart
