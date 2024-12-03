import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Flex, Checkbox } from '@radix-ui/themes';
import heic2any from 'heic2any';

import { DownloadIcon } from './styles';
import posthog from 'posthog-js';
import toast from 'react-hot-toast';

import { RightChevron, LeftChevron } from '@styles/index';
import { ReactComponent as CheckIcon } from '@assets/done-check.svg';
import Modal from '@components/Modal';

import CircleLoader from '@components/Loaders/CircleLoader';
import { ConvertedTag, OriginalTag, RoundButton, GradientButton } from 'styles';
import useProcessingStateStore from '@store/useProcessingStateStore';
import { getFileExtension, isFileAvailable, isPDF } from '@utils/helpers';
import { EVENTS } from '@constants/index';
import PdfRenderer from '@components/PdfRenderer';

import { FileNameInput, DownloadButton } from './styles';

const FILE_TYPES = [
  {
    name: 'MSCZ',
    type: 'mscz' as FileType,
  },
  {
    name: 'MIDI',
    type: 'mid' as FileType,
  },
  {
    name: 'XML',
    type: 'xml' as FileType,
  },
];

const Download = () => {
  const { results } = useProcessingStateStore((state) => state);

  const [pdfPage, setPdfPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [filename, setFilename] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadDone, setDownloadDone] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType>('mid');
  const [showPreview, setShowPreview] = useState(false);
  const [fileDownloadReady, setFileDownloadReady] = useState(false);
  const [sourceFile, setSourceFile] = useState('');
  const [sourceFileLoading, setSourceFileLoading] = useState(false);

  const resultPdf = useMemo(() => results?.body?.result_pdf, [results]);

  useEffect(() => {
    (async () => {
      setSourceFileLoading(true)
      const file = results?.body?.source_file;
      const extension = getFileExtension(file);
      if (extension?.toLocaleLowerCase() === 'heic') {
        fetch(file)
          .then((res) => res.blob())
          .then((blob) =>
            heic2any({
              blob,
              toType: 'image/jpeg',
              quality: 0.9,
            }),
          )
          .then((conversionResult: any) => {
            var url = URL.createObjectURL(conversionResult);
            setSourceFile(url);
            setSourceFileLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
          setSourceFileLoading(false);
      } else {
        setSourceFile(file);
      }
      setSourceFileLoading(false);
    })();
  }, []);

  const {
    result_midi = '',
    result_mscz = '',
    result_xml = '',
  } = results?.body ?? {};

  useEffect(() => {
    if (!!resultPdf) {
      const interval = setInterval(async () => {
        const isReady = await isFileAvailable(resultPdf);
        if (isReady) {
          setShowPreview(true);
          clearInterval(interval);
        }
      }, 2000);
    }
  }, [resultPdf]);

  useEffect(() => {
    if (!!result_xml && !!result_midi && !!result_mscz) {
      const interval = setInterval(async () => {
        const isXmlReady = await isFileAvailable(result_xml);
        const isMidiReady = await isFileAvailable(result_midi);
        const isMsczReady = await isFileAvailable(result_mscz);

        const filesReady = isXmlReady && isMidiReady && isMsczReady;
        setFileDownloadReady(filesReady);
        if (filesReady) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, [result_midi, result_mscz, result_xml]);

  const onDownload = useCallback(
    async (filename: string, fileType: FileType) => {
      // other file type : filename_musicxml
      // get the selected file
      let file;
      if (fileType === 'mid') {
        file = result_midi;
      } else if (fileType === 'mscz') {
        file = result_mscz;
      } else if (fileType === 'xml') {
        file = result_xml;
      }
      const isAvailable = await isFileAvailable(file);
      if (isAvailable) {
        const ext = getFileExtension(file);
        const payload = {
          filename,
          url: file,
          ext: ext,
        };
        posthog.capture(`halbestunde_${EVENTS.FILE_DOWNLOAD}`, payload);
        window.ipcRenderer.send('download', payload);
      } else {
        toast('File not ready for download, try again in 5 secs', {
          icon: '⌛️',
        });
      }
    },
    [getFileExtension, results],
  );

  useEffect(() => {
    window.ipcRenderer.on('download-progress', (_event, args) => {
      const { percent } = args;
      if (percent > 0) {
        setDownloadProgress(Math.floor(Number(percent) * 100));
        setIsDownloading(true);
      }
    });

    window.ipcRenderer.on('download-complete', () => {
      setDownloadDone(true);
      setIsDownloading(false);
    });

    window.ipcRenderer.on('download-error', () => {
      setDownloadDone(false);
      setIsDownloading(false);
    });
  }, []);

  return (
    <>
      <div className="h-full w-full flex flex-col gap-6 py-4 mb-4">
        <Flex className="flex flex-row px-6 items-center justify-between py-2">
          <Flex direction={'row'} align={'center'} gap={'4'}>
            <h3 className="text-xl font-bold">Ready to Download</h3>
          </Flex>
          <DownloadButton
            ready={fileDownloadReady}
            disabled={!fileDownloadReady}
            onClick={() => {
              setFilename('');
              setDownloadDone(false);
              setShowDownloadModal(true);
            }}
          >
            <DownloadIcon />
            Download
          </DownloadButton>
        </Flex>

        <div className="mx-6 grid grid-cols-2 gap-4 h-full">
          <Flex direction={'column'} gap={'4'} className="h-full">
            <OriginalTag>Original</OriginalTag>
            <div className="pdf-container bg-white">
              {sourceFileLoading ? (
                <div className="flex flex-col items-center">
                  <span className="text-black p-4">Loading</span>
                </div>
              ) : (
                <>
                  {isPDF(sourceFile) ? (
                    <PdfRenderer
                      url={sourceFile}
                    />
                  ) : (
                    <img
                      className="object-contain h-full w-full"
                      src={sourceFile}
                    />
                  )}
                </>
              )}
            </div>
          </Flex>
          <Flex direction={'column'} gap={'4'} className="h-full">
            <ConvertedTag>Converted</ConvertedTag>
            <div className="pdf-container bg-white">
              {showPreview ? (
                <PdfRenderer
                  url={resultPdf}
                />
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-black p-4">Loading</span>
                </div>
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
            <div className="flex flex-col items-start gap-1 p-2 w-full">
              {downloadDone && (
                <div className="flex flex-col justify-center items-center gap-2 mb-4 w-full">
                  <CheckIcon className="h-[40px] w-[40px]" />
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
                        onClick={() => {
                          setSelectedFile(type.type);
                        }}
                        className="flex flex-row items-center gap-2 text-[15px] font-jakarta cursor-pointer"
                      >
                        <Checkbox
                          value={type.type}
                          checked={selectedFile === type.type}
                          name={type.name}
                          color="cyan"
                          onCheckedChange={() => {
                            setSelectedFile(type.type);
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

              <div
                className={
                  'flex flex-row items-center justify-between w-full mt-1'
                }
              >
                <p className="text-[12px] text-center w-full text-primaryGreen">
                  Save to: ../Downloads/{filename}.{selectedFile}
                </p>
                {isDownloading && (
                  <p className="text-[10px]">{downloadProgress}%</p>
                )}
              </div>
            </div>
          }
          buttons={
            !downloadDone && (
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
            )
          }
        />
      )}
    </>
  );
};

export default React.memo(Download);
