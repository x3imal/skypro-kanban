import styled from "styled-components";

const sm = (p) => `@media (max-width: ${p.theme?.breakpoints?.sm || "660px"})`;

export const Wrap = styled.div`
    width: 182px;
    margin-bottom: 20px;

    ${sm} {
        max-width: 340px;
        width: 100%;
    }
`;

export const Title = styled.p`
    margin-bottom: 14px;
    padding: 0 7px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;

    ${sm} {
        padding: 0;
    }
`;

export const Block = styled.div`
    display: block;
`;

export const Nav = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding: 0 7px;

    ${sm} {
        padding: 0;
    }
`;

export const Month = styled.div`
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
    line-height: 25px;
    font-weight: 600;
`;

export const NavActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
`;

export const NavBtn = styled.button`
    width: 18px;
    height: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    padding: 0;

    svg {
        fill: ${({ theme }) => theme.colors.muted};
    }
`;

export const Content = styled.div`
    margin-bottom: 12px;
`;

export const Days = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 7px 0;
    padding: 0 7px;

    ${sm} {
        padding: 0;
    }
`;

export const Day = styled.div`
    color: ${({ theme }) => theme.colors.muted};
    font-size: 10px;
    font-weight: 500;
    letter-spacing: -0.2px;

    ${sm} {
        font-size: 14px;
    }
`;

export const Cells = styled.div`
    width: 182px;
    height: 126px;
    display: flex;
    flex-wrap: wrap;

    ${sm} {
        width: 344px;
        height: auto;
        justify-content: space-around;
    }
`;

export const Cell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10px;
  letter-spacing: -0.2px;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.muted};
  background: transparent;

  ${({ $otherMonth }) => $otherMonth && `opacity: 0;`}
  ${({ $current }) => $current && `font-weight: 700;`}
  ${({ $active, theme }) =>
    $active &&
    `
      background: ${theme.colors.muted};
      color: ${theme.colors.white};
    `}
  ${({ $weekend }) => $weekend && ``}

  &:hover {
    color: ${({ theme }) => theme.colors.muted};
    background-color: ${({ theme }) => theme.colors.bg};
  }

  ${sm} {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }
`;

export const Period = styled.div`
  padding: 0 7px;

  ${sm} {
    padding: 0;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 10px;
    line-height: 1;

    ${sm} {
      font-size: 14px;
    }
  }

  .date-control {
    color: ${({ theme }) => theme.colors.text};
  }
`;
