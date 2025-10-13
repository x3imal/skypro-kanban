import {useState} from "react";
import PopUser from "../PopUser/PopUser.jsx";

export default function Header() {
    const [isUserOpen, setIsUserOpen] = useState(false);

    const toggleUser = () => {
        setIsUserOpen((prev) => !prev);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__block">
                    <div className="header__logo _show _light">
                        <a href="#"><img src="/logo.png" alt="logo"/></a>
                    </div>
                    <div className="header__logo _dark">
                        <a href="#"><img src="/logo_dark.png" alt="logo"/></a>
                    </div>

                    <nav className="header__nav">
                        <a href="#popNewCard" className="header__btn-main-new _hover01">
                            Создать новую задачу
                        </a>

                        <a href="#" className="header__user _hover02"
                           onClick={(e) => { e.preventDefault(); toggleUser(); }}
                            aria-expanded={isUserOpen}
                        >
                            Ivan Ivanov
                        </a>

                        <PopUser isOpen={isUserOpen} onClose={() => setIsUserOpen(false)}/>
                    </nav>
                </div>
            </div>
        </header>
    );
}