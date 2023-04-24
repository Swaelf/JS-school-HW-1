import Component from './base.ts';   

import Properities from './Properities'; 

import './DivElement.css';

export default class DivElement extends Component {
    props: Properities;
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