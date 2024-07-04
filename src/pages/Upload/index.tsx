import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import uploadIcon from '@assets/upload.svg';
import { Button } from '@radix-ui/themes';

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log({ acceptedFiles });
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });


  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      <div
        {...getRootProps()}
        className="p-[56px] max-w-[500px] w-full cursor-pointer border border-dashed border-uploadBorder rounded-[10px] flex flex-col items-center justify-end gap-4"
      >
        <input {...getInputProps()} />
        <img src={uploadIcon} />
        <div className="flex flex-col gap-3 items-center justify-center">
          <p className="text-[14px] font-[400] text-center">
            Drag your files or click to browse
          </p>
          <p className="text-[14px] font-[400] text-center">
            Image or PDF(multiple pages works as well)
          </p>
        </div>
      </div>

      {files?.length && (
        <Button className="bg-accent border-accent/70 rounded-[5px] text-[#121212]">
          CONVERT
        </Button>
      )}
    </div>
  );
};

export default UploadPage;
