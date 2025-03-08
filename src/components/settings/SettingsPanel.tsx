import React from 'react';
import styled from 'styled-components';
import { Settings, X, Monitor, Moon, Sun, Layout, LayoutGrid, Sidebar, ArrowLeftRight } from 'lucide-react';
import { useBootstrap } from '../../contexts/BootstrapContext';

// 스타일 컴포넌트
const SettingsContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? '0' : '-300px')};
  width: 300px;
  height: 100%;
  background-color: var(--bs-tertiary-bg);
  color: var(--bs-tertiary-color);
  box-shadow: -3px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  transition: right 0.3s ease;
  overflow-y: auto;
`;

const SettingsToggle = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--bs-primary);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const SettingsHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--bs-border-color);
`;

const SettingsTitle = styled.h5`
  margin: 0;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--bs-tertiary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  
  &:focus {
    outline: none;
  }
`;

const SettingsContent = styled.div`
  padding: 20px;
`;

const SettingsSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h6`
  margin-top: 0;
  margin-bottom: 15px;
  font-weight: 600;
  color: var(--bs-secondary-color);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const RadioLabel = styled.label`
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ResetButton = styled.button`
  background-color: var(--bs-secondary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--bs-secondary-emphasis);
  }

  &:focus {
    outline: none;
  }
`;

const SettingsPanel: React.FC = () => {
  const { 
    settings, 
    updateSetting, 
    resetSettings, 
    isSettingsPanelOpen, 
    toggleSettingsPanel, 
    closeSettingsPanel 
  } = useBootstrap();

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting('theme', e.target.value);
  };

  const handleLayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting('layout', e.target.value);
  };

  const handleSidebarPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting('sidebarPosition', e.target.value);
  };

  const handleSidebarBehaviorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting('sidebarBehavior', e.target.value);
  };

  return (
    <>
      <SettingsToggle onClick={toggleSettingsPanel}>
        <Settings size={20} />
      </SettingsToggle>

      <SettingsContainer $isOpen={isSettingsPanelOpen}>
        <SettingsHeader>
          <SettingsTitle>설정</SettingsTitle>
          <CloseButton onClick={closeSettingsPanel}>
            <X size={18} />
          </CloseButton>
        </SettingsHeader>

        <SettingsContent>
          <SettingsSection>
            <SectionTitle>
              <Monitor size={18} />
              테마 설정
            </SectionTitle>
            <OptionList>
              <RadioOption>
                <RadioInput
                  type="radio"
                  id="light-theme"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={handleThemeChange}
                />
                <RadioLabel htmlFor="light-theme">
                  <IconWrapper>
                    <Sun size={16} />
                  </IconWrapper>
                  라이트 모드
                </RadioLabel>
              </RadioOption>
              <RadioOption>
                <RadioInput
                  type="radio"
                  id="dark-theme"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={handleThemeChange}
                />
                <RadioLabel htmlFor="dark-theme">
                  <IconWrapper>
                    <Moon size={16} />
                  </IconWrapper>
                  다크 모드
                </RadioLabel>
              </RadioOption>
            </OptionList>
          </SettingsSection>

          <SettingsSection>
            <SectionTitle>
              <Layout size={18} />
              레이아웃
            </SectionTitle>
            <OptionList>
              <RadioOption>
                <RadioInput
                  type="radio"
                  id="fluid-layout"
                  name="layout"
                  value="fluid"
                  checked={settings.layout === 'fluid'}
                  onChange={handleLayoutChange}
                />
                <RadioLabel htmlFor="fluid-layout">
                  <IconWrapper>
                    <LayoutGrid size={16} />
                  </IconWrapper>
                  플루이드
                </RadioLabel>
              </RadioOption>
              <RadioOption>
                <RadioInput
                  type="radio"
                  id="boxed-layout"
                  name="layout"
                  value="boxed"
                  checked={settings.layout === 'boxed'}
                  onChange={handleLayoutChange}
                />
                <RadioLabel htmlFor="boxed-layout">
                  <IconWrapper>
                    <Layout size={16} />
                  </IconWrapper>
                  박스드
                </RadioLabel>
              </RadioOption>
            </OptionList>
          </SettingsSection>

          <SettingsSection>
            <SectionTitle>
              <ArrowLeftRight size={18} />
              사이드바 위치
            </SectionTitle>
            <OptionList>
              <RadioOption>
                <RadioInput
                  type="radio"
                  id="sidebar-left"
                  name="sidebarPosition"
                  value="left"
                  checked={settings.sidebarPosition === 'left'}
                  onChange={handleSidebarPositionChange}
                />
                <RadioLabel htmlFor="sidebar-left">왼쪽</RadioLabel>
              </RadioOption>
              <RadioOption>
                <RadioInput
                  type="radio"
                  id="sidebar-right"
                  name="sidebarPosition"
                  value="right"
                  checked={settings.sidebarPosition === 'right'}
                  onChange={handleSidebarPositionChange}
                />
                <RadioLabel htmlFor="sidebar-right">오른쪽</RadioLabel>
              </RadioOption>
            </OptionList>
          </SettingsSection>

          <SettingsSection>
            <SectionTitle>
              <Sidebar size={18} />
              사이드바 동작
            </SectionTitle>
            <OptionList>
              <RadioOption>
                <RadioInput
                  type="radio"
                  id="sidebar-sticky"
                  name="sidebarBehavior"
                  value="sticky"
                  checked={settings.sidebarBehavior === 'sticky'}
                  onChange={handleSidebarBehaviorChange}
                />
                <RadioLabel htmlFor="sidebar-sticky">고정</RadioLabel>
              </RadioOption>
              <RadioOption>
                <RadioInput
                  type="radio"
                  id="sidebar-fixed"
                  name="sidebarBehavior"
                  value="fixed"
                  checked={settings.sidebarBehavior === 'fixed'}
                  onChange={handleSidebarBehaviorChange}
                />
                <RadioLabel htmlFor="sidebar-fixed">픽스드</RadioLabel>
              </RadioOption>
              <RadioOption>
                <RadioInput
                  type="radio"
                  id="sidebar-compact"
                  name="sidebarBehavior"
                  value="compact"
                  checked={settings.sidebarBehavior === 'compact'}
                  onChange={handleSidebarBehaviorChange}
                />
                <RadioLabel htmlFor="sidebar-compact">컴팩트</RadioLabel>
              </RadioOption>
            </OptionList>
          </SettingsSection>

          <ResetButton onClick={resetSettings}>
            기본값으로 초기화
          </ResetButton>
        </SettingsContent>
      </SettingsContainer>
    </>
  );
};

export default SettingsPanel; 