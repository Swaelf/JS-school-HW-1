import Component from './base.ts';

import Properities from './Properities';  
  
import './Input.css';


export default class Input extends Component {
    props: Properities;
    element: HTMLInputElement;    

    constructor() {
        super();
        this.element = document.createElement('Input') as HTMLInputElement;
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