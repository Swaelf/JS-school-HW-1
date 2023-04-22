import Component from './base.js';   
import './Button.css';

export default class Button extends Component {
    constructor() {
        super();
        this.element = document.createElement('button');
    }

    render(props) {
        return super.render({
            id: props.id,
            onClick: props.onClick,
            children: [],
            class: props.class,
            htmltext: props.htmltext,
            style: props.style,
            isDisabled: props.isDisabled
        });
    }
}