import Component from './base.ts';  
import Label from './Label.ts';  
import DivElement from './DivElement.ts';  
import Input from './Input.ts';  
import Button from './Button.ts'; 
import NewItemAddition from './NewItemAddition.ts'; 
import NewItemButtonsContainerElement from './NewItemButtonsContainerElement.ts'; 

import Properities from '../Interfaces/Properities'; 

import {AproveNewItem} from '../Functions/AproveNewItem';
import {NewTaskOnEnter} from '../Functions/NewTaskOnEnter';

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
                    onSearch: NewTaskOnEnter,
                    onInput: AproveNewItem
                }),
                new NewItemAddition().render({
                    id: 'NewItemAddition',
                    class: 'newitembox__addition',
                    currentDate: props.currentDate,
                }),
                new NewItemButtonsContainerElement().render({
                    id: 'NewItemButtons',
                    class: 'newitembox__buttons',
                    taskList: props.taskList,
                    buttonOnClick_cancel: props.buttonOnClick_cancel,
                    buttonOnClick_apply: props.buttonOnClick_apply
                })
            ]
        });
    }
}