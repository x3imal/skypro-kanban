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
import {STATUSES} from "./constants/statuses.js";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);

    //TODO нужен реальный фетч
    useEffect(() => {
        const t = setTimeout(() => {
            setCards(cardsData);
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(t);
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
