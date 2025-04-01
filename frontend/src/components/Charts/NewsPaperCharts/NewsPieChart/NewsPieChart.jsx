
import { useState } from 'react'
import './NewsPieChart.css'
import NewsPieChartItem from '../NewsPieChartItem/NewsPieChartItem.jsx'

 // Random colors

// ["#756432", "#ffaa00", "#323f4b", "#00ff00", "#020230"]
function NewsPieChart({ data }) {

    let slicedData = [];

    let newsData = [{
        Material: 'PUID1',
        Supplier: '',
        Distribution_Center: 'IB01',
        Quantity: '29800'
      },
      {
        Material: 'PUID2',
        Supplier: '',
        Distribution_Center: 'IB01',
        Quantity: '46780'
      }]


    newsData.map((row) => {
        slicedData.push({
            Product_ID: row.Material,
            Reorder_Quantity_Prediction_with_live_data: row.Quantity
        })
    })
    data.map((row) => {
        slicedData.push({
            Product_ID: row.Product_ID,
            Reorder_Quantity_Prediction_with_live_data: row.Reorder_Quantity_Prediction_with_live_data
        })
    })

    
    let backgroundColors1 = []
    let backgroundColors2 = []
    let borderColors = []

    slicedData.forEach(color => {
        backgroundColors1.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        backgroundColors2.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        borderColors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    })

    const bgColor1 = ["#3884a0","#3cec45","#f6bffb" ,"#83059a","#dc1450","#6afbc8","#561eee","#6adff2","#c94926","#49607c","#93ac78","#a3febb","#e3a2dc","#e2072a","#5cde47","#63132e","#5166c2","#9cd047"]

    const bgColors2 = [ "#167505", "#86ca03", "#51356d", "#aa59e7", "#fef291", "#dceb85","#ddcc5f","#171d13","#837d8e","#7382a7","#e09069","#a47da0","#773759","#60e6aa","#b0f2fe","#73e2b3"
    ]

    // const [userData1, setUserData1] = useState({
    //     // 
    //     labels: slicedData.map((data) => data.Product_ID),
    //     datasets: [{
    //         // label: "Sales Data",
    //         data: slicedData.map((data) => data.Reorder_Quantity_Prediction_with_live_data),
    //         backgroundColor: bgColor1,
    //         borderColor: "white",
    //         borderWidth: 1,
    //         hoverOffset: 30,
    //     },
    //     ]
    // })
    const [userData1, setUserData1] = useState({
        // 
        labels: data.map((data) => data.Distribution_Center_ID),
        datasets: [{
            // label: "Sales Data",
            data: data.map((data) => data.Predicted_NEWS_Paper_Demand_Quantity),
            backgroundColor: bgColor1,
            borderColor: "white",
            borderWidth: 1,
            hoverOffset: 30,
        },
        ]
    })

    return (
        <div className='news-pie-chart-container'>
            <div className="news-pie-chart">
                <NewsPieChartItem chartData={userData1} chartText={"Product IDs and its quantity of demand"} />
            </div>
        </div>
    )
}

export default NewsPieChart



