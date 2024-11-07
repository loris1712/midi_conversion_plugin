import { useMemo } from 'react';
import { ReactComponent as ErrorIcon } from '@assets/icon-error.svg';
import { ReactComponent as DoneIcon } from '@assets/done-check-icon.svg';

import { Button } from '@radix-ui/themes';
import { GradientButton, Loader } from '@styles/index';
import useProcessingStateStore from '@store/useProcessingStateStore';

interface ProcessingProps {
  progress?: number;
  isError?: boolean;
  isUploaded?: boolean;
  isDone?: boolean;
  uploadNewFile?: any;
}

const Processing = ({
  isUploaded,
  isError,
  uploadNewFile,
}: ProcessingProps) => {
  const { setState, results } = useProcessingStateStore((state) => state);
  const isReadyToDownload = useMemo(
    () => results?.job_status === 'completed',
    [results],
  );

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="max-w-[415px]">
        {isError && (
          <div className="flex flex-col items-center gap-4 ">
            <ErrorIcon />
            <p>Whoops! File converting failed</p>
            <GradientButton onClick={uploadNewFile} className="px-6 mt-2">
              Reset
            </GradientButton>
          </div>
        )}

        {!isError && isUploaded && !isReadyToDownload && (
          <div className="flex flex-col items-center gap-4">
            <Loader>
              <div className="loader"></div>
            </Loader>
            <p className="font-medium text-[16px] text-center">
              The file is currently being processed. Depending on the workload
              and complexity of the conversion this can take several minutes.
            </p>
          </div>
        )}

        {!isError && isUploaded && isReadyToDownload && (
          <div className="flex flex-col items-center gap-4">
            <DoneIcon />
            <p className="w-[90%] text-center">
              The conversion is complete. You can preview your file and download
              MiDi, XML or Muse XML.
            </p>
            <GradientButton
              onClick={() => {
                setState('download');
              }}
            >
              Great, let's go
            </GradientButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Processing;
