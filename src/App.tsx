/* eslint-disable @typescript-eslint/no-var-requires */
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import InitLoading from '@components/InitLoading';
import { signIn } from '@service/api';
import { saveAuthToken } from '@service/local';
import AppBar from './components/AppBar';
import Navigation from './layout/Navigation';

const App = () => {


  const [shouldRestart, setShouldRestart] = useState(false)

  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['appLoad'],
    queryFn: async () => {
      const email = 'plugin@halbestunde.com';
      const password = 'Q45A|fmbh#';
      const { data } = await signIn(email, password);
      return data;
    },
  });

  const checkForUpdates = useCallback(() => {
    window.ipcRenderer.on('check-updates', () => {
      console.log('CHECKING FOR UPDATES');
    });

    window.ipcRenderer.on('update-available', (info) => {
      console.log({info})
    });

    window.ipcRenderer.on('update-downloaded', () => {
      console.log('UPDATES DOWNLOADED');
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
    </main>
  );
};

export default App;
