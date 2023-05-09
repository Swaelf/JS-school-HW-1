import Interface from './Interface';

import './index.css';

export const Search = (props: Interface) => {

	return (
	<input 
		className={ props.className }
		onChange={ props.onChange }
		placeholder={ props.placeholder }
		type='search'
		value={ props.value }
		ref={ props.inputRef }
		>
	</input>)
};

Search.defaultProps = {
  	inputRef: null,
  	className: '',
  	onChange: (() => {}),
  	placeholder: 'placeholder',
  	value: ''
};