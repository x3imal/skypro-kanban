import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Container = styled.div`
    width: 370px;
    height: 180px;
`;

export const Block = styled.div`
    background: #fff;
    border-radius: 10px;
    border: 0.7px solid #D4DBE5;
    box-shadow: 0 10px 39px rgba(26, 56, 101, 0.21);
    padding: 50px;
    text-align: center;
`;

export const Title = styled.h2`
    margin: 0 0 24px 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
    font-weight: 700;
    line-height: 34px;
`;

export const BtnRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  button {
    min-width: 153px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    border: 0.7px solid ${({ theme }) => theme.colors.brand};
    background: transparent;
    color: ${({ theme }) => theme.colors.brand};
    transition: background-color .15s ease, color .15s ease, border-color .15s ease;
  }

  ._btn-bg {
    background: ${({ theme }) => theme.colors.brand};
    color: #fff;
    border: none;
  }

  button:hover {
    border-color: ${({ theme }) => theme.colors.hoverBrand};
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.hoverBrand};
  }
  ._btn-bg:hover {
    background: ${({ theme }) => theme.colors.hoverBrand};
  }

  @media (max-width: 495px) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
    }
  }
`;
