import Column from "../Column/Column.jsx";
import Card from "../Card/Card.jsx";

export default function ColumnList({ statuses = [], cards = [] }) {
    return (
        <>
            {statuses.map((status) => (
                <Column key={status} title={status}>
                    {cards
                        .filter((card) => card.status === status)
                        .map((card) => (
                            <Card
                                key={card.id}
                                category={card.topic}
                                title={card.title}
                                date={card.date}
                            />
                        ))}
                </Column>
            ))}
        </>
    );
}
