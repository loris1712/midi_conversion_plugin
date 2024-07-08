import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import FileUpload from './components/FileUpload';
import Processing from './components/Processing';
import Download from './components/Download';
import { generatePresignedUploadUrl, getResults, postUploadedFile } from '@service/api';

type PAGE = 'upload' | 'processing' | 'download';

const UploadPage: React.FC = () => {

  const timeoutId = useRef<any>(null)

  const [page, setPage] = useState<PAGE>('upload');
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileLinks, setFileLinks] = useState<any>({})
  const [inferenceId, setInferenceId] = useState();



  const fileProcessMutation = useMutation({
    mutationKey: ['fileUploads'],
    mutationFn: async (file: File) => {
      const { data } = await generatePresignedUploadUrl(file.name);
      const { url, filename } = data;
      setIsUploaded(true);
      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (e) => {
          const total = e.total ?? 1;
          const completed = Math.round((e.loaded * 100) / total);
          setProgress(completed);
        },
      });
      const uploadResponse = await postUploadedFile({
        filename,
        pdf_image: file.type.includes("pdf"),
      });

      return uploadResponse.data;
    },
    onSuccess: (data) => {
      setInferenceId(data?.inference_id);
    }
  });

  const {refetch, data: results, isError: referenceError} = useQuery({
    queryKey:[inferenceId],
    queryFn: async ()=> {
      if(inferenceId){
        const response = await getResults(inferenceId);
        return response.data;
      }
      return null
    }
  });


  useEffect(() => {
    if (inferenceId && results && results?.job_status === 'running') {
      timeoutId.current = setInterval(()=> {
        refetch()
      }, 3000)
    }
    if (results?.job_status === 'completed') {
      setFileLinks(results);
      setPage('download');
      clearInterval(timeoutId.current);
    }
  }, [inferenceId, results, refetch]);

  const onDownload = (filename: string) => {
    // other file type : filename_musicxml
    const payload = {
      filename,
      url: fileLinks.body.filename_midi,
      ext: getFileExtension(fileLinks.body.filename_midi),
    };
    window.ipcRenderer.send('download', payload);
  };

  const getFileExtension = (link: string) => {
    return String(link).split('.').pop()
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
        <Processing
          isError={referenceError || fileProcessMutation.isError}
          uploadNewFile={() => {
            setPage('upload');
          }}
          isUploaded={isUploaded}
          isDone={progress >= 100}
        />
      )}
      {page === 'download' && (
        <Download
          ext={getFileExtension(fileLinks.body.filename_midi)}
          onDownload={onDownload}
          uploadNewFile={() => {
            setPage('upload');
          }}
        />
      )}
    </div>
  );
};

export default UploadPage;
