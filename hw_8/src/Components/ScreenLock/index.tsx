import './index.css';

export const ScreenLock = (
	{ 
		modalWindowState,
	}: { 
		modalWindowState: number,
	} = {
		modalWindowState: 0, 
	}) => {
	
	let screenLockClass: string;

	if (modalWindowState === 0) {
		screenLockClass = 'screenlock screenlock--hidden';
	} else {
		screenLockClass = 'screenlock';
	}

	const result = 	
	<div className={ screenLockClass }/> 

	return result
}