import styled from "styled-components";
import { Button } from "@radix-ui/themes";
import {ReactComponent as Chevron} from '@assets/chevron-icon.svg'

export const GradientButton = styled(Button)`
  min-height: fit-content;
  height: fit-content;
  padding: 12px 24px 12px 24px;
  gap: 12px;
  border-radius: 10px;
  background: linear-gradient(264.94deg, #28d0ac -5.57%, #2797c1 100%);
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: rgba(21, 37, 86, 1);
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer;
  &:active {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media screen and (max-width: 780px) {
    padding: 10px 16px 10px 16px;
    gap: 8px;
    font-size: 14px;
  }
`;


export const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: fit-content !important;
  }
`;

export const GradientOutlineButton = styled(Button)`
  width: fit-content;
  height: fit-content;
  gap: 12px;
  border-radius: 10px;
  border-image: linear-gradient(264.94deg, #28d0ac -5.57%, #2797c1 100%);
  border-style: solid;
  border-width: 1px;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  border-image-slice: 1;
  background-color: transparent;
  @media screen and (max-width: 780px) {
    padding: 8px 18px 8px 16px;
    gap: 8px;
    font-size: 14px;
  }
`;

export const Tag = styled.span`
  width: fit-content;
  min-height: 28px;
  height: fit-content;
  padding: 4px 16px 4px 16px;
  gap: 10px;
  border-radius: 12px;
  opacity: 0px;
  font-size: 14px;
  display: flex;
  flex-shrink: 0;
  
`;

export const OriginalTag = styled(Tag)`
  background-color: #2d3131;
  color: #fff;
`;

export const ConvertedTag = styled(Tag)`
  background-color: #182c2a;
  color: rgba(40, 208, 172, 1);
`;

export const RightChevron = styled(Chevron)``;
export const LeftChevron = styled(Chevron)`
  rotate: 180deg;
`;

export const RoundButton = styled.button`
  width: 24px;
  height: 24px;
  gap: 10px;
  border-radius: 40px;
  opacity: 1;
  background-color: rgba(40, 208, 172, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:active {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  ${RightChevron} {
    fill: #000;
    height: 16px;
  }
  ${LeftChevron} {
    fill: #000;
    height: 16px;
  }
`;


export const Loader = styled.div`
  
  .loader {
    width: 50px;
    aspect-ratio: 1;
    display: grid;
    color: #28caaf;
    background: radial-gradient(
      farthest-side,
      currentColor calc(100% - 6px),
      #0000 calc(100% - 5px) 0
    );
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 13px),
      #000 calc(100% - 12px)
    );
    border-radius: 50%;
    animation: l19 2s infinite linear;
  }
  .loader::before,
  .loader::after {
    content: '';
    grid-area: 1/1;
    background: linear-gradient(currentColor 0 0) center,
      linear-gradient(currentColor 0 0) center;
    background-size: 100% 10px, 10px 100%;
    background-repeat: no-repeat;
  }
  .loader::after {
    transform: rotate(45deg);
  }

  @keyframes l19 {
    100% {
      transform: rotate(1turn);
    }
  }
`;


export const AppLoading = styled.div`
  width: 220px;
  height: 6px;
  border-radius: 5px;
  background: linear-gradient(90deg, #0000, #2797c1) left -50px top 0/50px 20px no-repeat
    lightblue;
  animation: l2 2s infinite linear;
  @keyframes l2 {
    100% {
      background-position: right -50px top 0;
    }
  }
`;