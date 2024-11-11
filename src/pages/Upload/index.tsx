import React, { useMemo, useState } from 'react';
import axios from 'axios';
import posthog from 'posthog-js';
import { useMutation } from '@tanstack/react-query';
import FileUpload from './components/FileUpload';
import Processing from './components/Processing';
import Download from './components/Download';
import { generatePresignedUploadUrl, postUploadedFile } from '@service/api';
import { EVENTS } from '@constants/index';
import { useFileStore, useProcessingStateStore } from 'store';

const UploadPage: React.FC = () => {
  const { state, setState } = useProcessingStateStore((state) => state);

  const { file } = useFileStore();
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileProcessMutation = useMutation({
    mutationKey: ['fileUploads'],
    mutationFn: async (file: File) => {
      setIsUploading(true);
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
    onSuccess: () => {
      setIsUploading(false);
      setState('processing');
    },
  });

  const inFerenceId = useMemo(
    () => fileProcessMutation?.data?.inference_id,
    [fileProcessMutation?.data],
  );

  const CurrentView = {
    upload: (
      <FileUpload
        isUploading={isUploading}
        onUpload={() => {
          if (file) {
            fileProcessMutation.mutate(file);
            posthog.capture(`halbestunde_${EVENTS.FILE_UPLOAD}`, {});
          }
        }}
      />
    ),
    processing: (
      <Processing
        progress={progress}
        inferenceId={inFerenceId}
        isUploaded={!isUploading && !!inFerenceId}
        uploadNewFile={() => {
          setState('upload');
        }}
      />
    ),
    download: <Download />,
  }[state];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      {CurrentView}
    </div>
  );
};

export default UploadPage;
