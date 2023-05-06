import Interface from './Interface';

import './index.css';

export const Checkbox = (props: Interface) => {

  return (
    <input
      className='checkbox' 
      type='checkbox' 
      defaultChecked={ props.defaultChecked } 
      onChange={ props.onChange }
      ref={ props.inputRef }/>
  );
};

Checkbox.defaultProps = {
  defaultChecked: false,
  onChange: (() => {}),
  inputRef: null
};