import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopUser from "../PopUser/PopUser.jsx";
import PopExit from "../PopExit/PopExit.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

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
    const [isExitOpen, setIsExitOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const toggleUser = () => setIsUserOpen((p) => !p);

    const handleConfirmExit = () => {
        logout();
        setIsExitOpen(false);
        navigate("/login", { replace: true });
    };

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
                                setIsExitOpen(true);
                            }}
                        />

                        <PopExit
                            open={isExitOpen}
                            onClose={() => setIsExitOpen(false)}
                            onConfirm={handleConfirmExit}
                        />
                    </Nav>
                </HeaderBar>
            </Container>
        </SHeader>
    );
}
