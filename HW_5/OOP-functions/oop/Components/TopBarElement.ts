import Component from './base.ts';  
import Input from './Input.ts';  
import Button from './Button.ts';

import Properities from '../Interfaces/Properities'; 
import StateInterface from '../Interfaces/StateInterface'; 
import HTMLCommonElement from '../Interfaces/HTMLCommonElement';

import {SearchByPattern} from '../Functions/SearchByPattern.ts';

import './css/TopBarElement.css';

export default class TopBarElement extends Component {
    element: HTMLDivElement;  
    state: StateInterface;

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        const searchPattern = localStorage.getItem("searchPattern");

        this.setState({
            taskList: props.taskList,
        }, false);

        return super.render({
            id: 'TopBar',
            class: 'topbar',
            children: [
                new Input().render({
                    id: 'SearchString',
                    value: searchPattern,
                    class: 'topbar__search',
                    text: 'Search Task',
                    type: 'search',
                    onInput: this.SearchInListsOfTasks
                }),
                new Button().render({
                    id: 'AddButton',
                    class: 'button__add',
                    htmltext: '+ New Task',
                    onClick: props.onButtonClick
                })
            ]
        });
    }

    SearchInListsOfTasks = () => {
        const searchInput: HTMLInputElement = document.getElementById("SearchString") as HTMLInputElement;
        const searchPattern: string = searchInput.value;

        localStorage.setItem("searchPattern", searchPattern);

        SearchByPattern(this.state.taskList, searchPattern);
    }
}