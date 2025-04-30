import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { religion_summary } from './VisualizationData';
import { Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReligionBarChart() {
  // Get unique religions from the data
  const religions = Array.from(new Set(religion_summary.map(item => item.religion)));

  // Transform data for stacked bar chart
  const data = {
    labels: religions,
    datasets: [
      {
        label: 'Hate Speech',
        data: religions.map(religion => {
          const item = religion_summary.find(
            r => r.religion === religion && r.label === 'hatespeech'
          );
          return item ? item.count : 0;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
      {
        label: 'Offensive',
        data: religions.map(religion => {
          const item = religion_summary.find(
            r => r.religion === religion && r.label === 'offensive'
          );
          return item ? item.count : 0;
        }),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Religion Distribution by Label',
      },
    },
    scales: {
      x: {
        // Removed stacked: true to show side-by-side bars
      },
      y: {
        // Removed stacked: true to show side-by-side bars
      },
    },
  };

  return (
    <Box style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center' }}>
      <Bar data={data} options={options} />
    </Box>
  );
}
