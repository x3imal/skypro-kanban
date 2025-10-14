import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

import "./App.css";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Column from "./components/Column/Column.jsx";
import Card from "./components/Card/Card.jsx";
import PopNewCard from "./components/PopNewCard/PopNewCard.jsx";
import PopBrowse from "./components/PopBrowse/PopBrowse.jsx";
import PopExit from "./components/PopExit/PopExit.jsx";

import { Wrapper, Loader } from "./App.styled";
import { cardsData } from "./data.js";

export default function App() {
    const statuses = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];

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
                <Main>
                    {isLoading ? (
                        <Loader>Данные загружаются…</Loader>
                    ) : (
                        statuses.map((status) => (
                            <Column key={status} title={status}>
                                {cards
                                    .filter((card) => card.status === status)
                                    .map((card) => (
                                        <Card
                                            key={card.id}
                                            category={card.topic}
                                            title={card.title}
                                            date={card.date}
                                            colorClass={
                                                card.topic === "Web Design"
                                                    ? "_orange"
                                                    : card.topic === "Research"
                                                        ? "_green"
                                                        : "_purple"
                                            }
                                        />
                                    ))}
                            </Column>
                        ))
                    )}
                </Main>
            </Wrapper>
        </ThemeProvider>
    );
}