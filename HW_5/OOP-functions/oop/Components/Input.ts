import Component from './base.ts';

import Properities from '../Interfaces/Properities';  
  
import './css/Input.css';


export default class Input extends Component {
    element: HTMLInputElement;    

    constructor() {
        super();
        this.element = document.createElement('Input') as HTMLInputElement;
    }

    render(props: Properities) {
        return super.render({
            id: props.id,
            value: props.value,
            placeholder: props.text,
            class: props.class,
            htmltext: props.htmltext,
            type: props.type,
            onInput: props.onInput,
            onChange: props.onChange,
            onSearch: props.onSearch,
            checked: props.checked
        });
    }
}