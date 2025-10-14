import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

import "./App.css";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import PopNewCard from "./components/PopNewCard/PopNewCard.jsx";
import PopBrowse from "./components/PopBrowse/PopBrowse.jsx";
import PopExit from "./components/PopExit/PopExit.jsx";

import { Wrapper } from "./App.styled";
import { cardsData } from "./data.js";

export default function App() {
    const STATUSES = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];

    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCards(cardsData);
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Wrapper>
                <PopExit />
                <PopNewCard />
                <PopBrowse />
                <Header />
                <Main cards={cards} isLoading={isLoading} statuses={STATUSES} />
            </Wrapper>
        </ThemeProvider>
    );
}
