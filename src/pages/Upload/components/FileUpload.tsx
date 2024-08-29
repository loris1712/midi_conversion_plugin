import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { ReactComponent as UploadIcon } from '@assets/upload.svg';
import { Button } from '@radix-ui/themes';

import { v4 as uuidv4 } from 'uuid';


interface FileUploadProps {
    // eslint-disable-next-line no-unused-vars
    onUpload: (file: File) => void
}

const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [files, setFiles] = useState<File>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const ext = file.name.split('.')[1];
    const newname = `${uuidv4()}.${ext}`;
    const renamefile = new File([file], newname, {
      type: file.type,
      lastModified: file.lastModified,
    });
    setFiles(renamefile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {}
  });
  return (
    <>
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
        </div>
      </div>

      {!!files?.name && (
        <Button
          onClick={() => {
            onUpload(files)
          }}
          className="bg-accent border-accent/70 rounded-[5px] text-[#121212]"
        >
          CONVERT
        </Button>
      )}
    </>
  );
};

export default FileUpload;
