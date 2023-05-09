import './index.css';
import Interface from './Interface';
import { Routes, Route } from 'react-router-dom';

export const ScreenLock = (props: Interface) => {
	
	let screenLockClass: string;

	if (props.modalWindowState === 0) {
		screenLockClass = 'screenlock screenlock--hidden';
	} else {
		screenLockClass = 'screenlock';
	}

	return (<div className={ screenLockClass }/> )
};

ScreenLock.defaultProps = {
  	modalWindowState: 0
};