import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ScoresChart = (props) => {
  // JSON data for demonstration purposes
  const data = {
    patientId: "12345",
    scores: [
      { score1: 0, score2: 78, score3: 92 },
      { score1: 88, score2: 81, score3: 90 },
      { score1: 80, score2: 76, score3: 88 },
      { score1: 82, score2: 79, score3: 91 },
      { score1: 87, score2: 83, score3: 89 },
    ]
  };

  // Extract score arrays from data
  const scores1 = data.scores.map((entry) => entry.score1);
  const scores2 = data.scores.map((entry) => entry.score2);
  const scores3 = data.scores.map((entry) => entry.score3);
  const labels = Array.from({ length: scores1.length }, (_, i) => `Instance ${i + 1}`);

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

  return (
    <div>
      <h2>Score 1</h2>
      <Line data={getChartData(scores1, 'Score 1', 'blue')} options={chartOptions} />

      <h2>Score 2</h2>
      <Line data={getChartData(scores2, 'Score 2', 'green')} options={chartOptions} />

      <h2>Score 3</h2>
      <Line data={getChartData(scores3, 'Score 3', 'red')} options={chartOptions} />
    </div>
  );
};

export default ScoresChart;