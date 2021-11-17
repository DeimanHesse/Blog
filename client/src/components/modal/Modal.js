import './modal.scss'


function Modal ({active, setActive, children}) {
    return (
        <div className={active ? "modal active" : "modal"}  onClick={() => setActive(false)}>
            <div className={active ? "modal__content activeW" : "modal__content"} onClick ={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;