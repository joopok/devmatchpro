import axios from 'axios';

// 공통 axios 인스턴스 생성
export const api = axios.create({
  baseURL: 'http://localhost:8081/api', // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
    //'Authorization': 'Bearer YOUR_TOKEN' // 필요 시 토큰 추가
  },
});

// 요청 인터셉터: 모든 요청 전에 실행
api.interceptors.request.use(
  (config) => {
    // 요청 보내기 전에 할 작업 (예: 토큰 추가)
    console.log('요청 시작:', config.method, config.url);
    return config;
  },
  (error) => {
    // 요청 에러 처리
    console.error('요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 모든 응답 후에 실행
api.interceptors.response.use(
  (response) => {
    // 응답 성공 시 데이터만 반환
    return response.data;
  },
  (error) => {
    // 응답 에러 처리 (예: 401, 500 등)
    if (error.response) {
      console.error('응답 에러:', error.response.status, error.response.data);
    } else {
      console.error('네트워크 에러:', error.message);
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 공통 HTTP 메서드 정의
export const getRequest = (url: string, params = {}) => {
  return api.get(url, { params }); // 쿼리 파라미터 추가 가능
};

export const postRequest = (url: string, data = {}) => {
  return api.post(url, data);
};

export const putRequest = (url: string, data = {}) => {
  return api.put(url, data);
};

export const deleteRequest = (url: string, data = {}) => {
  return api.delete(url, data);
};