import Component from './base.js';  
import Button from './Button.js'; 
import './NewItemButtonsContainerElement.css';

export default class NewItemButtonsContainerElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: 'NewItemButtons',
            class: 'newitembox__buttons',
            children: [
                new Button().render({
                    id: 'NewItemButtonCancel',
                    class: 'newitembox__button newitembox__button--cancel',
                    htmltext: 'Cancel',
                    isDisabled: false,
                    onClick: props.buttonOnClick_cancel
                }),
                new Button().render({
                    id: 'NewItemButtonApply',
                    class: 'newitembox__button newitembox__button--apply newitembox__button--disabled',
                    htmltext: 'Add Task',
                    isDisabled: true,
                    onClick: props.buttonOnClick_apply
                }),
            ]
        });
    }
}