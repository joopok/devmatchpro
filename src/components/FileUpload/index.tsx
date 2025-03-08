import React from 'react';
import { FileUpload } from './FileUpload';

export { FileUpload };

// FileUpload의 props 타입을 그대로 사용
type FileUploaderProps = React.ComponentProps<typeof FileUpload>;

// FileUploader 컴포넌트 정의
export const FileUploader: React.FC<FileUploaderProps> = (props) => {
  return <FileUpload {...props} />;
}; 