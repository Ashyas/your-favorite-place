import React from 'react';
//import ReactDOM from 'react-dom';

import "./BackDrop.css";

const Backdrop = props => {
  return <div className="backdrop" onClick={props.onClick}></div>
  // return ReactDOM.createPortal(
  //   <div className="backdrop" onClick={props.onClick}></div>,
  //   document.getElementById('backdrop-hook')
  // );
};

export default Backdrop;
