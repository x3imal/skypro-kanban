import {Column as SColumn, ColumnTitle, Cards} from "./Column.styled";

export default function Column({title, children}) {
    return (
        <SColumn>
            <ColumnTitle><p>{title}</p></ColumnTitle>
            <Cards>{children}</Cards>
        </SColumn>
    );
}