import {Item, Box, Top, Badge, DotsBtn, Title, Content, DateRow} from "./Card.styled";

export default function Card({category, title = "Название задачи", date = "30.10.23", icon}) {
    return (
        <Item>
            <Box>
                <Top>
                    <Badge $category={category}>
                        <p>{category}</p>
                    </Badge>
                    <a href="#popBrowse" target="_self" aria-label="open">
                        <DotsBtn>
                            <div/>
                            <div/>
                            <div/>
                        </DotsBtn>
                    </a>
                </Top>

                <a href="" target="_blank" rel="noreferrer">
                    <Title>{title}</Title>
                </a>

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
