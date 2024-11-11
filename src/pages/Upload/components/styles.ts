import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as DownloadLogo } from '@assets/download-icon.svg';
import { GradientButton } from "@styles/index";


const wiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  75% {
    transform: rotate(-1deg);
  }
`;

export const FileNameInput = styled.input`
  border: 1px solid #2797c1;
  caret-color: #2797c1;
  padding: 8px 12px;
  border-radius: 4px;
  background: none;
  outline: none;
  width: 100%;
  font-size: 14px;
`;

export const DownloadButton = styled(GradientButton)<{ ready: boolean }>`
  ${({ ready }) =>
    ready &&
    css`
      animation: ${wiggle} 0.25s ease-in-out 2;
    `}
`;


export const DownloadIcon = styled(DownloadLogo)``;