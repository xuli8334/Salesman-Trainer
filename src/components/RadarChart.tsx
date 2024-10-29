import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  scores: {
    score1: number;
    score2: number;
    score3: number;
    score4: number;
  };
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  const data = {
    labels: ['Communication', 'Problem Solving', 'Product Knowledge', 'Customer Focus'],
    datasets: [
      {
        label: 'Performance Scores',
        data: [scores.score1, scores.score2, scores.score3, scores.score4],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
    },
  };

  return <Radar data={data} options={options} />;
};