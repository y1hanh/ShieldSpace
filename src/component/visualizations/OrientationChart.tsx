import { Box, Typography } from '@mui/material';
import { orientation_summary } from './VisualizationData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function OrientationChart() {
  const data = {
    labels: orientation_summary.map(item => item.orientation),
    datasets: [
      {
        label: 'Count',
        data: orientation_summary.map(item => item.count),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        fill: true,
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
        text: 'Sexual Orientation Distribution',
        font: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Orientation',
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
      <Typography
        variant="h6"
        sx={{
          color: '#4B3F72',
          fontWeight: 'bold',
          marginBottom: 2,
          textAlign: 'center',
          fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
        }}
      >
        Sexual Orientation Distribution
      </Typography>
      <Line data={data} options={options} />
    </Box>
  );
}
