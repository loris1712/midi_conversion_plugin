import styled, { css } from 'styled-components';

import { ReactComponent as PianoLogo } from '@assets/piano.svg';
import { ReactComponent as HomeLogo } from '@assets/home.svg';
import { ReactComponent as MusicLogo } from '@assets/music.svg';
import { ReactComponent as SettingLogo } from '@assets/settings.svg';

interface NavItemProps {
  isactive?: boolean;
}

export const NavItem = styled.a<NavItemProps>`
  ${({ isactive }) =>
    isactive
      ? css`
          svg {
            fill: #f5b40a;
            path {
              fill: #f5b40a;
            }
          }
        `
      : css`
          svg {
            fill: rgba(255, 255, 355, 0.6);
            path {
              fill: rgba(255, 255, 355, 0.6);
            }
          }
        `}
`;

export const HomeIcon = styled(HomeLogo)``;
export const PianoIcon = styled(PianoLogo)``;
export const MusicIcon = styled(MusicLogo)``;
export const SettingsIcon = styled(SettingLogo)``;
