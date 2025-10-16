import {Item, Box, Top, Badge, DotsBtn, Title, Content, DateRow} from "./Card.styled";

export default function Card({
                                 id,
                                 category,
                                 title = "Название задачи",
                                 date = "30.10.23",
                                 icon,
                                 onOpen, // добавили колбэк
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
