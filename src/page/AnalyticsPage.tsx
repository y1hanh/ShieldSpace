import { Box } from '@mui/material';
import RaceDistributionChart from '../component/visualizations/RaceDistributionChart';
import OrientationChart from '../component/visualizations/OrientationChart';
import ReligionBarChart from '../component/visualizations/ReligionBarChart';
import MiscellaneousStack from '../component/visualizations/MiscellaneousStack';
import AnalyticsStoryTelling from '../component/visualizations/AnalyticsStoryTelling';
import LazyLoadComponent from '../component/LazyLoadComponent';
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
      <AnalyticsStoryTelling />
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
            title="Why are they being mean to me?"
            description="More than 5,700 people were bullied online because of their race — and most of them were from African backgrounds.
"
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
            title="Being Yourself Shouldn’t Be A Problem"
            description="People got bullied just for who they love. Guess who got it the worst? Homosexual people — they were targeted over 1,700 times."
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
            title="What You Believe Is Yours Alone"
            description="Do you believe in something? A religion? A way of life?
Some people were bullied online just because of their faith."
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
            title="The Quiet Ones Get Hurt Too"
            description="Not all bullying makes big noise. Sometimes it happens to people who already feel left out."
            stats={[
              {
                label: 'Total Cases',
                value: miscellaneous_summary.reduce((sum, item) => sum + item.count, 0),
              },
              {
                label: 'Most Targeted',
                value: 'Minority Groups',
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
