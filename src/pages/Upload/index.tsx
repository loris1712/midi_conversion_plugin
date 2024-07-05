import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Processing from './components/Processing';



type PAGE = 'upload' | 'processing' | 'download'

const UploadPage: React.FC = () => {

  const [page, setPage] = useState<PAGE>('processing');
  

  const fileProcessMutation = useMutation({
    mutationKey: ['fileUploads'],
    mutationFn: async (files: File[]) => {
      console.log({ files });
      return files;
    },
  });


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
      {page === 'processing' && <Processing />}
    </div>
  );
};

export default UploadPage;
