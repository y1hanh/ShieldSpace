import { createBrowserRouter } from 'react-router';
import DashBoardPage from './page/DashBoardPage';
import GamePage from './page/GamePage';
import AnalyticsPage from './page/AnalyticsPage';
import ResourcePage from './page/ResourcePage';
import CommunityPage from './page/CommunityPage';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';
import App from './App';
import AssessmentPage from './page/AssessmentPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: DashBoardPage,
      },
      {
        path: 'game',
        Component: GamePage,
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
        path: 'assessment',
        Component: AssessmentPage,
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
      {
        path: 'login',
        Component: LoginPage,
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
    name: 'Dashboard',
  },
  {
    path: '/game',
    name: 'Games',
  },
  {
    path: '/analytics',
    name: 'Analytics',
  },
  {
    path: '/resources',
    name: 'Resources',
  },
  {
    path: '/community',
    name: 'Community',
  },
  {
    path: '/assessment',
    name: 'Assessment',
  },
  {
    path: '#',
    name: 'Account',
    children: [
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/register',
        name: 'Register',
      },
    ],
  },
];
