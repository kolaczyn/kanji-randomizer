import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StartScreen } from "./components/StartScreen.tsx";
import { QuizWrapper } from "./features/Quiz/Quiz.tsx";

import "@fontsource/noto-serif-jp/500.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartScreen />,
  },
  {
    path: "/:level",
    element: <QuizWrapper />,
  },
]);
export const App = () => <RouterProvider router={router} />;
