import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import { NavItem, PianoIcon, PlusIcon, QuestionIcon } from './styles';
import UploadPage from '@pages/Upload';
import HomePage from '@pages/Home';
import MusicPage from '@pages/Music';
import SettingsPage from '@pages/Settings';
import useProcessingStateStore from '@store/useProcessingStateStore';
import useFileStore from '@store/useFileStore';
import Faqs from '@pages/Faqs';

const Navigation = () => {
  const { setState, setResults } = useProcessingStateStore((store) => store);
  const { setFile } = useFileStore((state) => state);

  const newUpload = () => {
    setState('upload');
    setResults(null);
    setFile(null);
  };

  return (
    <div className="flex flex-1 flex-row h-full w-full">
      <HashRouter>
        <nav className="flex h-full flex-col min-w-[60px] w-[72px] max-w-[8vw] items-center justify-between flex-shrink-0 flex-grow-0 relative z-10 bg-[#222525]">
          <ul className="flex flex-col mt-4">
            <NavItem onClick={newUpload} to={'/upload'}>
              <span id="home">
                <PianoIcon />
              </span>
              <ReactTooltip anchorSelect="#home" place="right">
                Hasbestunde
              </ReactTooltip>
            </NavItem>
          </ul>

          <ul className="absolute bottom-4 h-[100px] w-full flex flex-col gap-3">
            <NavItem onClick={newUpload} to={'/upload'}>
              <span id="new-upload">
                <PlusIcon />
              </span>
              <ReactTooltip anchorSelect="#new-upload" place="right">
                New Upload
              </ReactTooltip>
            </NavItem>
            <NavItem to={'/faqs'}>
              <span id="faqs">
                <QuestionIcon />
              </span>
              <ReactTooltip anchorSelect="#faqs" place="right">
                FAQs
              </ReactTooltip>
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
            <Route path={'/faqs'} element={<Faqs />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default Navigation;
