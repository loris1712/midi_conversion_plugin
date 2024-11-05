import { log } from '@utils/logger';
import { useEffect, useState } from 'react';
import { GradientButton } from 'styles';

const SettingsPage = () => {

  const [hasUpdates, setHasUpdates] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [feedback, setFeedback] = useState("")

  useEffect(()=> {
    window.ipcRenderer.on('check-updates-response', (_ev, result) => {
      log(result);
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
    setFeedback('Installing updates')
    window.ipcRenderer.send('install-update');
    setInstalling(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      {hasUpdates ? (
        <GradientButton disabled={installing} className='disabled:bg-accent'  onClick={instllUpdates}>
          Install updates
        </GradientButton>
      ) : (
        <GradientButton onClick={checkForUpdates}>
          Check for updates
        </GradientButton>
      )}
      <p className='text-[12px] h-[14px]'>{feedback}</p>
    </div>
  );
};

export default SettingsPage;
