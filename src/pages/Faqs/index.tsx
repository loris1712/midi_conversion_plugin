import { Document, Page, pdfjs } from 'react-pdf';
import guide from '@assets/guide.pdf'; // Ensure this resolves correctly
import { PDFDocumentWrapper } from '@styles/index';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Faqs = () => {
  const [numOfPages, setNumOfPages] = useState(0);
  return (
    <div className="h-full w-screen p-6 flex flex-col gap-6">
      <h4 className="text-[18px] font-bold">User Guide</h4>
      <div className="h-[80vh] overflow-scroll w-[88vw]">
        <PDFDocumentWrapper>
          <Document
            file={guide}
            onLoadSuccess={({ numPages }) => setNumOfPages(numPages)}
            onLoadError={(error) =>
              console.error('Error while loading PDF:', error)
            }
            className="my-react-pdf"
          >
            {Array.apply(null, Array(numOfPages))
              .map((x, i) => i + 1)
              .map((page) => (
                <Page pageNumber={page} />
              ))}
          </Document>
        </PDFDocumentWrapper>
      </div>
    </div>
  );
};

export default Faqs;
