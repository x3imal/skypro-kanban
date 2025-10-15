import {useParams, Link} from "react-router-dom";

export default function TaskView() {
    const {id} = useParams();
    return (
        <div style={{maxWidth: 630, margin: "60px auto"}}>
            <h1>Задача #{id}</h1>
            <p>Просмотр задачи. <Link to={`/task/${id}/edit`}>Редактировать</Link></p>
        </div>
    );
}
