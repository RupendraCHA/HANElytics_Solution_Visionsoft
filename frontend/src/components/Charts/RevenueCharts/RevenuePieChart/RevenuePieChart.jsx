
import { useState } from 'react'
import './RevenuePieChart.css'
import RevenuePieChartItem from '../RevenuePieChartItem/RevenuePieChartItem.jsx'

 // Random colors

// ["#756432", "#ffaa00", "#323f4b", "#00ff00", "#020230"]
function RevenuePieChart({ data }) {

    const slicedData = data.slice(0,21)
    let backgroundColors1 = []
    let backgroundColors2 = []
    let borderColors = []

    slicedData.forEach(color => {
        backgroundColors1.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        backgroundColors2.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        borderColors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    })

    const bgColor1 = ["#785532","#43ecab","#3cec45","#f6bffb","#c075d" ,"#21f244","#83059a","#dc1450","#6afbc8","#561eee","#6adff2","#c94926","#49607c","#93ac78","#a3febb","#e3a2dc","#e2072a","#5cde47","#63132e","#5166c2","#9cd047"]

    const bgColors2 = [ "#c4f1ba", "#bbee0a", "#4cb7f1", "#d0c691", "#167505", "#86ca03", "#51356d", "#aa59e7", "#fef291", "#dceb85","#ddcc5f","#171d13","#837d8e","#7382a7","#e09069","#a47da0","#773759","#60e6aa","#b0f2fe","#73e2b3"
    ]

    const [userData1, setUserData1] = useState({
        // 
        labels: slicedData.map((data) => data.Item_SKU),
        datasets: [{
            // label: "Sales Data",
            data: slicedData.map((data) => data.Predicted_Revenue_for_Upcoming_90_Days),
            backgroundColor: bgColor1,
            borderColor: "white",
            borderWidth: 1,
            hoverOffset: 30,
        }
        ]
    })

    const [userData2, setUserData2] = useState({
        // 
        labels: slicedData.map((data) => data.Item_SKU),
        datasets: [{
            // label: "Sales Data",
            data: slicedData.map((data) => data.Predicted_Revenue_for_Upcoming_90_Days),
            backgroundColor: backgroundColors2,
            borderColor: backgroundColors2,
            borderWidth: 1,
            hoverOffset: 30
        }
        ]
    })

    // console.log()

    return (
        <div className='pie-chart-container'>
            
            <div className="p-chart">
                <RevenuePieChartItem chartData={userData1} chartText={"Product ID and Its Revenue Prediction"} />
            </div>
            {/* <div className="p-chart">
                <RevenuePieChartItem chartData={userData2} chartText={"Product Name and its Historical Monthly Sales"} />
            </div> */}
        </div>
    )
}

export default RevenuePieChart


// {
//     label: "Safety Stock",
//     data: usersData.map((data) => data.safetyStock),
//     backgroundColor: ["#000", "#fff", "#aaa", "#55852c", "#14c49e", "#07de2b", "#086acc", "#810fab"],
//     borderColor: "white",
//     borderWidth: 1
// }, {
//     label: "Reorder Point Quantity",
//     data: usersData.map((data) => data.reorderPointQuantity),
//     backgroundColor: ["#fcba03", "#8c8a54", "#0c04b0", "#55852c", "#14c49e", "#07de2b", "#086acc", "#810fab"],
//     borderColor: "white",
//     borderWidth: 1
// }
