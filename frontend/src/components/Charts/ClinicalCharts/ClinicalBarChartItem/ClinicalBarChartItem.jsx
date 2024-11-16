import React from 'react'

import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js/auto"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const ClinicalBarChartItem = ({ chartData, barChartText }) => {
    
    const options = {
        responsive: true,
        scales: {
                    x: {
                    ticks: {
                        color: 'black',
                        font: {size: 12, weight: 600} // Change x-axis label color
                    },
                    grid: {
                        color: 'yellow' // Change x-axis grid line color
                    }
                    },
                    y: {
                    ticks: {
                        color: 'black',
                        font: {size: 12, weight: 600} // Change y-axis label color
                    },
                    grid: {
                        color: 'yellow' // Change y-axis grid line color
                    }
                    },
                },
        plugins: {
            legend: {
                position: "bottom",
                labels:{
                    color: "black",
                    font: {size: 12, weight: 600}
                }
            },
            title: {
                display: true,
                text: `${barChartText}`,
                color: "black",
                font: {size: 16, weight: 700}
            }
        }
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <Bar width={1000} height={400} options={options} data={chartData}>
                    Bar Chart
                </Bar>
            </div>
        </div>
    )
}

export default ClinicalBarChartItem
