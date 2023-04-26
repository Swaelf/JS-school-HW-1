import Component from './base.ts';  
import Label from './Label.ts';  
import DivElement from './DivElement.ts';  
import Input from './Input.ts';  
import Button from './Button.ts'; 
import NewItemAddition from './NewItemAddition.ts'; 
import NewItemButtonsContainerElement from './NewItemButtonsContainerElement.ts'; 

import Properities from '../Interfaces/Properities'; 

import './css/NewItemWindow.css';

export default class NewItemWindow extends Component {
    element: HTMLDivElement;    

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        return super.render({
            id: 'NewItemBox',
            class: props.class,
            children: [
                new Label().render({
                    id: 'NewItemLabel',
                    text: 'Add New Item',
                    class: 'newitembox__label'
                }),
                new Input().render({
                    id: 'NewItemInput',
                    class: 'newitembox__input',
                    text: 'New Task',
                    type: 'search',
                    onSearch: this.NewTaskOnEnter,
                    onInput: this.AproveNewItem
                }),
                new NewItemAddition().render({
                    id: 'NewItemAddition',
                    class: 'newitembox__addition',
                    currentDate: props.currentDate,
                }),
                new NewItemButtonsContainerElement().render({
                    id: 'NewItemButtons',
                    class: 'newitembox__buttons',
                    buttonOnClick_cancel: props.buttonOnClick_cancel,
                    buttonOnClick_apply: props.buttonOnClick_apply
                })
            ]
        });
    }

    AproveNewItem = () => {
        const newItemInput: HTMLInputElement = document.getElementById("NewItemInput") as HTMLInputElement;
        const newItemButtonApply: HTMLButtonElement = document.getElementById("NewItemButtonApply") as HTMLButtonElement;
        if (newItemInput.value) {
            newItemButtonApply.className = "newitembox__button newitembox__button--apply newitembox__button--enabled";                  
            newItemButtonApply.disabled = false;
        } else {
            newItemButtonApply.className = "newitembox__button newitembox__button--apply newitembox__button--disabled";                  
            newItemButtonApply.disabled = true;
        }
    }

    NewTaskOnEnter = () => {
        const newItemBox: HTMLButtonElement = document.getElementById('NewItemButtonApply') as HTMLButtonElement;
        newItemBox.disabled == false ? newItemBox.onclick.call(this) : '';
    }
}