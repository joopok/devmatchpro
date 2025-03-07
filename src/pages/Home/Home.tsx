import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';
import './Home.css';

// Chart.js 등록
Chart.register(...registerables);

// 다크모드 관련 전역 상태 관리를 위한 간단한 훅
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // 테마 변경 시 data-theme 속성 업데이트
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    // 로컬 스토리지에 테마 저장
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleTheme };
};

// TempusDominus 타입 선언
declare global {
  interface Window {
    Chart: any;
    chartInstance: any;
    tempusDominus: {
      TempusDominus: any;
    };
  }
}

const Home: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const calendarInitializedRef = useRef(false);
  
  // 차트 초기화 함수
  const initializeChart = () => {
    if (!chartRef.current) {
      console.error('차트 캔버스 요소를 찾을 수 없습니다.');
      return;
    }
    
    // 이미 존재하는 차트 인스턴스 제거
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // 새 차트 인스턴스 생성
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) {
      console.error('차트 컨텍스트를 가져올 수 없습니다.');
      return;
    }
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        datasets: [
          {
            label: "작년",
            backgroundColor: "#3B7DDD",
            borderColor: "#3B7DDD",
            hoverBackgroundColor: "#3B7DDD",
            hoverBorderColor: "#3B7DDD",
            data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
            barPercentage: 0.325,
            categoryPercentage: 0.5
          }, 
          {
            label: "올해",
            backgroundColor: "#E8EAED",
            borderColor: "#E8EAED",
            hoverBackgroundColor: "#E8EAED",
            hoverBorderColor: "#E8EAED",
            data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
            barPercentage: 0.325,
            categoryPercentage: 0.5
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            grid: {
              display: false
            },
            ticks: {
              stepSize: 20
            },
            stacked: true
          },
          x: {
            grid: {
              color: "transparent"
            },
            stacked: true
          }
        }
      }
    });
  };
  
  // TempusDominus 라이브러리 로드
  const loadTempusDominus = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.tempusDominus) {
        console.log('TempusDominus가 이미 로드되어 있습니다.');
        resolve();
        return;
      }
      
      console.log('TempusDominus 로드 시도');
      
      // 필요한 의존성 로드 (Popper.js)
      const popperScript = document.createElement('script');
      popperScript.src = 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js';
      popperScript.async = true;
      
      popperScript.onload = () => {
        console.log('Popper.js 로드 완료');
        
        // CSS 로드
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@eonasdan/tempus-dominus@6.7.7/dist/css/tempus-dominus.min.css';
        document.head.appendChild(link);
        
        // JS 로드
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@eonasdan/tempus-dominus@6.7.7/dist/js/tempus-dominus.min.js';
        script.async = true;
        
        script.onload = () => {
          console.log('TempusDominus 로드 완료');
          // 약간의 지연을 두어 라이브러리가 완전히 초기화되도록 함
          setTimeout(() => {
            resolve();
          }, 100);
        };
        
        script.onerror = (error) => {
          console.error('TempusDominus 로드 실패:', error);
          reject(error);
        };
        
        document.head.appendChild(script);
      };
      
      popperScript.onerror = (error) => {
        console.error('Popper.js 로드 실패:', error);
        reject(error);
      };
      
      document.head.appendChild(popperScript);
    });
  }, []);
  
  // 캘린더 초기화 함수
  const initializeCalendar = useCallback(() => {
    const calendarElement = document.getElementById('calendar-dashboard');
    if (calendarInitializedRef.current || !calendarElement) {
      console.log('캘린더 요소를 찾을 수 없거나 이미 초기화되었습니다.');
      return;
    }
    
    if (window && window.tempusDominus) {
      try {
        console.log('캘린더 초기화 시도');
        
        // 기존 내용 제거
        while (calendarElement.firstChild) {
          calendarElement.removeChild(calendarElement.firstChild);
        }
        
        calendarInitializedRef.current = true;
        
        // 캘린더 초기화
        new window.tempusDominus.TempusDominus(calendarElement, {
          display: {
            inline: true,
            components: {
              clock: false,
              hours: false,
              minutes: false,
              seconds: false
            },
            theme: isDarkMode ? 'dark' : 'light'
          },
          localization: {
            locale: 'ko',
            format: 'yyyy-MM-dd'
          }
        });
        
        console.log('캘린더 초기화 성공');
      } catch (error) {
        console.error('캘린더 초기화 오류:', error);
        calendarInitializedRef.current = false;
      }
    } else {
      console.warn('TempusDominus 라이브러리가 로드되지 않았습니다.');
    }
  }, [isDarkMode]);
  
  useEffect(() => {
    // 차트 초기화
    initializeChart();
    
    // TempusDominus 로드 후 캘린더 초기화
    const setupCalendar = async () => {
      try {
        await loadTempusDominus();
        // DOM이 완전히 렌더링될 때까지 기다림
        setTimeout(() => {
          initializeCalendar();
        }, 1000); // 더 긴 지연 시간 설정
      } catch (error) {
        console.error('캘린더 설정 실패:', error);
      }
    };
    
    setupCalendar();
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [initializeCalendar, loadTempusDominus]);

  // 다크모드 변경 시 캘린더 다시 초기화
  useEffect(() => {
    if (calendarInitializedRef.current) {
      calendarInitializedRef.current = false;
      setTimeout(() => {
        initializeCalendar();
      }, 300);
    }
  }, [isDarkMode, initializeCalendar]);

  // CSS 파일 동적 로드
  const loadCSS = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/docs/css/light.css'; // 기본 테마 CSS
    document.head.appendChild(link);

    // 추가 CSS 파일들
    const additionalCSS = [
      '/docs/css/app.css',
      '/docs/css/ecommerce.css'
    ];

    additionalCSS.forEach(cssPath => {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = cssPath;
      document.head.appendChild(cssLink);
    });
  };

  useEffect(() => {
    loadCSS();

    // 컴포넌트 언마운트 시 정리
    return () => {
      const links = document.querySelectorAll('link[href^="/docs/css/"]');
      links.forEach(link => link.remove());
    };
  }, []);
  
  // 간단한 캘린더 컴포넌트 추가
  const SimpleCalendar: React.FC = () => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    
    // 달력 데이터 생성
    const generateCalendarData = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      
      // 해당 월의 첫 날과 마지막 날
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      // 첫 날의 요일 (0: 일요일, 6: 토요일)
      const firstDayOfWeek = firstDay.getDay();
      
      // 이전 달의 마지막 날
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      
      // 달력에 표시할 날짜 배열
      const days = [];
      
      // 이전 달의 날짜 추가
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push({
          date: prevMonthLastDay - i,
          currentMonth: false,
          prevMonth: true,
          nextMonth: false
        });
      }
      
      // 현재 달의 날짜 추가
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push({
          date: i,
          currentMonth: true,
          prevMonth: false,
          nextMonth: false,
          isToday: new Date(year, month, i).toDateString() === new Date().toDateString()
        });
      }
      
      // 다음 달의 날짜 추가 (6주 채우기)
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: i,
          currentMonth: false,
          prevMonth: false,
          nextMonth: true
        });
      }
      
      return {
        year,
        month,
        days,
        monthName: new Date(year, month).toLocaleString('ko-KR', { month: 'long' })
      };
    };
    
    const calendarData = generateCalendarData(currentDate);
    
    // 이전 달로 이동
    const prevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };
    
    // 다음 달로 이동
    const nextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };
    
    // 날짜 선택
    const handleDateClick = (day: any) => {
      if (day.currentMonth) {
        setSelectedDate(new Date(calendarData.year, calendarData.month, day.date));
      }
    };
    
    // 요일 이름
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    
    return (
      <div className="simple-calendar" ref={calendarRef}>
        <div className="calendar-header">
          <button className="calendar-nav-btn" onClick={prevMonth}>
            <span className="visually-hidden">이전 달</span>
          </button>
          <h5>{calendarData.year}년 {calendarData.monthName}</h5>
          <button className="calendar-nav-btn" onClick={nextMonth}>
            <span className="visually-hidden">다음 달</span>
          </button>
        </div>
        
        <table className="calendar-table">
          <thead>
            <tr>
              {weekdays.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(6).fill(null).map((_, weekIndex) => (
              <tr key={weekIndex}>
                {calendarData.days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                  <td 
                    key={dayIndex}
                    className={`
                      ${day.currentMonth ? 'current-month' : 'other-month'}
                      ${day.isToday ? 'today' : ''}
                      ${selectedDate && day.currentMonth && 
                        selectedDate.getDate() === day.date && 
                        selectedDate.getMonth() === calendarData.month ? 
                        'selected' : ''}
                    `}
                    onClick={() => handleDateClick(day)}
                  >
                    {day.date}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // 캘린더 스타일 추가
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .simple-calendar {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 1.5rem;
        background-color: #1c2433;
        border-radius: 0.5rem;
      }
      
      .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 0 0.5rem;
      }
      
      .calendar-header h5 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 500;
        color: #e9ecef;
      }
      
      .calendar-nav-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        color: #e9ecef;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
      }
      
      .calendar-nav-btn:hover {
        background: var(--bs-primary);
        border-color: var(--bs-primary);
        color: white;
      }
      
      .calendar-nav-btn i {
        width: 18px;
        height: 18px;
      }
      
      .calendar-nav-btn::before {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border-top: 2px solid currentColor;
        border-right: 2px solid currentColor;
      }
      
      .calendar-nav-btn:first-child::before {
        transform: rotate(-135deg);
        margin-left: 2px;
      }
      
      .calendar-nav-btn:last-child::before {
        transform: rotate(45deg);
        margin-right: 2px;
      }
      
      .calendar-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0.4rem;
      }
      
      .calendar-table th {
        padding: 0.75rem;
        text-align: center;
        font-weight: 600;
        font-size: 0.875rem;
        color: #adb5bd;
      }
      
      .calendar-table td {
        padding: 0.75rem;
        text-align: center;
        font-size: 0.875rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s;
        width: calc(100% / 7);
        aspect-ratio: 1;
        vertical-align: middle;
        color: #e9ecef;
      }
      
      .calendar-table td:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .calendar-table .current-month {
        color: #e9ecef;
      }
      
      .calendar-table .other-month {
        color: #6c757d;
        opacity: 0.5;
      }
      
      .calendar-table .today {
        background-color: rgba(255, 255, 255, 0.1);
        color: var(--bs-primary);
        font-weight: 600;
      }
      
      .calendar-table .selected {
        background-color: var(--bs-primary);
        color: white;
      }
      
      .calendar-table .selected:hover {
        background-color: var(--bs-primary-dark);
      }
      
      [data-theme="dark"] .calendar-nav-btn {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: var(--bs-body-color);
      }
      
      [data-theme="dark"] .calendar-nav-btn:hover {
        background: var(--bs-primary);
        border-color: var(--bs-primary);
        color: white;
      }
      
      [data-theme="dark"] .calendar-table td:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      [data-theme="dark"] .calendar-table .today {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return (
    <div className="content w-100">
        <div className="container-fluid p-0">
        {/* 대시보드 헤더 */}
          <div className="row mb-2 mb-xl-3">
            <div className="col-auto d-none d-sm-block">
              <h3>Dashboard</h3>
            </div>
            <div className="col-auto ms-auto text-end mt-n1">
            {/* 다크모드 토글 버튼 */}
            <button 
              className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'} shadow-sm me-2`}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <i className="align-middle" data-lucide={isDarkMode ? 'sun' : 'moon'}></i>
            </button>
            
            {/* 날짜 선택 드롭다운 */}
              <div className="dropdown me-2 d-inline-block position-relative">
              <a className={`btn ${isDarkMode ? 'btn-dark' : 'btn-light'} shadow-sm dropdown-toggle`} href="#" data-bs-toggle="dropdown" data-bs-display="static">
                  <i className="align-middle mt-n1" data-lucide="calendar"></i> Today
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">Settings</h6>
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Separated link</a>
                </div>
              </div>
            
            {/* 액션 버튼들 */}
              <button className="btn btn-primary shadow-sm">
                <i className="align-middle" data-lucide="filter"></i>
              </button>
              <button className="btn btn-primary shadow-sm">
                <i className="align-middle" data-lucide="refresh-cw"></i>
              </button>
            </div>
          </div>
        
        {/* 정보 카드 섹션 */}
          <div className="row">
          {/* 환영 카드 */}
            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
              <div className="card illustration flex-fill">
                <div className="card-body p-0 d-flex flex-fill">
                  <div className="row g-0 w-100">
                    <div className="col-6">
                      <div className="illustration-text p-3 m-1">
                        <h4 className="illustration-text">Welcome Back, Chris!</h4>
                        <p className="mb-0">AppStack Dashboard</p>
                      </div>
                    </div>
                    <div className="col-6 align-self-end text-end">
                    <img src="/docs/img/illustrations/customer-support.png" alt="Customer Support" className="img-fluid illustration-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 총 수익 카드 */}
            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
              <div className="card flex-fill">
                <div className="card-body py-4">
                  <div className="d-flex align-items-start">
                    <div className="flex-grow-1">
                      <h3 className="mb-2">$ 24.300</h3>
                      <p className="mb-2">Total Earnings</p>
                      <div className="mb-0">
                        <span className="badge badge-subtle-success me-2">+5.35 %</span>
                        <span className="text-muted">Since last week</span>
                      </div>
                    </div>
                    <div className="d-inline-block ms-3">
                      <div className="stat">
                        <i className="align-middle text-success" data-lucide="dollar-sign"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          {/* 대기 주문 카드 */}
            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
              <div className="card flex-fill">
                <div className="card-body py-4">
                  <div className="d-flex align-items-start">
                    <div className="flex-grow-1">
                      <h3 className="mb-2">43</h3>
                      <p className="mb-2">Pending Orders</p>
                      <div className="mb-0">
                        <span className="badge badge-subtle-danger me-2">-4.25 %</span>
                        <span className="text-muted">Since last week</span>
                      </div>
                    </div>
                    <div className="d-inline-block ms-3">
                      <div className="stat">
                        <i className="align-middle text-danger" data-lucide="shopping-bag"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          {/* 총 매출 카드 */}
            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
              <div className="card flex-fill">
                <div className="card-body py-4">
                  <div className="d-flex align-items-start">
                    <div className="flex-grow-1">
                      <h3 className="mb-2">$ 18.700</h3>
                      <p className="mb-2">Total Revenue</p>
                      <div className="mb-0">
                        <span className="badge badge-subtle-success me-2">+8.65 %</span>
                        <span className="text-muted">Since last week</span>
                      </div>
                    </div>
                    <div className="d-inline-block ms-3">
                      <div className="stat">
                        <i className="align-middle text-info" data-lucide="dollar-sign"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        {/* 차트 및 피드 섹션 */}
          <div className="row">
          {/* 매출/수익 차트 */}
            <div className="col-12 col-lg-8 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-header">
                  <div className="card-actions float-end">
                    <div className="dropdown position-relative">
                      <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                        <i className="align-middle" data-lucide="more-horizontal"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title mb-0">Sales / Revenue</h5>
                </div>
                <div className="card-body d-flex w-100">
                <div className="align-self-center chart chart-lg w-100" style={{ minHeight: '300px' }}>
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>
            </div>
          </div>
          
          {/* 일일 피드 */}
            <div className="col-12 col-lg-4 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-header">
                  <span className="badge bg-info float-end">Today</span>
                  <h5 className="card-title mb-0">Daily feed</h5>
                </div>
                <div className="card-body">
                {/* 피드 항목 1 */}
                  <div className="d-flex align-items-start">
                  <img src="/assets/img/avatars/avatar-5.jpg" width="36" height="36" className="rounded-circle me-2" alt="Ashley Briggs" />
                    <div className="flex-grow-1">
                      <small className="float-end">5m ago</small>
                      <strong>Ashley Briggs</strong> started following <strong>Stacie Hall</strong>
                      <br />
                      <small className="text-muted">Today 7:51 pm</small><br />
                    </div>
                  </div>
                  <hr />
                
                {/* 피드 항목 2 */}
                  <div className="d-flex align-items-start">
                  <img src="/assets/img/avatars/avatar.jpg" width="36" height="36" className="rounded-circle me-2" alt="Chris Wood" />
                    <div className="flex-grow-1">
                      <small className="float-end">30m ago</small>
                      <strong>Chris Wood</strong> posted something on <strong>Stacie Hall</strong>'s timeline<br />
                      <small className="text-muted">Today 7:21 pm</small>
                    </div>
                  </div>
                  <div className="border text-sm text-muted p-2 mt-1">
                  Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing...
                </div>
                <hr />
                      
                      {/* 피드 항목 3 */}
                <div className="d-flex align-items-start">
                        <img src="/assets/img/avatars/avatar-4.jpg" width="36" height="36" className="rounded-circle me-2" alt="Stacie Hall" />
                  <div className="flex-grow-1">
                    <small className="float-end">1h ago</small>
                    <strong>Stacie Hall</strong> posted a new blog<br />
                    <small className="text-muted">Today 6:35 pm</small>
                  </div>
                </div>
                <hr />
                
                {/* 더 보기 버튼 */}
          <div className="d-grid">
                  <a href="#" className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-primary'}`}>Load more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 추가 정보 섹션 */}
        <div className="row">
          {/* 캘린더 */}
          <div className="col-12 col-lg-4 d-flex">
            <div className="card flex-fill">
              <div className="card-header">
                <h5 className="card-title mb-0">Calendar</h5>
              </div>
              <div className="card-body">
                <div id="calendar-dashboard" style={{ minHeight: '300px' }}>
                  <SimpleCalendar />
                </div>
              </div>
            </div>
          </div>
          
          {/* 주간 매출 */}
          <div className="col-12 col-xl-4 d-none d-xl-flex">
            <div className="card flex-fill w-100">
              <div className="card-header">
                <div className="card-actions float-end">
                  <div className="dropdown position-relative">
                    <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                      <i className="align-middle" data-lucide="more-horizontal"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <h5 className="card-title mb-0">Weekly sales</h5>
              </div>
              <div className="card-body d-flex">
                <div className="align-self-center w-100">
                  <div className="py-3">
                    <div className="chart chart-xs">
                      <canvas id="chartjs-dashboard-pie"></canvas>
                    </div>
                  </div>
                  
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th className="text-end">Revenue</th>
                        <th className="text-end">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><i className="fas fa-square-full text-primary"></i> Direct</td>
                        <td className="text-end">$ 2602</td>
                        <td className="text-end text-success">+43%</td>
                      </tr>
                      <tr>
                        <td><i className="fas fa-square-full text-warning"></i> Affiliate</td>
                        <td className="text-end">$ 1253</td>
                        <td className="text-end text-success">+13%</td>
                      </tr>
                      <tr>
                        <td><i className="fas fa-square-full text-danger"></i> E-mail</td>
                        <td className="text-end">$ 541</td>
                        <td className="text-end text-success">+24%</td>
                      </tr>
                      <tr>
                        <td><i className="fas fa-square-full text-dark"></i> Other</td>
                        <td className="text-end">$ 1465</td>
                        <td className="text-end text-success">+11%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* 약속 일정 */}
          <div className="col-12 col-lg-6 col-xl-4 d-flex">
            <div className="card flex-fill w-100">
              <div className="card-header">
                <div className="card-actions float-end">
                  <div className="dropdown position-relative">
                    <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                      <i className="align-middle" data-lucide="more-horizontal"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <h5 className="card-title mb-0">Appointments</h5>
              </div>
              <div className="card-body">
                <ul className="timeline">
                  <li className="timeline-item">
                    <strong>Chat with Carl and Ashley</strong>
                    <span className="float-end text-muted text-sm">30m ago</span>
                    <p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris...</p>
                  </li>
                  <li className="timeline-item">
                    <strong>The big launch</strong>
                    <span className="float-end text-muted text-sm">2h ago</span>
                    <p>Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc...</p>
                  </li>
                  <li className="timeline-item">
                    <strong>Coffee break</strong>
                    <span className="float-end text-muted text-sm">3h ago</span>
                    <p>Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada...</p>
                  </li>
                  <li className="timeline-item">
                    <strong>Chat with team</strong>
                    <span className="float-end text-muted text-sm">30m ago</span>
                    <p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum...</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* 최신 프로젝트 섹션 */}
        <div className="row">
          <div className="col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header">
                <div className="card-actions float-end">
                  <div className="dropdown position-relative">
                    <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                      <i className="align-middle" data-lucide="more-horizontal"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <h5 className="card-title mb-0">Latest Projects</h5>
              </div>
              <table className="table table-borderless my-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="d-none d-xxl-table-cell">Company</th>
                    <th className="d-none d-xl-table-cell">Author</th>
                    <th>Status</th>
                    <th className="d-none d-xl-table-cell text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="bg-body-tertiary rounded-2">
                            <img className="p-2" src="img/brands/brand-1.svg" />
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <strong>Project Apollo</strong>
                          <div className="text-muted">
                            Web, UI / UX Design
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xxl-table-cell">
                      <strong>Gantos</strong>
                      <div className="text-muted">
                        Real Estate
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell">
                      <strong>Carl Jenkins</strong>
                      <div className="text-muted">
                        HTML, JS, React
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100">
                        <span className="me-2 mb-1 text-muted">65%</span>
                        <div className="progress progress-sm w-100">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: "65%"}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell text-end">
                      <a href="#" className="btn btn-light">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="bg-body-tertiary rounded-2">
                            <img className="p-2" src="img/brands/brand-2.svg" />
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <strong>Project Bongo</strong>
                          <div className="text-muted">
                            Web
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xxl-table-cell">
                      <strong>Adray Transportation</strong>
                      <div className="text-muted">
                        Transportation
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell">
                      <strong>Bertha Martin</strong>
                      <div className="text-muted">
                        HTML, JS, Vue
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100">
                        <span className="me-2 mb-1 text-muted">33%</span>
                        <div className="progress progress-sm w-100">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: "33%"}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell text-end">
                      <a href="#" className="btn btn-light">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="bg-body-tertiary rounded-2">
                            <img className="p-2" src="img/brands/brand-3.svg" />
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <strong>Project Canary</strong>
                          <div className="text-muted">
                            Web, UI / UX Design
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xxl-table-cell">
                      <strong>Evans</strong>
                      <div className="text-muted">
                        Insurance
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell">
                      <strong>Stacie Hall</strong>
                      <div className="text-muted">
                        HTML, JS, Laravel
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100">
                        <span className="me-2 mb-1 text-muted">50%</span>
                        <div className="progress progress-sm w-100">
                          <div className="progress-bar bg-warning" role="progressbar" style={{width: "50%"}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell text-end">
                      <a href="#" className="btn btn-light">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="bg-body-tertiary rounded-2">
                            <img className="p-2" src="img/brands/brand-4.svg" />
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <strong>Project Edison</strong>
                          <div className="text-muted">
                            UI / UX Design
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xxl-table-cell">
                      <strong>Monsource Investment Group</strong>
                      <div className="text-muted">
                        Finance
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell">
                      <strong>Carl Jenkins</strong>
                      <div className="text-muted">
                        HTML, JS, React
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100">
                        <span className="me-2 mb-1 text-muted">80%</span>
                        <div className="progress progress-sm w-100">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: "80%"}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell text-end">
                      <a href="#" className="btn btn-light">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="bg-body-tertiary rounded-2">
                            <img className="p-2" src="img/brands/brand-5.svg" />
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <strong>Project Indigo</strong>
                          <div className="text-muted">
                            Web, UI / UX Design
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xxl-table-cell">
                      <strong>Edwards</strong>
                      <div className="text-muted">
                        Retail
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell">
                      <strong>Ashley Briggs</strong>
                      <div className="text-muted">
                        HTML, JS, Vue
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100">
                        <span className="me-2 mb-1 text-muted">78%</span>
                        <div className="progress progress-sm w-100">
                          <div className="progress-bar bg-primary" role="progressbar" style={{width: "78%"}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-xl-table-cell text-end">
                      <a href="#" className="btn btn-light">View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
