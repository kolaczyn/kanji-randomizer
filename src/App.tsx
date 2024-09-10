import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StartScreen } from "./features/StartScreen/StartScreen.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuizWrapper } from "./features/Quiz/QuizWrapper.tsx";

import "@fontsource/noto-serif-jp/500.css";
import { VocabSearch } from "./features/VocabSearch/VocabSearch.tsx";
import { KanjiPage } from "./features/KanjiPage/KanjiPage.tsx";
import { HomePage } from "./features/HomePage/HomePage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/deck-start",
    element: <StartScreen />,
  },
  {
    path: "/deck",
    element: <QuizWrapper />,
  },
  {
    path: "/vocab-search",
    element: <VocabSearch />,
  },
  {
    path: "/kanji",
    element: <KanjiPage />,
  },
]);
export const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
