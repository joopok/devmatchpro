import { Input } from '../Input';

// TextArea는 multiline이 true로 설정된 Input 컴포넌트입니다.
export { Input as TextArea };

// 호환성을 위한 Input의 속성 기본값 설정
Input.defaultProps = {
  ...Input.defaultProps,
  multiline: true,
  rows: 5
}; 