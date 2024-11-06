import React,{ useMemo } from 'react';
import { pdfjs } from 'react-pdf';
import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface Props {
  url: string;
  setTotalPages: any;
  pageNumber: number;
  onLoadSuccess?: any
}

const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: fit-content !important;
  }
`;
const PdfRenderer = ({
  url,
  setTotalPages,
  pageNumber,
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
          setTotalPages(numPages);
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
