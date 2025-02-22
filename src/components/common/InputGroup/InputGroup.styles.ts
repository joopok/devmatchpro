import styled from 'styled-components';

export const StyledInputGroup = styled.div<{
  direction: 'row' | 'column';
  spacing: number;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ spacing }) => spacing}px;
  width: 100%;

  ${({ direction }) =>
    direction === 'row' &&
    `
    & > * {
      flex: 1;
    }
  `}
`; 