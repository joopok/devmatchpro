import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import {
  BootstrapSettings,
  defaultSettings,
  loadBootstrapSettings,
  applyBootstrapTheme,
  updateBootstrapSetting as updateSetting,
  resetBootstrapSettings
} from '../utils/bootstrap';

interface BootstrapContextType {
  settings: BootstrapSettings;
  updateSetting: (key: keyof BootstrapSettings, value: any) => void;
  resetSettings: () => void;
  isSettingsPanelOpen: boolean;
  toggleSettingsPanel: () => void;
  closeSettingsPanel: () => void;
}

const BootstrapContext = createContext<BootstrapContextType | null>(null);

interface BootstrapProviderProps {
  children: ReactNode;
}

export const BootstrapProvider: React.FC<BootstrapProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<BootstrapSettings>(defaultSettings);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  useEffect(() => {
    // 초기 설정 로드
    const savedSettings = loadBootstrapSettings();
    setSettings(savedSettings);
    applyBootstrapTheme(savedSettings);
  }, []);

  const handleUpdateSetting = (key: keyof BootstrapSettings, value: any) => {
    const updatedSettings = updateSetting(settings, key, value);
    setSettings(updatedSettings);
  };

  const handleResetSettings = () => {
    const defaultValues = resetBootstrapSettings();
    setSettings(defaultValues);
  };

  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(prev => !prev);
  };

  const closeSettingsPanel = () => {
    setIsSettingsPanelOpen(false);
  };

  return (
    <BootstrapContext.Provider
      value={{
        settings,
        updateSetting: handleUpdateSetting,
        resetSettings: handleResetSettings,
        isSettingsPanelOpen,
        toggleSettingsPanel,
        closeSettingsPanel
      }}
    >
      {children}
    </BootstrapContext.Provider>
  );
};

export const useBootstrap = (): BootstrapContextType => {
  const context = useContext(BootstrapContext);
  if (!context) {
    throw new Error('useBootstrap는 BootstrapProvider 내부에서 사용해야 합니다');
  }
  return context;
};

export default BootstrapContext; 