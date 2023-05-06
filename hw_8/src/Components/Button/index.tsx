import Interface from './Interface';

import './index.css';

export const Button = (props: Interface) => {

	return (
	<button 
		className={ props.className }
		onClick={ props.onClick }
		disabled={ props.disabled }
		ref={ props.buttonRef }
		>
		{ props.text }
	</button>)
};

Button.defaultProps = {
  	buttonRef: null,
  	text: '',
  	className: '',
  	onClick: (() => {}),
  	disabled: false
};