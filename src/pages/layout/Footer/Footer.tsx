import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.isDarkMode ? '#1f2633' : 'var(--bs-tertiary-bg, #fff)'};
  color: var(--bs-secondary-color, #6c757d);
  border-top: 1px solid var(--bs-border-color, #dee2e6);
  font-size: calc(1rem + 0.5px);
`;

const FooterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const FooterCol = styled.div`
  flex: 0 0 50%;
  max-width: 50%;

  @media (max-width: 576px) {
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const FooterStart = styled(FooterCol)`
  text-align: left;

  @media (max-width: 576px) {
    text-align: center;
  }
`;

const FooterEnd = styled(FooterCol)`
  text-align: right;

  @media (max-width: 576px) {
    text-align: center;
  }
`;

const FooterNav = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    justify-content: center;
  }
`;

const FooterLink = styled.li`
  display: inline-block;
  margin-right: 1.5rem;

  &:last-child {
    margin-right: 0;
  }

  a {
    color: var(--bs-secondary-color, #6c757d);
    text-decoration: none;
    
    &:hover {
      color: var(--bs-primary, #0d6efd);
    }
  }
`;

const CopyrightText = styled.p`
  margin-bottom: 0;

  a {
    color: var(--bs-secondary-color, #6c757d);
    text-decoration: none;
    
    &:hover {
      color: var(--bs-primary, #0d6efd);
    }
  }
`;

export const Footer: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const currentYear = new Date().getFullYear();

  // 테마 변경시 CSS 변수 적용
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <FooterContainer className="footer">
      <div className="container-fluid">
        <FooterRow className="row text-muted">
          <FooterStart className="col-6 text-start">
            <FooterNav className="list-inline">
              <FooterLink className="list-inline-item">
                <Link to="/support">고객지원</Link>
              </FooterLink>
              <FooterLink className="list-inline-item">
                <Link to="/help-center">도움말</Link>
              </FooterLink>
              <FooterLink className="list-inline-item">
                <Link to="/privacy">개인정보 처리방침</Link>
              </FooterLink>
              <FooterLink className="list-inline-item">
                <Link to="/terms">이용약관</Link>
              </FooterLink>
            </FooterNav>
          </FooterStart>
          <FooterEnd className="col-6 text-end">
            <CopyrightText className="mb-0">
              &copy; {currentYear} - <Link to="/">DevMatch Pro</Link>
            </CopyrightText>
          </FooterEnd>
        </FooterRow>
      </div>
    </FooterContainer>
  );
}; 