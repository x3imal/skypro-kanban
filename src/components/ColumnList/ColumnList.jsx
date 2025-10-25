import Column from "../Column/Column.jsx";
import Card from "../Card/Card.jsx";

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
