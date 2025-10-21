import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopUser from "../PopUser/PopUser.jsx";

import {
    Header as SHeader,
    Container,
    HeaderBar,
    Logo,
    Nav,
    PrimaryBtn,
    UserLink,
} from "./Header.styled";

export default function Header() {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const navigate = useNavigate();

    const toggleUser = () => setIsUserOpen((p) => !p);

    return (
        <SHeader>
            <Container>
                <HeaderBar>
                    <Logo className="_show _light">
                        <Link to="/">
                            <img src="/logo.png" alt="logo" />
                        </Link>
                    </Logo>

                    <Nav>
                        <PrimaryBtn
                            as="button"
                            type="button"
                            className="_hover02"
                            onClick={() => navigate("/task/new")}
                        >
                            Создать новую задачу
                        </PrimaryBtn>

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

                        <PopUser
                            isOpen={isUserOpen}
                            onClose={() => setIsUserOpen(false)}
                            onAskLogout={() => {
                                setIsUserOpen(false);
                                navigate("/exit");
                            }}
                        />
                    </Nav>
                </HeaderBar>
            </Container>
        </SHeader>
    );
}
