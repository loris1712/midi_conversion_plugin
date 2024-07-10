import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as PianoLogo } from '@assets/piano.svg';
import { ReactComponent as HomeLogo } from '@assets/home.svg';
import { ReactComponent as MusicLogo } from '@assets/music.svg';
import { ReactComponent as SettingLogo } from '@assets/settings.svg';

export const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  height: 50px;
  align-items: center;
  justify-content: center;
  .active {
    svg {
      fill: #f5b40a;
      path {
        fill: #f5b40a;
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
export const PianoIcon = styled(PianoLogo)``;
export const MusicIcon = styled(MusicLogo)``;
export const SettingsIcon = styled(SettingLogo)``;
