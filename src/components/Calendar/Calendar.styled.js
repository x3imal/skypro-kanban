import styled from "styled-components";

export const Wrap = styled.div`
    width: 182px;
    margin-bottom: 20px;
`;

export const Title = styled.p`
    margin-bottom: 14px;
    padding: 0 7px;
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
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
`;

export const Month = styled.div`
    color: #94A6BE;
    font-size: 14px;
    line-height: 25px;
    font-weight: 600;
`;

export const NavActions = styled.div`
    display: flex; align-items: center; justify-content: space-between;
`;

export const NavBtn = styled.button`
    width: 18px; height: 25px; cursor: pointer;
    display:flex; align-items:center; justify-content:center;
    border:0; background: transparent; padding:0;
    svg { fill: #94A6BE; }
`;

export const Content = styled.div`
    margin-bottom: 12px;
`;

export const Days = styled.div`
    display: flex; align-items: center; justify-content: space-between;
    margin: 7px 0; padding: 0 7px;
`;

export const Day = styled.div`
    color: #94A6BE; font-size: 10px; font-weight: 500; letter-spacing: -0.2px;
`;

export const Cells = styled.div`
    width: 182px; height: 126px; display:flex; flex-wrap: wrap;
`;

export const Cell = styled.div`
  width: 22px; height: 22px; margin: 2px; border-radius: 50%;
  display:flex; align-items:center; justify-content:center;
  color: #94A6BE; font-size: 10px; letter-spacing: -0.2px; cursor: pointer;
  &._other-month { opacity: 0; }
  &._cell-day:hover { color:#94A6BE; background:#EAEEF6; }
  &._active-day { background:#94A6BE; color:#fff; }
  &._current { font-weight:700; }
  &._weekend
`;

export const Period = styled.div`
  padding: 0 7px;
  p { color:#94A6BE; font-size:10px; line-height:1; }
  .date-control { color:#000; }
`;
