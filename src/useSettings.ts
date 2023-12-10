import { useState } from "react";

const KEY = "appSettings";

const defaultSettings: AppSettings = {
  showFirst: "kanji",
};

type AppSettings = {
  showFirst: "kanji" | "definition";
};

const readFromLocalStorage = (): AppSettings => {
  const fromStorage = localStorage.getItem(KEY);

  return fromStorage
    ? (JSON.parse(fromStorage) as AppSettings)
    : defaultSettings;
};

export const useSettings = () => {
  const [settings, setSettings] = useState(readFromLocalStorage);

  const setSettingsWrapped = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem(KEY, JSON.stringify(newSettings));
  };

  return [settings, setSettingsWrapped] as const;
};
