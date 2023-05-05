import './index.css';
import Interface from './Interface'

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