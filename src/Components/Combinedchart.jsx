import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library

const CombinedChart = () => {
    useEffect(() => {
        // Get the canvas element
        var canvas = document.getElementById('combinedChart');
        if (!canvas) return; // Ensure the canvas element exists

        var ctx = canvas.getContext('2d'); // Define the context
        if (!ctx) return; // Ensure the context is valid

        // Check if a chart instance already exists
        if (window.combinedChart instanceof Chart) {
            // If a chart instance exists, destroy it before creating a new one
            window.combinedChart.destroy();
        }

        // Dataset of shoe prices
        var barData = [16000, 20000, 6000, 4000, 10000];
        var lineData = [16000, 20000, 6000, 4000, 10000];

        // Create the combined chart
        window.combinedChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Nike', 'Air Jordans', 'Adidas', 'Puma', 'Woodland'],
                datasets: [{
                    label: 'Customer Purchases (Bar)',
                    data: barData,
                    backgroundColor: 'rgba(112, 112, 160, 0.65)', // Bar color
                    borderWidth: 1
                }, {
                    label: 'Sales (Line)',
                    data: lineData,
                    fill: false,
                    borderColor: 'rgba(0, 71, 144, 1)', // Line color
                    borderWidth: 2,
                    type: 'line'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }, []); // Empty dependency array ensures this effect runs only once after initial render

    return <canvas id="combinedChart" width="1000" height="400" className='mb-0'></canvas>;
};

export default CombinedChart;
