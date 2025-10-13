import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;
    background: ${({theme}) => theme.colors.bg};
    display: flex;
    flex-direction: column;
`;

export const Loader = styled.div`
    width: 100%;
    padding: 24px 10px;
    font-size: 14px;
    color: ${({theme}) => theme.colors.muted};
`;