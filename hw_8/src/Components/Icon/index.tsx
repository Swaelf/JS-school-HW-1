import Interface from './Interface';

export const Icon = (props: Interface) => {

	return (
		<div 
			className={ props.className }
			style={{ backgroundImage: props.icon }}>
		</div>
	)
}

Icon.defaultProps = {
    className: '',
  	icon: ''
};