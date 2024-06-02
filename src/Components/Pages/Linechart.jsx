import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
    const data = {
        labels: ['2023-12-31', '2024-2-3', '2024-2-4', '2024-3-4', '2024-3-31'],
        datasets: [
            {
                label: 'Sale Amount',
                data: [3000, 4000, 20000, 2000, 15000],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'YYYY-MM-DD'
                    }
                }
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            <h2>Line Chart</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
