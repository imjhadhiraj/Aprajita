import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFoundPage from './components/NotFoundPage.jsx';
import Loader from './components/Loader';

const Admin = lazy(() => import("./components/Admin.jsx"))
const PaymentSuccessPage = lazy(() => import("./components/PaymentSuccessPage.jsx"))
const DashboardLayout = lazy(() => import("./components/Dashboard/DashboardLayout.jsx"))
const Gallery = lazy(() => import("./components/Dashboard/Gallery.jsx"))
const Events = lazy(() => import("./components/Dashboard/Events.jsx"))
const Welcome = lazy(() => import("./components/Dashboard/Welcome.jsx"))
const TeamMember = lazy(() => import("./components/Dashboard/TeamMember.jsx"))
const RegisterAdmin = lazy(() => import("./components/Dashboard/RegisterAdmin.jsx"))
const AllPayments = lazy(() => import("./components/Dashboard/AllPayments.jsx"))
const UpdateAdmin = lazy(() => import("./components/Dashboard/UpdateAdmin.jsx"))
const ReadMore = lazy(() => import("./components/ReadMore.jsx"))


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/ReadMore",
    element: (
      <Suspense
        fallback={
          <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
            <Loader />
          </div>
        }>
        <ReadMore />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense
        fallback={
          <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
            <Loader />
          </div>
        }>
        <Admin />
      </Suspense>
    ),
  },
  {
    path: "/payment-success/:razorpay_payment_id",
    element: (
      <Suspense
        fallback={
          <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
            <Loader />
          </div>
        }>
        <PaymentSuccessPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (<Suspense
      fallback={
        <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
          <Loader />
        </div>
      }>
      <DashboardLayout />,
    </Suspense>),
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
      },
      {
        path: "update-adminProfile",
        element: <UpdateAdmin />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
