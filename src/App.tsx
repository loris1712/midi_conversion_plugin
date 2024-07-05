import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppBar from './components/AppBar';
import UploadPage from './pages/Upload';
import Navigation from './layout/Navigation';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';
import MusicPage from '@pages/Music';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import InitLoading from '@components/InitLoading';
import { signIn } from '@service/api';
import { saveAuthToken } from '@service/local';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <UploadPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      path: '/music',
      element: <MusicPage />,
    },
    {
      path: '/setting',
      element: <SettingsPage />,
    },
  ],
  {
    basename: '/',
  },
);

const App = () => {

  const { isLoading, data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['appLoad'],
    queryFn: async ()=> {
      const email = 'aephisarh@gmail.com';
      const password = 'TWRFb84zGJz34v3';
      const {data} = await signIn(email, password);
      return data
    }
  });

  console.log({ isFetching, isLoading });

  useEffect(() => {
    if(data){
      const { IdToken } = data;
      if (IdToken) {
        saveAuthToken(IdToken);
      }
    }
  }, [data]);

  return (
    <div className="h-screen w-screen bg-black">
      <AppBar />
      {isLoading && <InitLoading />}
      {!isSuccess && isError && (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <p>Error Loading</p>
        </div>
      )}
      {!isLoading && isSuccess && (
        <Navigation>
          <RouterProvider router={router} />
        </Navigation>
      )}
    </div>
  );
};

export default App;
