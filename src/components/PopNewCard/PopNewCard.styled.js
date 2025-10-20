import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.5);
  z-index: 1000;
`;

export const Dialog = styled.div`
  position: relative;
  background: ${({theme}) => theme?.colors?.bg || "#fff"};
  border-radius: 12px;
  max-width: 760px;
  width: min(760px, 92vw);
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 10px 40px rgba(0,0,0,.25);
`;

export const Content = styled.div`
  padding: 24px;
`;

export const Title = styled.h3`
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 700;
`;

export const Close = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: 0;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
`;
