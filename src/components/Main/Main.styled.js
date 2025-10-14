import styled from "styled-components";

export const Main = styled.main`
    width: 100%;
    background: ${({theme}) => theme.colors.bg};
`;

export const Container = styled.div`
    max-width: 1260px;
    margin: 0 auto;
    padding: 0 30px;
`;

export const MainBlock = styled.div`
    width: 100%;
    padding-top: 25px;
    padding-bottom: 49px;

    @media (max-width: ${({theme}) => theme.breakpoints.md}) {
        padding-top: 40px;
        padding-bottom: 64px;
    }
`;

export const MainContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: ${({theme}) => theme.breakpoints.md}) {
        display: block;
        gap: 0;
    }
`;