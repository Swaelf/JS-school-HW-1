import Component from './base.ts';   
import './Input.css';
import Properities from './Properities.ts'; 

export default class Input extends Component {
    props: Properities;
    element: any;    

    constructor() {
        super();
        this.element = document.createElement('Input');
    }

    render(props: Properities) {
        return super.render({
            id: props.id,
            children: [],
            value: props.value,
            placeholder: props.text,
            class: props.class,
            type: props.type,
            onInput: props.onInput,
            onChange: props.onChange,
            onSearch: props.onSearch,
            checked: props.checked
        });
    }
}