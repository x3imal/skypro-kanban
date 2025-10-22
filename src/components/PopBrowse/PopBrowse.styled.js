import styled from "styled-components";

const sm = ({ theme }) => `@media (max-width: ${theme?.breakpoints?.sm || "660px"})`;
const xs = ({ theme }) => `@media (max-width: ${theme?.breakpoints?.xs || "495px"})`;

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    display: ${({ open }) => (open ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.4);
    z-index: 1000;
`;

export const Box = styled.div`
    position: relative;
    background: ${({ theme }) => theme.colors.white};
    max-width: 630px;
    width: min(630px, 92vw);
    padding: 40px 30px 38px;
    border-radius: 10px;
    border: 0.7px solid #D4DBE5;
    box-shadow: 0 10px 39px rgba(26,56,101,0.21);

    ${sm} {
        border-radius: 0;
        padding: 28px 20px 30px;
    }
`;

export const Content = styled.div`
    display: block;
    text-align: left;
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
`;

export const Ttl = styled.h3`
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 28px;  
    font-weight: 700;
    line-height: 34px;
`;

export const CatBadge = styled.div`
    display: inline-flex;
    align-items: center;
    height: 30px;
    padding: 8px 20px;
    border-radius: 24px;
    background: ${({ theme, $category = "gray" }) =>
            theme.colors.badge?.[$category]?.bg || theme.colors.badge.gray.bg};

    p {
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
        color: ${({ theme, $category = "gray" }) =>
                theme.colors.badge?.[$category]?.fg || theme.colors.badge.gray.fg};
        white-space: nowrap;
    }
`;

export const Wrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;

    ${sm} {
        display: block;
    }
`;

export const Form = styled.form`
    max-width: 370px;
    width: 100%;
    display: block;
    margin-bottom: 20px;

    ${sm} {
        max-width: 100%;
    }
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;

    & + & {
        margin-top: 20px;
    }
`;

export const Label = styled.label`
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 14px;
`;

export const StatusPill = styled.span`
    display: inline-block;
    height: 30px;
    padding: 8px 20px;
    border-radius: 24px;
    background: #94A6BE;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
    width: max-content;
`;

export const Area = styled.textarea`
    max-width: 370px;
    width: 100%;
    outline: none;
    padding: 14px;
    background: transparent; /* как в попапе создания */
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
    height: 200px;
    resize: none;

    &::placeholder {
        font-weight: 400;
        font-size: 14px;
        line-height: 1px;
        color: #94A6BE;
        letter-spacing: -0.14px;
    }

    ${xs} {
        max-width: 100%;
        height: 37px;
    }
`;

export const CalendarCol = styled.div`
    width: 182px;
    margin-top: 74px;

    ${sm} {
        width: 100%;
        margin-top: 10px;
    }
`;


export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 22px;
  gap: 10px;

  .btn-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  ${sm} {
    flex-direction: column;
    align-items: stretch;

    .btn-group { order: 2; }
  }
`;

const baseBtn = `
  height: 30px;
  padding: 0 14px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease, border-color .15s ease;
`;

export const Btn = styled.button`
    ${baseBtn};
    background: transparent;
    color: ${({ theme }) => theme.colors.brand};
    border: 0.7px solid ${({ theme }) => theme.colors.brand};

    &:hover {
        background: ${({ theme }) => theme.colors.hoverBrand};
        color: ${({ theme }) => theme.colors.white};
        border-color: ${({ theme }) => theme.colors.hoverBrand};
    }
`;

export const BtnDanger = styled(Btn)`
`;

export const BtnPrimary = styled.button`
  ${baseBtn};
  border: none;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBrand};
  }

  ${sm} {
    width: 100%;
    height: 40px;
  }
`;

export const StatusList = styled.div`
    width: 570px;
    height: 60px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: nowrap;
    overflow-x: auto;

    ${sm} {
        width: 100%;
        height: auto;
        flex-wrap: wrap;
        overflow: visible;
    }
`;

export const StatusBtn = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 24px;
    border: 0.7px solid rgba(148, 166, 190, 0.5);
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color .12s ease, color .12s ease, border-color .12s ease;

    background: ${({ $active }) => ($active ? "#94A6BE" : "rgba(255,255,255,0.4)")};
    color: ${({ $active }) => ($active ? "#ffffff" : "#94A6BE")};

    &:hover { filter: brightness(0.98); }
`;
