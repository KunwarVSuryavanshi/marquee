import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Dashboard } from './Components/Dashboard/Dashboard.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Login from './Components/LoginPage/Login.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><App /></ProtectedRoute>,
    errorElement: <div>Route doesn't exist.👻</div>,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: '*',
    element: <div>Route doesn't exist.👻</div>,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
