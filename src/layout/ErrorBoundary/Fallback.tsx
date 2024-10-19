import { useEffect } from 'react';
import { Button } from '@radix-ui/themes';
import * as Sentry from '@sentry/electron/renderer';


const Fallback = ({ error, resetErrorBoundary }: any) => {
  useEffect(() => {
    Sentry.captureEvent(error);
  }, [error]);
  return (
    <div
      role="alert"
      className="h-screen w-screen flex flex-col items-center justify-center gap-2 bg-black"
    >
      <h3 className="text-[24px] text-white">Oops</h3>
      <pre className="text-[14px] text-white text-center">
        Someting went wrong. <br />
        {error.message}
      </pre>
      <div className="flex flex-row gap-4">
        <Button
          className="bg-accent border-accent/70 rounded-[5px] text-[#121212] px-4 py-1 cursor-pointer"
          onClick={() => resetErrorBoundary()}
        >
          Reload
        </Button>
    
      </div>
    </div>
  );
};

export default Fallback;
