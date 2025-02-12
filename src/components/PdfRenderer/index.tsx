import React, { useMemo, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocumentWrapper } from '@styles/index';


interface Props {
  url: string;
  onLoadSuccess?: () => void
}


const PdfRenderer = ({
  url,
  onLoadSuccess,
}: Props) => {
  const file = useMemo(() => url, [url]);
  const [totalPages, setTotalPages] = useState(0);
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
        {Array.from({ length: totalPages }, (_, index) => (
          <Page key={index} pageNumber={index + 1} />
        ))}
      </Document>
    </PDFDocumentWrapper>
  );
};

export default React.memo(PdfRenderer, (prev, next) => prev.url === next.url);
