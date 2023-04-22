import Component from './base.js';   
import './DivElement.css';

export default class DivElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            class: props.class,
            children: props.children,
            htmltext: props.htmltext,
            id: props.id,
            style: props.style
        });
    }
}