import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './components/Admin.jsx';
import DashboardLayout from './components/Dashboard/DashboardLayout.jsx';
import Gallery from './components/Dashboard/Gallery.jsx';
import Events from './components/Dashboard/Events.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin-dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "gallery",
        element: <Gallery />
      },
      {
        path: "events",
        element: <Events />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
