import styled from "styled-components";
import { Button } from "@radix-ui/themes";

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
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;

  @media screen and (max-width: 780px) {
    padding: 10px 16px 10px 16px;
    gap: 8px;
    font-size: 14px;
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

export const RoundButton = styled.button`
  width: 24px;
  height: 24px;
  gap: 10px;
  border-radius: 40px;
  opacity: 1;
  background-color: rgba(40, 208, 172, 1);
  &:disabled{
    opacity: 0.4;
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
