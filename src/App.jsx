import "./App.css";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Column from "./components/Column/Column.jsx";
import Card from "./components/Card/Card.jsx";
import PopNewCard from "./components/PopNewCard/PopNewCard.jsx";
import PopBrowse from "./components/PopBrowse/PopBrowse.jsx";

export default function App() {
    return (
        <div className="wrapper">

            <div className="pop-exit" id="popExit">
                <div className="pop-exit__container">
                    <div className="pop-exit__block">
                        <div className="pop-exit__ttl"><h2>Выйти из аккаунта?</h2></div>
                        <form className="pop-exit__form" id="formExit" action="#">
                            <div className="pop-exit__form-group">
                                <button className="pop-exit__exit-yes _hover01" id="exitYes"><a href="modal/signin.html">Да, выйти</a></button>
                                <button className="pop-exit__exit-no _hover03" id="exitNo"><a href="index.html">Нет, остаться</a></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <PopNewCard />
            <PopBrowse />
            <Header />

            <Main>
                <Column title="Без статуса">
                    <Card category="Web Design" colorClass="_orange" />
                </Column>

                <Column title="Нужно сделать">
                    <Card category="Research" colorClass="_green" />
                </Column>

                <Column title="В работе">
                    <Card category="Research" colorClass="_green" />
                </Column>

                <Column title="Тестирование">
                    <Card category="Research" colorClass="_green" />
                </Column>

                <Column title="Готово">
                    <Card category="Research" colorClass="_green" />
                </Column>
            </Main>
        </div>
    );
}
