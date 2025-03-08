import React from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  RadarChart,
  PolarAreaChart,
  DoughnutChart,
  AreaChart,
  HorizontalBarChart,
  MixedChart
} from '../../components/Charts';

const PageContainer = styled.div`
  padding: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(Card)`
  padding: 20px;
  height: 100%;
  
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ChartGallery: React.FC = () => {
  // 라인 차트 데이터
  const lineChartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '매출',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 90],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        tension: 0.4
      },
      {
        label: '비용',
        data: [28, 48, 40, 19, 36, 27, 25, 30, 40, 35, 38, 41],
        borderColor: '#FF5722',
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        tension: 0.4
      }
    ]
  };
  
  // 바 차트 데이터
  const barData = [
    { name: '1월', 매출: 4000, 비용: 2400 },
    { name: '2월', 매출: 3000, 비용: 1398 },
    { name: '3월', 매출: 2000, 비용: 9800 },
    { name: '4월', 매출: 2780, 비용: 3908 },
    { name: '5월', 매출: 1890, 비용: 4800 },
    { name: '6월', 매출: 2390, 비용: 3800 },
    { name: '7월', 매출: 3490, 비용: 4300 }
  ];
  
  // 파이 차트 데이터
  const pieChartData = {
    labels: ['웹 개발', '앱 개발', '디자인', '마케팅', '기타'],
    datasets: [
      {
        label: '프로젝트 유형',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#2196F3', '#4CAF50', '#FFC107', '#F44336', '#9C27B0'
        ],
        borderWidth: 1
      }
    ]
  };
  
  // 도넛 차트 데이터
  const doughnutChartData = {
    labels: ['정상', '경고', '위험', '고장'],
    datasets: [
      {
        label: '시스템 상태',
        data: [63, 15, 12, 10],
        backgroundColor: [
          '#4CAF50', '#FFC107', '#FF9800', '#F44336'
        ],
        borderWidth: 1
      }
    ]
  };
  
  // 레이더 차트 데이터
  const radarChartData = {
    labels: ['디자인', '속도', '기능성', '사용성', '보안', '성능', '안정성'],
    datasets: [
      {
        label: '제품 A',
        data: [65, 59, 90, 81, 56, 55, 40],
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        borderColor: '#2196F3',
        borderWidth: 2
      },
      {
        label: '제품 B',
        data: [28, 80, 40, 19, 96, 27, 70],
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        borderColor: '#FF5722',
        borderWidth: 2
      }
    ]
  };
  
  // 폴라 차트 데이터
  const polarAreaChartData = {
    labels: ['개발', '디자인', '마케팅', '영업', '고객지원'],
    datasets: [
      {
        data: [11, 16, 7, 15, 9],
        backgroundColor: [
          'rgba(33, 150, 243, 0.5)', 
          'rgba(76, 175, 80, 0.5)', 
          'rgba(255, 193, 7, 0.5)', 
          'rgba(244, 67, 54, 0.5)', 
          'rgba(156, 39, 176, 0.5)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  // 에리어 차트 데이터
  const areaChartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
    datasets: [
      {
        label: '방문자 수',
        data: [10000, 15000, 12000, 18000, 15000, 20000, 17000],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        fill: true
      }
    ]
  };
  
  // 수평 바 차트 데이터
  const horizontalBarChartData = {
    labels: ['서울', '부산', '대구', '인천', '광주', '대전', '울산'],
    datasets: [
      {
        label: '인구 (만명)',
        data: [970, 340, 246, 293, 145, 147, 114],
        backgroundColor: [
          'rgba(33, 150, 243, 0.7)',
          'rgba(76, 175, 80, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(244, 67, 54, 0.7)',
          'rgba(156, 39, 176, 0.7)',
          'rgba(255, 152, 0, 0.7)',
          'rgba(0, 188, 212, 0.7)'
        ]
      }
    ]
  };
  
  // 혼합 차트 데이터
  const mixedChartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [
      {
        type: 'bar' as const,
        label: '매출액 (천만원)',
        data: [20, 30, 25, 35, 27, 40],
        backgroundColor: 'rgba(33, 150, 243, 0.7)',
        order: 2
      },
      {
        type: 'line' as const,
        label: '순이익 (천만원)',
        data: [10, 15, 13, 18, 14, 20],
        borderColor: '#FF5722',
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        fill: true,
        order: 1
      }
    ]
  };

  return (
    <PageContainer>
      <PageTitle>차트 갤러리</PageTitle>
      
      <ChartGrid>
        <ChartCard>
          <h3>라인 차트</h3>
          <p>시간 경과에 따른 데이터 추세를 보여주는 데 적합합니다.</p>
          <LineChart data={lineChartData} />
        </ChartCard>
        
        <ChartCard>
          <h3>바 차트</h3>
          <p>범주형 데이터의 비교에 적합합니다.</p>
          <BarChart 
            data={{
              labels: barData.map(item => item.name),
              datasets: [{
                label: '매출',
                data: barData.map(item => item.매출)
              }]
            }}
          />
        </ChartCard>
        
        <ChartCard>
          <h3>파이 차트</h3>
          <p>전체에 대한 부분의 비율을 표시하는 데 사용됩니다.</p>
          <PieChart data={pieChartData} />
        </ChartCard>
        
        <ChartCard>
          <h3>도넛 차트</h3>
          <p>파이 차트와 유사하지만 중앙에 공간이 있습니다.</p>
          <DoughnutChart data={doughnutChartData} />
        </ChartCard>
        
        <ChartCard>
          <h3>레이더 차트</h3>
          <p>여러 변수에 대한 다차원 데이터를 표시하는 데 유용합니다.</p>
          <RadarChart data={radarChartData} />
        </ChartCard>
        
        <ChartCard>
          <h3>폴라 에어리어 차트</h3>
          <p>각 세그먼트가 동일한 각도를 갖는 원형 차트입니다.</p>
          <PolarAreaChart data={polarAreaChartData} />
        </ChartCard>
        
        <ChartCard>
          <h3>에어리어 차트</h3>
          <p>선 아래 영역을 채워 변화의 크기를 강조합니다.</p>
          <AreaChart data={areaChartData} />
        </ChartCard>
        
        <ChartCard>
          <h3>수평 바 차트</h3>
          <p>가로 방향으로 데이터를 비교할 때 사용합니다.</p>
          <HorizontalBarChart data={horizontalBarChartData} />
        </ChartCard>
        
        <ChartCard>
          <h3>혼합 차트</h3>
          <p>한 차트에서 여러 형태의 시각화를 결합합니다.</p>
          <MixedChart data={mixedChartData} />
        </ChartCard>
      </ChartGrid>
    </PageContainer>
  );
};

export default ChartGallery; 