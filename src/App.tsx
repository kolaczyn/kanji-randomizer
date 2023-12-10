import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { StartScreen } from "./StartScreen.tsx";
import { Quiz } from "./Quiz.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartScreen />,
  },
  {
    path: "/:level",
    element: <Quiz />,
  },
]);
export const App = () => <RouterProvider router={router} />;
