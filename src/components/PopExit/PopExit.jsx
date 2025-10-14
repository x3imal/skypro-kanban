export default function PopExit() {
    return (
        <div className="pop-exit" id="popExit">
            <div className="pop-exit__container">
                <div className="pop-exit__block">
                    <div className="pop-exit__ttl">
                        <h2>Выйти из аккаунта?</h2>
                    </div>
                    <div className="pop-exit__form-group">
                        <button className="pop-exit__exit-yes _btn-bg">
                            <a href="#">Да, выйти</a>
                        </button>
                        <button className="pop-exit__exit-no _btn-bor">
                            <a href="#">Отмена</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}