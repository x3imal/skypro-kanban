import { Main as SMain, Container, MainBlock, MainContent } from "./Main.styled";
import ColumnList from "../ColumnList/ColumnList.jsx";
import { Loader } from "../../App.styled";

const DEFAULT_STATUSES = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];

export default function Main({ cards = [], isLoading = false, statuses = DEFAULT_STATUSES }) {
    return (
        <SMain>
            <Container>
                <MainBlock>
                    <MainContent>
                        {isLoading ? <Loader>Данные загружаются…</Loader> : <ColumnList statuses={statuses} cards={cards} />}
                    </MainContent>
                </MainBlock>
            </Container>
        </SMain>
    );
}
