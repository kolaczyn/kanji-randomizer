import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { App } from "./App.tsx";
import { SettingsProvider } from "./features/Settings/context/SettingsProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
