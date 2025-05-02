import { createBrowserRouter } from 'react-router';
import DashBoardPage from './page/DashBoardPage';
import AnalyticsPage from './page/AnalyticsPage';
import ResourcePage from './page/ResourcePage';
import CommunityPage from './page/CommunityPage';
import App from './App';
import { SecurePage } from './page/SecurePage';
import CyberSafetyQuiz from './page/CyberSafetyQuizPage';
import AssessmentResult from './page/AssessmentResultPage';
import AssessmentPage from './page/AssessmentPage';
import ComingSoonPage from './page/ComingSoonPage';

export const router = createBrowserRouter([
  {
    path: '/secure',
    Component: SecurePage,
  },
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: DashBoardPage,
      },
      {
        path: 'assessment',
        Component: AssessmentPage,
      },
      {
        path: 'analytics',
        Component: AnalyticsPage,
      },
      {
        path: 'resources',
        Component: ResourcePage,
      },
      {
        path: 'community',
        Component: CommunityPage,
      },
      {
        path: 'coming-soon',
        Component: ComingSoonPage,
      },
      {
        path: 'cyber-safety-quiz',
        Component: CyberSafetyQuiz,
      },
      {
        path: 'assessment-result',
        Component: AssessmentResult,
      },
    ],
  },
]);

type routesArray = {
  path: string;
  name: string;
  children?: routesArray[];
};

export const routes: routesArray[] = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/assessment',
    name: 'Assessment',
  },
  {
    path: '/analytics',
    name: 'Analytics',
  },
  {
    path: '/resources',
    name: 'Scenario quiz',
  },
  {
    path: '/community',
    name: 'Resources & Community',
  },
];
