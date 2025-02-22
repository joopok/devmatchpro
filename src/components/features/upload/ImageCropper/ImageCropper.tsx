import React, { useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '../../../common/Button';
import {
  CropperContainer,
  CropperControls,
  ImageContainer,
} from './ImageCropper.styles';

interface ImageCropperProps {
  imageUrl: string;
  crop: Crop;
  onCropChange: (crop: Crop) => void;
  onCropComplete: (croppedArea: Crop) => void;
  onCancel: () => void;
  aspectRatio?: number;
  circularCrop?: boolean;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  crop,
  onCropChange,
  onCropComplete,
  onCancel,
  aspectRatio,
  circularCrop = false,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleCropComplete = (_: Crop, percentageCrop: Crop) => {
    onCropComplete(percentageCrop);
  };

  return (
    <CropperContainer>
      <ImageContainer>
        <ReactCrop
          crop={crop}
          onChange={onCropChange}
          onComplete={handleCropComplete}
          aspect={aspectRatio}
          circularCrop={circularCrop}
        >
          <img
            ref={imageRef}
            src={imageUrl}
            alt="이미지 크롭"
            style={{ maxHeight: '70vh' }}
          />
        </ReactCrop>
      </ImageContainer>
      
      <CropperControls>
        <Button
          variant="outline"
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          onClick={() => {
            if (imageRef.current) {
              onCropComplete(crop);
            }
          }}
        >
          적용하기
        </Button>
      </CropperControls>
    </CropperContainer>
  );
}; 