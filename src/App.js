import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import Reviews from "./pages/reviews";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import EditProfile from "./components/auth/edit-profile";
import NewReview from "./components/reviews/new-review";
import EditReview from "./components/reviews/edit-review";
import ReviewDetail from "./components/reviews/review-detail";

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
      },
      {
        path: "/reviews/new",
        element: <NewReview />,
      },
      {
        path: "/reviews/:id",
        element: <ReviewDetail />,
      }, 
      {
        path: "/reviews/:id/edit",
        element: <EditReview />,
      }
    ],
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
