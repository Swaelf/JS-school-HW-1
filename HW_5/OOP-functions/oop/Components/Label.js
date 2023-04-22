import Component from './base.js';   
import './Label.css';

export default class Label extends Component {
    constructor() {
        super();
        this.element = document.createElement('Label');
    }

    render(props) {
        return super.render({
            id: props.id,
            htmltext: props.text,
            onClick: props.onClick,
            children: [],
            class: props.class,
            style: this.state.style
        });
    }
}