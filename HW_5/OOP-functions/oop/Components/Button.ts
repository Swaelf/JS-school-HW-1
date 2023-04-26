import Component from './base.ts';   

import Properities from '../Interfaces/Properities';

import './css/Button.css';

export default class Button extends Component {
    element: HTMLButtonElement;

    constructor() {
        super();
        this.element = document.createElement('button') as HTMLButtonElement;
    }

    render(props: Properities) {
        return super.render({
            id: props.id,
            onClick: props.onClick,
            class: props.class,
            htmltext: props.htmltext,
            style: props.style,
            isDisabled: props.isDisabled
        });
    }
}