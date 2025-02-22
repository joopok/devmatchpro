# 프로젝트명

## 📝 프로젝트 소개
모던 React와 TypeScript를 활용한 웹 애플리케이션입니다.

## 🛠 기술 스택
- React
- TypeScript
- Redux (상태 관리)
- Styled-components (스타일링)
- React Router (라우팅)

## 📂 프로젝트 구조

src/
├── components/
│   ├── common/
│   │   ├── Toast/
│   │   └── ErrorBoundary/
│   └── layout/
│       └── Sidebar/
├── router/
│   └── routes.ts
├── store/
│   └── store.ts
├── styles/
│   ├── theme.ts
│   ├── GlobalStyle.ts
│   └── fonts.css
└── App.tsx


## 🔍 주요 기능

### 테마 시스템
- 다크모드/라이트모드 지원
- Redux를 통한 테마 상태 관리
- styled-components ThemeProvider 사용

### 라우팅
- React Router v6 사용
- RouterProvider를 통한 라우팅 구현
- Suspense를 활용한 코드 스플리팅

### 공통 컴포넌트
- ErrorBoundary: 에러 처리
- Toast: 알림 시스템
- Sidebar: 사이드 네비게이션
- LoadingFallback: 로딩 상태 UI

### 스타일링
- styled-components 사용
- 글로벌 스타일 적용
- 커스텀 폰트 설정
- 반응형 디자인 지원

## ✨ 특징
- TypeScript를 통한 타입 안정성
- 컴포넌트 기반 아키텍처
- 모듈화된 구조
- 에러 핸들링 구현
- 테스트 코드 작성 (App.test.tsx)

## 📈 개선 예정 사항
- 환경 변수 관리 (.env 파일)
- API 통신 로직 분리
- 상수 값 관리
- 국제화(i18n) 지원
- 성능 최적화 (메모이제이션 등)

## 📋 커밋 히스토리

### 2024-03-XX
- 프로젝트 초기 설정
  - React + TypeScript 프로젝트 생성
  - 기본 디렉토리 구조 설정
  - ESLint, Prettier 설정

### 2024-03-XX
- 기본 컴포넌트 구현
  - ErrorBoundary 컴포넌트 추가
  - Toast 컴포넌트 구현
  - 공통 레이아웃 컴포넌트 개발

### 2024-03-XX
- 라우팅 시스템 구현
  - React Router 설정
  - 라우트 구조 정의
  - 코드 스플리팅 적용

### 2024-03-XX
- 상태 관리 시스템 구축
  - Redux 설정
  - 기본 스토어 구조 정의
  - 테마 상태 관리 구현

### 2024-03-XX
- 스타일 시스템 구축
  - styled-components 설정
  - 글로벌 스타일 정의
  - 테마 시스템 구현
  - 반응형 디자인 적용

### 2024-03-XX
- Sidebar 컴포넌트 개발
  - 네비게이션 메뉴 구현
  - 아이콘 통합
  - 반응형 동작 구현

## 🚀 시작하기

### 설치

## 📜 라이센스
MIT License

## 👥 기여자
- [도승현]

## 📞 문의
- Email: [doshyun@gmail.com]
- Issue: GitHub Issues를 통해 문의해주세요.