
import { useState } from 'react'
import './InventoryPieChart.css'
import InventoryPieChartItem from '../InventoryPieChartItem/InventoryPieChartItem.jsx'

 // Random colors

// ["#756432", "#ffaa00", "#323f4b", "#00ff00", "#020230"]
function InventoryPieChart({ data }) {

    const slicedData = data.slice(1,11)
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

    const [userData1, setUserData1] = useState({
        // 
        labels: slicedData.map((data) => data.Product_Name),
        datasets: [{
            // label: "Sales Data",
            data: slicedData.map((data) => data.Order_Fulfillment_Time_in_days),
            backgroundColor: bgColor1,
            borderColor: "white",
            borderWidth: 1,
            hoverOffset: 30,
        },
        {
            // label: "Sales Data",
            data: slicedData.map((data) => data.Historical_Monthly_Sales),
            backgroundColor: bgColors2,
            borderColor: "white",
            borderWidth: 1,
            hoverOffset: 30
        }
        ]
    })

    // const [userData2, setUserData2] = useState({
    //     // 
    //     labels: slicedData.map((data) => data.Product_Name),
    //     datasets: [{
    //         // label: "Sales Data",
    //         data: slicedData.map((data) => data.Historical_Monthly_Sales),
    //         backgroundColor: backgroundColors2,
    //         borderColor: backgroundColors2,
    //         borderWidth: 1,
    //         hoverOffset: 30
    //     }
    //     ]
    // })

    // console.log()

    return (
        <div className='pie-chart-container'>
            
            <div className="p-chart">
                <InventoryPieChartItem chartData={userData1} chartText={"Product Name and its Lead times in Days & Historical Sales"} />
            </div>
            {/* <div className="p-chart">
                <InventoryPieChartItem chartData={userData2} chartText={"Product Name and its Historical Monthly Sales"} />
            </div> */}
        </div>
    )
}

export default InventoryPieChart


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
