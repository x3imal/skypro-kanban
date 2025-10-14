export default function PopUser({ isOpen, onClose }) {
    return (
        <div
            className="header__pop-user-set pop-user-set"
            style={{ display: isOpen ? "block" : "none" }}
        >
            <p className="pop-user-set__name">Ivan Ivanov</p>
            <p className="pop-user-set__mail">ivan.ivanov@gmail.com</p>

            <div className="pop-user-set__theme">
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
            </div>

            <button type="button" onClick={onClose} className="_hover03">
                Выйти
            </button>
        </div>
    );
}