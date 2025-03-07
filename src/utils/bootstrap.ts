interface BootstrapSettings {
  theme: 'light' | 'dark';
  layout: 'fluid' | 'boxed';
  sidebarPosition: 'left' | 'right';
  sidebarBehavior: 'sticky' | 'fixed' | 'compact';
}

const defaultSettings: BootstrapSettings = {
  theme: 'light',
  layout: 'fluid',
  sidebarPosition: 'left',
  sidebarBehavior: 'sticky'
};

/**
 * 로컬 스토리지에서 Bootstrap 설정을 불러옵니다.
 */
export const loadBootstrapSettings = (): BootstrapSettings => {
  try {
    const saved = localStorage.getItem('bootstrap-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  } catch (error) {
    console.error('로컬 스토리지에서 설정을 불러오는 중 오류가 발생했습니다:', error);
    return defaultSettings;
  }
};

/**
 * Bootstrap 설정을 로컬 스토리지에 저장합니다.
 */
export const saveBootstrapSettings = (settings: BootstrapSettings): void => {
  try {
    localStorage.setItem('bootstrap-settings', JSON.stringify(settings));
  } catch (error) {
    console.error('설정을 저장하는 중 오류가 발생했습니다:', error);
  }
};

/**
 * 문서에 Bootstrap 테마 설정을 적용합니다.
 */
export const applyBootstrapTheme = (settings: BootstrapSettings): void => {
  // 테마 설정
  document.documentElement.setAttribute('data-bs-theme', settings.theme);
  
  // 레이아웃 설정
  document.body.classList.remove('layout-fluid', 'layout-boxed');
  document.body.classList.add(`layout-${settings.layout}`);
  
  // 사이드바 위치 설정
  document.body.classList.remove('sidebar-left', 'sidebar-right');
  document.body.classList.add(`sidebar-${settings.sidebarPosition}`);
  
  // 사이드바 동작 설정
  document.body.classList.remove('sidebar-sticky', 'sidebar-fixed', 'sidebar-compact');
  document.body.classList.add(`sidebar-${settings.sidebarBehavior}`);
};

/**
 * Bootstrap 설정을 초기화하고 문서에 적용합니다.
 */
export const initBootstrap = (): BootstrapSettings => {
  const settings = loadBootstrapSettings();
  applyBootstrapTheme(settings);
  return settings;
};

/**
 * Bootstrap 설정의 특정 값을 업데이트합니다.
 */
export const updateBootstrapSetting = (
  settings: BootstrapSettings,
  key: keyof BootstrapSettings,
  value: any
): BootstrapSettings => {
  const updatedSettings = {
    ...settings,
    [key]: value
  };
  
  saveBootstrapSettings(updatedSettings);
  applyBootstrapTheme(updatedSettings);
  
  return updatedSettings;
};

/**
 * Bootstrap 설정을 기본값으로 초기화합니다.
 */
export const resetBootstrapSettings = (): BootstrapSettings => {
  saveBootstrapSettings(defaultSettings);
  applyBootstrapTheme(defaultSettings);
  return defaultSettings;
};

export type { BootstrapSettings };
export { defaultSettings }; 