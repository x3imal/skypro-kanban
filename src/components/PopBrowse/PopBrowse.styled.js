import styled, { css } from "styled-components";

const sm = ({ theme }) => `@media (max-width: ${theme?.breakpoints?.sm || "660px"})`;
const xs = ({ theme }) => `@media (max-width: ${theme?.breakpoints?.xs || "495px"})`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.4);
  z-index: 1000;
`;

export const Box = styled.div`
  position: relative;
  width: 630px;
  height: 492px;
  background: ${({ theme }) => theme.colors.white || "#FFFFFF"};
  border-radius: 10px;
  border: 0.7px solid #D4DBE5;
  box-shadow: 0 10px 39px rgba(26,56,101,0.21);
  padding: 40px 30px 48px 30px;
  box-sizing: border-box;
  overflow: hidden;

  ${sm} {
    width: min(630px, 96vw);
    height: auto;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const Ttl = styled.h3`
  margin: 0;
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

export const CatBadge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  background: ${({ theme }) => theme?.colors?.badge?.webdesign?.bg || "#FFE9B7"};
  color: ${({ theme }) => theme?.colors?.badge?.webdesign?.fg || "#000"};
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 370px 182px;
  grid-template-areas:
    "status status"
    "desc   dates";
  column-gap: 18px;
`;

export const Form = styled.form`
  display: contents;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatusField = styled(Field)`
  grid-area: status;
`;

export const Label = styled.label`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const StatusRow = styled.div`
  width: 570px;
  height: 60px;
  display: flex;
  align-items: center;
`;

export const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  background: #94A6BE;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
`;

export const StatusList = styled.div`
  width: 570px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: nowrap;
  overflow: hidden;
`;

export const StatusBtn = styled.button.attrs({ type: "button" })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 10px 14px;
  border-radius: 24px;
  border: 0.7px solid rgba(148,166,190,0.5);
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  white-space: nowrap;
  background: ${({ $active }) => ($active ? "#94A6BE" : "rgba(255,255,255,0.4)")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#94A6BE")};
`;

export const DescField = styled(Field)`
  grid-area: desc;
  gap: 21px;
`;

const areaBase = css`
  width: 370px;
  height: 200px;
  border-radius: 8px;
  padding: 14px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.4;
  outline: none;
  resize: none; 
`;

export const Area = styled.textarea`
  ${areaBase};
  background: ${({ $isEdit }) => ($isEdit ? "transparent" : "#EAEEF6")};
  border: ${({ $isEdit }) => ($isEdit ? "0.7px solid #94A6BE66" : "0.7px solid transparent")};

  &::placeholder {
    color: #94A6BE;
    letter-spacing: -0.14px;
  }
`;

export const CalendarCol = styled.div`
  grid-area: dates;
  width: 182px;
  align-self: start
`;

export const DatesLabel = styled(Label)`
  margin-bottom: 14px;
`;

export const Footer = styled.div`
  position: absolute;
  left: 30px;
  right: 30px;
  bottom: 48px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const btnBase = css`
    box-sizing: border-box;
    height: 30px;
    border-radius: 4px;
    padding: 0 14px; 
    display: inline-flex;
    align-items: center; 
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 1; 
    cursor: pointer;
`;

export const BtnOutlined = styled.button`
  ${btnBase};
  border: 0.7px solid #565EEF;
  background: transparent;
  color: #565EEF;
`;

export const BtnPrimary = styled.button`
  ${btnBase};
  border: none;
  background: #565EEF;
  color: #FFFFFF;
`;