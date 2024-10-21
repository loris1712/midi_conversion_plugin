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

type PAGE = 'upload' | 'processing' | 'download';

const UploadPage: React.FC = () => {
  const timeoutId = useRef<any>(null);

  const [page, setPage] = useState<PAGE>('upload');
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileLinks, setFileLinks] = useState<any>({});
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
    data: results,
    isError: referenceError,
  } = useQuery({
    queryKey: [inferenceId],
    queryFn: async () => {
      if (inferenceId) {
        const response = await getResults(inferenceId);
        return response.data;
      }
      return null;
    },
  });

  useEffect(() => {
    if (inferenceId && results && results?.job_status === 'running') {
      timeoutId.current = setInterval(() => {
        refetch();
      }, 3000);
    }
    if (results?.job_status === 'completed') {
      setFileLinks(results);
      setPage('download');
      clearInterval(timeoutId.current);
    }
  }, [inferenceId, results, refetch]);

  const onDownload = (filename: string, fileType: FileType) => {
    // other file type : filename_musicxml
    // get the selected file
    let file;
    if (fileType === 'mid') {
      file = fileLinks.body.result_midi;
    } else if (fileType === 'mscz') {
      file = fileLinks.body.result_mscz;
    } else if (fileType === 'xml') {
      file = fileLinks.body.result_xml;
    }
    const ext = getFileExtension(file);
    const payload = {
      filename,
      url: file,
      ext: ext,
    };
    posthog.capture(`halbestunde_${EVENTS.FILE_DOWNLOAD}`, payload);
    window.ipcRenderer.send('download', payload);
  };

  const getFileExtension = (link: string) => {
    return String(link).split('.').pop();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      {page === 'upload' && (
        <FileUpload
          onUpload={(files) => {
            setPage('processing');
            fileProcessMutation.mutate(files);
            posthog.capture(`halbestunde_${EVENTS.FILE_UPLOAD}`, {});
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
