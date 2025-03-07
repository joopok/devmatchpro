import styled from '@emotion/styled';

export const CropperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const CropperControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`; 