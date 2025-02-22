import styled, { css } from 'styled-components';

export const UploaderContainer = styled.div`
  width: 100%;
`;

export const DropZone = styled.div<{
  isDragActive: boolean;
  disabled: boolean;
}>`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ isDragActive, theme }) =>
    isDragActive &&
    css`
      border-color: ${theme.colors.primary};
      background-color: ${theme.colors.primaryLight};
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      border-color: ${theme.colors.border};
      background-color: ${theme.colors.backgroundAlt};
    `}
`;

// ... 나머지 스타일 컴포넌트들도 여기에 추가 