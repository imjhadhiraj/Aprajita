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
import NotFoundPage from './components/NotFoundPage.jsx';
import Welcome from './components/Dashboard/Welcome.jsx';
import TeamMember from './components/Dashboard/TeamMember.jsx';
import RegisterAdmin from './components/Dashboard/RegisterAdmin.jsx';
import PaymentSuccessPage from './components/PaymentSuccessPage.jsx';
import AllPayments from './components/Dashboard/AllPayments.jsx';
import ReadMore from './components/ReadMore.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/ReadMore",
    element: <ReadMore />
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/payment-success/:razorpay_payment_id",
    element: <PaymentSuccessPage />,
  },
  {
    path: "/admin-dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Welcome />
      },
      {
        path: "gallery",
        element: <Gallery />
      },
      {
        path: "events",
        element: <Events />
      },
      {
        path: "team",
        element: <TeamMember />
      },
      {
        path: "register-admin",
        element: <RegisterAdmin />
      },
      {
        path: "get-all-paymentDetails",
        element: <AllPayments />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
