import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import { NavItem, SettingsIcon, PianoIcon, PlusIcon } from './styles';
import UploadPage from '@pages/Upload';
import HomePage from '@pages/Home';
import MusicPage from '@pages/Music';
import SettingsPage from '@pages/Settings';
import useProcessingStateStore from '@store/useProcessingStateStore';
import useFileStore from '@store/useFileStore';


const Navigation = () => {
  const { setState, setResults } = useProcessingStateStore((store) => store);
  const {setFile} = useFileStore(state => state);


  const newUpload = () => {
    setState('upload');
    setResults(null);
    setFile(null);
  }

  return (
    <div className="flex flex-1 flex-row h-full w-full">
      <HashRouter>
        <nav className="flex h-full flex-col min-w-[60px] w-[72px] max-w-[8vw] items-center justify-between flex-shrink-0 flex-grow-0 relative z-10 bg-[#222525]">
          <ul className="flex flex-col mt-4">
            <NavItem onClick={newUpload} to={'/upload'}>
              <PianoIcon />
            </NavItem>
          </ul>

          <ul className='mb-4'>
            <NavItem onClick={newUpload} to={'/upload'}>
              <PlusIcon />
            </NavItem>
            <NavItem to={'/setting'}>
              <span className="active">
                <SettingsIcon />
              </span>
            </NavItem>
          </ul>
        </nav>
        <div className="h-full w-full overflow-hidden bg-[#171a1a]">
          <Routes>
            <Route
              path="*"
              element={<Navigate to="/upload" replace={true} />}
            />
            <Route path={'/upload'} element={<UploadPage />} />
            <Route path={'/home'} element={<HomePage />} />
            <Route path={'/music'} element={<MusicPage />} />
            <Route path={'/setting'} element={<SettingsPage />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default Navigation;
