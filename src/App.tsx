import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StartScreen } from "./components/StartScreen.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuizWrapper } from "./features/Quiz/QuizWrapper.tsx";

import "@fontsource/noto-serif-jp/500.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartScreen />,
  },
  {
    path: "/deck",
    element: <QuizWrapper />,
  },
]);
export const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
