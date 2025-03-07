import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { DatePicker } from '../../components/common/DatePicker';
import { Timeline } from '../../components/common/Timeline';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';

// 캘린더 헤더 스타일
const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

// 캘린더 뷰 전환 컨트롤
const ViewControls = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

// 캘린더 네비게이션
const CalendarNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CurrentMonth = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 8px;
`;

// 캘린더 그리드 (월별 뷰)
const MonthlyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const WeekdayHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 12px;
  text-align: center;
  font-weight: 500;
`;

const CalendarDay = styled.div<{ $isToday?: boolean; $isCurrentMonth?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 8px;
  min-height: 100px;
  opacity: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 1 : 0.5)};
  ${({ $isToday, theme }) =>
    $isToday &&
    `
    background-color: ${theme.colors.primary}10;
  `}
`;

const DayNumber = styled.div<{ $isToday?: boolean }>`
  font-weight: ${({ $isToday }) => ($isToday ? 'bold' : 'normal')};
  color: ${({ $isToday, theme }) => ($isToday ? theme.colors.primary : 'inherit')};
  margin-bottom: 8px;
`;

const EventItem = styled.div`
  background-color: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 주별 뷰
const WeeklyView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const WeeklyHeader = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const TimeHeader = styled.div`
  padding: 12px;
  text-align: right;
  font-weight: 500;
`;

const WeeklyDay = styled.div`
  padding: 12px;
  text-align: center;
  font-weight: 500;
`;

const WeeklyBody = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  min-height: 600px;
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const TimeSlot = styled.div`
  padding: 8px;
  text-align: right;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 12px;
`;

const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Slot = styled.div<{ $isNow?: boolean }>`
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ $isNow, theme }) => ($isNow ? `${theme.colors.primary}10` : 'transparent')};
`;

// 사이드바 및 레이아웃
const CalendarLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  padding: 24px;
`;

const CalendarArea = styled.div``;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// 일정 목록 스타일
// const EventList = styled.div`
//   margin-top: 16px;
// `;

// 더미 데이터 - 실제 앱에서는 API에서 가져올 것
const dummyEvents = [
  {
    id: '1',
    title: '프로젝트 킥오프 미팅',
    start: new Date(2023, 5, 10, 10, 0),
    end: new Date(2023, 5, 10, 12, 0),
    status: 'in_progress',
  },
  {
    id: '2',
    title: '디자인 워크샵',
    start: new Date(2023, 5, 15, 14, 0),
    end: new Date(2023, 5, 15, 16, 0),
    status: 'pending',
  },
  {
    id: '3',
    title: '백엔드 개발 회의',
    start: new Date(2023, 5, 20, 10, 0),
    end: new Date(2023, 5, 20, 11, 30),
    status: 'completed',
  },
];

// 더미 데이터 - 일정 타입
const eventTypes = [
  { value: 'meeting', label: '미팅' },
  { value: 'task', label: '작업' },
  { value: 'deadline', label: '마감일' },
  { value: 'other', label: '기타' },
];

interface CalendarViewProps {
  date: Date;
  events: any[];
}

// 월별 뷰 컴포넌트
const MonthView: React.FC<CalendarViewProps> = ({ date, events }) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // 첫째 날의 요일에 맞춰 앞에 빈 칸 추가
  const startDay = new Date(monthStart).getDay();
  const blanks = Array(startDay).fill(null);
  
  // 월별 캘린더 날짜 배열 생성
  const calendarDays = [...blanks, ...days];
  
  // 요일 헤더
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  
  return (
    <>
      <MonthlyGrid>
        {weekdays.map((day, index) => (
          <WeekdayHeader key={index}>{day}</WeekdayHeader>
        ))}
        
        {calendarDays.map((day, index) => {
          if (!day) return <CalendarDay key={`blank-${index}`} />;
          
          const isCurrentDay = isToday(day);
          const isCurrentMonth = isSameMonth(day, date);
          
          // 해당 날짜의 이벤트 필터링
          const dayEvents = events.filter(
            (event) => format(event.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );
          
          return (
            <CalendarDay key={format(day, 'yyyy-MM-dd')} $isToday={isCurrentDay} $isCurrentMonth={isCurrentMonth}>
              <DayNumber $isToday={isCurrentDay}>{format(day, 'd')}</DayNumber>
              {dayEvents.map((event) => (
                <EventItem key={event.id}>{event.title}</EventItem>
              ))}
            </CalendarDay>
          );
        })}
      </MonthlyGrid>
    </>
  );
};

// 주별 뷰 컴포넌트
const WeekView: React.FC<CalendarViewProps> = ({ date, events }) => {
  // 현재 날짜가 속한 주의 일요일부터 토요일까지
  const dayOfWeek = date.getDay();
  const startOfWeek = addDays(date, -dayOfWeek);
  const weekDays = Array(7).fill(null).map((_, i) => addDays(startOfWeek, i));
  
  // 시간 슬롯 생성 (9AM - 6PM)
  const hours = Array(10).fill(null).map((_, i) => 9 + i);
  
  return (
    <WeeklyView>
      <WeeklyHeader>
        <TimeHeader></TimeHeader>
        {weekDays.map((day) => (
          <WeeklyDay key={format(day, 'yyyy-MM-dd')}>
            {format(day, 'EEE dd', { locale: ko })}
          </WeeklyDay>
        ))}
      </WeeklyHeader>
      
      <WeeklyBody>
        <TimeColumn>
          {hours.map((hour) => (
            <TimeSlot key={hour}>{`${hour}:00`}</TimeSlot>
          ))}
        </TimeColumn>
        
        {weekDays.map((day) => (
          <DayColumn key={format(day, 'yyyy-MM-dd')}>
            {hours.map((hour) => {
              const now = new Date();
              const isNow = 
                isToday(day) && 
                now.getHours() === hour;
              
              return <Slot key={hour} $isNow={isNow} />;
            })}
          </DayColumn>
        ))}
      </WeeklyBody>
    </WeeklyView>
  );
};

// 메인 캘린더 컴포넌트
export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [events /* , setEvents */] = useState(dummyEvents);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<string>('');
  
  // 현재 날짜의 이벤트를 타임라인 형식으로 표시하기 위한 변환
  const timelineItems = events.map(event => ({
    id: event.id,
    title: event.title,
    status: event.status,
    startDate: format(event.start, 'yyyy-MM-dd HH:mm'),
    onClick: () => setSelectedEvent(event)
  }));
  
  // 이전 달/주/일로 이동
  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, -7));
    }
  };
  
  // 다음 달/주/일로 이동
  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 7));
    }
  };
  
  // 오늘로 이동
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  // Select에서 값이 변경될 때 처리하는 함수
  const handleEventTypeChange = (value: string | string[]) => {
    // 단일 값만 처리합니다
    if (typeof value === 'string') {
      setSelectedEventType(value);
    }
  };
  
  return (
    <CalendarLayout>
      <CalendarArea>
        <CalendarHeader>
          <Title>일정 관리</Title>
          <HeaderControls>
            <Button>+ 일정 추가</Button>
          </HeaderControls>
        </CalendarHeader>
        
        <ViewControls>
          <Button 
            variant={view === 'month' ? 'primary' : 'secondary'} 
            onClick={() => setView('month')}
          >
            월별
          </Button>
          <Button 
            variant={view === 'week' ? 'primary' : 'secondary'} 
            onClick={() => setView('week')}
          >
            주별
          </Button>
        </ViewControls>
        
        <CalendarNav>
          <CurrentMonth>
            {format(currentDate, view === 'month' ? 'yyyy년 MM월' : 'yyyy년 MM월 dd일', { locale: ko })}
          </CurrentMonth>
          <NavButtons>
            <Button variant="text" onClick={handlePrevious}>이전</Button>
            <Button variant="text" onClick={handleToday}>오늘</Button>
            <Button variant="text" onClick={handleNext}>다음</Button>
          </NavButtons>
        </CalendarNav>
        
        {view === 'month' && <MonthView date={currentDate} events={events} />}
        {view === 'week' && <WeekView date={currentDate} events={events} />}
      </CalendarArea>
      
      <Sidebar>
        <Card>
          <h3>일정 추가</h3>
          <div style={{ marginBottom: '16px' }}>
            <DatePicker
              name="eventDate"
              label="날짜"
              placeholderText="날짜 선택"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Select
              label="일정 유형"
              options={eventTypes}
              placeholder="유형 선택"
              value={selectedEventType}
              onChange={handleEventTypeChange}
            />
          </div>
          <Button fullWidth>일정 추가</Button>
        </Card>
        
        <Card>
          <h3>오늘 일정</h3>
          <Timeline items={timelineItems} />
        </Card>
      </Sidebar>
    </CalendarLayout>
  );
} 