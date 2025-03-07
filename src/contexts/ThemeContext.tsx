import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

// 테마 설정 타입 정의
export interface ThemeSettings {
  theme: 'default' | 'colored' | 'light' | 'dark';
  layout: 'fluid' | 'boxed';
  sidebarPosition: 'left' | 'right';
  sidebarBehavior: 'sticky' | 'fixed' | 'compact';
}

// 기본 테마 설정
export const defaultSettings: ThemeSettings = {
  theme: 'default',
  layout: 'fluid',
  sidebarPosition: 'left',
  sidebarBehavior: 'sticky',
};

// 테마 설정별 속성 매핑
const themeAttributeMap = {
  theme: {
    default: { bsTheme: 'light', sidebarTheme: 'dark' },
    colored: { bsTheme: 'light', sidebarTheme: 'colored' },
    light: { bsTheme: 'light', sidebarTheme: 'light' },
    dark: { bsTheme: 'dark', sidebarTheme: 'dark' },
  },
  layout: {
    fluid: { layout: 'fluid' },
    boxed: { layout: 'boxed' },
  },
  sidebarPosition: {
    left: { sidebarPosition: 'left' },
    right: { sidebarPosition: 'right' },
  },
  sidebarBehavior: {
    sticky: { sidebarBehavior: 'sticky' },
    fixed: { sidebarBehavior: 'fixed' },
    compact: { sidebarBehavior: 'compact' },
  },
};

// localStorage 키 접두사
const STORAGE_KEY_PREFIX = 'devmatch-pro-config-';

// ThemeContext 타입 정의
interface ThemeContextType {
  settings: ThemeSettings;
  updateSetting: <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => void;
  resetSettings: () => void;
  isSettingsPanelOpen: boolean;
  toggleSettingsPanel: () => void;
}

// ThemeContext 생성
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider Props 타입
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider 컴포넌트
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    return getSavedSettings();
  });

  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  // 설정 업데이트 함수
  const updateSetting = useCallback(<K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      saveSettings(key, value);
      applyThemeAttributes(key, value);
      return newSettings;
    });
  }, []);

  // 설정 초기화 함수
  const resetSettings = () => {
    setSettings(defaultSettings);
    Object.keys(defaultSettings).forEach(key => {
      const settingKey = key as keyof ThemeSettings;
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${settingKey}`);
      applyThemeAttributes(settingKey, defaultSettings[settingKey]);
    });
  };

  // 설정 패널 토글 함수
  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(prev => !prev);
  };

  // localStorage에서 설정 가져오기
  function getSavedSettings(): ThemeSettings {
    const savedSettings = { ...defaultSettings };
    
    Object.keys(defaultSettings).forEach(key => {
      const settingKey = key as keyof ThemeSettings;
      const savedValue = localStorage.getItem(`${STORAGE_KEY_PREFIX}${settingKey}`);
      
      if (savedValue && isValidSettingValue(settingKey, savedValue)) {
        // 타입 캐스팅을 통해 타입 안전성 확보
        (savedSettings as any)[settingKey] = savedValue;
      }
    });
    
    return savedSettings;
  }

  // 설정값이 유효한지 확인하는 함수
  function isValidSettingValue(key: keyof ThemeSettings, value: string): boolean {
    // @ts-ignore - 타입 무시하고 키 체크
    return value && themeAttributeMap[key] && themeAttributeMap[key][value] !== undefined;
  }

  // localStorage에 설정 저장
  function saveSettings<K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, value);
  }

  // 테마 속성 적용
  function applyThemeAttributes<K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) {
    // @ts-ignore - 타입 오류 무시
    const attributes = themeAttributeMap[key][value];
    
    if (attributes) {
      Object.entries(attributes).forEach(([attrKey, attrValue]) => {
        document.documentElement.dataset[attrKey] = attrValue as string;
      });
    }

    // 테마 변경 시 CSS 변수 업데이트 및 이벤트 트리거
    if (key === 'theme') {
      document.dispatchEvent(new Event('themeChanged'));
    }
  }

  // 초기 렌더링 시 설정 적용
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    Object.keys(settings).forEach(key => {
      const settingKey = key as keyof ThemeSettings;
      applyThemeAttributes(settingKey, settings[settingKey]);
    });

    // URL 쿼리 파라미터 처리
    const url = new URL(window.location.href);
    Object.keys(themeAttributeMap).forEach(key => {
      const settingKey = key as keyof ThemeSettings;
      const queryValue = url.searchParams.get(settingKey);
      
      if (queryValue && isValidSettingValue(settingKey, queryValue)) {
        // 타입 캐스팅을 통해 타입 안전성 확보
        updateSetting(settingKey, queryValue as any);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      settings, 
      updateSetting, 
      resetSettings, 
      isSettingsPanelOpen, 
      toggleSettingsPanel 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 커스텀 훅
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 