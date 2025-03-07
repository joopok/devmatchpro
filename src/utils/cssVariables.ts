export interface CSSVariables {
  primary: string;
  primarySubtle: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  bodyBg: string;
  bodyColor: string;
  secondaryBg: string;
  secondaryColor: string;
  tertiaryBg: string;
  tertiaryColor: string;
  quaternaryBg: string;
  quaternaryColor: string;
}

/**
 * 현재 문서의 CSS 변수를 가져옵니다.
 * 이 함수는 :root 또는 html 요소에서 CSS 변수 값을 추출합니다.
 */
export const getCSSVariables = (): CSSVariables => {
  const computedStyle = getComputedStyle(document.documentElement);
  
  return {
    primary: computedStyle.getPropertyValue('--bs-primary').trim(),
    primarySubtle: computedStyle.getPropertyValue('--bs-primary-subtle').trim(),
    secondary: computedStyle.getPropertyValue('--bs-secondary').trim(),
    success: computedStyle.getPropertyValue('--bs-success').trim(),
    warning: computedStyle.getPropertyValue('--bs-warning').trim(),
    danger: computedStyle.getPropertyValue('--bs-danger').trim(),
    info: computedStyle.getPropertyValue('--bs-info').trim(),
    bodyBg: computedStyle.getPropertyValue('--bs-body-bg').trim(),
    bodyColor: computedStyle.getPropertyValue('--bs-body-color').trim(),
    secondaryBg: computedStyle.getPropertyValue('--bs-secondary-bg').trim(),
    secondaryColor: computedStyle.getPropertyValue('--bs-secondary-color').trim(),
    tertiaryBg: computedStyle.getPropertyValue('--bs-tertiary-bg').trim(),
    tertiaryColor: computedStyle.getPropertyValue('--bs-tertiary-color').trim(),
    quaternaryBg: computedStyle.getPropertyValue('--bs-quaternary-bg').trim(),
    quaternaryColor: computedStyle.getPropertyValue('--bs-quaternary-color').trim(),
  };
};

/**
 * CSS 변수를 설정합니다.
 * @param variables 설정할 CSS 변수 객체
 */
export const setCSSVariables = (variables: Partial<CSSVariables>): void => {
  Object.entries(variables).forEach(([key, value]) => {
    if (value) {
      document.documentElement.style.setProperty(`--bs-${key}`, value);
    }
  });
};

// 전역 접근을 위한 현재 CSS 변수 저장
let currentCSSVariables = getCSSVariables();

// DOMContentLoaded 이벤트와 테마 변경 이벤트 시 CSS 변수 업데이트
const updateCSSVariables = () => {
  currentCSSVariables = getCSSVariables();
  window.dispatchEvent(new CustomEvent('css-variables-updated', { detail: currentCSSVariables }));
};

// CSS 변수를 초기화하고 전역 변수에 할당
export const initCSSVariables = (): void => {
  updateCSSVariables();
  
  // 테마 변경 이벤트 및 DOM 콘텐츠 로드 이벤트 리스너 추가
  document.addEventListener('themeChanged', updateCSSVariables);
  document.addEventListener('DOMContentLoaded', updateCSSVariables);
};

// 현재 CSS 변수에 접근하기 위한 함수
export const getCurrentCSSVariables = (): CSSVariables => {
  return { ...currentCSSVariables };
}; 