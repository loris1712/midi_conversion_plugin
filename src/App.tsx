/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import InitLoading from '@components/InitLoading';
import { signIn } from '@service/api';
import { saveAuthToken } from '@service/local';
import AppBar from './components/AppBar';
import Navigation from './layout/Navigation';



const App = () => {

  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['appLoad'],
    queryFn: async ()=> {
      const email = 'aephisarh@gmail.com';
      const password = 'TWRFb84zGJz34v3';
      const {data} = await signIn(email, password);
      return data
    }
  });

  useEffect(() => {
    if(data){
      const { IdToken } = data;
      if (IdToken) {
        saveAuthToken(IdToken);
      }
    }
  }, [data]);

  useEffect(()=> {
    window.ipcRenderer.on('check-updates', () => {
      console.log("CHECKING FOR UPDATES")
    });

    window.ipcRenderer.on('update-downloaded', () => {
      console.log('UPDATES DOWNLOADED');
    });
  }, [])

  return (
    <div className="h-screen w-screen bg-black">
      <AppBar />
      {isLoading && <InitLoading />}
      {!isSuccess && isError && (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <p>Error Loading</p>
        </div>
      )}
      {!isLoading && isSuccess && <Navigation />}
    </div>
  );
};

export default App;
