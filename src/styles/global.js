import { createGlobalStyle } from "styled-components";

/**
 * Глобальные стили приложения.
 * Сбрасывают отступы, задают базовые цвета и анимацию смены темы.
 *
 * @type {import("styled-components").GlobalStyleComponent}
 */
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
        background: ${({ theme }) => theme.colors.bg};
        color: ${({ theme }) => theme.colors.text};
        transition: background 0.3s ease, color 0.3s ease;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    ul li {
        list-style: none;
    }
`;