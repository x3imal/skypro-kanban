import styled, { useTheme } from "styled-components";
import { Link } from "react-router-dom";

/* eslint-disable unused-imports/no-unused-vars */
const Page = styled.div`
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.bg};
`;

const Box = styled.div`
    text-align: center;
    background: ${({ theme }) => theme.colors.surface2};
    padding: 40px;
    border-radius: 10px;
    border: 0.7px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadow.card};
    h1 { font-size: 24px; margin-bottom: 10px; color: ${({ theme }) => theme.colors.text}; }
    p  { color: ${({ theme }) => theme.colors.text}; }
    a  { color: ${({ theme }) => theme.colors.brand}; }
`;

/**
 * Страница 404 — отображается при переходе на несуществующий маршрут.
 * Использует текущую тему для фона и оформления.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function NotFound() {
    const t = useTheme();
    console.log("THEME ON 404:", t?.name, t?.colors?.bg, t?.colors?.surface2);
    return (
        <Page>
            <Box>
                <h1>404 — Not Found</h1>
                <p><Link to="/">На главную</Link></p>
            </Box>
        </Page>
    );
}
