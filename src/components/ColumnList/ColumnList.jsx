import Column from "../Column/Column.jsx";
import Card from "../Card/Card.jsx";

const colorByTopic = (topic) => {
    if (topic === "Web Design") return "_orange";
    if (topic === "Research") return "_green";
    return "_purple";
};

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
                                colorClass={colorByTopic(card.topic)}
                            />
                        ))}
                </Column>
            ))}
        </>
    );
}
