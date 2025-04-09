// PieChart.tsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { getCountBullyingData } from '../api';
import { isEmpty } from 'lodash';
import { Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DataItem {
  label: string;
  'count(label)': number;
}

export function CountBullyingDiagram() {
  const [data, setData] = useState<DataItem[]>([]);

  async function fetchData() {
    const res = await getCountBullyingData();
    if (res) {
      setData(res);
    }
  }

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Counts',
        data: data.map(item => item['count(label)']),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
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
        text: 'Pie Chart of Category Counts',
      },
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: '2rem',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '70%', height: '50%' }}>
        {isEmpty(data) ? <Box>Loading....</Box> : <Pie data={chartData} options={options} />}
      </Box>
    </Box>
  );
}
