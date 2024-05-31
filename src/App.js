import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import Reviews from "./pages/reviews";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import EditProfile from "./components/auth/edit-profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      }
    ],
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
