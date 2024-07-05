import { Button } from '@radix-ui/themes';
import { ReactComponent as CheckIcon } from '@assets/done-check.svg';

interface DownloadProps {
  uploadNewFile: () => void;
  onDownload: () => void;
}

const Download = ({ onDownload, uploadNewFile }: DownloadProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col p-5 bg-[#262626] items-center justify-center gap-2 rounded-[8px] min-w-[376px] w-fit min-h-[171px] h-fit max-w-[400px]">
        <CheckIcon className="h-[38px]" />
        <p className="font-medium text-[14px] text-center">
          The conversion is complete. You can download the converted file.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          style={{
            borderColor: 'var(--accent)!important',
          }}
          variant="outline"
          color='yellow'
          className="text-accent border-accent p-4 h-[42px]"
          onClick={uploadNewFile}
        >
          CONVERT NEW FILE
        </Button>

        <Button
          variant="solid"
          className="p-4 h-[42px] bg-accent text-black"
          onClick={onDownload}
        >
          DOWNLOAD
        </Button>
      </div>
    </div>
  );
};

export default Download;
