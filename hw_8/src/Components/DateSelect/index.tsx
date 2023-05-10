import { useCallback, useRef } from 'react';

import Interface from './Interface';

import './index.css';

export const DateSelect = ( props: Interface ) => {

	const dateInputRef = useRef<HTMLInputElement>(null);

	const showDatePicker = useCallback(() => {

		if (dateInputRef.current) {
      		dateInputRef.current.showPicker();
    	}

    	// eslint-disable-next-line
  	}, []); //dateInputRef is static and shall not change

  	const selectDate = useCallback(() => {

		if (props.labelRef && props.labelRef.current && dateInputRef.current) {
      		props.labelRef.current.innerHTML = dateInputRef.current.value.slice(0, 10).split("-").reverse().join(".");
    	}

    	// eslint-disable-next-line
  	}, []); //labelRef and dateInputRef are static and shall not change

	return (
	<div className='input__container'> 
		<label 
			htmlFor="date-input"
			className='date'
			ref={ props.labelRef }
			onClick={ showDatePicker }>
			{ props.currentDate }
		</label>
		<input 
			id='date-input'
			className='date_input'
			type='date'
			onChange={ selectDate }
			ref={ dateInputRef }/>
	</div>)
};

DateSelect.defaultProps = {
	currentDate: '',
    inputRef: null,
  	labelRef: null
};