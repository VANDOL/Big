<<<<<<< HEAD
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, options }) => {
    return <Pie data={data} options={options} />;
};

export default PieChart;
=======
// PieChart.js

import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
    const canvasRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Clear the instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        // Ensure the canvas and data are available
        if (canvasRef.current && data && data.length) {
            const ctx = canvasRef.current.getContext('2d');

            // Assigning chart instance to ref
            chartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: data.map(d => d.category),
                    datasets: [{
                        label: 'Store Types',
                        data: data.map(d => d.value),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                            // ... more colors as needed
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                            // ... more colors as needed
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false
                }
            });
        }
    }, [data]); // Re-render chart if data changes

    return <canvas ref={canvasRef}></canvas>;
};

export default PieChart;
>>>>>>> see
