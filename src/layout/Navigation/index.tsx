import React from "react";
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import { NavItem, HomeIcon, SettingsIcon, MusicIcon, PianoIcon } from './styles';
import UploadPage from "@pages/Upload";
import HomePage from "@pages/Home";
import MusicPage from "@pages/Music";
import SettingsPage from "@pages/Settings";


interface NavLinkProp {
  name: string,
  path: string,
  icon: React.ReactNode,
}

const NavLinks: NavLinkProp[] = [
  {
    name: 'Upload',
    path: '/upload',
    icon: <PianoIcon />,
  },
  {
    name: 'Home',
    path: '/home',
    icon: <HomeIcon />,
  },
  {
    name: 'Music',
    path: '/music',
    icon: <MusicIcon />,
  },
];

const Navigation = () => {

  return (
    <main className="h-full w-full flex flex-row pt-[28px] relative">
      <HashRouter>
        <nav className="flex flex-col w-[50px] items-center border-r border-[#FFFFFF1A] flex-shrink-0 flex-grow-0 relative z-10 bg-black mt-2">
          <ul className="flex flex-col flex-1">
            {NavLinks.map((route, idx) => (
              <NavItem to={route.path} key={`${route.name}_${idx}`}>
                {({ isActive }) =>
                  isActive ? (
                    <span className="active">{route.icon}</span>
                  ) : (
                    <span className="inactive">{route.icon}</span>
                  )
                }
              </NavItem>
            ))}
          </ul>

          <div className="nav-item">
            <NavItem to="/setting">
              {({ isActive }) =>
                isActive ? (
                  <span className="active">
                    <SettingsIcon />
                  </span>
                ) : (
                  <span className="inactive">
                    <SettingsIcon />
                  </span>
                )
              }
            </NavItem>
          </div>
        </nav>
        <div className="h-full w-full px-[1rem]">
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
    </main>
  );
};

export default Navigation