/* eslint-disable @typescript-eslint/no-var-requires */
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import InitLoading from '@components/InitLoading';
import { signIn } from '@service/api';
import { saveAuthToken } from '@service/local';
import AppBar from './components/AppBar';
import Navigation from './layout/Navigation';
import { log } from '@utils/logger';
import NotAllowed from '@components/NotAllowed';
import { enableMuseChecks } from './constants';

const App = () => {
  const [shouldRestart, setShouldRestart] = useState(false);
  const [userActive, setUserActive] = useState(true);

  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['appLoad'],
    queryFn: async () => {
      const { data } = await signIn();
      return data;
    },
  });

  const checkForUpdates = useCallback(() => {
    window.ipcRenderer.on('check-updates', () => {
      log('CHECKING FOR UPDATES');
    });

    window.ipcRenderer.on('update-available', (info) => {
      log({ info });
    });

    window.ipcRenderer.on('update-downloaded', () => {
      log('UPDATES DOWNLOADED');
      setShouldRestart(true);
    });
  }, []);

  useEffect(() => {
    if (data) {
      const { IdToken } = data;
      if (IdToken) {
        saveAuthToken(IdToken);
      }
    }
  }, [data]);

  useEffect(() => {
    window.ipcRenderer.on('muse-user', (_ev, args) => {
      const { userInfo, activeSub, dev }: MuseResonse = args;
      //userId = userInfo.uuid;
      //subOption = subOption.status
      //activationStatus = activeSub.activationStatus
      const allow =
        !!userInfo?.uuid &&
        activeSub.status === 0 &&
        activeSub.activationStatus === 1;
      if (!dev) {
        setUserActive(allow);
      }
    });
    window.ipcRenderer.on('muse-user-error', (_ev, args) => {
      log(args);
      setUserActive(false);
    });
  }, []);

  useEffect(() => {
    checkForUpdates();
  }, [checkForUpdates]);

  return (
    <main className="bg-black h-dvh w-dvw flex flex-col flex-1 relative">
      <AppBar />
      {isLoading && <InitLoading />}
      {!isSuccess && isError && (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <p>Error Loading</p>
        </div>
      )}
      {!isLoading && isSuccess && <Navigation />}
      {shouldRestart && (
        <div className="fixed bottom-3 right-3 bg-red-500 rounded-md w-fit whitespace-nowrap p-2">
          Restart to install updates
        </div>
      )}
      {enableMuseChecks && !userActive ? <NotAllowed /> : null}
    </main>
  );
};

export default App;
