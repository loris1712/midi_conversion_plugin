import React,{ useMemo } from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocumentWrapper } from '@styles/index';


interface Props {
  url: string;
  setTotalPages?: (page: number) => void;
  pageNumber?: number;
  onLoadSuccess?: () => void
}


const PdfRenderer = ({
  url,
  setTotalPages,
  pageNumber = 1,
  onLoadSuccess,
}: Props) => {
  const file = useMemo(() => url, [url]);
  return (
    <PDFDocumentWrapper>
      <Document
        file={{
          url: file,
        }}
        loading={<span className="text-black p-4">Loading</span>}
        noData={<span className="text-black p-4">File not found</span>}
        onLoadSuccess={({ numPages }) => {
          setTotalPages?.(numPages);
          onLoadSuccess?.();
        }}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </PDFDocumentWrapper>
  );
};

export default React.memo(
  PdfRenderer,
  (prev, next) => prev.pageNumber === next.pageNumber,
);
