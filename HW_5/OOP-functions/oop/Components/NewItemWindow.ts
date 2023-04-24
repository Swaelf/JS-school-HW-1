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
    props: Properities;
    element: HTMLDivElement;    

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        return super.render({
            id: 'NewItemBox',
            class: 'newitembox',
            style: props.style,
            children: [
                new Label().render({
                    id: 'NewItemLabel',
                    text: 'Add New Item',
                    class: 'newitembox__label',
                    children: []
                }),
                new Input().render({
                    id: 'NewItemInput',
                    children: [],
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
            if (newItemButtonApply.classList.contains("newitembox__button--disabled") == true) {
                newItemButtonApply.classList.remove("newitembox__button--disabled");
            }
            if (newItemButtonApply.classList.contains("newitembox__button--enabled") == false) {
             newItemButtonApply.classList.add("newitembox__button--enabled");                      
            }
            newItemButtonApply.disabled = false;
        } else {
            if (newItemButtonApply.classList.contains("newitembox__button--disabled") == false) {
                newItemButtonApply.classList.add("newitembox__button--disabled");
            }
            if (newItemButtonApply.classList.contains("newitembox__button--enabled") == true) {
             newItemButtonApply.classList.remove("newitembox__button--enabled");                      
            }
            newItemButtonApply.disabled = true;
        }
    }

    NewTaskOnEnter = () => {
        const newItemBox: HTMLButtonElement = document.getElementById('NewItemButtonApply') as HTMLButtonElement;
        newItemBox.disabled == false ? newItemBox.onclick.call(this) : '';
    }
}