import Component from './base.ts'; 

import Properities from './Properities'; 

import './Label.css';

export default class Label extends Component {
    props: Properities;
    element: HTMLLabelElement;     

    constructor() {
        super();
        this.element = document.createElement('Label') as HTMLLabelElement;
    }

    render(props: Properities) {
        return super.render({
            id: props.id,
            htmltext: props.text,
            onClick: props.onClick,
            children: [],
            class: props.class
        });
    }
}