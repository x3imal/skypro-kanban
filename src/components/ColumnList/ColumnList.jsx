import Column from "../Column/Column.jsx";
import Card from "../Card/Card.jsx";

/**
 * Список колонок доски (канбан).
 * Для каждого статуса создаёт колонку и фильтрует карточки по нему.
 *
 * @component
 * @param {Object} props
 * @param {Array<string>} props.statuses - Список статусов колонок.
 * @param {Array<Object>} props.cards - Все карточки задач.
 * @param {(id:string|number)=>void} [props.onOpenCard] - Обработчик открытия карточки.
 * @returns {JSX.Element}
 */
export default function ColumnList({ statuses = [], cards = [], onOpenCard }) {
    return (
        <>
            {statuses.map((status) => (
                <Column key={status} title={status}>
                    {cards
                        .filter((c) => c.status === status)
                        .map((card, index) => (
                            <Card
                                key={card.id || `${status}-${index}`}
                                id={card.id}
                                category={card.topic}
                                title={card.title}
                                date={card.date}
                                onOpen={onOpenCard}
                            />
                        ))}
                </Column>
            ))}
        </>
    );
}
