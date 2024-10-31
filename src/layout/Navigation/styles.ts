import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeLogo } from '@assets/home.svg';
import { ReactComponent as MusicLogo } from '@assets/music.svg';
import { ReactComponent as SettingLogo } from '@assets/settings.svg';
import { ReactComponent as AppLogo } from '@assets/app-icon.svg';
import { ReactComponent as PlusIconSvg } from '@assets/plus-icon.svg';


export const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  height: 50px;
  align-items: center;
  justify-content: center;
  .active {
    svg {
      fill: rgba(40, 208, 172, 1);
      path {
        fill: rgba(40, 208, 172, 1);
      }
    }
  }
  .inactive {
    svg {
      fill: rgba(255, 255, 355, 0.6);
      path {
        fill: rgba(255, 255, 355, 0.6);
      }
    }
  }
`;

export const InactiveLink = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  align-items: center;
  justify-content: center;
  cursor: not-allowed;
  svg {
    fill: rgba(255, 255, 355, 0.6);
    path {
      fill: rgba(255, 255, 355, 0.6);
    }
  }
`;

export const HomeIcon = styled(HomeLogo)``;
export const PianoIcon = styled(AppLogo)``;
export const MusicIcon = styled(MusicLogo)``;
export const SettingsIcon = styled(SettingLogo)``;
export const PlusIcon = styled(PlusIconSvg)``;
