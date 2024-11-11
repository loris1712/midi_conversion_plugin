/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as Sentry from '@sentry/electron/renderer';
import posthog from 'posthog-js';

import InitLoading from '@components/InitLoading';
import { signIn } from '@service/api';
import { saveAuthToken } from '@service/local';
import AppBar from './components/AppBar';
import Navigation from './layout/Navigation';
import NotAllowed from '@components/NotAllowed';
import { enableMuseChecks, EVENTS } from './constants';
import NoInternet from 'layout/NoInternet';

const App = () => {
  const [userActive, setUserActive] = useState(true);
  const [isOnline, setIsOnline] = useState(true)

  const { isLoading, data, isError, isSuccess, refetch } = useQuery({
    queryKey: ['appLoad'],
    queryFn: async () => {
      const { data } = await signIn();
      return data;
    },
  });

  useEffect(() => {
    window.addEventListener('online', () => {
      setIsOnline(true);
      refetch();
    });
    window.addEventListener('offline', () => {
      setIsOnline(false);
    });
  }, [refetch]);


  useEffect(() => {
    if (data) {
      const { IdToken } = data;
      if (IdToken) {
        saveAuthToken(IdToken);
      }
    }
  }, [data]);

  useEffect(() => {
    posthog.capture(`halbestunde_muse_${EVENTS.APP_INIT}`, {
      time: new Date(),
    });
    window.ipcRenderer.on('muse-user', (_ev, args) => {
      const { userInfo, activeSub, dev }: MuseResponse = args;
      //userId = userInfo.uuid;
      //subOption = subOption.status
      //activationStatus = activeSub.activationStatus
      posthog.capture(`halbestunde_muse_${EVENTS.USER_INFO}`, {
        userInfo,
        activeSub,
      });
      const allow =
        !!userInfo?.uuid &&
        activeSub.status === 0 &&
        activeSub.activationStatus === 1;
      if (!dev) {
        setUserActive(allow);
      }
    });
    window.ipcRenderer.on('muse-user-error', (_ev, args) => {
      const { dev } = args;
      Sentry.captureException({ ...args });
      if (!dev) {
        setUserActive(false);
      }
    });
  }, []);

  const isAllowed = useMemo(() => enableMuseChecks && userActive , [enableMuseChecks, userActive ])


  return (
    <main className="bg-black h-[100vh] w-dvw flex flex-col flex-1 relative overflow-hidden">
      <AppBar />
      {isOnline && (
        <>
          {isLoading && <InitLoading />}
          {!isSuccess && isError && (
            <div className="h-full w-full flex flex-col items-center justify-center">
              <p>Error Loading</p>
            </div>
          )}
          {!isLoading && isSuccess && isAllowed && <Navigation />}
          {!isAllowed ? <NotAllowed /> : null}
        </>
      )}
      {!isOnline && (
        <NoInternet/>
      )}
    </main>
  );
};

export default App;
