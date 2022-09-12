import React from "react";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./BackDrop";
import "./ModalWindow.css";

const ModalOverlay = props => {
    return (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );
}

const ModalWindow = props => {
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition in={props.show} timeout={200} classNames="modal" mountOnEnter unmountOnExit>
                <ModalOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    );
}

export default ModalWindow;