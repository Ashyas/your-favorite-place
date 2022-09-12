import React from 'react';

import Button from '../FormElements/Button';
import ModalWindow from './ModalWindow';

const ErrorModal = props => {
  return (
    <ModalWindow
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </ModalWindow>
  );
};

export default ErrorModal;
