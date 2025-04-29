import { createBrowserRouter } from 'react-router';
import DashBoardPage from './page/DashBoardPage';
import AnalyticsPage from './page/AnalyticsPage';
import ResourcePage from './page/ResourcePage';
import CommunityPage from './page/CommunityPage';
import App from './App';
import { SecurePage } from './page/SecurePage';
import ScenarioBasedQuiz from './component/scenario/ScenarioBasedQuiz';
import CyberSafetyQuiz from './component/survey/CyberSafetyQuiz';
import AssessmentResult from './component/tool/AssessmentResult';


export const router = createBrowserRouter([
  {
    path: '/secure',
    Component: SecurePage,
  },
  {
    path: '/',
    Component: App,
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
        path: 'community',
        Component: CommunityPage,
      },
      {
        path:'ScenarioBasedQuiz',
        Component: ScenarioBasedQuiz,
      },
      {
        path:'CyberSafetyQuiz',
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
    path: '/analytics',
    name: 'Analytics',
  },
  {
    path: '/ScenarioBasedQuiz',
    name: 'Scenario quiz',
  },
  /* {
    path: '/resources',
    name: 'Resources',
  }, */
  {
    path: '/community',
    name: 'Resources & Community',
  },
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
