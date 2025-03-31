import { createBrowserRouter } from "react-router";
import DashBoardPage from "./page/DashBoardPage";
import GamePage from "./page/GamePage";
import AnalyticsPage from "./page/AnalyticsPage";
import ResourcePage from "./page/ResourcePage";
import CommunityPage from "./page/CommunityPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        index: true,
        Component: DashBoardPage,
      },
      {
        path: "game",
        Component: GamePage,
      },
      {
        path: "analytics",
        Component: AnalyticsPage,
      },
      {
        path: "resources",
        Component: ResourcePage,
      },
      {
        path: "community",
        Component: CommunityPage,
      }
    ]
  },
]);

type routesArry = {
  path: string;
  name: string;
}

export const routes: routesArry[] = [
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "/game",
    name: "Games",
  },
  {
    path: "/analytics",
    name: "Analytics",
  },
  {
    path:"/resources",
    name: "Resources",
  },
  {
    path: "/community",
    name: "Community",
  }
]
