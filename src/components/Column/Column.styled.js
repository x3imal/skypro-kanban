import styled from "styled-components";

export const Column = styled.section`
    flex: 1 1 0;
    min-width: 220px;
    display: flex;
    flex-direction: column;

  @media (max-width:${({theme}) => theme.breakpoints.md}) {
    width:100%;
  }
`;

export const ColumnTitle = styled.div`
  margin:15px 0;

  p{
    color:${({theme}) => theme.colors.muted};
    font-size:14px;
    font-weight:600;
    line-height:1;
    text-transform:uppercase;
  }
`;

export const Cards = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    @media (max-width: ${({theme}) => theme.breakpoints.md}) {
        width: 100%;
        overflow-y: auto;
    }
`;