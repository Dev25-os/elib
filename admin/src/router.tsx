import { Navigate, createBrowserRouter } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BooksPage from "./pages/BooksPage";
import AuthLayout from "./layouts/AuthLayout";
import CreateBook from "./pages/CreateBook";
export const router = createBrowserRouter([
  {
    path: "/",
    element:<Navigate to={'/home'} />
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "books/createBook",
        element: <CreateBook  />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
