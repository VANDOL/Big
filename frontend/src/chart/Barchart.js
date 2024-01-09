import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null); // 차트 인스턴스를 저장하기 위한 ref

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        // 기존 차트가 있으면 파괴
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // 새 차트 인스턴스 생성
        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.category),
                datasets: [{
                    label: 'Sales',
                    data: data.map(item => item.value),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', // 빨간색
                        'rgba(54, 162, 235, 0.2)', // 파란색
                        'rgba(255, 206, 86, 0.2)', // 노란색
                        'rgba(75, 192, 192, 0.2)', // 청록색
                        'rgba(153, 102, 255, 0.2)', // 보라색
                        'rgba(255, 159, 64, 0.2)',  // 주황색
                        'rgba(199, 199, 199, 0.2)', // 회색
                        'rgba(83, 102, 255, 0.2)',  // 짙은 파란색
                        'rgba(40, 159, 64, 0.2)',   // 녹색
                        'rgba(210, 99, 132, 0.2)',  // 분홍색
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)', // 빨간색
                        'rgba(54, 162, 235, 1)', // 파란색
                        'rgba(255, 206, 86, 1)', // 노란색
                        'rgba(75, 192, 192, 1)', // 청록색
                        'rgba(153, 102, 255, 1)', // 보라색
                        'rgba(255, 159, 64, 1)',  // 주황색
                        'rgba(159, 159, 159, 1)', // 회색
                        'rgba(83, 102, 255, 1)',  // 짙은 파란색
                        'rgba(40, 159, 64, 1)',   // 녹색
                        'rgba(210, 99, 132, 1)',  // 분홍색
                    ],
                    
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: false
                    }
                },
                animation: {
                    duration: 0
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

export default BarChart;