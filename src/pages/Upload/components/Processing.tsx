import loadingBar from '@assets/loading.gif';
import { ReactComponent as LoadingRing } from '@assets/loading.svg';

interface ProcessingProps {
  isUploaded?: boolean;
  isDone?: boolean;
}

const Processing = ({ isDone, isUploaded }: ProcessingProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col p-5 bg-[#262626] items-center justify-center gap-2 rounded-[8px] min-w-[376px] min-h-[171px] h-fit max-w-[400px]">
        {isUploaded ? (
          <>
            <LoadingRing className="h-[32px]" />
            <p className="font-medium text-[14px] text-center">
              The file is currently being processed. Depending on the workload
              and complexity of the conversion this can take several minutes.
            </p>
          </>
        ) : (
          <>
            <p>Uploading</p>
            <img src={loadingBar} />
          </>
        )}
      </div>
    </div>
  );
};

export default Processing;
