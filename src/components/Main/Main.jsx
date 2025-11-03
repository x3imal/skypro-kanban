import {Main as SMain, Container, MainBlock, MainContent} from "./Main.styled";
import ColumnList from "../ColumnList/ColumnList.jsx";
import {Loader} from "../../App.styled";
import {DEFAULT_STATUSES} from "../../constants/statuses.js";

/**
 * Основной блок страницы с колонками задач.
 * Отображает загрузку, пустое состояние или список колонок.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.cards - Массив карточек задач.
 * @param {boolean} [props.isLoading=false] - Флаг состояния загрузки.
 * @param {Array} [props.statuses=DEFAULT_STATUSES] - Список статусов колонок.
 * @param {(cardId:string|number)=>void} [props.onOpenCard] - Обработчик открытия карточки.
 * @returns {JSX.Element}
 */
export default function Main({cards = [], isLoading = false, statuses = DEFAULT_STATUSES, onOpenCard}) {
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
                            <ColumnList statuses={statuses} cards={cards} onOpenCard={onOpenCard}/>
                        )}
                    </MainContent>
                </MainBlock>
            </Container>
        </SMain>
    );
}

