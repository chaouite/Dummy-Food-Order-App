import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

export const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onCloseCart}>
    </div>
  )
};

export const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      {props.children}
    </div>
  )
};


const Modal = (props) => {
  const portalElement = document.getElementById('overlays');
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  )
}

export default Modal
