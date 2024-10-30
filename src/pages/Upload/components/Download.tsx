import { useEffect, useState } from 'react';

import { Button } from '@radix-ui/themes';
import { ReactComponent as CheckIcon } from '@assets/done-check.svg';
import Modal from '@components/Modal';

import { FileNameInput } from './styles';
import CircleLoader from '@components/Loaders/CircleLoader';

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

const Download = ({ onDownload, uploadNewFile }: DownloadProps) => {
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
      <div className="h-full w-full flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col p-5 bg-[#262626] items-center justify-center gap-2 rounded-[8px] min-w-[376px] w-fit min-h-[171px] h-fit max-w-[400px]">
          <CheckIcon className="h-[38px]" />
          {!downloadDone && (
            <p className="font-medium text-[14px] text-center">
              The conversion is complete. You can download the converted file.
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            style={{
              borderColor: 'var(--accent)!important',
            }}
            variant="outline"
            color="yellow"
            className="text-accent border-accent p-4 h-[42px]"
            onClick={uploadNewFile}
          >
            CONVERT NEW FILE
          </Button>

          <Button
            disabled={downloadDone}
            variant="solid"
            className="p-4 h-[42px] bg-accent text-black"
            onClick={() => {
              setShowDownloadModal(true);
            }}
          >
            DOWNLOAD
          </Button>
        </div>
      </div>
      {showDownloadModal && (
        <Modal
          onClose={() => {
            setShowDownloadModal(false);
          }}
          title="Save As"
          content={
            <div className="flex flex-col items-start gap-1">
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
                        className="flex flex-row items-center gap-2 text-[12px]"
                      >
                        <input
                          name={type.type}
                          checked={selectedFile === type.type}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFile(type.type);
                            }
                          }}
                          type="checkbox"
                          className=" checked:bg-amber-500"
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
            <div className="flex flex-row gap-4">
              <Button
                variant='outline'
                disabled={!filename.length}
                onClick={() => {
                  setShowDownloadModal(false);
                }}
                className="bg-accent text-black px-8 disabled:bg-black/10"
              >
                Okay
              </Button>
              <Button
                disabled={!filename.length || isDownloading || !selectedFile}
                onClick={() => {
                  setDownloadProgress(1);
                  onDownload(filename, selectedFile);
                }}
                className="bg-accent text-black px-8"
              >
                {isDownloading && <CircleLoader />}
                Save
              </Button>
            </div>
          }
        />
      )}
    </>
  );
};

export default Download;
