import Component from './base.ts';   

import Properities from '../Interfaces/Properities'; 

import './css/DivElement.css';

export default class DivElement extends Component {
    element: HTMLDivElement;

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        return super.render({
            class: props.class,
            htmltext: props.htmltext,
            children: props.children,
            id: props.id,
            style: props.style
        });
    }
}