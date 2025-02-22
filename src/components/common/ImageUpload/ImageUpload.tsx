import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  UploadContainer,
  PreviewImage,
  UploadButton,
  DropzoneArea,
} from './ImageUpload.styles';

interface ImageUploadProps {
  currentImage?: string;
  defaultImage?: string;
  onImageSelect: (file: File) => void;
  maxSize?: number;
  acceptedTypes?: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  defaultImage,
  onImageSelect,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'],
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  });

  return (
    <UploadContainer>
      <PreviewImage>
        <img
          src={currentImage || defaultImage}
          alt="Preview"
        />
      </PreviewImage>
      <DropzoneArea {...getRootProps()} isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <UploadButton type="button">
          {isDragActive ? '여기에 놓아주세요' : '이미지 업로드'}
        </UploadButton>
        <p>
          또는 이미지를 이곳에 드래그하세요
          <br />
          <small>(.jpg, .png, .gif / 최대 5MB)</small>
        </p>
      </DropzoneArea>
    </UploadContainer>
  );
}; 