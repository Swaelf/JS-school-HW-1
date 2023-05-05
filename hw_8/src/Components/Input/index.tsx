import React from 'react';
import Interface from './Interface';

import './index.css';

export const Input = (props: Interface) => {

  return (
    <input
      className="new_item_input"
      onChange={ props.onChange }
      placeholder='New Task'
      ref={ props.inputRef }/>
  );
};

Input.defaultProps = {
    onChange: (() => {}),
    inputRef: null
};