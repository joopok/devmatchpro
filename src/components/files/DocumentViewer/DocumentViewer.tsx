import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { Button } from '../../Button';
import { ZoomIn, ZoomOut, X } from 'lucide-react';
import {
  ViewerContainer,
  ZoomControls,
  LoadingMessage,
  ErrorMessage,
} from './DocumentViewer.styles';

// PDF.js 워커 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DocumentViewerProps {
  fileUrl: string;
  onClose?: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  fileUrl,
  onClose,
}) => {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [scale, setScale] = React.useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  return (
    <ViewerContainer>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<LoadingMessage>문서를 불러오는 중...</LoadingMessage>}
        error={<ErrorMessage>문서를 불러올 수 없습니다.</ErrorMessage>}
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>

      <ZoomControls>
        <Button onClick={handleZoomOut} disabled={scale <= 0.5}>
          <ZoomOut />
        </Button>
        <span>{Math.round(scale * 100)}%</span>
        <Button onClick={handleZoomIn} disabled={scale >= 3}>
          <ZoomIn />
        </Button>
      </ZoomControls>

      {onClose && (
        <Button onClick={onClose}>
          <X />
        </Button>
      )}
    </ViewerContainer>
  );
}; 