import React, { useState, useEffect } from 'react';


const Ecommerce: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState({
    name: '김영수',
    company: '굿가이즈',
    email: 'kim@example.com',
    status: '활성',
    intro: '안녕하세요, 저는 김영수입니다. 온라인 쇼핑몰을 운영하고 있으며 귀사의 제품에 관심이 많습니다.',
    avatar: 'img/avatars/avatar-3.jpg'
  });

  const customers = [
    {
      id: 1,
      name: '김영수',
      company: '굿가이즈',
      email: 'kim@example.com',
      status: '활성',
      avatar: 'img/avatars/avatar.jpg',
      intro: '안녕하세요, 저는 김영수입니다. 온라인 쇼핑몰을 운영하고 있으며 귀사의 제품에 관심이 많습니다.'
    },
    {
      id: 2,
      name: '이민지',
      company: '레비츠 가구',
      email: 'lee@example.com',
      status: '활성',
      avatar: 'img/avatars/avatar.jpg',
      intro: '이민지입니다. 가구 회사를 운영하고 있습니다.'
    },
    {
      id: 3,
      name: '박소연',
      company: '차일드월드',
      email: 'park@example.com',
      status: '삭제됨',
      avatar: 'img/avatars/avatar.jpg',
      intro: '박소연입니다. 어린이 제품을 판매하는 회사를 운영하고 있습니다.'
    }
  ];

  // CSS 파일 동적 로드
  useEffect(() => {
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
    
    loadCSS();
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      const links = document.querySelectorAll('link[href^="/docs/css/"]');
      links.forEach(link => link.remove());
    };
  }, []);

  return (
    <>
      {/* 메인 콘텐츠 시작 */}
      <main className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">고객 관리</h1>
          
          <div className="row">
            {/* 고객 목록 */}
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body">
                  {/* 검색 및 버튼 영역 */}
                  <div className="row mb-3">
                    <div className="col-md-6 mb-2 mb-md-0">
                      <div className="input-group input-group-search">
                        <input 
                          type="text" 
                          className="form-control" 
                          id="datatables-customers-search" 
                          placeholder="고객 검색..." 
                        />
                        <button className="btn btn-outline-secondary" type="button">
                          <i className="align-middle" data-lucide="search"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-sm-end">
                        <button type="button" className="btn btn-light btn-lg me-2">
                          <i data-lucide="download"></i> 내보내기
                        </button>
                        <button type="button" className="btn btn-primary btn-lg">
                          <i data-lucide="plus"></i> 고객 추가
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 고객 테이블 */}
                  <div className="table-responsive">
                    <table id="datatables-customers" className="table">
                      <thead>
                        <tr>
                          <th className="text-start">#</th>
                          <th>이름</th>
                          <th>회사</th>
                          <th>이메일</th>
                          <th>상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map(customer => (
                          <tr key={customer.id} onClick={() => setSelectedCustomer(customer)}>
                            <td>
                              <img 
                                src={customer.avatar} 
                                width="32" 
                                height="32" 
                                className="rounded-circle my-n1" 
                                alt="프로필" 
                              />
                            </td>
                            <td>{customer.name}</td>
                            <td>{customer.company}</td>
                            <td>{customer.email}</td>
                            <td>
                              <span className={`badge bg-${customer.status === '활성' ? 'success' : 'danger'}`}>
                                {customer.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* 고객 상세 정보 */}
            <div className="col-xl-4">
              <div className="card">
                <div className="card-header">
                  <div className="card-actions float-end">
                    <div className="dropdown">
                      <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i className="align-middle" data-lucide="more-horizontal"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item">작업</button></li>
                        <li><button className="dropdown-item">다른 작업</button></li>
                        <li><button className="dropdown-item">기타 작업</button></li>
                      </ul>
                    </div>
                  </div>
                  <h5 className="card-title mb-0">{selectedCustomer.name}</h5>
                </div>
                <div className="card-body">
                  {/* 고객 프로필 */}
                  <div className="row g-0">
                    <div className="col-sm-3 col-xl-12 col-xxl-3 text-center">
                      <img 
                        src={selectedCustomer.avatar} 
                        width="64" 
                        height="64" 
                        className="rounded-circle mt-2" 
                        alt="고객 프로필" 
                      />
                    </div>
                    <div className="col-sm-9 col-xl-12 col-xxl-9">
                      <strong>자기소개</strong>
                      <p>{selectedCustomer.intro}</p>
                    </div>
                  </div>

                  {/* 고객 정보 테이블 */}
                  <table className="table table-sm my-2">
                    <tbody>
                      <tr>
                        <th>이름</th>
                        <td>{selectedCustomer.name}</td>
                      </tr>
                      <tr>
                        <th>회사</th>
                        <td>{selectedCustomer.company}</td>
                      </tr>
                      <tr>
                        <th>이메일</th>
                        <td>{selectedCustomer.email}</td>
                      </tr>
                      <tr>
                        <th>상태</th>
                        <td>
                          <span className={`badge bg-${selectedCustomer.status === '활성' ? 'success' : 'danger'}`}>
                            {selectedCustomer.status}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <hr />

                  {/* 활동 내역 */}
                  <strong>활동 내역</strong>
                  <ul className="timeline mt-2 mb-0">
                    <li className="timeline-item">
                      <strong>로그아웃</strong>
                      <span className="float-end text-muted text-sm">30분 전</span>
                      <p>시스템에서 로그아웃했습니다.</p>
                    </li>
                    <li className="timeline-item">
                      <strong>청구서 #1204 생성</strong>
                      <span className="float-end text-muted text-sm">2시간 전</span>
                      <p>새로운 주문에 대한 청구서를 생성했습니다.</p>
                    </li>
                    <li className="timeline-item">
                      <strong>청구서 #1147 취소</strong>
                      <span className="float-end text-muted text-sm">3시간 전</span>
                      <p>이전 주문에 대한 청구서를 취소했습니다.</p>
                    </li>
                    <li className="timeline-item">
                      <strong>로그인</strong>
                      <span className="float-end text-muted text-sm">3시간 전</span>
                      <p>시스템에 로그인했습니다.</p>
                    </li>
                    <li className="timeline-item">
                      <strong>회원가입</strong>
                      <span className="float-end text-muted text-sm">2일 전</span>
                      <p>새로운 계정을 생성했습니다.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* 메인 콘텐츠 끝 */}
    </>
  );
};

export default Ecommerce; 