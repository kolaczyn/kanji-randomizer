import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StartScreen } from "./components/StartScreen.tsx";
import { Quiz } from "./components/Quiz.tsx";

import "@fontsource/noto-serif-jp/500.css";

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
