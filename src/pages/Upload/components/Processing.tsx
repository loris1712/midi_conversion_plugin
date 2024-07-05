import { useEffect, useState } from 'react';

import loadingBar from '@assets/loading.gif';
import { ReactComponent as LoadingRing } from '@assets/loading.svg';

const Processing = ({ isdone }: { isdone?: boolean }) => {
  const [showProcessing, setShowProcessing] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowProcessing(true);
    }, 5500);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col p-5 bg-[#262626] items-center justify-center gap-2 rounded-[8px] min-w-[376px] min-h-[171px] h-fit max-w-[400px]">
        {!showProcessing ? (
          <>
            <p>Uploading</p>
            <img src={loadingBar} />
          </>
        ) : (
          <>
            <LoadingRing className="h-[32px]" />
            <p className="font-medium text-[14px] text-center">
              The file is currently being processed. Depending on the workload
              and complexity of the conversion this can take several minutes.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Processing;
