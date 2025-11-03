import {Column as SColumn, ColumnTitle, Cards} from "./Column.styled";

/**
 * Колонка доски (группа карточек по статусу).
 *
 * @component
 * @param {Object} props
 * @param {string} props.title - Заголовок колонки (статус).
 * @param {React.ReactNode} props.children - Список карточек.
 * @returns {JSX.Element}
 */
export default function Column({title, children}) {
    return (
        <SColumn>
            <ColumnTitle><p>{title}</p></ColumnTitle>
            <Cards>{children}</Cards>
        </SColumn>
    );
}