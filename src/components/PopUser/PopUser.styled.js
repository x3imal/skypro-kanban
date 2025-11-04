import styled from "styled-components";

export const Wrapper = styled.div`
    position: absolute;
    top: 61px;
    right: 0;
    width: 213px;
    min-height: 205px;
    border-radius: 10px;
    border: 0.7px solid ${({ theme }) => theme.colors.border || "rgba(148,166,190,0.4)"};
    background: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadow?.card || "0 10px 39px rgba(26, 56, 101, 0.21)"};
    padding: 34px;
    text-align: center;
    z-index: 8;
`;

export const Name = styled.p`
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.14px;
    margin-bottom: 4px;
`;

export const LoginStyled = styled.p`
    color: #94A6BE;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.14px;
    margin-bottom: 4px;
`;


export const ThemeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }

  input[type="checkbox"] {
    position: relative;
    width: 28px;
    height: 16px;
    border-radius: 100px;
    background: ${({ theme }) => theme.colors.inputBg || theme.colors.bg};
    border: 0.7px solid ${({ theme }) => theme.colors.inputBorder || theme.colors.border || "rgba(148,166,190,0.35)"};
    outline: none;
    appearance: none;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.muted};
    transition: left .2s ease, background-color .2s ease;
  }

  input:checked[type="checkbox"] {
    background: ${({ theme }) => theme.colors.brand};
    border-color: ${({ theme }) => theme.colors.brand};
  }

  input:checked[type="checkbox"]::before {
    left: 13px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const ExitBtn = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
    color: ${({ theme }) =>
            theme.name === "dark" ? theme.colors.text : theme.colors.brand};
  border-radius: 4px;
    border: 1px solid
    ${({ theme }) =>
            theme.name === "dark" ? theme.colors.text : theme.colors.brand};
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease, border-color .15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBrand};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.hoverBrand};
  }
`;