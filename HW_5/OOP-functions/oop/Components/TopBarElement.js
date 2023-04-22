import Component from './base.js';  
import Input from './Input.js';  
import Button from './Button.js'; 
import './TopBarElement.css';

export default class TopBarElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
        this.state = {
            taskItems: [],
            completeItems: []
        };
    }

    render(props) {
        const searchPattern = localStorage.getItem("searchPattern");

        this.setState({
            taskItems: props.taskItems,
            completeItems: props.completeItems
        }, false, false);

        return super.render({
            id: 'TopBar',
            class: 'topbar',
            children: [
                new Input().render({
                    id: 'SearchString',
                    children: [],
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
        const searchPattern = document.getElementById("SearchString").value

        localStorage.setItem("searchPattern", searchPattern);

        let i;
        for (i in this.state.taskItems) {
            let element = document.getElementById("Task_" + i);
            element.style.display = "none";
            if (this.state.taskItems[i].name.match(searchPattern)){
                element.style.display = "flex";
            }     
        }
        for (i in this.state.completeItems) {
            let element = document.getElementById("Complete_" + i);
            element.style.display = "none";
            if (this.state.completeItems[i].name.match(searchPattern)){
                element.style.display = "flex";
            }     
        }
    }
}