import Component from './base.ts';   
import Properities from './Properities.ts'; 
import './DivElement.css';

export default class DivElement extends Component {
    props: Properities;
    element: HTMLDivElement;

    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props: Properities) {
        return super.render({
            class: props.class,
            children: props.children,
            htmltext: props.htmltext,
            id: props.id,
            style: props.style
        });
    }
}