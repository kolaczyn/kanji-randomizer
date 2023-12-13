import { useContext, useState, createContext, ReactNode } from "react";

const KEY = "appSettings";

type SettingsContextData = [AppSettings, (newValue: AppSettings) => void];

const defaultSettings: AppSettings = {
  showFirst: "kanji",
};

export type AppSettings = {
  showFirst: "kanji" | "definition";
};

const readFromLocalStorage = (): AppSettings => {
  const fromStorage = localStorage.getItem(KEY);

  return fromStorage
    ? (JSON.parse(fromStorage) as AppSettings)
    : defaultSettings;
};

const useSettingsInternal = () => {
  const [settings, setSettings] = useState(readFromLocalStorage);

  const setSettingsWrapped = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem(KEY, JSON.stringify(newSettings));
  };

  return [settings, setSettingsWrapped] as const;
};

const SettingsContext = createContext<SettingsContextData>(null!);

type Props = {
  children: ReactNode;
};

export const SettingsProvider = ({ children }: Props) => {
  const [settings, setSettings] = useSettingsInternal();

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
