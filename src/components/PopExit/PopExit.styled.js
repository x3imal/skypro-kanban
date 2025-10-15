import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
    width: 370px;
    height: 180px;
    max-width: 90%;
    max-height: 100%;
`;

export const Block = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 16px;
`;

export const BtnRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;

  button {
    min-width: 153px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    border: 0.7px solid ${({ theme }) => theme.colors.brand};
  }

  ._btn-bg {
    background: ${({ theme }) => theme.colors.brand};
    color: #fff;
    border: none;
  }
`;
