import styled, { css } from "styled-components";
import {normalizeKey} from "../../utils/normalizeKey.js";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.4);
  z-index: 1000;
`;

export const Dialog = styled.div`
  position: relative;
    background: ${({ theme }) => theme.colors.white || "#FFFFFF"};
  border-radius: 10px;
  border: 0.7px solid #D4DBE5;
  box-shadow: 0 10px 39px rgba(26,56,101,0.21);
  max-width: 630px;
  width: min(630px, 92vw);
  padding: 40px 30px 48px;
  @media (max-width: 660px) {
    border-radius: 0;
  }
  @media (max-width: 495px) {
    padding: 20px 16px 32px;
  }
`;

export const Content = styled.div`
  display: block;
  text-align: left;
`;

export const Title = styled.h3`
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin: 0 0 20px 0;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 660px) {
    display: block;
  }
`;

export const Form = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;

  @media (max-width: 495px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const Subttl = styled.label`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 20px;
  }
`;

const inputBase = css`
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148,166,190,0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94A6BE;
    letter-spacing: -0.14px;
  }
`;

export const Input = styled.input`
  ${inputBase};
  margin-top: 14px;
`;

export const TextArea = styled.textarea`
  ${inputBase};
  margin-top: 14px;
  height: 200px;

  @media (max-width: 495px) {
    height: 34px; 
    max-width: 100%;
  }
`;

export const Categories = styled.div`
  margin: 20px 0;
`;

export const CategoriesTitle = styled.p`
  margin-bottom: 14px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const Themes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;
`;

export const ThemePill = styled.button.attrs({ type: "button" })`
    display: inline-flex;
    align-items: center;
    height: 30px;
    padding: 8px 20px;
    border-radius: 24px;
    border: 0;

    ${({theme, $variant = "webdesign"}) => {
        const key = normalizeKey($variant);
        const badge = theme.colors.badge[key] ?? theme.colors.badge.webdesign;
        return `
      background: ${badge.bg};
      color: ${badge.fg};
    `;
    }}

    opacity: ${({$active}) => ($active ? 1 : 0.4)};
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
    cursor: pointer;
`;


export const CreateButton = styled.button`
  width: 132px;
  height: 30px;
  background-color: #565EEF;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #FFFFFF;
  float: right;
  transition: background-color .15s ease;

  &:hover {
    background-color: #33399b; 
  }

  @media (max-width: 495px) {
    width: 100%;
    height: 40px;
    float: none;
  }
`;
