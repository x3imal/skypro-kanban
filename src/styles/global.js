import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
    }

    body {
        font-family: "Roboto", Arial, Helvetica, sans-serif;
        background: ${({theme}) => theme.colors.bg};
        color: ${({theme}) => theme.colors.text};
    }

    a {
        text-decoration: none;
        cursor: pointer
    }

    ul li {
        list-style: none
    }

`;