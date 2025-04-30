import { Box, Typography } from '@mui/material';
import { miscellaneous_summary } from './VisualizationData';
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MiscellaneousStack() {
  // Get unique categories from the data
  const categories = Array.from(new Set(miscellaneous_summary.map(item => item.category)));

  // Transform data for stacked bar chart
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Hate Speech',
        data: categories.map(category => {
          const item = miscellaneous_summary.find(
            r => r.category === category && r.label === 'hatespeech'
          );
          return item ? item.count : 0;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
      {
        label: 'Offensive',
        data: categories.map(category => {
          const item = miscellaneous_summary.find(
            r => r.category === category && r.label === 'offensive'
          );
          return item ? item.count : 0;
        }),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Miscellaneous Categories Distribution',
        font: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Category',
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '80%', md: '70%' },
        height: { xs: '300px', sm: '400px', md: '500px' },
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Bar data={data} options={options} />
    </Box>
  );
}
