import { Box, colors, Typography } from '@mui/material';
import { race_summary } from './VisualizationData';
import { Chart as ChartJS, Tooltip, Legend, ChartData, CategoryScale, LinearScale } from 'chart.js';
import { useEffect, useRef } from 'react';
import { TreemapController, TreemapDataPoint, TreemapElement } from 'chartjs-chart-treemap';

// Register the required components
ChartJS.register(TreemapController, TreemapElement, CategoryScale, LinearScale, Tooltip, Legend);

interface TreemapData {
  label: string;
  value: number;
  percentage: string;
}

export default function RaceDistributionChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    const cleanupChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };

    // Clean up any existing chart first
    cleanupChart();

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        try {
          const options = {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'bottom' as const,
                labels: {
                  boxWidth: 20,
                  padding: 15,
                  font: {
                    size: 12,
                  },
                  generateLabels: chart => {
                    const datasets = chart.data.datasets;
                    return datasets[0].tree.map((item, index) => {
                      const colors = [
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                      ];

                      return {
                        text: item.label,
                        fillStyle: colors[index % colors.length],
                        strokeStyle: '#fff',
                        lineWidth: 2,
                        hidden: false,
                        index: index,
                      };
                    });
                  },
                },
              },
              tooltip: {
                callbacks: {
                  title: items => {
                    return items[0].raw.g;
                  },
                  label: item => {
                    const data = item.raw;
                    return [`Count: ${data.v}`, `Percentage: ${(data.w * 0.1).toFixed(1)}%`];
                  },
                },
              },
            },
          };

          const data: ChartData<'treemap', TreemapDataPoint[]> = {
            datasets: [
              {
                type: 'treemap',
                data: [],
                tree: race_summary.map(item => ({
                  label: item.race,
                  value: item.count,
                  percentage: item.percentage,
                })),
                key: 'value',
                groups: ['label'],
                spacing: 0.5,
                borderWidth: 2,
                borderColor: '#fff',
                backgroundColor: ctx => {
                  const colors = [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                  ];
                  return colors[ctx.dataIndex % colors.length];
                },
              },
            ],
          };

          chartInstance.current = new ChartJS(ctx, {
            type: 'treemap',
            data,
            options,
          });
        } catch (error) {
          console.error('Error creating chart instance:', error);
          cleanupChart();
        }
      }
    }

    return () => {
      cleanupChart();
    };
  }, []);

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '80%', md: '70%' },
        height: { xs: '300px', sm: '400px', md: '500px' },
        // position: 'relative',
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
        Race Distribution
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <canvas ref={chartRef} />
      </Box>
    </Box>
  );
}
