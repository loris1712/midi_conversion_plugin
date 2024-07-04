import React from "react";


import pianoSvg from '../../assets/piano.svg'
import homeSvg from '../../assets/home.svg'
import musicSvg from '../../assets/music.svg'
import settingsSvg from '../../assets/settings.svg'
 
interface NavigationProps {
  children: React.ReactNode
}



const Navigation = ({ children }: NavigationProps) => {
  return (
    <main className="h-full w-full flex flex-row pt-[28px]">
      <nav className="flex flex-col w-[50px] items-center border-r border-[#FFFFFF1A]">
        <ul className="flex flex-col flex-1">
          <li className="nav-item">
            <a href="/">
              <img src={pianoSvg} />
            </a>
          </li>

          <li className="nav-item">
            <a href="/home">
              <img src={homeSvg} />
            </a>
          </li>

          <li className="nav-item">
            <a>
              <img src={musicSvg} />
            </a>
          </li>
        </ul>

        <li className="nav-item">
          <a href="/setting">
            <img src={settingsSvg} />
          </a>
        </li>
      </nav>
      <div className="px-1 h-full w-full">{children}</div>
    </main>
  );
};

export default Navigation