import styled from '@emotion/styled';

export const ProcessorContainer = styled.div`
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
`;

export const PaymentMethods = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const PaymentMethod = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ selected }) => (selected ? '#007bff' : '#eee')};
  border-radius: 4px;
  background-color: ${({ selected }) => (selected ? '#e6f0ff' : '#fff')};
  color: ${({ selected }) => (selected ? '#007bff' : '#333')};
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#e6f0ff' : '#f8f9fa')};
  }
`;

export const PaymentDetails = styled.div`
  margin-bottom: 24px;
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SummarySection = styled.div`
  margin: 24px 0;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  text-align: right;

  p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

export const ProcessingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;

  button {
    flex: 1;
  }
`; 