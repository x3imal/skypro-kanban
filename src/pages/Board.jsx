import { useEffect, useState } from "react";
import { Main as SMain, Container, MainBlock, MainContent } from "../components/Main/Main.styled";
import Column from "../components/Column/Column.jsx";
import Card from "../components/Card/Card.jsx";
import { Loader } from "../App.styled";
import { cardsData } from "../data.js";

const STATUSES = ["Без статуса","Нужно сделать","В работе","Тестирование","Готово"];

export default function Board() {
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const t = setTimeout(() => { setCards(cardsData); setIsLoading(false); }, 800);
        return () => clearTimeout(t);
    }, []);

    return (
        <SMain>
            <Container>
                <MainBlock>
                    <MainContent>
                        {isLoading ? (
                            <Loader>Данные загружаются…</Loader>
                        ) : (
                            STATUSES.map(status => (
                                <Column key={status} title={status}>
                                    {cards.filter(c => c.status===status).map(card => (
                                        <Card
                                            key={card.id}
                                            category={card.topic}
                                            title={card.title}
                                            date={card.date}
                                            colorClass={
                                                card.topic==="Web Design" ? "_orange" :
                                                    card.topic==="Research" ? "_green" : "_purple"
                                            }
                                        />
                                    ))}
                                </Column>
                            ))
                        )}
                    </MainContent>
                </MainBlock>
            </Container>
        </SMain>
    );
}
