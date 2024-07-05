import React, { useCallback } from "react";

import { NavItem, HomeIcon, SettingsIcon, MusicIcon, PianoIcon } from './styles';

 
interface NavigationProps {
  children: React.ReactNode
}

const Routes = [
  {
    name: 'Upload',
    path: '/',
    icon: <PianoIcon/>,
  },
  {
    name: 'Home',
    path: '/home',
    icon: <HomeIcon/>,
  },
  {
    name: 'Music',
    path: '/music',
    icon: <MusicIcon/>,
  },
];

const Navigation = ({ children }: NavigationProps) => {

  const activeRoute = useCallback((path: string)=> {
    return window.location.pathname.endsWith(path)
  }, []);

  return (
    <main className="h-full w-full flex flex-row pt-[28px]">
      <nav className="flex flex-col w-[50px] items-center border-r border-[#FFFFFF1A] flex-shrink-0 flex-grow-0">
        <ul className="flex flex-col flex-1">
          {Routes.map((route, idx) => (
            <NavItem
              href={route.path}
              isactive={activeRoute(route.path)}
              className="nav-item"
              key={`${route.name}_${idx}`}
            >
              {route.icon}
            </NavItem>
          ))}
        </ul>

        <li className="nav-item">
          <NavItem href="/settings" isactive={activeRoute("/settings")}>
            <SettingsIcon />
          </NavItem>
        </li>
      </nav>
      <div className="h-full w-full px-[1rem]">{children}</div>
    </main>
  );
};

export default Navigation