import { Main as SMain, Container, MainBlock, MainContent } from "./Main.styled";
import { STATUSES as DEFAULT_STATUSES } from "../../constants/statuses.js";
import ColumnList from "../ColumnList/ColumnList.jsx";
import { Loader } from "../../App.styled";

export default function Main({ cards = [], isLoading = false, statuses = DEFAULT_STATUSES }) {
    const isEmpty = Array.isArray(cards) && cards.length === 0;

    return (
        <SMain>
            <Container>
                <MainBlock>
                    <MainContent>
                        {isLoading ? (
                            <Loader>Данные загружаются…</Loader>
                        ) : isEmpty ? (
                            <Loader>Пока нет карточек</Loader>
                        ) : (
                            <ColumnList statuses={statuses} cards={cards} />
                        )}
                    </MainContent>
                </MainBlock>
            </Container>
        </SMain>
    );
}
