import {useParams} from "react-router-dom";

export default function TaskEdit() {
    const {id} = useParams();
    return (
        <div style={{maxWidth: 630, margin: "60px auto"}}>
            <h1>Редактирование задачи #{id}</h1>
            <p>Здесь будет форма редактирования.</p>
        </div>
    );
}
