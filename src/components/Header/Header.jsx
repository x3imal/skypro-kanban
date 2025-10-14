import {useState} from "react";
import PopUser from "../PopUser/PopUser.jsx";
import {Header as SHeader, Container, HeaderBar, Logo, Nav, PrimaryBtn, UserLink} from "./Header.styled";

export default function Header() {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const toggleUser = () => setIsUserOpen(p => !p);

    return (
        <SHeader>
            <Container>
                <HeaderBar>
                    <Logo className="_show _light">
                        <a href="#"><img src="/logo.png" alt="logo"/></a>
                    </Logo>

                    <Nav>
                        <PrimaryBtn href="#popNewCard" className="_hover02">Создать новую задачу</PrimaryBtn>
                        <UserLink
                            href="#"
                            className="_hover02"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleUser();
                            }}
                            aria-expanded={isUserOpen}
                        >
                            Ivan Ivanov
                        </UserLink>

                        <PopUser isOpen={isUserOpen} onClose={() => setIsUserOpen(false)}/>
                    </Nav>
                </HeaderBar>
            </Container>
        </SHeader>
    );
}