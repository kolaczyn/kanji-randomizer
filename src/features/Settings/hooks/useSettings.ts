import { useContext, useState } from "react";
import { SettingsContext } from "../context/SettingsProvider.tsx";

const KEY = "appSettings";

const defaultSettings: AppSettings = {
  showIncorrect: false,
  showFirst: "kanji",
};

export type ShowFirst = "kanji" | "definition";

export type AppSettings = {
  showIncorrect: boolean;
  showFirst: ShowFirst;
};

const readFromLocalStorage = (): AppSettings => {
  const fromStorage = localStorage.getItem(KEY);

  return fromStorage
    ? (JSON.parse(fromStorage) as AppSettings)
    : defaultSettings;
};

export const useSettingsInternal = () => {
  const [settings, setSettings] = useState(readFromLocalStorage);

  const setSettingsWrapped = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem(KEY, JSON.stringify(newSettings));
  };

  return [settings, setSettingsWrapped] as const;
};

export const useSettings = () => useContext(SettingsContext);
