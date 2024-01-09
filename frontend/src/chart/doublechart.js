import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DBarChart = ({ data }) => { // Renamed to start with an uppercase letter
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.category),
                datasets: [
                    {
                        label: '남성', // Male
                        data: data.map(item => item.valueMale),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '여성', // Female
                        data: data.map(item => item.valueFemale),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        chartInstanceRef.current = newChartInstance;

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={canvasRef} height="230px" />;
};

export default DBarChart;
