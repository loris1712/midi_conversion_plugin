import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import FileUpload from './components/FileUpload';
import Processing from './components/Processing';
import Download from './components/Download';
import { generatePresignedUploadUrl } from '@service/api';

type PAGE = 'upload' | 'processing' | 'download';

const UploadPage: React.FC = () => {
  const [page, setPage] = useState<PAGE>('upload');
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);

  const fileLinks = {
    job_status: 'completed',
    body: {
      filename_musicxml:
        'https://onlinetestcase.com/wp-content/uploads/2023/06/5-MB-MP3.mp3',
      filename_midi:
        'https://onlinetestcase.com/wp-content/uploads/2023/06/5-MB-MP3.mp3',
    },
  };

  const fileProcessMutation = useMutation({
    mutationKey: ['fileUploads'],
    mutationFn: async (file: File) => {
      const { data } = await generatePresignedUploadUrl(file.name);
      const { url } = data;
      setIsUploaded(true);
      const uploadResponse = await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (e) => {
          const total = e.total ?? 1;
          const completed = Math.round((e.loaded * 100) / total);
          setProgress(completed);
        },
      });
      console.log({ uploadResponse });
      return uploadResponse.data;
    },
    onSuccess: () => {
      setPage('download');
    },
    onError: (error) => {
      console.log('UPLOAD ERROR', error);
    },
  });

  const onDownload = (filename: string) => {
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
        <Processing isUploaded={isUploaded} isDone={progress >= 100} />
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
