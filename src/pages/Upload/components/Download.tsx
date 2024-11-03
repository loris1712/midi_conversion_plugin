import { useEffect, useState } from 'react';
import {  Flex, Radio } from '@radix-ui/themes';
import { DownloadIcon } from './styles';
import PDFViewer from 'pdf-viewer-reactjs';

import { RightChevron, LeftChevron } from '@styles/index';
import { ReactComponent as CheckIcon } from '@assets/done-check.svg';
import Modal from '@components/Modal';

import { FileNameInput } from './styles';
import CircleLoader from '@components/Loaders/CircleLoader';
import { ConvertedTag, GradientButton, OriginalTag, RoundButton } from 'styles';
import useProcessingStateStore from '@store/useProcessingStateStore';

interface DownloadProps {
  uploadNewFile: () => void;
  onDownload: (filename: string, type: FileType) => void;
}

const FILE_TYPES = [
  {
    name: 'MiDi',
    type: 'mid' as FileType,
  },
  {
    name: 'Muse',
    type: 'mscz' as FileType,
  },
  {
    name: 'XML',
    type: 'xml' as FileType,
  },
];

const Download = ({ onDownload }: DownloadProps) => {

    const { results } = useProcessingStateStore(
      (state) => state,
    );
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const [filename, setFilename] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadDone, setDownloadDone] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType>('mid');
  

  useEffect(() => {
    window.ipcRenderer.on('download-progress', (_event, args) => {
      const { percent } = args;
      if (percent > 0) {
        setDownloadProgress(Math.floor(Number(percent) * 100));
      }
    });

    window.ipcRenderer.on('download-complete', () => {
      setDownloadDone(true);
    });

    window.ipcRenderer.on('download-error', () => {
      setDownloadDone(false);
      setDownloadError(true);
    });
  }, []);

  const isDownloading = downloadProgress > 0;

  return (
    <>
      <div className="h-full w-full flex flex-col gap-6 py-4 mb-4">
        <Flex className="flex flex-row px-6 items-center justify-between py-2">
          <Flex direction={'row'} align={'center'} gap={'4'}>
            <RoundButton>
              <LeftChevron />
            </RoundButton>
            <span className="text-white">Page 1/1</span>
            <RoundButton>
              <RightChevron />
            </RoundButton>
          </Flex>
          <GradientButton
            onClick={() => {
              setShowDownloadModal(true);
            }}
          >
            <DownloadIcon />
            Download
          </GradientButton>
        </Flex>

        <div className="mx-6 grid grid-cols-2 gap-4 h-full">
          <Flex direction={'column'} gap={'4'} className="h-full">
            <OriginalTag>Original</OriginalTag>
            <div className="pdf-container">
              {results?.body?.source_preview_file && (
                <img
                  className="object-contain h-full w-full"
                  src={results?.body?.source_preview_file}
                />
              )}
            </div>
          </Flex>
          <Flex direction={'column'} gap={'4'} className="h-full">
            <ConvertedTag>Converted</ConvertedTag>
            <div className="pdf-container">
              {results?.body?.result_preview_pdf && (
                <img
                  className="object-contain h-full w-full"
                  src={results?.body?.result_preview_pdf}
                />
              )}
            </div>
          </Flex>
        </div>
      </div>

      {showDownloadModal && (
        <Modal
          onClose={() => {
            setShowDownloadModal(false);
          }}
          title="Save As"
          content={
            <div className="flex flex-col items-start gap-1 p-2">
              {downloadDone && (
                <div className="flex flex-row items-center gap-2 mb-4">
                  <CheckIcon className="h-[20px] w-[20px]" />
                  <p>File downloaded successfully!</p>
                </div>
              )}
              {!downloadDone && (
                <div className="flex flex-col gap-[1rem] w-full">
                  <div className="grid grid-cols-2 gap-2">
                    {FILE_TYPES.map((type) => (
                      <label
                        key={type.type}
                        htmlFor={type.type}
                        className="flex flex-row items-center gap-2 text-[15px] font-jakarta"
                      >
                        <Radio
                          value={type.type}
                          checked={selectedFile === type.type}
                          name={type.name}
                          color="cyan"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFile(type.type);
                            }
                          }}
                        />{' '}
                        {type.name}
                      </label>
                    ))}
                  </div>
                  <FileNameInput
                    autoFocus
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                  />
                </div>
              )}

              <div className="flex flex-row items-center justify-between w-full mt-1">
                <p className="text-[10px]">
                  Saved to: ../Downloads/{filename}.{selectedFile}
                </p>
                {isDownloading && (
                  <p className="text-[10px]">{downloadProgress}%</p>
                )}
              </div>
            </div>
          }
          buttons={
            <div className="flex flex-row gap-4 justify-start">
              <GradientButton
                disabled={!filename.length || isDownloading || !selectedFile}
                onClick={() => {
                  setDownloadProgress(1);
                  onDownload(filename, selectedFile);
                }}
                className=""
              >
                {isDownloading && <CircleLoader />}
                Save
              </GradientButton>
            </div>
          }
        />
      )}
    </>
  );
};

export default Download;
