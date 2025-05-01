import { Box } from '@mui/material';
import RaceDistributionChart from '../component/visualizations/RaceDistributionChart';
import OrientationChart from '../component/visualizations/OrientationChart';
import ReligionBarChart from '../component/visualizations/ReligionBarChart';
import MiscellaneousStack from '../component/visualizations/MiscellaneousStack';
import AgeChart from '../component/visualizations/AgeChart';
import LazyLoadComponent from '../component/assessment/LazyLoadComponent';
import BentoLayout from '../component/layout/BentoLayout';
import {
  // age_summary,
  race_summary,
  orientation_summary,
  religion_summary,
  miscellaneous_summary,
} from '../component/visualizations/VisualizationData';

export default function AnalyticsPage() {
  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
        }}
      >
        <Box sx={{ flex: '1 1 45%', minWidth: '300px', height: '100%' }}>
          <BentoLayout
            title="Race Distribution"
            description="Distribution of cyberbullying cases across different racial groups"
            stats={[
              {
                label: 'Total Cases',
                value: race_summary.reduce((sum, item) => sum + item.count, 0),
              },
              {
                label: 'Most Common',
                value: race_summary.reduce((max, item) => (item.count > max.count ? item : max))
                  .race,
              },
            ]}
          >
            <LazyLoadComponent>
              <RaceDistributionChart />
            </LazyLoadComponent>
          </BentoLayout>
        </Box>

        <Box sx={{ flex: '1 1 45%', minWidth: '300px', height: '100%' }}>
          <BentoLayout
            title="Sexual Orientation"
            description="Distribution of cyberbullying cases by sexual orientation"
            stats={[
              {
                label: 'Total Cases',
                value: orientation_summary.reduce((sum, item) => sum + item.count, 0),
              },
              {
                label: 'Most Common',
                value: orientation_summary.reduce((max, item) =>
                  item.count > max.count ? item : max
                ).orientation,
              },
            ]}
          >
            <LazyLoadComponent>
              <OrientationChart />
            </LazyLoadComponent>
          </BentoLayout>
        </Box>

        <Box sx={{ flex: '1 1 45%', minWidth: '300px', height: '100%' }}>
          <BentoLayout
            title="Religion Distribution"
            description="Distribution of cyberbullying cases across different religions"
            stats={[
              {
                label: 'Total Cases',
                value: religion_summary.reduce((sum, item) => sum + item.count, 0),
              },
              {
                label: 'Most Targeted',
                value: religion_summary.reduce((max, item) => (item.count > max.count ? item : max))
                  .religion,
              },
            ]}
          >
            <LazyLoadComponent>
              <ReligionBarChart />
            </LazyLoadComponent>
          </BentoLayout>
        </Box>

        <Box sx={{ flex: '1 1 45%', minWidth: '300px', height: '100%' }}>
          <BentoLayout
            title="Miscellaneous Categories"
            description="Distribution of cyberbullying cases in other categories"
            stats={[
              {
                label: 'Total Cases',
                value: miscellaneous_summary.reduce((sum, item) => sum + item.count, 0),
              },
              {
                label: 'Categories',
                value: new Set(miscellaneous_summary.map(item => item.category)).size,
              },
            ]}
          >
            <LazyLoadComponent>
              <MiscellaneousStack />
            </LazyLoadComponent>
          </BentoLayout>
        </Box>

        {/* <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
          <LazyLoadComponent>
            <BentoLayout
              title="Age Distribution"
              description="Distribution of cases across different age groups"
              stats={[
                {
                  label: 'Total Cases',
                  value: age_summary.reduce((sum, item) => sum + item.count, 0),
                },
                {
                  label: 'Average Age',
                  value: Math.round(
                    age_summary.reduce((sum, item) => sum + item.age * item.count, 0) /
                      age_summary.reduce((sum, item) => sum + item.count, 0)
                  ),
                },
              ]}
            >
              <AgeChart />
            </BentoLayout>
          </LazyLoadComponent>
        </Box> */}
      </Box>
    </Box>
  );
}
