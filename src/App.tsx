import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StartScreen } from "./components/StartScreen.tsx";
import { Quiz } from "./features/Quiz/Quiz.tsx";
import { DeckContextProvider } from "./features/Quiz/context/DeckContext.tsx";

import "@fontsource/noto-serif-jp/500.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartScreen />,
  },
  {
    path: "/:level",
    element: (
      <DeckContextProvider>
        <Quiz />
      </DeckContextProvider>
    ),
  },
]);
export const App = () => <RouterProvider router={router} />;
