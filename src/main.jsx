import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Header_banner from "./components/Header_banner.jsx";
import Topbar from './components/Topbar.jsx';
import './i18/i18.js';
import './index.css';
import Alerts from './pages/Alerts.jsx';
import Alerts_Progress from './pages/Alerts_Progress.jsx';
import All_alerts from './pages/All_alerts.jsx';
import CentralDashboard from './pages/CentralDashboard.jsx';
import CentralStatus from './pages/CentralStatus.jsx';
import Chatbot from './pages/Chatbot.jsx';
import DWLR_graph from './pages/DWLR_graph.jsx';
import Dwlr_ID_info from './pages/Dwlr_ID_info.jsx';
import DwlrInfo from "./pages/DwlrInfo.jsx";
import Login from './pages/Login.jsx';
import Map from './pages/Map.jsx';
import Signup from './pages/Signup.jsx';
const BrowserRouter = createBrowserRouter([

  {
    path: "/",
    element: <Login></Login>
  },
  {
    path: "/signup",
    element: <Signup></Signup>
  }, {
    path: "/centralDashboard",
    element: <CentralDashboard></CentralDashboard>
  },
  {
    path: "/centralStatus",
    element: <CentralStatus></CentralStatus>
  },

  {
    path: "/dwlr_id_info",
    element: <Dwlr_ID_info></Dwlr_ID_info>
  },
  {
    path: "/dwlrinfo",
    element: <DwlrInfo></DwlrInfo>
  },
  {
    path: "/alerts",
    element: <Alerts></Alerts>
  },
  {
    path: "/Map",
    element: <Map></Map>
  },
  {
    path: "/dwlr_graph",
    element: <DWLR_graph></DWLR_graph>
  },
  {
    path: "/alerts_progress",
    element: <Alerts_Progress></Alerts_Progress>
  },
  {
    path: "/all_alerts",
    element: <All_alerts></All_alerts>
  }
]);



createRoot(document.getElementById('root')).render(

  <>
    <Topbar />
    <Chatbot />
    <Header_banner />
    <RouterProvider router={BrowserRouter} />
  </>
)
