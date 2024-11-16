import React from 'react'

import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Colors } from "chart.js/auto"

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)

const ClinicalPieChartItem = ({ chartData, chartText, cutout }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font:{size:12, weight:600, family:"Roboto"},
                    color: "black",
                }
            },
            title: {
                position: "top",
                display: true,
                text: `${chartText}`,
                color: "black",
                font:{size:18, family:"Roboto", weight:700},
            }
        },
        cutout: cutout
    }

    return (

        <div className="row">
            <div className="col-12">
                <Pie width={700} height={300} options={options} data={chartData}>
                    Pie Chart
                </Pie>
            </div>
        </div>
    )
}

export default ClinicalPieChartItem
