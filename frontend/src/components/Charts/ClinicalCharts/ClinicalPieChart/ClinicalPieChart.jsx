
import { useState } from 'react'
import './ClinicalPieChart.css'
import ClinicalPieChartItem from '../ClinicalPieChartItem/ClinicalPieChartItem.jsx'

 // Random colors

// ["#756432", "#ffaa00", "#323f4b", "#00ff00", "#020230"]
function ClinicalPieChart({ data }) {

    const slicedData = data.slice(0,21)
    let backgroundColors1 = []
    let backgroundColors2 = []
    let borderColors = []

    let clinicalData = []

    let indices = [0, 47, 82, 126, 165, 207, 251, 293, 331, 378, 434, 481, 515, 562, 602, 639, 684, 720, 762, 800]

    indices.map((number) => {
        clinicalData.push(data[number])
    })

    // console.log(clinicalData)

    const bgColor1 = ["#3884a0","#3cec45","#f6bffb","#c075d" ,"#21f244","#83059a","#dc1450","#6afbc8","#561eee","#6adff2","#c94926","#49607c","#93ac78","#a3febb","#e3a2dc","#e2072a","#5cde47","#63132e","#5166c2","#9cd047"]

    const bgColors2 = [ "#c4f1ba", "#bbee0a", "#4cb7f1", "#d0c691", "#167505", "#86ca03", "#51356d", "#aa59e7", "#fef291", "#dceb85","#ddcc5f","#171d13","#837d8e","#7382a7","#e09069","#a47da0","#773759","#60e6aa","#b0f2fe","#73e2b3"
    ]

    clinicalData.forEach(color => {
        backgroundColors1.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        backgroundColors2.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        borderColors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    })

    const [userData1, setUserData1] = useState({
        // 
        labels : clinicalData.map((data) => data.Distribution_Center_ID),
        datasets: [{
            // label "Sales Data",
            data: clinicalData.map((data) => data.Historical_Sales),
            backgroundColor: backgroundColors1,
            borderColor: backgroundColors1,
            borderWidth: 1,
            hoverOffset: 30,
        }
        ]
    })

    // console.log(backgroundColors1)
    // console.log(backgroundColors2)

    const [userData2, setUserData2] = useState({
        // 
        labels: clinicalData.map((data) => data.Distribution_Center_Name),
        datasets: [{
            // label "Sales Data",
            data: clinicalData.map((data) => data.Historical_Sales),
            backgroundColor: bgColor1,
            borderColor: "white",
            borderWidth: 1,
            hoverOffset: 30
        },
        {
            // label "Sales Data",
            data: clinicalData.map((data) => data.Predicted_Sales),
            backgroundColor: bgColor1,
            borderColor: "white",
            borderWidth: 1,
            hoverOffset: 30,
            margin: 2
        }
        ]
    })

    // console.log()

    return (
        <div className='pie-chart-container'>
            
            {/* <div className="p-chart">
                <ClinicalPieChartItem chartData={userData1} chartText={"Distribution Center ID and Respective Historical Sales"} cutout={""}/>
            </div> */}
            <div className="p-chart">
                <ClinicalPieChartItem chartData={userData2} chartText={"Distribution Center Name and their Historical Sales, Predicted Sales"} cutout={"10%"}/>
            </div>
        </div>
    )
}

export default ClinicalPieChart


