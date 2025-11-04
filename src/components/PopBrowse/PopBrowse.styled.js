import styled, { css } from "styled-components";

const sm = ({ theme }) => `@media (max-width: ${theme?.breakpoints?.sm || "660px"})`;
const xs = ({ theme }) => `@media (max-width: ${theme?.breakpoints?.xs || "495px"})`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.overlay || "rgba(0,0,0,.4)"};
  z-index: 1000;
`;

export const Box = styled.div`
  position: relative;
  width: 630px;
  height: 492px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => theme.colors.border || "#D4DBE5"};
  box-shadow: ${({ theme }) => theme.shadow?.card || "0 10px 39px rgba(26,56,101,0.21)"};
  padding: 40px 30px 48px 30px;
  box-sizing: border-box;
  overflow: hidden;

  ${sm} { width: min(630px, 96vw); height: auto; }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const Ttl = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
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
  background: ${({ theme }) => theme.colors.badge.webdesign.bg};
  color: ${({ theme }) => theme.colors.badge.webdesign.fg};
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
  color: ${({ theme }) => theme.colors.text};
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
  background: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.white};
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
  flex-wrap: nowrap;
  overflow: hidden;
    justify-content: space-between;
`;

export const StatusBtn = styled.button.attrs({ type: "button" })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 10px 14px;
  border-radius: 24px;
  border: 0.7px solid ${({ theme }) => theme.colors.border || "rgba(148,166,190,0.5)"};
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  white-space: nowrap;
  background: ${({ $active, theme }) => ($active ? theme.colors.muted : "rgba(255,255,255,0.04)")};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.muted)};
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
  color: ${({ theme }) => theme.colors.text};
`;

export const Area = styled.textarea`
  ${areaBase};
  background: ${({ $isEdit, theme }) => ($isEdit ? "transparent" : (theme.colors.surface2 || "#EAEEF6"))};
  border: ${({ $isEdit, theme }) => ($isEdit ? `0.7px solid ${theme.colors.inputBorder || "#94A6BE66"}` : "0.7px solid transparent")};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder || theme.colors.muted};
    letter-spacing: -0.14px;
  }
`;

export const CalendarCol = styled.div`
  grid-area: dates;
  width: 182px;
  align-self: start;
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
  transition: background-color .15s ease, color .15s ease, border-color .15s ease;
`;

export const BtnOutlined = styled.button`
  ${btnBase};
  border: 0.7px solid ${({ theme }) => theme.colors.brand};
  background: transparent;
  color: ${({ theme }) => theme.colors.brand};

  &:hover {
    border-color: ${({ theme }) => theme.colors.hoverBrand};
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.hoverBrand};
  }
`;

export const BtnPrimary = styled.button`
  ${btnBase};
   border: none;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.white};

  &:hover { background: ${({ theme }) => theme.colors.hoverBrand}; }
`;