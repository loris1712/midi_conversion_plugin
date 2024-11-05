import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import posthog from 'posthog-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import FileUpload from './components/FileUpload';
import Processing from './components/Processing';
import Download from './components/Download';
import {
  generatePresignedUploadUrl,
  getResults,
  postUploadedFile,
} from '@service/api';
import { EVENTS } from '@constants/index';
import { useFileStore, useProcessingStateStore } from 'store';

const UploadPage: React.FC = () => {
  const { state, setState, setResults } = useProcessingStateStore(
    (state) => state,
  );

  console.log({ state });

  const timeoutId = useRef<any>(null);
  const { file } = useFileStore();
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [inferenceId, setInferenceId] = useState();

  const fileProcessMutation = useMutation({
    mutationKey: ['fileUploads'],
    mutationFn: async (file: File) => {
      setIsUploaded(true);
      const { data } = await generatePresignedUploadUrl(file.name);
      const { url, filename } = data;
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
        pdf_image: file.type.includes('pdf'),
      });

      return uploadResponse.data;
    },
    onSuccess: (data) => {
      setInferenceId(data?.inference_id);
    },
  });

  const {
    refetch,
    data: resultBody,
    isError: referenceError,
  } = useQuery({
    queryKey: [inferenceId],
    queryFn: async () => {
      if (inferenceId) {
        const response = await getResults(inferenceId);
        setResults(response.data);
        return response.data;
      }
      return null;
    },
  });

  useEffect(() => {
    if (inferenceId && resultBody && resultBody?.job_status === 'running') {
      timeoutId.current = setInterval(() => {
        refetch();
      }, 3000);
    } else if (resultBody?.job_status === 'completed') {
      clearInterval(timeoutId.current);
    }
  }, [inferenceId, resultBody, refetch]);

 
  const CurrentView = {
    upload: (
      <FileUpload
        onUpload={() => {
          if (file) {
            setState('processing');
            fileProcessMutation.mutate(file);
            posthog.capture(`halbestunde_${EVENTS.FILE_UPLOAD}`, {});
          }
        }}
      />
    ),
    processing: (
      <Processing
        progress={progress}
        isError={referenceError || fileProcessMutation.isError}
        uploadNewFile={() => {
          setState('upload');
        }}
        isUploaded={isUploaded}
      />
    ),
    download: (
      <Download />
    ),
  }[state];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      {CurrentView}
    </div>
  );
};

export default UploadPage;
