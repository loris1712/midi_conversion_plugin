import { Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

const SettingsPage = () => {

  const [hasUpdates, setHasUpdates] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [feedback, setFeedback] = useState("")

  useEffect(()=> {
    window.ipcRenderer.on('check-updates-response', (_ev, result) => {
      console.log(result);
      if(result){
        setFeedback('Updates available, install now?');
        setHasUpdates(true);
      }else {
        setFeedback('No updates available')
      }
    });
  }, [window])


  const checkForUpdates = () => {
    setFeedback('Checking for updates')
    window.ipcRenderer.send('check-updates');
  };

  const instllUpdates = () => {
    window.ipcRenderer.send('install-update');
    setInstalling(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      {hasUpdates ? (
        <Button disabled={installing} color="amber" onClick={instllUpdates}>
          Install updates
        </Button>
      ) : (
        <Button color="amber" onClick={checkForUpdates}>
          Check for updates
        </Button>
      )}
      <p className='text-[12px] h-[14px]'>{feedback}</p>
    </div>
  );
};

export default SettingsPage;
