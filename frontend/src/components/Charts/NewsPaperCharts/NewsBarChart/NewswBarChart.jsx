
import { useState } from 'react'
import './NewsBarChart.css'
import NewsBarChartItem from './../NewsBarChartItem/NewsBarChartItem.jsx'
// import { usersData } from "./Data.jsx"

// Bluish green: #009E73
// Yellow: #F0E442
// Blue: #0072B2
// Vermilion: #D55E00
// Dark pink: #801650
// Orange: #F46A25
// Dark grey: #3D3D3D
// Light purple: #A285D1

function NewsBarChart({ barChartText, barChartData, labelsData, data }) {

    const slicedData = data.slice(0,11)

    const [userData1, setUserData1] = useState({
        labels: slicedData.map((data) => data.Product_Name),
        datasets: [{
            label: "Historical Monthly Sales",
            data: slicedData.map((data) => data.Historical_Monthly_Sales),
            backgroundColor: ["#009E73"],
        }, {
            label: "Monthly Sales Prediction Without Live Data",
            data: slicedData.map((data) => data.Monthly_Sales_Prediction_without_live_data),
            backgroundColor: ["#F0E442"]
        }, {
            label: "Monthly Sales Prediction With Live Data",
            data: slicedData.map((data) => data.Monthly_Sales_Prediction_with_live_data),
            backgroundColor: ["#D55E00"]
        }
        
        ]
    })

    const [userData2, setUserData2] = useState({
        labels: data.map((data) => data.Distribution_Center_ID),
        datasets: [{
            label: "Historical NEWS Paper Demand",
            data: data.map((data) => data.Historical_News_Paper_Demand),
            backgroundColor: ["#0072B2"],
        }, {
            label: "Predicted NEWS Paper Demand",
            data: data.map((data) => data.Predicted_NEWS_Paper_Demand_Quantity),
            backgroundColor: ["#801650"]
        }, 
        ]
    })

    const [userData3, setUserData3] = useState({
        labels: data.map((data) => `${data.Distribution_Center_ID} (${data.Predicted_NEWS_Paper_Demand_Quantity})`),
        datasets: [{
            label: "Reams of Paper",
            data: data.map((data) => data.Predicted_Reams_Of_Paper),
            backgroundColor: ["#A285D1"],
        }, {
            label: "Ink in Liters",
            data: data.map((data) => data.Ink_required_Predicted_liters),
            backgroundColor: ["#F0E442"]
        },
        // {
        //     label: "Predicted Ink in Liters",
        //     data: data.map((data) => data.Predicted_NEWS_Paper_Demand_Quantity),
        //     backgroundColor: ["#F0E0A0"]
        // }
        ]
    })

    // Daily_Sales_Prediction_without_live_data

    return (
        <div className='news-bar-chart-container'>
            <div className='news-b-chart'>
                <NewsBarChartItem chartData={userData2} barChartText={"Historical & Predicted News Paper Quantity of Demand"} />
            </div>
            {/* <div className='b-chart'>
                <InventoryBarChartItem chartData={userData1} barChartText={"Monthly Sales and their predictions for - With, Without Live Data"} />
            </div> */}
            <div className='news-b-chart'>
                <NewsBarChartItem chartData={userData3} barChartText={"Predicted Reams of Paper and Ink in Liters"} />
            </div>
        </div>
    )
}

export default NewsBarChart
