import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import FileUpload from "./components/FileUpload";
import Processing from './components/Processing';
import Download from "./components/Download";



type PAGE = 'upload' | 'processing' | 'download'

const UploadPage: React.FC = () => {

  const [page, setPage] = useState<PAGE>('processing');
  const [processDone, setProcessDone] = useState<boolean>(false);
  

  const fileProcessMutation = useMutation({
    mutationKey: ['fileUploads'],
    mutationFn: async (files: File[]) => {
      console.log({ files });
      setTimeout(()=> {
        return files;
      }, 8000)
      
    },
    onSuccess:()=> {
      setProcessDone(true);
      setPage('download')
    }
  });


  const onDownload = () => {
    alert('DOWNLOADING')
  };

  const uploadNewFile = () => {
    setPage('upload')
  }


  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      {page === 'upload' && (
        <FileUpload
          onUpload={(files) => {
            setPage('processing');
            fileProcessMutation.mutate(files);
          }}
        />
      )}
      {page === 'processing' && (
        <Processing isdone={processDone} />
      )}
      {page === 'download' && (
        <Download uploadNewFile={uploadNewFile} onDownload={onDownload} />
      )}
    </div>
  );
};

export default UploadPage;
