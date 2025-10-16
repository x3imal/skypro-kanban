import styled, {keyframes, css} from "styled-components";

const show = keyframes`
    0% {
        height: 0;
        opacity: 0;
    }
    100% {
        height: 130px;
        opacity: 1;
    }
`;

export const Item = styled.div`
    animation: ${show} 500ms linear;
    margin-bottom: ${({theme}) => theme.spacing?.cardGap || "10px"};
`;

export const Box = styled.article`
    width: 220px;
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
    background: ${({theme}) => theme.colors.white};
    border-radius: ${({theme}) => theme.radius.lg};
`;

export const Top = styled.div`
    width: 100%;
    height: 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const normalizeKey = (str = "") => str.toLowerCase().trim().replace(/\s+/g, "");

export const Badge = styled.div`
    display: inline-flex;
    align-items: center;
    height: 20px;
    padding: 5px 14px;
    border-radius: 18px;

    ${({theme, $category}) => {
        const key = normalizeKey($category);
        const {bg, fg} = theme.colors.badge[key] || theme.colors.badge.gray;
        return css`
            background: ${bg};
            color: ${fg};
        `;
    }}
    p {
        font-size: 10px;
        font-weight: 600;
        line-height: 10px;
    }
`;

export const DotsBtn = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2px;
    cursor: pointer;

    div {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: ${({theme}) => theme.colors.muted};
    }
`;

export const Title = styled.h3`
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: ${({theme}) => theme.colors.text};
    margin-bottom: 10px;
    text-align: left;
`;

export const Content = styled.div`
    height: 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const DateRow = styled.div`
    display: flex;
    align-items: center;

    svg {
        width: 13px;
    }

    p {
        margin-left: 6px;
        font-size: 10px;
        line-height: 13px;
        color: ${({theme}) => theme.colors.muted};
        letter-spacing: .2px;
    }
`;