import Component from './base.ts';  
import Input from './Input.ts';  
import Button from './Button.ts';
import Properities from './Properities.ts'; 
import './TopBarElement.css';

export default class TopBarElement extends Component {
    props: Properities;
    element: HTMLDivElement;  
    state: {
        taskItems: any,
        completeItems: any
        };   

    constructor() {
        super();
        this.element = document.createElement('div');
        this.state = {
            taskItems: [],
            completeItems: []
        };
    }

    render(props: Properities) {
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
        const searchInput: HTMLInputElement = document.getElementById("SearchString") as HTMLInputElement;
        const searchPattern: string = searchInput.value;

        localStorage.setItem("searchPattern", searchPattern);

        let i;
        for (i in this.state.taskItems) {
            let element: any = document.getElementById("Task_" + i);
            element.style.display = "none";
            if (this.state.taskItems[i].name.match(searchPattern)){
                element.style.display = "flex";
            }     
        }
        for (i in this.state.completeItems) {
            let element: any = document.getElementById("Complete_" + i);
            element.style.display = "none";
            if (this.state.completeItems[i].name.match(searchPattern)){
                element.style.display = "flex";
            }     
        }
    }
}