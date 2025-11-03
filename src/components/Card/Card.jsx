import {Item, Box, Top, Badge, DotsBtn, Title, Content, DateRow} from "./Card.styled";

/**
 * Карточка задачи в колонке канбана.
 * Показывает категорию, заголовок и дату; «три точки» открывают попап детально.
 *
 * @component
 * @param {Object} props
 * @param {string|number} props.id - Идентификатор задачи.
 * @param {string} props.category - Категория/тема (отображается в бейдже).
 * @param {string} [props.title="Название задачи"] - Заголовок задачи.
 * @param {string} [props.date="30.10.23"] - Отформатированная дата (dd.mm.yy).
 * @param {JSX.Element} [props.icon] - Иконка для строки даты.
 * @param {(id: string|number)=>void} [props.onOpen] - Открыть задачу по клику на «три точки».
 * @returns {JSX.Element}
 */
export default function Card({
                                 id,
                                 category,
                                 title = "Название задачи",
                                 date = "30.10.23",
                                 icon,
                                 onOpen,
                             }) {
    const handleOpen = (e) => {
        e.stopPropagation();
        onOpen?.(id);
    };

    return (
        <Item>
            <Box>
                <Top>
                    <Badge $category={category}>
                        <p>{category}</p>
                    </Badge>

                    <DotsBtn onClick={handleOpen} aria-label="Открыть детали">
                        <div/>
                        <div/>
                        <div/>
                    </DotsBtn>
                </Top>

                <Title>{title}</Title>

                <Content>
                    <DateRow>
                        {icon}
                        <p>{date}</p>
                    </DateRow>
                </Content>
            </Box>
        </Item>
    );
}
