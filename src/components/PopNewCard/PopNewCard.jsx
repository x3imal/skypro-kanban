import Calendar from "../Calendar/Calendar.jsx";
import {
    Overlay,
    Dialog,
    Content,
    Title,
    Wrap,
    Form,
    Subttl,
    FormBlock,
    Input,
    TextArea,
    Categories,
    CategoriesTitle,
    Themes,
    ThemePill,
    CreateButton,
} from "./PopNewCard.styled.js";

export default function PopNewCard({open = false, onClose}) {
    if (!open) return null;

    const close = () => onClose?.();

    return (
        <Overlay onClick={close}>
            <Dialog onClick={(e) => e.stopPropagation()}>
                <Content>
                    <Title>Создание задачи</Title>

                    <Wrap>
                        <Form id="formNewCard" action="#">
                            <FormBlock>
                                <Subttl htmlFor="formTitle">Название задачи</Subttl>
                                <Input
                                    type="text"
                                    name="name"
                                    id="formTitle"
                                    placeholder="Введите название задачи..."
                                    autoFocus
                                />
                            </FormBlock>

                            <FormBlock>
                                <Subttl htmlFor="textArea">Описание задачи</Subttl>
                                <TextArea
                                    name="text"
                                    id="textArea"
                                    placeholder="Введите описание задачи..."
                                />
                            </FormBlock>
                        </Form>

                        <Calendar activeDay={8} showHint/>
                    </Wrap>

                    <Categories>
                        <CategoriesTitle>Категория</CategoriesTitle>
                        <Themes>
                            <ThemePill $variant="webdesign" $active>Web Design</ThemePill>
                            <ThemePill $variant="research">Research</ThemePill>
                            <ThemePill $variant="copywriting">Copywriting</ThemePill>
                        </Themes>
                    </Categories>

                    <CreateButton id="btnCreate">Создать задачу</CreateButton>
                </Content>
            </Dialog>
        </Overlay>
    );
}
