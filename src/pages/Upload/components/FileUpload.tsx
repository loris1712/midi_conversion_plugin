import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import posthog from 'posthog-js';
import { ReactComponent as UploadIcon } from '@assets/upload.svg';

import { v4 as uuidv4 } from 'uuid';
import { EVENTS } from '@constants/index';
import { getFileExtension } from '@utils/helpers';
import { useFileStore } from 'store';
import { GradientButton } from 'styles';

interface FileUploadProps {
  // eslint-disable-next-line no-unused-vars
  onUpload: () => void;
}

const FileUpload = ({ onUpload }: FileUploadProps) => {
  const { file, setFile } = useFileStore((state) => state);
  const [filename, setFilename] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFilename(selectedFile.name);
    const ext = getFileExtension(selectedFile.name);
    const newName = `${uuidv4()}.${ext}`;
    const renameFile = new File([selectedFile], newName, {
      type: selectedFile.type,
      lastModified: selectedFile.lastModified,
    });
    posthog.capture(`halbestunde_${EVENTS.FILE_SELECT}`, {
      type: selectedFile.type,
    });
    setFile(renameFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {},
  });
  return (
    <div className="h-full w-full p-[4vw] flex flex-col items-center justify-center">
      <div
        {...getRootProps()}
        className="p-[56px] max-w-[500px] w-full cursor-pointer border border-dashed border-uploadBorder rounded-[10px] flex flex-col items-center justify-end gap-4"
      >
        <input {...getInputProps()} />
        <UploadIcon />
        <div className="flex flex-col gap-3 items-center justify-center">
          <p className="text-[14px] font-[400] text-center">
            Drag your files or click to browse
          </p>
          <p className="text-[14px] font-[400] text-center">
            Image or PDF(multiple pages works as well)
          </p>
          {!!filename && (
            <div className='flex flex-col items-center gap-4 mt-4'>
              <GradientButton
                disabled={!file?.name}
                onClick={() => {
                  onUpload();
                }}
                className='w-[220px]'
              >
                Convert
              </GradientButton>
              <span className="font-bold text-primaryBlue text-[12px]">
                {filename}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
