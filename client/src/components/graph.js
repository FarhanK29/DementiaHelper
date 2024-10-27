import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ScoresChart = ({ scores }) => {
  // Check if scores are available and structured correctly
  const scores1 = scores.score1 || [];
  const scores2 = scores.score2 || [];
  const scores3 = scores.score3 || [];
  
  // Check if all score arrays are empty
  if (scores1.length === 0 && scores2.length === 0 && scores3.length === 0) {
    return <div>No scores available to display.</div>;
  }

  // Create labels for each score entry
  const labels = Array.from({ length: Math.max(scores1.length, scores2.length, scores3.length) }, (_, i) => `Instance ${i + 1}`);

  // Chart configurations
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Reusable data configuration function for each score dataset
  const getChartData = (scoreData, label, color) => ({
    labels,
    datasets: [
      {
        label,
        data: scoreData,
        borderColor: color,
        fill: false,
        tension: 0.1,
      },
    ],
  });

  console.log(scores1)

  return (
    <div>
      <h2>Memory Score</h2>
      <Line data={getChartData(scores1, 'Memory Score', 'blue')} options={chartOptions} />

      <h2>Image Recognition Score</h2>
      <Line data={getChartData(scores2, 'Image Recognition Score', 'green')} options={chartOptions} />

      <h2>Family Recognition</h2>
      <Line data={getChartData(scores3, 'Score 3', 'red')} options={chartOptions} />
    </div>
  );
};

export default ScoresChart;
