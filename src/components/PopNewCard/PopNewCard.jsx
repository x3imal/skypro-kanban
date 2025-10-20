import Calendar from "../Calendar/Calendar.jsx";
import {
    Overlay,
    Dialog,
    Content,
    Title,
    Close
} from "./PopNewCard.styled.js";

export default function PopNewCard({ open = false, onClose }) {
    if (!open) return null;

    const close = () => onClose?.();

    return (
        <Overlay onClick={close}>
            <Dialog onClick={(e) => e.stopPropagation()}>
                <Content>
                    <Title>Создание задачи</Title>
                    <Close onClick={close}>&#10006;</Close>

                    <div className="pop-new-card__wrap">
                        <form
                            className="pop-new-card__form form-new"
                            id="formNewCard"
                            action="#"
                        >
                            <div className="form-new__block">
                                <label htmlFor="formTitle" className="subttl">
                                    Название задачи
                                </label>
                                <input
                                    className="form-new__input"
                                    type="text"
                                    name="name"
                                    id="formTitle"
                                    placeholder="Введите название задачи..."
                                    autoFocus
                                />
                            </div>
                            <div className="form-new__block">
                                <label htmlFor="textArea" className="subttl">
                                    Описание задачи
                                </label>
                                <textarea
                                    className="form-new__area"
                                    name="text"
                                    id="textArea"
                                    placeholder="Введите описание задачи..."
                                ></textarea>
                            </div>
                        </form>

                        <Calendar activeDay={8} showHint />
                    </div>

                    <div className="pop-new-card__categories categories">
                        <p className="categories__p subttl">Категория</p>
                        <div className="categories__themes">
                            <div className="categories__theme _orange _active-category">
                                <p className="_orange">Web Design</p>
                            </div>
                            <div className="categories__theme _green">
                                <p className="_green">Research</p>
                            </div>
                            <div className="categories__theme _purple">
                                <p className="_purple">Copywriting</p>
                            </div>
                        </div>
                    </div>

                    <button className="form-new__create _hover01" id="btnCreate">
                        Создать задачу
                    </button>
                </Content>
            </Dialog>
        </Overlay>
    );
}
