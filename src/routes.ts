import { createBrowserRouter } from 'react-router';
import DashBoardPage from './page/DashBoardPage';
import AnalyticsPage from './page/AnalyticsPage';
import ResourcePage from './page/ResourcePage';
import CommunityPage from './page/CommunityPage';
import App from './App';
import { SecurePage } from './page/SecurePage';
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
      // {
      //   path: 'game',
      //   Component: GamePage,
      // },
      {
        path: 'analytics',
        Component: AnalyticsPage,
      },
      {
        path: 'resources',
        Component: ResourcePage,
      },
      {
        path: 'assessment',
        Component: AssessmentPage,
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
    name: 'Resources',
  },
  // {
  //   path: '/community',
  //   name: 'Community',
  // },
  // {
  //   path: '#',
  //   name: 'Account',
  //   children: [
  //     {
  //       path: '/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/register',
  //       name: 'Register',
  //     },
  //   ],
  // },
];
