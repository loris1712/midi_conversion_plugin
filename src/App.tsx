/* eslint-disable @typescript-eslint/no-var-requires */
import { useCallback, useEffect, useState } from 'react';
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

const App = () => {
  const [userActive, setUserActive] = useState(true);

  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['appLoad'],
    queryFn: async () => {
      const { data } = await signIn();
      return data;
    },
  });


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
      const { userInfo, activeSub, dev }: MuseResonse = args;
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
      {enableMuseChecks && !userActive ? <NotAllowed /> : null}
    </main>
  );
};

export default App;
