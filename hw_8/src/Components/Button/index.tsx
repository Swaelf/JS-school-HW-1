import Interface from './Interface';
import { NavLink } from 'react-router-dom';

import './index.css';

export const Button = (props: Interface) => {
	
	if (props.disabled) {
		return (
			<span 
				className={ props.className }
			>{ props.text }</span>
		)
	} else {
		return (
			<NavLink 
				to={ props.to ? props.to : '/' }
				className={ props.className }
				onClick={ props.onClick }
			>{ props.text }</NavLink>
		)
	}
};

Button.defaultProps = {
  	buttonRef: null,
  	to: '',
  	text: '',
  	className: '',
  	onClick: (() => {}),
  	disabled: false
};
