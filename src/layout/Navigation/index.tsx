import React from "react";
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


import {
  NavItem,
  HomeIcon,
  SettingsIcon,
  MusicIcon,
  PianoIcon,
  InactiveLink,
} from './styles';
import UploadPage from "@pages/Upload";
import HomePage from "@pages/Home";
import MusicPage from "@pages/Music";
import SettingsPage from "@pages/Settings";


interface NavLinkProp {
  name: string,
  path: string,
  icon: React.ReactNode,
  disabled?: boolean
}

const NavLinks: NavLinkProp[] = [
  {
    name: 'Upload',
    path: '/upload',
    icon: <PianoIcon />,
    disabled: false,
  },
  {
    name: 'Home',
    path: '/home',
    icon: <HomeIcon />,
    disabled: true,
  },
  {
    name: 'Music',
    path: '/music',
    icon: <MusicIcon />,
    disabled: true,
  },
];

const Navigation = () => {

  return (
    <div className="flex flex-1 flex-row h-full w-full">
      <HashRouter>
        <nav className="flex flex-col w-[50px] items-center border-r border-[#FFFFFF1A] flex-shrink-0 flex-grow-0 relative z-10 bg-black">
          <ul className="flex flex-col flex-1">
            {NavLinks.map((route, idx) => (
              <div key={uuidv4()}>
                {!route.disabled && (
                  <NavItem to={route.path} key={`${route.name}_${idx}`}>
                    {({ isActive }) =>
                      isActive ? (
                        <span className="active">{route.icon}</span>
                      ) : (
                        <span className="inactive">{route.icon}</span>
                      )
                    }
                  </NavItem>
                )}
              </div>
            ))}
          </ul>

          <NavItem to={'/setting'}>
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
    </div>
  );
};

export default Navigation