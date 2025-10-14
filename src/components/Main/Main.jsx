import { Main as SMain, Container, MainBlock, MainContent } from "./Main.styled";

export default function Main({ children }) {
    return (
        <SMain>
            <Container>
                <MainBlock>
                    <MainContent>{children}</MainContent>
                </MainBlock>
            </Container>
        </SMain>
    );
}