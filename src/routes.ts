import { createBrowserRouter } from 'react-router';
import DashBoardPage from './page/DashBoardPage';
import AnalyticsPage from './page/AnalyticsPage';
import ResourcePage from './page/ResourcePage';
import CommunityPage from './page/CommunityPage';
import App from './App';
import { SecurePage } from './page/SecurePage';
import CyberSafetyQuiz from './component/survey/CyberSafetyQuiz';
import AssessmentResult from './component/assessment/AssessmentResult';
import AssessmentPage from './page/AssessmentPage';

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
        path: 'CyberSafetyQuiz',
        Component: CyberSafetyQuiz,
      },
      {
        path: 'AssessmentResult',
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
