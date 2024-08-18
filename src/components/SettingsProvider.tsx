import { createContext, ReactNode } from "react";
import { AppSettings, useSettingsInternal } from "../hooks/useSettings.ts";

type SettingsContextData = [AppSettings, (newValue: AppSettings) => void];

type Props = {
  children: ReactNode;
};

export const SettingsContext = createContext<SettingsContextData>(null!);

export const SettingsProvider = ({ children }: Props) => {
  const [settings, setSettings] = useSettingsInternal();

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
};
