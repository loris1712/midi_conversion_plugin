import React from 'react';
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
  pageNumber: number
}

const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: fit-content !important;
  }
`;
const PdfRenderer = ({ url, setTotalPages, pageNumber }: Props) => (
  <PDFDocumentWrapper>
    <Document
      file={{
        url: url,
      }}
      loading={<span className="text-black p-4">Loading</span>}
      noData={<span className="text-black p-4">File not found</span>}
      onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
    >
      <Page pageNumber={pageNumber} />
    </Document>
  </PDFDocumentWrapper>
);

export default React.memo(PdfRenderer, (prev, next) => prev.url === next.url);
