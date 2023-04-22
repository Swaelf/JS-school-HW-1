import Component from './base.js';   
import './Input.css';

export default class Input extends Component {
    constructor() {
        super();
        this.element = document.createElement('Input');
    }

    render(props) {
        return super.render({
            id: props.id,
            children: [],
            value: props.value,
            placeholder: props.text,
            class: props.class,
            type: props.type,
            style: this.state.style,
            onInput: props.onInput,
            onChange: props.onChange,
            onSearch: props.onSearch,
            checked: props.checked
        });
    }
}