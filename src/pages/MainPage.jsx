import { useEffect, useState } from "react";
import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import { Wrapper } from "../App.styled";
import { cardsData } from "../data.js";
import { STATUSES } from "../constants/statuses.js";

export default function MainPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const t = setTimeout(() => { setCards(cardsData); setIsLoading(false); }, 800);
        return () => clearTimeout(t);
    }, []);

    return (
        <Wrapper>
            <Header />
            <Main cards={cards} isLoading={isLoading} statuses={STATUSES} />
        </Wrapper>
    );
}
